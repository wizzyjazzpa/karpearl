const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
      message:{
           type:String,
         require:true
      },
      name:{
          type:String,
         require:true
      },
     
      email_address:{
         type:String,
         require:true
      },
       subject:{
         type:String,
         require:true
      }


})

module.exports = mongoose.model('contact',contactSchema);