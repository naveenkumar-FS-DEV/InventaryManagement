import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/connectDB.js"
import productRoutes from "./Routes/productRoutes.js"
import userRoutes from "./Routes/userRoutes.js"

const app = express()

// To load enviroment variables
dotenv.config()

// cors
app.use(cors())
// To parse json data from body
app.use(express.json())

// MongoDB conection
connectDB();

// All Routes
app.use('/api/v3/products', productRoutes);
app.use('/api/v3/users', userRoutes)

const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`server listening to port:${port}`)
})