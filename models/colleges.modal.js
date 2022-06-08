const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    college: {
        // Schema.Types.ObjectId 
        type: String
          }
          
});

const College = mongoose.model('colleges', collegeSchema);

module.exports = College;