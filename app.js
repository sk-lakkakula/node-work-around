import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const MONGO_URI = "mongodb+srv://slakkakula:Charan6571@cluster0.sm0nw.mongodb.net/tagline_dev_db?authSource=admin&replicaSet=atlas-a6y812-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('hello')
    if(conn)
    console.log(
      `Mongo DB got Connected : ${conn.connection.host}`.green.underline.bold
    );
  } catch (error) {
    console.error(`Eroor: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
