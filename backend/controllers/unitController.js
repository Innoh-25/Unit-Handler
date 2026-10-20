const asyncHandler = require('express-async-handler')
const Unit = require('../models/unitModel')
const Student = require('../models/studentModel')


const getUnits = asyncHandler(async(req,res)=>{
    const units = await Unit.find({student:req.student})
    res.status(200).json(units)
})

const addUnit = asyncHandler(async(req,res)=>{
    if (!req.body?.unit){
        res.status(400)
        throw new Error('Kindly enter a unit name')
    }

    const addedUnit = await Unit.create({unit:req.body?.unit,student:req.student._id})
    res.status(200).json(addedUnit)
})

const updateUnit = asyncHandler(async(req,res)=>{
    const unit = await Unit.findById(req.params.id)
    if(!unit){
        res.status(400)
        throw new Error('unit not found')
    }

    const student = await Student.findById(req.student._id)
    
    if(!student){
        res.status(401)
        throw new Error('You are not a registered student, you cannot update')
    }

    if(unit.student.toString() != student._id){
        res.status(401)
        throw new Error('You are not authorized to update')
    }

    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedUnit)
})

const deleteUnit = asyncHandler(async(req,res)=>{
    const unit = await Unit.findById(req.params.id)
    
    if(!unit){
        res.status(400)
        throw new Error('Unit not available')
    }

    const student = await Student.findById(req.student._id)

    if(!student){
        res.status(400)
        throw new Error('Student not found')
    }

    if(unit.student.toString() != student._id){
        res.status(401)
        throw new Error('You are not authorized to delete')
    }

    await Unit.findByIdAndDelete(req.params.id)
    res.status(200).json({_id:req.params.id})
})





module.exports = { getUnits, addUnit,updateUnit, deleteUnit }