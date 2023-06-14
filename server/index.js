const {Server} = require("socket.io")

const io = new Server(8000,{cors:true});

const emailToScoketIdMap = new Map;
const ScoketIdToEmailMap = new Map;

io.on("connection", (socket)=>{
    console.log(`socket conneted ${socket.id}`);
    socket.on("room:join", (data)=>{
        const {email, room} = data;
        emailToScoketIdMap.set(email, socket.id);
        ScoketIdToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    })
})