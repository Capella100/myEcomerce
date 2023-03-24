const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    }
});

//we did our password harshing in the data base level.
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
// compering password in the db leavel. using compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    // using bcrypt to compare password
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}

//Export the model
module.exports = mongoose.model('User', UserSchema);