import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connection established successfully.`);
    console.log(`Host: ${connection.connection.host}`);
    console.log(`Database Name: ${connection.connection.name}`);
    console.log(
      `Connection Status: ${
        connection.connection.readyState === 1 ? "Connected" : "Not Connected"
      }`
    );
  } catch (error) {
    console.error(`Error connecting to the database.`);
    console.error(`Error Message: ${error.message}`);
    console.error(`Stack Trace: ${error.stack}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;
