import  Express  from "express";
import { addOrders, address, getAllOrders, getOrdersByUser, payment, removeOrder } from "../controllers/ordersController.js";
import { authorizeRoles } from "../authorization/authorize.js";

const ordersRoute=Express()

ordersRoute.post('/addorder',authorizeRoles(["user","admin"]),addOrders);
ordersRoute.get('/getsingleorders',authorizeRoles(["user","admin"]),getOrdersByUser);
ordersRoute.get('/getallorders',authorizeRoles(["admin"]),getAllOrders);
ordersRoute.post('/address/',authorizeRoles(["user","admin"]),address);
ordersRoute.post('/payment/',authorizeRoles(["user","admin"]),payment);
ordersRoute.delete('/cancelorder/:id/',authorizeRoles(["user","admin"]),removeOrder);

export default ordersRoute 
