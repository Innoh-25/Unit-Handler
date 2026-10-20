const express = require('express')
const connectDB = require('./connect/connectDB')
const { errorHandler } = require('./middleware/errorMiddleware')
require('dotenv').config()
const port = process.env.PORT || 5000

connectDB()
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/students',require('./routes/studentRoutes'))
app.use('/api/units',require('./routes/unitRoutes'))
app.use(errorHandler)


app.listen(port,()=>console.log(`Server is up and running at port: ${port}`))