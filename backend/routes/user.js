const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send('Username already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    permissionLevel: "1"
  });

  try {
    const savedUser = await user.save();
    res.send({ username: user.username, details: "User successfully registered" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const usernameExist = await User.findOne({ username: req.body.username });
  if (!usernameExist) return res.status(400).send('Username is not found');

  const validPass = await bcrypt.compare(req.body.password, usernameExist.password);
  if (!validPass) return res.status(400).send('Invalid password');

  jwt.sign({
    _id: usernameExist._id,
    username: req.body.username,
    permissionLevel: usernameExist.permissionLevel
  }, process.env.TOKEN_SECRET, (err, token) => {
    res.json({ token })
  });
})

module.exports = router;