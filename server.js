import express from "express";
import morgan from "morgan";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import fruitsRoutes from "./routes/fruitsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/product", productRoutes);
app.use("/api/purchase-order", purchaseOrderRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/fruits", fruitsRoutes);
app.use("/api/user", userRoutes);
/*
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/purchase-order", purchaseOrderRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/store", storeRoutes);
*/
app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Node Mongoose Work Around API is running....");
  });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () =>
  console.log(
    `Node Mongoose Work Around API Server running on PORT ${PORT} in ${process.env.NODE_ENV}`.yellow.bold
  )
);
