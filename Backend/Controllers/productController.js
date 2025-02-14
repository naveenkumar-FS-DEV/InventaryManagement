import Product from "../Models/product.js";

// create new product
const createNewProduct = async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  try {
    const product = await Product.create({
      name,
      category,
      quantity,
      price,
      description,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// get single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await Product.findById(id);
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
