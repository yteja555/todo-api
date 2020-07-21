const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionString = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.vivo5.gcp.mongodb.net/todo?retryWrites=true&w=majority`;
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Successfully Connected to mongodb : ${conn.connection.host}`);
  } catch (err) {
    console.log("Failed to connect Mongodb exiting ...");
    process.exit(555);
  }
};
module.exports = connectDB;
