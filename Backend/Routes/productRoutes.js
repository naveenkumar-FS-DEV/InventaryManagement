import express from "express"
import { createNewProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controllers/productController.js"
const router = express.Router()

router.post('/', createNewProduct);
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;
