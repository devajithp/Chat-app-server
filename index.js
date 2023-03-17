const express= require("express")
const app =express()
const dotenv= require("dotenv").config()
const cors= require("cors")
const {Server} = require("socket.io")
const mongoose= require("mongoose")
const connectDB= require("./Database/Connection/connection")
const Chat= require("./Database/Models/Chat")

connectDB()
const server= require("http").createServer(app)

const io= new Server(server,{cors:{origin:"http://localhost:3000",methods:["GET","POST"]}})

io.on("connection",(socket)=>
{
    console.log(`user with ${socket.id} connected`)
    socket.on("disconnect",()=>
{
    console.log(`user with ${socket.id} disconnected`)
})
socket.on("join_room",(data)=>
{  
    console.log(data)
    socket.join(data.room)   
})
socket.on("send_message",(data)=>
{
    Chat.create(data).then((res)=>
    {
        console.log(data)
        socket.to(data.room).emit("recieve",data) 
    }) 
    
    
})
})
app.use(cors())
app.get("/:id",(req,res)=>
{
    let room=req.params.id
    try {
        Chat.find({room:room}).then((data)=>
        {
            res.json(data).status(200)
        })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
})
server.listen(5000,()=>
{
    console.log("server connected")
})