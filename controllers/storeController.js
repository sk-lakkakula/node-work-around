import asyncHandler from "express-async-handler";
import Store from "../models/storeModel.js";

// @desc    get All Store
// @route   GET /api/store
// @access  public
const getAllStores = asyncHandler(async (req, res) => {
  const stores = await Store.find().sort({ storeName: 1 });
  console.log("Exec getAll ..");
  if (stores) {
    console.log("Found Stores ..", stores.length);
    res.json(stores);
  } else {
    res.status(404);
    throw new Error("No Stores found");
  }
});

// @desc    POST Store
// @route   POST /api/Store/
// @access  Private isStore Manager
const createStore = asyncHandler(async (req, res) => {
  console.log("getStoreById :--> ");
  console.log(req.body);
  const { storeName, phoneNo, address, managerName, postalCode, managerEmail } =
    req.body;
  const storeExists = await Store.findOne({ storeName: storeName });

  if (storeExists) {
    res.status(400);
    throw new Error("Store Already exists with the ID : ", storeName);
  }

  const newStore = await Store.create({
    storeName: storeName,
    phoneNo: phoneNo,
    address: address,
    managerName: managerName,
    postalCode: postalCode,
    managerEmail: managerEmail,
  });

  if (newStore) {
    res.status(201).json({
      _id: newStore._id,
      storeName: newStore.storeName,
      phoneNo: newStore.phoneNo,
      address: newStore.address,
      managerName: newStore.managerName,
      postalCode: newStore.postalCode,
      managerEmail: newStore.managerEmail,
    });
  } else {
    res.status(400);
    throw new Error("Unable to Create Store...");
  }
});
// @desc    Get Store By Store Id
// @route   GET /api/Store/:id
// @access  Private isStore Manager
const getStoreById = asyncHandler(async (req, res) => {
  console.log("getStoreById :--> ", req.params);
  const storeId = req.params.id;
  const storeExists = await Store.findById({ _id: storeId });

  if (storeExists) {
    res.json(storeExists);
  } else {
    res.status(404);
    throw new Error("Store not found", storeId);
  }
});

// @desc    Update Store By Store Id
// @route   PUT /api/Store/:id
// @access  Private isStore Manager
const updateStoreByName = asyncHandler(async (req, res) => {
  console.log("Exec updateStoreByName ");
  console.log(req.body, req.params);

  const strName = req.params.id;
  const { storeName, phoneNo, address, managerName, managerEmail, postalCode } =
    req.body;

  const storeExists = await Store.findOne({ storeName: strName });

  if (storeExists) {
    storeExists.storeName = storeName || storeExists.storeName;
    storeExists.phoneNo = phoneNo || storeExists.phoneNo;
    storeExists.address = address || storeExists.address;
    storeExists.managerName = managerName || storeExists.managerName;
    storeExists.managerEmail = managerEmail || storeExists.managerEmail;
    storeExists.postalCode = postalCode || storeExists.postalCode;

    const updatedStore = await storeExists.save();
    res.json({
      _id: updatedStore._id,
      storeName: updatedStore.storeName,
      phoneNo: updatedStore.phoneNo,
      address: updatedStore.address,
      managerName: updatedStore.managerName,
      managerEmail: updatedStore.managerEmail,
      postalCode: updatedStore.postalCode,
    });
  } else {
    res.status(404);
    throw new Error("Store Record not found with Name : ", strName);
  }
});

// @desc    Delete Store By Store Id
// @route   DELETE /api/store/:id
// @access  Private
const removeStoreById = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (store) {
    await store.remove();
    res.json({ message: "Store removed : " });
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

export {
  getStoreById,
  getAllStores,
  removeStoreById,
  updateStoreByName,
  createStore,
};
