import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected succesfully');
    } catch (error) {
        console.log(error);
    }

};

export { connectDB };
