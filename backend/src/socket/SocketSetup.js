import dotenv from 'dotenv'
dotenv.config();
import { Server } from 'socket.io';

const URL_CLIENT = process.env.URL_WEB

export const SocketSetup = (server) => {

    var clients = [];

    const io = new Server(server, {
        cors: {
            origin: URL_CLIENT,
            credentials: true
        }
    });

    io.on('connection', (socket) => {

        socket.on("storeClientInfo", (data) => {
            if (data && data.customId) {
                const existingClientIndex = clients.findIndex(client => client.customId === data.customId);

                if (existingClientIndex !== -1) {
                    clients[existingClientIndex] = {
                        customId: data.customId,
                        clientId: socket.id
                    };
                } else {
                    var clientInfo = {
                        customId: data.customId,
                        clientId: socket.id
                    };
                    clients.push(clientInfo);
                }

                console.log(clients)
            }
        })

        socket.on("sendtest", (data) => {
            console.log(data)
            let sender = data.sender;
            let receiver = data.receiver;


            if (clients && clients.length > 0) {
                let index = clients.findIndex((item) => item.customId.localeCompare(receiver) === 0)
                console.log(index)
                if (index !== -1) {
                    socket.to(clients[index].clientId).emit("refresh", () => {
                        console.log("test success");
                    })
                } else {
                    console.log("test error");
                }
            }
        })


        socket.on("sendmessange", (data) => {
            let sender = data.sender;
            let receiver = data.receiver;

            if (clients && clients.length > 0) {
                let index = clients.findIndex((item) => item.customId.localeCompare(receiver) === 0)
                if (index !== -1) {
                    socket.to(clients[index].clientId).emit("refreshmessange", { phone: sender });
                    socket.emit("refreshmessangesender", () => {
                    })
                } else {
                    socket.emit("refreshmessangesender", () => {
                    })
                }
            }

        })

        socket.on('joinRoom', (data) => {
            socket.join(data.groupId);
            if (data && data.user && data.namegroup && data.groupId) {
                console.log(`User ${data.user} joined room: ${data.namegroup}`);
            } else {
                console.log(`User ${data.user} is ready`);
            }

        });

        socket.on('leaveRoom', (data) => {
            socket.leave(data.groupId);
            if (data && data.user && data.namegroup && data.groupId) {
                console.log(`User ${data.user} left room: ${data.namegroup}`);
            } else {
                console.log(`User ${data.user} is ready`);
            }
        });

        socket.on("sendmessangeingroup", (data) => {
            console.log(data)
            io.to(data.groupId).emit("refreshmessangeingroup", { groupId: data.groupId })
        })

        socket.on("typing", () => {
            socket.broadcast.emit("typing")
        })

        socket.on("sendaddgroup", () => {
            io.emit("sendaddgroup")
        })

        socket.on('logout', (data) => {
            console.log("check data", data)
            if (clients && clients.length > 0) {
                const index = clients.findIndex(client => client.customId === data.customId);
                console.log(index)
                if (index !== -1) {
                    clients.splice(index, 1);
                    console.log(`Người dùng ${data.customId} đã đăng xuất.`);
                }
                // let index = clients.filter((item) => item.clientId.localeCompare(socket.id) !== 0)
                // clients = [...index];
                console.log(clients)
            }
        });

        socket.on('disconnect', () => {
            if (clients && clients.length > 0) {
                let index = clients.filter((item) => item.clientId.localeCompare(socket.id) !== 0)
                clients = [...index];
                console.log(clients)
            }
        });

    })

}

