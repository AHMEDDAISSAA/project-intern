require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(cors());
app.use(express.json());

const itemsRoutes = require('./routes/items');
app.use('/items', itemsRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentification requise"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Token invalide"));
  }
});

io.on('connection', (socket) => {
  console.log('Utilisateur connecté:', socket.user.email);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', { text: data, from: socket.user.email });
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté:', socket.user.email);
  });
});

async function startApolloServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  app.use('/graphql', express.json(), expressMiddleware(apolloServer));
}

startApolloServer();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});