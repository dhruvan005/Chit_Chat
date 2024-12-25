import mongoose from "mongoose"
const connectDB = async () => {
 await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB connected");
 }).catch(()=>{
    console.log("Error while connecting");
 })}

 export default connectDB