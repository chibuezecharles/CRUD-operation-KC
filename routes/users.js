const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/usersSchema');
const {createToken} = require('../jwtAuth');

const router = express.Router();

// register route.
router.post('/register', async(req, res) => {
    try {
        const {fullName, username, email, password, role } = req.body;

        const existingUser = await Users.findOne({
            $or:[
                { username: username},
                { email: email}
            ]
        });

        if(password === ""){
            return res.status(400).json({ error: "Please enter a password"});
        }
        if(existingUser ) {
            return res.status(302).json({message: 'Already registered, please Login'});
        }

        const harshedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            fullName: fullName,
            username:username,
            email: email,
            password: harshedPassword,
            role:role,
        });

        if(!newUser){
            return res.status(400).json({ message: "failed to create user"});
        }

        return res.status(201).json({ message: "user created successfully", user: newUser });

        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

// login route.
router.post('/login', async (req, res) => {

    const {username, email, password } = req.body;

   try {
        const existingUser = await Users.findOne({
            $or:[
                { username: username},
                { email: email}
            ]
        });

        if(!existingUser || password === ""){
            return  res.status(404).json({message: 'User not found'});
        }

        const matchpassword = await bcrypt.compare(password, existingUser.password);

        if(!matchpassword){
           return res.status(400).json({message: 'incorrect user Details, please use the correct user Details'});
        }

        const accessToken = createToken(existingUser);
        res.cookie("access-token", accessToken, {
          maxAge: 24 * 60 * 60 * 1000, // in milliseconds
          httpOnly: true,  // to protect cookies from javascript injection
          secure: true, // Set to true if using HTTPS
          sameSite: 'strict' // Recommended for security
        });

        return res.status(200).json({message: 'login successful', existingUser});
    
   } catch (error) {
    return res.status(500).json({message: error.message});
   }

});



module.exports = router;