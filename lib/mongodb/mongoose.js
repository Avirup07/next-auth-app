import mongoose from "mongoose";

let initialize = false;

export const connect = async () => {
    mongoose.set('strict', true)

    if (initialize) {
        console.log("MongoDB already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "next-auth-app",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected");
        initialize = true;
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}