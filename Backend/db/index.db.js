import mongoose from "mongoose";

const connectDB = async () => {
    const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECT}`);
    console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)
        .then(() => {
            console.log("MongoDB connected successfully");
        }).catch((error) => {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        });
}
export default connectDB;