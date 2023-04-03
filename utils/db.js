import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
    if (!isConnected) {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
    }
};
