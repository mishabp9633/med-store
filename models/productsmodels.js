import mongoose from "mongoose";

// Define the user schema and model using Mongoose
const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true
},
price: {
    type: Number,
    // type:String,
    required: true,
},
count: {
    type: Number,
    // type:String,
    required: true,
},
productImage: [
    {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        }
    }
]
  },
  
  {
    timestamps: true
  }
  );
  
  const Products = mongoose.model("Products", productsSchema);
  
  export default Products 