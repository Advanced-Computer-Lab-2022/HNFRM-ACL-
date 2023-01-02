const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers["token"];
    
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
};


module.exports = { requireAuth };