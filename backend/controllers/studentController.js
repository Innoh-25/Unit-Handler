const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const registerStudent = asyncHandler(async(req,res)=>{
    const { fullName, regNo , email , password } = req.body;

    if(!fullName || !regNo || !email || !password){
        res.status(400)
        throw new Error('Kindly fill in all the fields')
    }

    const studentExists = await Student.findOne({regNo})
    if(studentExists){
        res.status(400)
        throw new Error('Student already registered')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const student = await Student.create({fullName,regNo,email,password:hashedPassword})
    if(student){
        res.status(201).json({_id:student.id,fullName:student.fullName,regNo:student.regNo,token:generateJWTtoken(student._id)})
    } else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const loginStudent = asyncHandler(async(req,res)=>{
    const { regNo,password } = req.body
    if(!regNo || !password){
        res.status(400)
        throw new Error('Please fill in all the fields')
    }

    const student = await Student.findOne({regNo})
    if(student && await bcrypt.compare(password,student.password)){
        res.status(200).json({_id:student._id,fullName:student.fullName,regNo:student.regNo, token:generateJWTtoken(student._id)})
    } else{
        res.status(400)
        throw new Error('Incorrect details')
    }
})

const getCurrentStudent = asyncHandler(async(req,res)=>{
    const { _id, fullName , regNo} = await Student.findById(req.student._id)
    res.json({_id:_id, fullName:fullName, regNo:regNo})
})

const generateJWTtoken = id => jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
)

module.exports = { getCurrentStudent,registerStudent,loginStudent }