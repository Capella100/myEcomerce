const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();
require('dotenv').config();
const authRouter = require('./routes/authRoutes');

const PORT = process.env.PORT || 4000;

app.use('api/vi/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello from server side");
});

const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server is running at PORT ${PORT}`);
    })
}

start();