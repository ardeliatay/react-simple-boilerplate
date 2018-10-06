const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

// Set up a callback that will run when a client connects to the server
wss.on('connection', (ws) => {
  console.log('Client connected');

  //sends number of clients connected to websocket to client side
  wss.broadcast({userCount: wss.clients.size});

  ws.on('message', (rawMessage) => {
    let messageObj = JSON.parse(rawMessage);
    //checks to see if message received from client side is a postMessage or a postNotification
    switch(messageObj.type) {
      case "postMessage":
        messageObj.type = "incomingMessage" //updates message type to be an incomingMessage and broadcasts to client
        messageObj.id = uuidv4();
        wss.broadcast(messageObj);
        break;
      case "postNotification":
        messageObj.type = "incomingNotification" //updates message type to be an incomingNotification and broadcasts to client
        messageObj.id = uuidv4();
        wss.broadcast(messageObj);
        break;
      default:
        //show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + messageObj.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    //broadcast current number of clients to client side when a user disconnects
    wss.broadcast({userCount: wss.clients.size});
  });
});


