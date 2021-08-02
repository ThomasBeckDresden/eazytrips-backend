const User = require("../models/User");
const bcrypt = require("bcrypt");


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

        res.json({ _id: user._id, email: user.email });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = { create_user };