const jwt = require('jsonwebtoken');
const jwtSecret = "BOOKFLIX";

exports.adminAuth = (req, res, next) => {
    // const token = req.cookies.jwt;
    // console.log(req.cookies);
    const token = req.cookies["jwt"];
    console.log(req.cookies);

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
                    next();
                }
            }
        })
    }
    else {
        return res.status(401).json({message: "Not authorized, token not available"});
    }

    // let token

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     console.log("here");
    //     try {
    //         // Get token from header
    //         token = req.headers.authorization.split(' ')[1]

    //         // Verify token
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //         if(decoded.role != "Admin")
    //         {
    //             return res.status(401).json({ message: "Not authorized" });
    //         }

    //         // Get user from the token
    //         req.user = User.findById(decoded.id).select('-password')

    //         next()
    //     } 
    //     catch (error) {
    //         console.log(error)
    //         res.status(401)
    //         throw new Error('Not authorized')
    //     }
    // }

    // if (!token) {
    //     res.status(401)
    //     throw new Error('Not authorized, no token')
    // }
}


exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } 
        else {
          if (decodedToken.role !== "Basic") {
            return res.status(401).json({ message: "Not authorized" })
          } 
          else {
            next()
          }
        }
      })
    } 
    else {
      return res.status(401).json({ message: "Not authorized, token not available" })
    }
  }