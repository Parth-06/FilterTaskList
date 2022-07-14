const jwt= require('jsonwebtoken');
const User = require("../Model/userShema")

const Authenticate =async (req, res, next)=>{
try{
const token = req.cookies.jwtoken;
// console.log(token)
const verifytoken= jwt.verify(token, process.env.SECRET_KEY);
const rootUser  = await User.findOne ({_id: verifytoken._id, "tokens.token":token })
if(!rootUser)
{
    throw new Error("user not found")
}
    req.token=token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    // console.log(rootUser)
    next();
   


 
}
catch(err){
    res.status(401).send("Unthorized token")
    console.log(err)
}
}
module.exports = Authenticate 