const mongoose = require ('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log("Conn success");
}).catch((err) => console.log(err));