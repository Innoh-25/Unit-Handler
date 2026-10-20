const mongoose = require('mongoose')

const unitSchema = mongoose.Schema(
    {
        unit: { 
            type:String,
            required:[true,'Please enter a unit name']
        },
        student: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Student'
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model('Unit',unitSchema)