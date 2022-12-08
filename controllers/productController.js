import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import SubCategory from "../models/subCategoryModel.js";

// @desc    Fetch all products using Pagination
// @route   GET /api/products
// @access  Public
const getAll = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNo) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  console.log('Total Count of the Documents are : '+count)
  const products = await Product.find({ ...keyword })
    .sort({ name: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all products with out Pagination
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  console.log('Exec getAllProducts')
 const products = await Product.find()
    .sort({ name: 1 })
  res.json({ products });
});


// getAllBySubCategory;

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
const getAllBySubCategory = asyncHandler(async (req, res) => {
  let filtered = [];
  const subCategoryId = req.params.id;

  const products = await Product.find();

  if (products) {
    filtered = products.filter((eachProduct) => {
      return eachProduct.subCategory.toString() === subCategoryId.toString();
    });
    console.log(filtered);
    if (filtered) {
      res.json(filtered);
    } else {
      res.status(404);
      throw new Error(`Products not found for ${subCategoryId}`);
    }
  }
});

// @desc    Fetch products bu cat ID
// @route   GET /api/product/cat/:id
// @access  Public
const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  let products = [];
  let filteredSubCategories = [];
  let filteredProducts = [];
  const subCategories = await SubCategory.find({});

  if (subCategories) {
    filteredSubCategories = subCategories.filter((eachSubCat) => {
      console.log(
        "eachSubCat.category : " +
          eachSubCat.category +
          " Type : " +
          typeof eachSubCat.category +
          ", categoryId: " +
          categoryId +
          ", Type : " +
          typeof categoryId
      );
      return eachSubCat.category.toString() === categoryId;
    });
    if (filteredSubCategories) {
      console.log(
        "filteredSubCategories Size :--> " + filteredSubCategories.length
      );
      products = await Product.find();
      filteredSubCategories.forEach((fsb) => {
        console.log(fsb.category);
        products.forEach((product) => {
          if (fsb._id.toString() === product.subCategory.toString()) {
            console.log("Matched Rec : " + product);
            filteredProducts = [...filteredProducts, product];
          }
        });
      });

      if (filteredProducts) {
        console.log("filteredProducts Size :--> " + filteredProducts.length);
        res.json(filteredProducts);
      } else {
        console.log("No Matched Products  for CategoryId:--> " + categoryId);
        res.json(filteredProducts);
      }
    } else {
      throw new Error(`Sub Category not found for the ${categoryId}`);
    }
  }
});

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
const getById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/product/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  console.log("EXEC create..");
  const {
    name,
    brand,
    description,
    isTaxable,
    taxPercent,
    discountPercent,
    discountAmount,
    quantity,
    units,
    pricePerUnit,
    imageUrl,
    isBestSeller,
    subCategory,
    purchaseOrder
  } = req.body;

  const product = new Product({
    name,
    brand,
    description,
    isTaxable,
    taxPercent,
    discountPercent,
    discountAmount,
    quantity,
    units,
    pricePerUnit,
    imageUrl,
    isBestSeller,
    user: "608cba1e3641497ee41153c9",
    subCategory,
    purchaseOrder
  });
  console.log("Before Saving product from Product Controller : " + product);
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/product/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    brand,
    subCategory,
    isTaxable,
    taxPercent,
    isBestSeller,
    discountPercent,
    discountAmount,
    quantity,
    units,
    pricePerUnit,
    purchaseOrder

  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.imageUrl = imageUrl;
    product.subCategory = subCategory;
    product.isTaxable = isTaxable;
    product.taxPercent = taxPercent;
    product.brand = brand;
    product.isBestSeller = isBestSeller;
    product.discountPercent = discountPercent,
    product.discountAmount = discountAmount,
    product.quantity = quantity,
    product.units = units,
    product.pricePerUnit = pricePerUnit,
    product.purchaseOrder= purchaseOrder

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/product/top
// @access  Public
const getBestSellers = asyncHandler(async (req, res) => {
  const products = await Product.find({ isBestSeller: true })
    .sort({ rating: -1 })
    .limit(3);

  res.json(products);
});

export {
  getAll,
  getById,
  remove,
  create,
  update,
  getBestSellers,
  getAllBySubCategory,
  getAllProductsByCategory,
  getAllProducts
};
