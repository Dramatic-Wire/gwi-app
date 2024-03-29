const express = require('express');
const cors = require('cors');
const PgPromise = require('pg-promise');
const Auth = require('./auth');

require('dotenv').config();
const initOptions = {
  /* initialization options */
};
const pgp = PgPromise(initOptions);
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.use((socket, next) => {
  const app_id = socket.handshake.auth.id;
  if (!app_id) {
    return next(new Error('invalid id'));
  }
  socket.app_id = app_id;
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      socket_id: id,
      app_id: socket.app_id,
    });
  }
  socket.emit('users', users);

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });

  socket.on('add loyalty programme', ({LP_id}) => {
    const userIndex = users.findIndex((user) => socket.id == user.socket_id);
    users[userIndex]['LP_id'] = LP_id;
    socket.emit('LP added');
  });
  socket.on('new stamp', ({LP_id}) => {
    const lpIndex = users.findIndex((user) => LP_id == user.LP_id);
    socket.to(users[lpIndex]).emit('customer stamped');
  });
});

const DATABASE_URL = process.env.DATABASE_URL;

const config = {
  connectionString: DATABASE_URL,
};

if (process.env.NODE_ENV == 'production') {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = pgp(config);

const auth = Auth(db);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(auth.verifyToken);

const routes = require('./routes');

routes(app, db, io);

//configure the port number using and environment number
var portNumber = process.env.PORT || 4000;

//start everything up
httpServer.listen(portNumber, async function () {
  console.log('server listening on:', portNumber);
  async function testConnection() {
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    return c.client.serverVersion; // return server version
  }
  await testConnection();
});
