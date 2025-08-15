const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
      available:{
         type:String,
         require:true
      },
      first_name:{
         type:String,
         require:true
      },
      last_name:{
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
      }

})

module.exports = mongoose.model('volunteer',volunteerSchema);