import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

const generateAuthToken=(user)=> {
    
  const expiresIn = "2w";

  const payload = {
    sub: {
      _id: user._id,
      verified:true,
    },
    iat: Date.now(),
  };

  const signedToken = jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn});

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
    // sub: {
    //   _id: user._id,
    //   verified:true,
    // },
  };
  
}

const authMiddleware=asyncHandler(async(req, res, next) =>{
    
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          const tokenParts = req.headers.authorization.split(' ');
          if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
            try {
              const verification = jwt.verify(tokenParts[1], process.env.ACCESS_TOKEN_SECRET);
              if(verification.sub.verified === false){
                res.status(401).json({ success: false, status: 'Unauthorized', msg: "You are not verified your email to access your account" });
              }else{
                req.user = await User.findById(verification.sub._id).select('-password')
                req.jwt = verification;
                next();
              }
            } catch (error) {
                console.error(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
                res.status(401).json({ success: false, status: 'Unauthorized', msg: "You are not authorized to visit this route" });
            }
      
          } else {
            res.status(401).json({ success: false, status: 'Unauthorized', msg: "You are not authorized to visit this route" });
          }
        } else {
          res.status(401).json({ success: false, status: 'TokenError', msg: "You are not authorized to visit this route" });
        }
})

export {generateAuthToken,authMiddleware}