import Products from "../models/productsmodels.js";
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose'


cloudinary.config({
  cloud_name: 'dh5pflqzs',
  api_key: '549382545581927',
  api_secret: 'VEOMO5Xni1eCfQKSsVB4Jr4p4eQ',
});


export async function addProduct(req, res, next) {
  try {
    const productData = req.body; // Assuming `req.body` is an object containing product data
 

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No photo were uploaded.' });
    }
    const productImages = [];

    for (const file of files) {
      const public_id = `products/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id });
      productImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
   const ThemainproductImage = {productImage:productImages}

   const productDatas = { ...productData, ...ThemainproductImage };
   
    
    // Create a new product using the provided data
    const createdProduct = await Products.create( productDatas);

    // Respond with the created product
    res.status(201).json(createdProduct);
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
  }
}


export async function searchProduct(req, res, next) {
  try {
    const searchQuery = req.body.search; // Assuming `req.body.search` contains the search query

    // Use a regular expression to perform a case-insensitive search on the productName field
    // $regex operator to search for products where the productName field matches the search query case-insensitively.
//     the 'i' flag is used to make the regular expression match case-insensitively. When 'i' is included as a flag in the regular expression, it means that the search will be performed without considering the case of the letters. This means that both uppercase and lowercase letters will be treated as the same.

// For example, if you have a search query of "apple" and you use the 'i' flag, it will match not only "apple" but also "Apple," "aPpLe," "APpLe," and so on.
    const searchResults = await Products.find({
      productName: { $regex: new RegExp(searchQuery, 'i') },
    });
    if(searchResults.length===0){
      res.status(200).json({message:"there is no results"});
    }

    res.status(200).json(searchResults);
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
  }
}
  
export async function updateProduct(req, res, next) {
  try {
    const productId = req.params.id; // Assuming the product ID is in the URL parameter
    const dataToUpdate = req.body;

    // Check if productId is a valid ObjectId format (assuming you're using MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the product by ID and update it
    const updatedProduct = await Products.findByIdAndUpdate(productId, dataToUpdate, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
  }
}


export async function deleteProduct(req, res, next) {
  try {
    const productId = req.params.id; // Assuming the product ID is in the URL parameter

    // Check if productId is a valid ObjectId format (assuming you're using MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the product by ID and delete it
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with a success message or the deleted product
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
  }
}

export async function getsingleProduct(req, res, next) {
  try {
    const productId = req.params.id; // Assuming the product ID is in the URL parameter

    // Check if productId is a valid ObjectId format (assuming you're using MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const findProduct = await Products.findById(productId);

    if (!findProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the found product
    res.status(200).json(findProduct);
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
  }
}


export async function getAllProduct(req, res, next) {
  try {
    const getallProducts = await Products.find().sort({ createdAt: -1 });

    if (!getallProducts) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const total = getallProducts.length
  
    res.status(200).json({ allproducts: getallProducts, total: total });
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
  }
}




 