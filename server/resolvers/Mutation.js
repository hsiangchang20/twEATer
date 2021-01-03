import uuidv4 from 'uuid/v4'
import Message from '../models/message'

const Mutation = {
    async createMessage(parent, args, { db, pubsub }, info){
        const message = {
            id: uuidv4,
            ...args.data
        }
        await Message.insertMany([message])

        pubsub.publish('message', {
            message: {
                mutation: 'CREATED',
                data:message
            }
        })

        return message
    },
    async deleteMessage(parent, args, { db, pubsub }, info){
        if (!args.data){
            await Message.deleteMany({})

            pubsub.publish('message', {
                message: {
                    mutation: 'DELETED',
                    data:{sender: "", receiver: "", body: ""}
                }
            })

            return {sender: "", receiver: "", body: ""}
        }

        const deleted = (await Message.deleteMany({name: args.data.name, body: args.data.body})).deletedCount
        if (deleted === 0){
            throw new Error('Message not found')
        }
        
        pubsub.publish('message', {
            message: {
                mutation: 'DELETED',
                data:args
            }
        })

        return args
    }
}

export { Mutation as default }