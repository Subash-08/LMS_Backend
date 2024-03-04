const jwt = require("jsonwebtoken");
const User = require("../models/leadUser");

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.Authorization;

    const decoded = jwt.verify(token, iufbhyugrg4ury8rg8);

    if (Date.now() > decoded.exp) return res.sendStatus(401);

    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;