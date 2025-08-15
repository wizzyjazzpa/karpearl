const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({
    heading:{
        type:String,
        require:true
    },
    image:{
         type:String,
         require:true
    },
    updateAt :{
    type: Date,
    default: Date.now()
    
}

});

module.exports = mongoose.model('program',programSchema);
