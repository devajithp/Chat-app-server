const mongoose= require("mongoose")



const connectDB=()=>
{
    mongoose.connect(`mongodb+srv://devajith:${process.env.DB_PASSWORD}@cluster0.jzonz9t.mongodb.net/Chat?retryWrites=true&w=majority`,{
            useNewUrlParser:true,
            useUnifiedTopology: true
    }).then(()=>
    {
        console.log("database connected")
    }).catch((err)=>
    {
        console.log("error",err)
    })
}


module.exports=connectDB