const User = require("../models/User");

const create_user = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).send('This user already exists');

        user = await User.create({
            first_name,
            last_name,
            email,
            password,
        });
        res.json(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
}