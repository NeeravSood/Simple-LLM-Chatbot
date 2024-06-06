const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const { loadModel, handleMessage } = require('./aiModelHandler');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json());

app.post('/message', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await handleMessage(message);
        res.send({ response });
    } catch (error) {
        console.error('Error handling message:', error);
        res.status(500).send('Error processing your message');
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', async (msg) => {
        console.log('message: ' + msg);
        const response = await handleMessage(msg);
        io.emit('chat message', response);
    });
});

loadModel();

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});

