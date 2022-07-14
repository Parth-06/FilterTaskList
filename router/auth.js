const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
require("../DB/conn")
const User = require("../Model/userShema")
const Userlist = require("../Model/listShema");
const jwt= require('jsonwebtoken');
const authenticate = require("../Middleware/Authenticate")
const cookieParser =require("cookie-parser");
const { toast } = require('react-toastify');
router.use(cookieParser()); 


router.post('/todo', authenticate, async (req,res)=> {
  const {allUserInput} = req.body;

  try{    
    const userOne = await User.findOne({email :  req.rootUser.email})
   const listOne = await Userlist.findOne({email : userOne.email})
    if(listOne){
      try{
        
        const userNew =  await Userlist.findByIdAndUpdate({_id: listOne.id},{
        $push:
        {store:  allUserInput}  
        });
      }catch(err){
console.log(err)
      }
     }else{
     
      console.log("saved")
     }
     return res.json(req.rootUser) 
   }catch(err){
       console.log(err);
   } 
});


router.get ('/userdata', authenticate, async (req,res)=> {
  const listOne = await Userlist.findOne({email :  req.rootUser.email})
  if(listOne){
    return res.json(listOne.store)
  }else{
    console.log("error")
  }
})


router.get ('/todo', authenticate, async (req,res)=> {
  return res.json(req.rootUser)
})


router.post ('/deleteall', authenticate, async (req,res)=> {
  const listOne = await Userlist.findOne({email :  req.rootUser.email})
  if(listOne){
    try{
      const userNew =  await Userlist.findByIdAndUpdate({_id: listOne.id},
     {
        $unset:{
      store: ""
     }});
      console.log(userNew)
    }catch(err){
console.log(err)
    }}})


    router.post ('/deleteone', authenticate, async (req,res)=> {
      const {index} = req.body;
      const listOne = await Userlist.findOne({email :  req.rootUser.email})
      const listtwo = await Userlist.findOne({id :  index})

      if(listtwo){
     
        try{
          const userNew =  await Userlist.findByIdAndUpdate({_id : listOne.id },
         {
            $pull:{
              store:{id: index}
      }});
        
        }catch(err){
    console.log(err)
        }
  }})


router.post ('/check', authenticate, async (req,res)=> {
  const {index, check} = req.body;
  
  const listtwo = await Userlist.findOne({id : index})
 
  if(listtwo){
    if (check === false){
      try{
              const userNew =  await Userlist.findOneAndUpdate({'store.id' : index}, 
             {
              'store.$.check': true
             });
            
            }catch(err){
        console.log(err)
            }
     
    }else{
      try{
        const userNew =  await Userlist.findOneAndUpdate({'store.id' : index}, 
       {
        'store.$.check': false
       });
      
      }catch(err){
  console.log(err)
      }
    }

       
  }else{
    console.log("error")
  }
})


router.post ('/edit', authenticate, async (req,res)=> {
  const {userInput, isEditItem} = req.body;
 
  const listtwo = await Userlist.findOne({id :isEditItem})
  
  if(listtwo){
   
      try{
              const userNew =  await Userlist.findOneAndUpdate({'store.id': isEditItem}, 
             {
              'store.$.name': userInput
             });
             
            }catch(err){
        console.log(err)
            }

  }else{
    console.log("error")
  }
})



router.get ("/logout", async (req,res)=> {
  res.clearCookie('jwtoken',{httpOnly:true})
  res.status(200).send({message:"logout success"})
})


router.post('/register',async (req,res)=>{
    const {name, email, password, cpassword} = req.body;
    if( !name || !email || !password || !cpassword){
        return res.status(422).json({error:"Error fill please"})
    }
    try{      
     const userExist = await User.findOne({email : email})
     if(userExist){
        return res.status(422).json({error:"Email already exist"})
      }else if (password != cpassword){
        return res.status(422).json({error:"Password do not match"})
      }else{
        const user = new User ({name, email, password,cpassword});
        await user.save();
        res.status(210).json({message: "Registration Success"})
      }
    }catch(err){
        console.log(err);
    } })


router.post('/logins',async (req,res)=>{
  router.use(cookieParser())
    try{    
        const { email,password} = req.body;
        if(  !email  || !password ){
            return res.status(400).json({error:"Error fill please"})
        }
     const userLogin = await User.findOne({email : email})
   if(userLogin){
    const isMatch = await bcrypt.compare(password, userLogin.password)
    if(isMatch){
   
      token = await userLogin.genrateAuthToken();
      res.cookie("jwtoken",token,{
        expires:new Date(Date.now() + 25892000000),
        httpOnly:true 
      })
      const userExist = await Userlist.findOne({email : email})
      if(userExist){
        console.log("Login Hogaya")
        return res.json({message:"Login success", token}) 
      }else{
        const userNeww = new Userlist ({email: userLogin.email});
        await userNeww.save();
        console.log("Login Hogaya")
        return res.json({message:"Login success", token}) 
      }
   
     
     }else{  
       return res.status(400).json({error:"Invalid Credencials password"})
     }
   }else{
    return res.status(400).json({error:"Invalid Credencials email"})
   }
    }catch(err ){
        console.log(err);
    } 
})


router.get('/logins',async (req,res)=>{
  return res.json(token)
})



//using promises
// router.post('/register', (req,res)=>{

//     const {name, email,phone,work, password,cpassword} = req.body;
//     if( !name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"Error fill please"})
//     }
//       User.findOne({email : email})
//       .then((userExist)=>{
//           if(userExist){
//             return res.status(422).json({error:"Email already exist"})
//           }
//           const user = new User ({name, email,phone,work, password,cpassword});

//           user.save().then(()=>{
//               res.status(210).json({message: "Registration success"})
//           }).catch((err)=> res.status(500).json({error : " failed to join"}))
//       }).catch(err=>{console.log(err); })
    
// })

// router.get('/about',authenticate,(req,res)=> {
//   res.send("Hello this is about")
// });

module.exports = router;