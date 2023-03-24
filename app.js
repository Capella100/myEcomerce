const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();
require('dotenv').config();
const authRouter = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandller');

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/v1/users', authRouter);

app.use(notFound);
app.use(errorHandler);


const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server is running at PORT ${PORT}`);
    })
}

start();