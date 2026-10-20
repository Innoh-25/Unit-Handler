const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        fullName:{
            type:String,
            required:[true,'Please enter your name']
        },
        regNo:{
            type:String,
            required:[true,'Please enter your registration number'],
            unique:true
        },
        email:{
            type:String,
            required:[true,'Kindly enter your email'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'You cannot proceed without entering your password']
        }
    },{timestamps:true})

module.exports = mongoose.model('Student',studentSchema)