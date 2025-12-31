import mongoose from "mongoose"

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB Connection Successful !!!"))
    .catch((err)=>console.log(err, "Failer To Connect DB"))
}

export {
    connectDB
}
