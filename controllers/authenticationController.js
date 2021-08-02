const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    // res.send("Login in");
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid Request");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Invalid credentials");

    res.send("User is logged in");
};

module.exports = { login };