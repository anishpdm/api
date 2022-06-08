const mongoose = require('mongoose');
var current = new Date();

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: {
        // Schema.Types.ObjectId 
        type: Schema.Types.ObjectId,
         ref: 'Users' },


    paymentId: {
        type: String,
    },

    paymentDate: {
        type: Date,
        default: Date.now()
    }
          
});

const User = mongoose.model('Payments', paymentSchema);

module.exports = User;