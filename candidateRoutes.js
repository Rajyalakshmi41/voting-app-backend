import express from 'express';
const router = express.Router();
import User from './models/candidate.js';
// const {jwtAuthMiddleware, generateToken}= require('./../jwt');
import jwt from 'jsonwebtoken';


const checkAdminRole = async (userID) =>{
    try{
        const user = await User.findByid(userID);
        return user.role ==='admin';

    }catch(err){
        return false;
    }


}

router.post('/', async (req, res) => {
    try{
        if(!checkAdminRole(req.user.id)){
            return res.status(404).json({message: 'user has no admin role'});

        }

        const data =req.body

        const newUser = new candidate(data);

        const response =await newCandidate.save();
        console.log('data saved');

        
        res.status(200).json({response: response});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }

})




router.put('/:candidateID', async (req, res)=>{
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(404).json({message: 'user has no admin role'})

        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.data;


        const response = await candidate.findByIdAndUpdate(candidateID,updatedCandidateData, {
            new: true,
            runValidators :true,
        })

        if(!response){
            return res.status(404).json({error: 'candidate not found'});
        }

        console.log('candidate data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err});
        
    }
})









router.delete('/:candidateID', async (req, res)=>{
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(404).json({message: 'user has no admin role'})

        const candidateID = req.params.candidateID;
        


        const response = await candidate.findByIdAndDelete(candidateID);

        if(!response){
            return res.status(404).json({error: 'candidate not found'});
        }

        console.log('candidate deleted');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err});
        
    }
})






router.get('/vote/count', async (req,res)=>{
    try{
        const candidate = await Candidate.find().sort({voteCount: 'desc'});
        const voteRecord = candidate.map((data)=>{
            return{
                party: data.party,
                count: data.voteCount
            }

        });

        return res.status(200).json(voteRecord)
    }
    catch(err){
        console.log(err)
    }
}

);

























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