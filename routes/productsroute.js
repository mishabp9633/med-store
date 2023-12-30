import  Express  from "express";
import { addProduct, deleteProduct, getAllProduct, getsingleProduct, searchProduct, updateProduct } from "../controllers/productsController.js";
import multer from 'multer';
import { authorizeRoles } from "../authorization/authorize.js";

const productsRoute=Express()
const upload = multer({ storage: multer.diskStorage({}) }); 

productsRoute.post('/addproducts',authorizeRoles(["admin"]),upload.array("image"),addProduct);
productsRoute.post('/updateproducts',authorizeRoles(["admin"]),updateProduct);
productsRoute.post('/searchproducts',searchProduct);
productsRoute.post('/getproductsingle/:id',getsingleProduct);
productsRoute.get('/getallproducts',getAllProduct);
productsRoute.delete('/deleteproduct/:id',authorizeRoles(["admin"]),deleteProduct);

export default productsRoute 
