import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_DB_URI);
        await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;
