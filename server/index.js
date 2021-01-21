import {GraphQLServer, PubSub} from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Restaurant from './resolvers/Restaurant'
import Message from './resolvers/Message'
import Comment from './resolvers/Comment'

const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser')
const apiRoute = require('../src/route/api');
app.use('/api', apiRoute);
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log("Server Ready!")

require('dotenv-defaults').config()
const mongoose = require('mongoose')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const mongodb = mongoose.connection

const pubsub = new PubSub()

mongodb.on('error', (error) => {
  console.error(error)
})

mongodb.once('open', () => {
  console.log('MongoDB connected!')

  const server = new GraphQLServer({
    typeDefs: "./server/schema.graphql",
    resolvers: {
      Query,
      Mutation,
      Subscription,
      User,
      Post,
      Restaurant,
      Message,
      Comment
    },
    context: {
      pubsub
    }
  })

  server.start({ port: process.env.PORT | 443 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 443 }!`)
  })
})
