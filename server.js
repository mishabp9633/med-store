import  express  from "express";
import mongoose from "mongoose"
import userRouter from "./routes/userroute.js"
import authRouter from "./routes/auth.js"
import productsRoute from "./routes/productsroute.js";
import cartRoute from "./routes/cartroute.js";
import ordersRoute from "./routes/ordersroute.js";
import cors from "cors"

const app=express()
const port =4000;
app.use(cors({ origin: true, credentials: true }));

app.use(express.json())

app.use( 
    userRouter,
    authRouter,
    productsRoute,
    cartRoute,
    ordersRoute
    )


async function dbconnection(){
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/medstore")
      console.log("monogo db connecetd");
      
    } catch (error) {
      console.log("monogo db not connecttd");
  
      throw error
    }
  }
await dbconnection()

app.listen(port, ()=>{
    console.log(`port at listen ${port}`)
})  



