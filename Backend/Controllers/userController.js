import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User Already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};


const LoginUser = async(req, res) =>{
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Wrong password or email" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" })
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json(error);  
    }
}


export { RegisterUser, LoginUser };