const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try{
    console.log("req.body:", req.body); 
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    
    const user = await User.create({ name, email, password });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.status(201).json({ id: user._id, email: user.email, token:token });
  }
  catch (error) {
    console.error("Error in registerUser:", error);
    res.json({ message: "Some error occured" });
  }
};

const loginUser = async (req, res) => {
  try{

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    if (password !== user.password)
      return res.status(400).json({ message: "Invalid credentials" });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.json({ token });
  }
  catch (error) {
    console.error("Error in loginUser:", error);
    res.json({ message: "Some error occured" });
  }
};

module.exports = { registerUser, loginUser };
