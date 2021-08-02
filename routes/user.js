const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { create_user } = require("../controllers/userController")

router.post('/', create_user);

module.exports = router;



// async (req, res) => {
//     const { first_name, last_name, email, password } = req.body;
//     console.log({ first_name, last_name, email, password });
//     console.log("!!!!!!!!!");
//     try {
//         const newUser = await User.create({
//             first_name,
//             last_name,
//             email,
//             password
//         });
//         res.json(newUser);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// }