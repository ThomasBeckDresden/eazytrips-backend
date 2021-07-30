const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: { type: String, min: 2, max: 50, required: true },
    last_name: { type: String, min: 2, max: 50, required: true },
    email: { type: String, min: 2, max: 50, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
