// import User from "../models/usermodels.js"; 
import Allusers from "../models/allusersmodels.js";
import jwt from 'jsonwebtoken';


export async function userRegistration(req, res) {
    try {
      const userData = req.body;
      const findUser = await Allusers.findOne({
        userName: userData.userName,
        password: userData.password,
      });
  
      if (findUser) {
        return res.status(409).json({ message: 'User already exists' });
      } else {
        const user = await Allusers.create({ ...userData });
        const userId = user._id;
        return res.status(201).json({
          message: 'User created successfully',
          userId: userId,
        });
      }
    } catch (error) {
      console.error('Error in user registration:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


export async function login(req, res) {
    try {
      const loginData = req.body;
      const user = await Allusers.findOne({
        userName: loginData.userName,
        password: loginData.password,
      });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, 'thesecret');
      return res.status(200).json({
        message: 'Login Success',
        role: user.role,
        token: token,
      });
    } catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


 