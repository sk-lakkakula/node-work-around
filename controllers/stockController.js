import asyncHandler from "express-async-handler";
import Stock from "../models/stockModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// @desc    get Stock By Product Name
// @route   GET /api/stock/product/:Name
// @access  Private
const getStockCountByProductName = asyncHandler(async (req, res) => {
  // const product = req.params.name;

  const product = await Stock.find({ product: req.params.name });
  console.log("Exec getStockCountByProductName ..");
  if (product) {
    console.log("Found getStockCountByProductName ..", product);
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Add Stock By Product Name
// @route   POST /api/stock/product/:Name
// @access  Private isStore Manager
const addStockCountByProductName = asyncHandler(async (req, res) => {
  console.log("addStockCountByProductName :--> ");
  console.log(req.body);
  console.log(req.params);
  const product = req.params.name;
  const { countInStock } = req.body;
  const recordExists = await Stock.findOne({ product: product });

  if (recordExists) {
    res.status(400);
    throw new Error("Record exists");
  }

  const stockEntryCreated = await Stock.create({
    product: productName,
    countInStock: countInStock,
  });

  if (stockEntryCreated) {
    res.status(201).json({
      _Name: stockEntryCreated._Name,
      product: stockEntryCreated.product,
      countInStock: stockEntryCreated.countInStock,
    });
  } else {
    res.status(400);
    throw new Error("InvalName Product details unable to Create Stock Entry");
  }
});

// @desc    Update Stock By Product Name
// @route   PUT /api/stock/product/:Name
// @access  Private isStore Manager
const updateStockCountByProductName = asyncHandler(async (req, res) => {
  console.log("updateStockCountByProductName :--> ");
  console.log(req.body, req.params);

  const productName = req.params.Name;
  const { uom, countInStock } = req.body;
  const recordExists = await Stock.findOne({ product: productName, uom: uom });

  if (recordExists) {
    console.log("Found Stock for productName : ", productName, recordExists);
    recordExists.uom = uom || recordExists.uom;
    recordExists.productName = productName || recordExists.productName;
    recordExists.countInStock = countInStock || recordExists.countInStock;
    const updatedStockRecord = await recordExists.save();
    res.json({
      _Name: updatedStockRecord._Name,
      product: updatedStockRecord.product,
      countInStock: updatedStockRecord.countInStock,
      uom: updatedStockRecord.uom,
    });
  } else {
    res.status(404);
    throw new Error("Stock Record not found for Product Name : ", productName);
  }
});

// @desc    Reset All Products Stock count to Zero
// @route   PUT /api/stock/product/
// @access  Private isStore Manager
const resetAllProductsStockCount = asyncHandler(async (req, res) => {
  console.log("resetAllProductsStockCount ");
  const { countInStock } = req.body;
  await Stock.updateMany({}, { $set: { countInStock: 0 } });
  const result = await Stock.updateMany({}, { $set: { countInStock: 0 } });

  if (result) {
    res.json({
      result: result,
    });
  } else {
    res.status(404);
    throw new Error("Stock Record Not Updated : ");
  }
});

// @desc    Update Stocks By Product Names
// @route   PUT /api/stock/products/
// @access  Private isStore Manager
const updateOrInsertProductsStockCountByNames = asyncHandler(async(req, res) => {
  const products = req.body;
  console.log("updateOrInsertProductsStockCountByNames ", products);
    const recordsUpdated =  products.map((each) => {
      console.log('each : ',each)
      const recordExists = Stock.find({
        productName: each.productName,
        uom: each.uom,
      });
      console.log(recordExists);

    
      // if (recordExists) {
      //   console.log("Found Stock for product ,uom : ", recordExists);
      //   // recordExists.countInStock = countInStock || recordExists.countInStock;
      //   // const updatedStockRecord = recordExists.save();
      //   // return recordExists;
      // } else {
      //   console.log("Found Stock for product ,uom : DOESNT EXISTS",);
      //   throw new Error("Stock Record not found for Product Name : ");
      // }    
    /**const query = { productName: each.productName };
    const update = { $set: { countInStock:countInStock }};
    const options = { upsert: true };
    console.log(Stock.updateOne(query, update, options));*/
      // Stock.findOneAndUpdate(
      //   { product: each.product },
      //   { $set: { countInStock: each.countInStock } }
      // );
    }); 
   
    if (recordsUpdated) 
      res.json( recordsUpdated)
  })


  // @desc    Update Stock By Product Name
// @route   PUT /api/stock/product/:Name
// @access  Private isStore Manager
const updateManyByNamesAndUnits = asyncHandler(async (req, res) => {
  console.log("updateManyByNamesAndUnits :--> ",req.body);

  const { products } = req.body;
  await Stock.updateMany({_id: {$in: cid}},{ $set: {countInStock: 10}},{multi:true,upsert: true,new: true});
  const recordExists = await Stock.findOne({ product: productName, uom: uom });

  if (recordExists) {
    console.log("Found Stock for productName : ", productName, recordExists);
 
    res.json({
      success:"Success"
    });
  } else {
    res.status(404);
    throw new Error("Stock Record not found for Product Name : ", productName);
  }
});
/*const updateAsyncProductsStock = (req, res) => {
  console.log("updateAsyncProductsStock ", req.body);
  const products = req.body;
  let results = [];
  console.log("Products to be Updated are :", products);
  return Promise.all(
    products.map((eachRec) => {
      const { product, uom, productName, countInStock } = eachRec;
      const recordExists = Stock.findOne({
        product: ObjectId(product),
        uom: uom,
      });
console.log('recordExists',recordExists)
      if (recordExists) {
        console.log(
          "Found Stock for product ,uom : ",
          product,
          uom,
          recordExists
        );
        recordExists.countInStock = countInStock || recordExists.countInStock;
        const updatedStockRecord = recordExists.save();
        return updatedStockRecord;
      } else {
        throw new Error("Stock Record not found for Product Name : ", product);
      }
    })
  ).then(() => {
    console.log("Products Updated");
  });
}; */

// @desc    Update Stock By Product Name
// @route   PUT /api/stock/product/:Name
// @access  Private isStore Manager

/**
 * const updateProduct = async (prd) => {
  console.log("update each Product :--> ", prd);

  const { product, uom, productName, countInStock } = prd;
  const recordExists = await Stock.findOne({
    product: ObjectId(product),
    uom: uom,
  });

  if (recordExists) {
    console.log("Found Stock for product ,uom : ", product, uom, recordExists);
    recordExists.countInStock = countInStock || recordExists.countInStock;
    const updatedStockRecord = await recordExists.save();
    return updatedStockRecord;
  } else {
    throw new Error("Stock Record not found for Product Name : ", product);
  }
}; 
*/

// @desc    Register a new user
// @route   POST /api/user
// @access  Public
const createStockEntryForProduct = asyncHandler(async (req, res) => {
  console.log("Req Body :--> ",req.body);
  const {productId,productName,uom,countInStock} = req.body;
  const stockEntryByProductIdExists = await Stock.find({ productId });
  console.log('stockEntryByProductIdExists : ',stockEntryByProductIdExists);
  let newStockEntry ='';
  if (stockEntryByProductIdExists) {
    res.status(400);
    throw new Error(`Stock Entry for Product ${productId}already exists`);
  }else{
    newStockEntry = await Stock.create({
      productId,productName,uom,countInStock
    });
  }
  if (newStockEntry) {
    res.status(201).json({
      newStockEntry
    });
  } else {
    res.status(400);
    throw new Error("Invalid Stock data");
  }
});

export {
  getStockCountByProductName,
  addStockCountByProductName,
  updateStockCountByProductName,
  resetAllProductsStockCount,
  updateOrInsertProductsStockCountByNames,
  updateManyByNamesAndUnits,
  createStockEntryForProduct
};
