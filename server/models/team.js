const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const teamSchema = new Schema({
      heading:{
           type:String,
           require:true
      },
      filename:{
           type:String,
           require:true
      }
 })

 module.exports = mongoose.model('team',teamSchema);