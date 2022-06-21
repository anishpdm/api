const mongoose = require('mongoose');

var current = new Date();
const timeStamp = new Date(Date.UTC(current.getFullYear(), 
current.getMonth(),current.getDate(),current.getHours(), 
current.getMinutes(),current.getSeconds(), current.getMilliseconds()));


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    photo: {
        type: String
    },
    dept: {
        type: String,
        required: true,
    },

    birthdate: {
        type: Date,
        required: true,
    },
    academicYear:{
        type: String,
        required: true,
    },
            semester:{
                type: String,
                required: true,
            },
            college:{
                type: Schema.Types.ObjectId,
                ref: 'colleges',
                required: true,

            },
            admno:{
                type: String,
                required: true,
            },
            gender:{
                type: String,
                required: true,
            },
            mobile:{
                type: String,
                required: true,
            },
            email:{
                type: String,
                required: true,
            },
            password:{
                type: String,
                default:""
            },
            address:{
                type: String,
                required: true,
            },
            bloodGroup:{
                type: String,
                required: true,
            },

            RegisteredDate:{
                type:Date,
                default: new Date()

            },

            expiryDate:{
                type:Date,
                default: +new Date() + 90*24*60*60*1000

            },
            membershipNumber:{
                type:String,
                default:""
            }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;