const User = require("../models/User");

const login = (req, res) => {
    res.send("Login in");
    //     const { email, password } = req.body;

    //     let user = await User.findOne({ email });
    //     if (!trainer) return res.status(400).send("Invalid Request");
};

module.exports = { login };