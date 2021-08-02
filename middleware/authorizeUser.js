const jwt = require('jsonwebtoken');

const authorizeUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send("Access Denied");
    const [_, token] = authHeader.split('')

    if (!token) return res.status(401).send('Access Denied')

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
    } catch (e) {
        console.log(e.message);
        res.status(403).send('Access Denied');
    }
}

module.exports = { authorizeUser };