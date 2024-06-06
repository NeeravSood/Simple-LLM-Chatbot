const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const { loadModel, handleMessage } = require('.src/aiModelHandler');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpDialog, {
    cors: {
        origin: "*",           // Allows all domains to access your server
        methods: ["GET", "POST"]  // Enables GET and POST requests
    }
});

app.use(bodyParser.json());  // Middleware for parsing JSON bodies

// Endpoint to receive messages and send responses
app.post('/message', async (req, res) => {
    try {
        const { message } = req.body;  // Extract message from request body
        const response = await handleMessage(message);  // Process the message
        res.send({ response });  // Send the processed response back to the client
    } catch (error) {
        console.error('Error handling message:', error);  // Log any errors
        res.status(500).send('Error processing your message');  // Send error response
    }
});

// WebSocket connection setup
io.on('connection', (socket) => {
    console.log('a user connected');  // Log new user connection
    socket.on('disconnect', () => {
        console.log('user disconnected');  // Log when user disconnects
    });

    // Handle incoming chat messages
    socket.on('chat message', async (msg) => {
        console.log('message: ' + msg);  // Log the received message
        const response = await handleMessage(msg);  // Process the message
        io.emit('chat message', response);  // Broadcast the processed message
    });
});

loadModel();  // Load model at server start

// Start the HTTP server on port 3000
httpServer.listen(3000, () => {
    console.log('listening on *:3000');  // Log server listening status
});
