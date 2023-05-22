const { Server } = require('socket.io')

function configureSocket(server) {
    const io = new Server(server, { cors: { origin: "*" } })

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('subscribe-item', ({ item }) => {
            socket.join(item.slug)
        })
        socket.on('unsubscribe-item', ({ item }) => {
            socket.leave(item.slug)
        })

        socket.on('bid', ({ item }) => {
            socket.to(item.slug).emit('bid')
        })
    });
}

module.exports.configureSocket = configureSocket
