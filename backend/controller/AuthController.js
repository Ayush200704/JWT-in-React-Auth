import users from "../models/userData.js";
import createError from "../util/appError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const user = await users.findOne({ email: req.body.email });
        if (user) {
            return next(new createError("user already registered", 400))
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await users.create({
            ...req.body,
            password: hashedPassword
        })
        res.status(200).json({status: "successfully registered"})
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await users.findOne({email});
        if(!user){
            return next(new createError("user Not found", 404));
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '20m' });
            res.status(200).json({token, name: user.name});
        }
        else{
            return next(new createError("email or password is wrong", 401));
        }
        
    } catch (error) {
        next(error);
    }
}