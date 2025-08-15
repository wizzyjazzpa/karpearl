const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
      email:{
        type:String,
        require:true
      }
})
module.exports = mongoose.model("Newsletter",newsletterSchema);