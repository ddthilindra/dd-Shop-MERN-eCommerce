import asyncHandler from 'express-async-handler'; // Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import { generateAuthToken } from '../lib/utils.js';
import User from '../models/user.model.js';

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
export const authUser= asyncHandler(async(req,res)=>{
   const {email,password} = req.body;

   const user=await User.findOne({email})

   if(user && (await user.matchPassword(password))){ // matchPassword is checking entered password is correct in user mode
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateAuthToken(user),
    })
   }else{
    res.status(401)
    throw new Error('Invalid email or password')
   }
})

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  