import User from "../models/usermodels.js"; 

 export  async function  userCreate(req,res){
    try {
        const usedata=req.body
        const user= await User.create(usedata)

        res.send(user)
    } catch (error) {
        console.log(error);
        throw error
    }
  }