import mongoose from "mongoose";

// Define the user schema and model using Mongoose
const alluserSchema = new mongoose.Schema({
  fullName:{type: String,
    required:true},
  userName:{ type: String,
    required:true
  },
  password: {type: String,
    required:true
  },
  role: {
     type: String,
    required: true,
    default: "user",
  },
  },
  {
    timestamps: true
  }
  );
  
  const Allusers = mongoose.model("Allusers", alluserSchema);
  
  export default Allusers 