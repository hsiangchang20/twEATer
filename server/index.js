import {GraphQLServer, PubSub} from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'

require('dotenv-defaults').config()

//const http = require('http')
//const express = require('express')
const mongoose = require('mongoose')
//const WebSocket = require('ws')

// const Message = require('./models/message')

//const app = express()
//const server = http.createServer(app)
//const wss = new WebSocket.Server({ server })

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const mongodb = mongoose.connection

const pubsub = new PubSub

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
      User
    },
    context: {
      pubsub
    }
  })

  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}!`)
  })
  /*
  wss.on('connection', ws => {
    const sendData = (data) => {
      ws.send(JSON.stringify(data))
    }

    const sendStatus = (s) => {
      sendData(['status', s])
    }

    Message.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res) => {
        if (err) throw err

        // initialize app with existing messages
        sendData(['init', res])
      })

    ws.onmessage = (message) => {
      const { data } = message
      console.log(data)
      const [task, payload] = JSON.parse(data)
      
      switch (task) {
        case 'input': {
          // TODO
          Message.insertMany(payload, () => {
            sendData(['output', [payload]])

            sendStatus({
              type: 'success',
              msg: 'message sent'
            })
          })
          
          break
        }
        case 'clear': {
          Message.deleteMany({}, () => {
            sendData(['cleared'])

            sendStatus({
              type: 'info',
              msg: 'Message cache cleared.'
            })
          })

          break
        }
        default:
          break
      }
    }
  })
  */
})
