import User from "../models/User.js";
import bcrypt from 'bcryptjs';

// Register user: api/user/register
export const register = async (req, res) => {
    try{
        const {name, password, email} = req.body;

        if (!name || !email || !password){
            return res.json({
                success: false,
                message: "Missing Details!"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }

        const hasedPassword = await bcrypt
    }catch(error){

    }
}