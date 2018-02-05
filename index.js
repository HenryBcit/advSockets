const express = require("express");
const port = process.env.PORT || 10000;

var app = express();
const server = require("http").createServer(app);

var io = require("socket.io")(server);

var allUsers = [];
io.on("connection", (socket)=>{
    //console.log("con");
    
    socket.on("new user", (obj)=>{
        allUsers.push(obj);
        socket.uid = allUsers.length-1;
        io.emit("create users", allUsers);
    });
    
    socket.on("msg", (obj)=>{
        io.emit("new msg", obj); 
    });
    
    socket.on("disconnect", ()=>{
        //console.log("disc");
        if(socket.uid){
            allUsers.splice(socket.uid, 1);
            io.emit("create users", allUsers);
        }
    });
});

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("port "+port+" is running");
})