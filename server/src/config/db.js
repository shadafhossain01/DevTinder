const  mongoose  = require("mongoose")

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected Sucessfully")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=dbConnect