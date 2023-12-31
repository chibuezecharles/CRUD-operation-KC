const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

// sign jwt.
const createToken = (userDetails) => {

  const accessToken = sign(
    { fullName: userDetails.fullName, username: userDetails.username, id: userDetails._id, email: userDetails.email, role: userDetails.role, },
    process.env.SECRETE
  );

  return accessToken;

};

// verify jwt.
const validateToken = (req, res, next) => {
  // try {
  //   const accessToken = req.cookies['access-token'];
  //   if (!accessToken) {
  //     return res.status(401).json({ message: 'User not authorized' });
  //   }

  //   const verifyToken = verify(accessToken, process.env.SECRETE);
    
  //   if (!verifyToken) {
  //     return res.status(401).json({ message: 'Invalid token' });
  //   }

  //   req.userDetails = verifyToken;
  //   next();
    
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }

  try {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader){
       return  res.status(401).send("No Authorization Header")
    }
    const val = authorizationHeader.split(" ");
    const tokenType = val[0];
    const tokenValue = val[1];
    if(tokenType ==='Bearer'){
        const decoded = verify(tokenValue, process.env.SECRETE );
        req.userDetails = decoded;
        next();
        return;
    }
    res.status(401).json({ message: 'User not authorized' });
    
  } catch (error) {
   res.status(500).json({ message: error.message });
  }

};

//for admins only .
const adminOnly = (req, res, next) => {
  if(req.userDetails.role === 'admin'){
    next();
  }else{
   return res.status(403).json({message: 'action-not-allowed'});
  }
};

module.exports = { createToken, validateToken, adminOnly };
