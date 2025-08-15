const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const eventSchema = new Schema({
      heading:{
           type:String,
           require:true
      },
      filename:{
           type:String,
           require:true
      }
 })

 module.exports = mongoose.model('events',eventSchema);