const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const upcomingSchema = new Schema({
      heading:{
           type:String,
           require:true
      },
      uptime:{
           type:String,
           require:true
      },
      update:{
           type:String,
           require:true
      },
      filename:{
           type:String,
           require:true
      }
 })

 module.exports = mongoose.model('up_coming_events',upcomingSchema);