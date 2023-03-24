const jwt = require("jsonwebtoken");
require('dotenv').config();

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}

module.exports = { createToken }