const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user');
const authRouter = require('./routes/authRoute');
const forbiddenRouter = require('./routes/forbiddenRoute');

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/forbidden', forbiddenRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app