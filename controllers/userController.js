

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LeadUser = require("../models/leadUser")

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    await LeadUser.create({name, email, password :hashedPassword});

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await LeadUser.findOne({ email });
    if (!user) return res.status(401).json("Email or password incorrect");

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.status(401).json("Email or password incorrect");

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // send it
    res.status(200).json({ user, token})
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function logout(req, res) {
  try {
    res.cookie("Authorization", null, { expires: new Date(Date.now()),httpOnly: true });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
   
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};