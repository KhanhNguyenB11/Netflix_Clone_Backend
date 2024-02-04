const History = require("../models/History.js");
const router = require("express").Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    if(user){
      await new History({userId: user._id}).save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || req.body.password !== user.password) {
      res.status(401).json("Wrong password or username");
    } else {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/emailused", async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if(!user){
    res.status(200).json({used:false});
  }
  else{
    res.status(200).json({used:true});
  }
})

module.exports = router;
