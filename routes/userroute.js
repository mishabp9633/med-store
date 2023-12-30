import  Express  from "express";
import {userCreate} from "../controllers/userController.js";

const userRoute=Express()

userRoute.get('/user')
userRoute.get('/user/:id')
userRoute.post('/user/new',userCreate)
userRoute.put('/user/update/:id')
userRoute.delete('/user/delete/:id')

export default userRoute 
