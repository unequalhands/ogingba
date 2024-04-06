import User from "../models/Users.model.js";
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup = async(req, res, next)=>{
    const {email, password, username} = req.body;
    const hashpassword = bcrypt.hashSync(password, 10)
try {
    const newUser = new User({email, password:hashpassword, username});
     await newUser.save();

     res.status(201).json({
        message: "user created successfully"
     })
    
} catch (error) {
    next(errorHandler(400, "unable to save the details"))
}
    
}