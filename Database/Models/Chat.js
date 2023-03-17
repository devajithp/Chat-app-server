const mongoose= require("mongoose")


const ChatSchema= new mongoose.Schema({
    currentMessage:{
        type:String,
        required:true
    },
      username:{
        type:String,
        required:true
      },
      room:{
        type:String,
        required:true
      },
      date:{
        type:String,
        required:true
      }
})

const Chat= mongoose.model("chats",ChatSchema)

module.exports=Chat