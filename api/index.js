const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressWs = require('express-ws');
const nanoid = require('nanoid');

const users = require('./app/users');
const messages = require('./app/messages');
const config = require("./config");

const app = express();
const port = 8000;

expressWs(app);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const User = require('./models/User');
const Message = require('./models/Message');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/users', users);
  app.use('/messages', messages);

  const connections = {};

  app.ws('/chat', async function (ws, req) {
    if (!req.query.token) {
      return ws.close();
    }
    const user = await User.findOne({token: req.query.token});

    if (!user) {
      return ws.close();
    }

    const id = nanoid();

    console.log(`Client connected id: ${id}`);

    connections[id] = {ws, user};

    console.log('total clients connected: ' + Object.keys(connections).length);

    const onlineUsers = Object.keys(connections).map(connId => {
      return connections[connId].user.displayName;
    });

    const databaseMessages = await Message.find().populate('user');

    ws.send(JSON.stringify({
      type: 'LAST_MESSAGES',
      messages: databaseMessages.slice(-30),
    }));

    Object.keys(connections).forEach(connId => {
      const connection = connections[connId].ws;

      connection.send(JSON.stringify({
        type: 'ONLINE_USERS',
        onlineUsers
      }))
    });

    ws.on('message', async (message) => {
      let decodedMessage;

      try {
        decodedMessage = JSON.parse(message);
      } catch (e) {
        console.log('Not valid message', e);
      }
        switch (decodedMessage.type) {
          case 'CREATE_MESSAGE':
            const message = new Message({
              message: decodedMessage.message,
              author: user.displayName
            });

            await message.save();

            Object.keys(connections).forEach(connId => {
              const connection = connections[connId].ws;

              connection.send(JSON.stringify({
                type: 'NEW_MESSAGE',
                ...message
              }))
            });

            break;
          default:
            console.log('NO TYPE: ' + decodedMessage.type);
        }
    });

    ws.on('close', () => {
      console.log(`client disconnected! ${id}`);

      delete connections[id];

      // const index = onlineUsers.findIndex(i => i === user.displayName);
      // onlineUsers.splice(index, 1);
      //
      // console.log(onlineUsers)
      console.log(connections);
    });
  });

  app.listen(port, () => {
    console.log(`HTTP Server started on ${port} port!`);
  });
};

run().catch(e => {
  console.error(e);
});