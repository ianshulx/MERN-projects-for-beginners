const { Server } = require('socket.io');
const Message = require('../models/message.model');

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            // origin: process.env.NODE_ENV === 'production' 
            //     ? 'https://musicshoot.vercel.app'
            //     : 'http://localhost:3000',
            origin: 'http://localhost:3000',
            credentials: true,
        }
    });

    const userSockets = new Map();  // {userId: socketId}
    const userActivities = new Map(); // {userId : activity}

    io.on('connection', (socket) => {
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // broadcast to all connected sockets that this user just logged in
            io.emit('user_connected', userId);
            // send current online users list to the connecting socket
            socket.emit('user_online', Array.from(userSockets.keys()));
            // broadcast activities map
            io.emit("activities", Array.from(userActivities.entries()));
        });

        socket.on('update_activity', ({ userId, activity }) => {
            console.log("activity updated", userId, activity);

            userActivities.set(userId, activity);
            console.log('Broadcasting activities update to all clients');
            io.emit("activity_updated", { userId, activity });
        });

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                });

                // send to receiver in realtime, if they're online
                const receiverSocketId = userSockets.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receive_message", message);
                }

                socket.emit("message_sent", message);
            } catch (error) {
                console.log("Message_error", error);
                socket.emit("message_error", error.message);
            }
        });

        socket.on("disconnect", () => {
            let disconnectUserId;
            for (const [userId, socketId] of userSockets.entries()) {
                // find disconnected user
                if (socketId === socket.id) {
                    disconnectUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if (disconnectUserId) {
                io.emit("user_disconnected", disconnectUserId);
            }
        });
    });
}


module.exports = {
    initializeSocket
}

