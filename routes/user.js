const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.post('/', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log({ first_name, last_name, email, password });

    try {
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password
        });
        res.json(newUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;