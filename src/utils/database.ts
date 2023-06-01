import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set("strictQuery",true);

    if(isConnected){
        console.log("Database already connected");
        return;
    }

    try {
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "next_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Database connected");
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}