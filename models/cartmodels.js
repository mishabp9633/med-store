import mongoose from "mongoose";

// Define the user schema and model using Mongoose
const cartSchema = new mongoose.Schema({
  user:{
    type: String,ref:"Allusers"
   },
    cart:[
      {
        product:{
          type:String,
          ref:"Products"
        },
        selectedCount:{
          type:Number
        }
      }
    ]
  },
  
  {
    timestamps: true
  }
  );
  
  const Cart = mongoose.model("Cart", cartSchema);
  
  export default Cart 