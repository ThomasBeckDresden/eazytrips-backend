const User = require("../models/UserSchema");
const Trip = require("../models/SaveTripSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const create_user = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user);

        if (user) return res.status(400).send('This user already exists');

        user = new User({
            first_name,
            last_name,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();

        const token = user.createToken();
        res.set("x-authorization-token", token).json({
            _id: user._id,
            email: user.email,
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

const get_all_users = async (req, res) => {
    console.log(req.headers.authorization);
    const token = (req.headers.authorization)
    console.log(token)
    const secretKey = process.env.JWT_SECRET;
    const userInfo = jwt.verify(token, secretKey);
    console.log(userInfo);
    try {
        //const trips = await Trip.find({ "email": "a@a.de" });
        const trips = await Trip.find({ "email": userInfo.email });
        console.log(trips)
        res.json(trips);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = { create_user, get_all_users };
