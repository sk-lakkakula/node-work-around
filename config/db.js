import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `Mongo DB got Connected : ${conn.connection.host}`.green.underline.bold
    );
  } catch (error) {
    console.error(`Eroor: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
