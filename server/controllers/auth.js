import bcrypt from "bcrypt"; //for encryption password
import jwt from "jsonwebtoken"; // give way to send web ttoken for user to do the authorisation step
import User from "../models/User.js";


/*Register */
export const register = async (req, res) => { //should be asynchronous as it's an API call from front to back to DB; funciton provided by express
    // req - request body from frontend
    // res - response to send back to the front end

    try {
        const { // this is obj with listed parameters to be send to backend
            firstName,
            lastName,
            email,
            password,
            picturePath,
            followers,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); // create random salt to encrypt the password
        const passwordHash = await bcrypt.hash(password, salt);


        //cereate user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            followers,
            location,
            occupation,
            viewProfile: Math.floor(Math.random() * 10000), //random values to be displayed
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        //saving user info

        res.status(201).json(savedUser); //status code(user recieved notification about), easch means smth, json version with saved user information

        //check data forwared is correct


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}