const jwt = require('jsonwebtoken');
const jwtSecret = "BOOKFLIX";

exports.adminAuth = (req, res, next) => {
    const token = req.header('token');

    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                return res.status(401).json({message: "Not Authorized"});
            }
            else {
                if(decodedToken.role !== "Admin") {
                    return res.status(401).json({message: "Not Authorized"});
                }
                else{
                  req.session.user = decodedToken;
                    next();
                }
            }
        })
    }
    else {
        return res.status(401).json({message: "Not authorized, token not available"});
    }
}


exports.userAuth = (req, res, next) => {
  const token = req.header('token');

  if(token){
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
          if(err){
              return res.status(401).json({message: "Not Authorized"});
          }
          else {
              if(decodedToken.role !== "Basic") {
                  return res.status(401).json({message: "Not Authorized"});
              }
              else{
                req.session.user = decodedToken;
                  next();
              }
          }
      })
  }
  else {
      return res.status(401).json({message: "Not authorized, token not available"});
  }
}

exports.generalAuth = (req, res, next) => {
  const token = req.header('token');

  if(token){
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
          if(err){
              return res.status(401).json({message: "Not Authorized"});
          }
          else {
                req.session.user = decodedToken;
                next();
          }
      })
  }
  else {
      return res.status(401).json({message: "Not authorized, token not available"});
  }
}