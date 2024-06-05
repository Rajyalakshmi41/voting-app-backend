import express from 'express';
const router = express.Router();
import User from './../models/user.js';
// const {jwtAuthMiddleware, generateToken}= require('./../jwt');
import jwt from 'jsonwebtoken';


router.post('/signup', async (req, res) => {
    try{
        const data =req.body

        const newUser = new User(data);

        const response =await newUser.save();
        console.log('data saved');

        const payload ={
            id: response.id
        }

        // console.log(JSON.stringify(payload));
        const token= jwt.sign(payload, process.env.JWT_SECRET);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token
            
        });



    }

    catch(err){                                                  
        console.log(err);
        res.status(500).json({error: err});
    }
})


//Login Route


router.post('/login', async (req, res) => {
    try{
        const {aadhaarCardNumber, password} = req.body;
        const user =await User.findOne({aadhaarCardNumber: aadhaarCardNumber});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid Credentials"});
            
        }

        const payload ={
            id: user.id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.json({token})
    }catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
})



router.get('/profile', async(req,res) => {

    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById({userId});
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
})






router.put('/profile/password', async (req, res)=>{
    try{
        const userId = req.user;
        const {currentPassword, newPassword}= req.body;

        const user = await User.findById(userId);
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: "Invalid Credentials"});
    
        }

        user.password = newPassword;
        await user.save();




        console.log('password updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err});
        
    }
})


export default router;