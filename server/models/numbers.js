const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const NumberSchema = new Schema({
      volunteers:{
         type:String,
         require:true,
        
      },
      treated:{
          type:String,
         require:true,
         
      },
      donations:{
         type:String,
         require:true,
        
      }
})

module.exports = mongoose.model("numbersInfo",NumberSchema);