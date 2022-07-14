const mongoose = require('mongoose');



const listShema = new mongoose.Schema({

   email:{
    type: String,
    required: true
   },
   store:{
    _id : true,
    type: Array,
    required: true
  }

})




const Userlist = mongoose.model('TaskList', listShema)

module.exports = Userlist;