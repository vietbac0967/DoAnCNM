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
            let sender = data.sender;
            let receiver = data.receiver;


            if (clients && clients.length > 0) {
                let index = clients.findIndex((item) => item.customId.localeCompare(receiver) === 0)
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
            console.log("check data", sender)

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

    })

}

