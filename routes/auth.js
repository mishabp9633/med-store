import  Express  from "express";
import {login, userRegistration} from "../controllers/authController.js";
import { authorizeRoles } from "../authorization/authorize.js";

const authRoute=Express()

authRoute.post('/register',userRegistration);
authRoute.post('/login',login);

export default authRoute 
