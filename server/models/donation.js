const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
     
      name:{
          type:String,
         require:true
      },
      address:{
           type:String,
         require:true
      },
      city:{
           type:String,
         require:true
      },
      country:{
         type:String,
         require:true
      },
      phone_number:{
         type:String,
         require:true
      },
      email_address:{
         type:String,
         require:true
      },
       amount:{
         type:String,
         require:true
      }


})

module.exports = mongoose.model('donation',donationSchema);