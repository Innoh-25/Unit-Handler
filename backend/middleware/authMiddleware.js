const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.student = await Student.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('You are not authorized!')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('You are not authorized, you have no token')
    }
})

module.exports = { protect }