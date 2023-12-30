import mongoose from "mongoose";

// Define the user schema and model using Mongoose
const ordersSchema = new mongoose.Schema({
  user:{
    type: String,ref:"Allusers",required:true
   },
   product:{
     type: String,
     ref:"Products",
     required: true,
   },
   address:[{
    name:String,
    mobileNo:String,
    areaAndAdress:String
  }],
    purchasedCount:Number,
    totalPay:Number,
    paymentMethod:String,
    paymentId: String,

  },
  
  {
    timestamps: true
  }
  );
  
  const Orders = mongoose.model("Orders", ordersSchema);
  
  export default Orders 