import {Server}  from 'socket.io';


const initServer = (server) =>{
   const  io = new Server(server);

    io.on('connection', (socket)=>{
        console.log('user connected successfully ', socket.id);
        socket.on("newMessage", (message) => {
          // Process the message
          // Emit the message to all connected clients
          io.emit("newMessage", message);
        });



    socket.on("disconnected", ()=>{
        console.log('user disconnected ', socket.id);
    })

    })
}

export default initServer;