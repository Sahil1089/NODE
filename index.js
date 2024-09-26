

const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const socketio = require("socket.io");



const server=http.createServer(app);
const io = socketio(server);
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{
            id:socket.id,
            ...data
        })
    })
    console.log("connection established");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",{
            id:socket.id
        })

    })
});




app.use(express.static(path.resolve('./pages')));
app.get('/',(req,res)=>{
    return res.sendFile(path.resolve('./pages/home.html'))
})















server.listen(2000, () => {
    console.log(`Server is running on port `);
});