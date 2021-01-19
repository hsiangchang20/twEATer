// import Message from '../models/message'

const Subscription = {
    message:{
        subscribe(parent, args, { pubsub }, info){
            return pubsub.asyncIterator('message')
        }
    },
    post:{
        subscribe(parent, args, { pubsub }, info){
            return pubsub.asyncIterator(`post`)
        }
    }, 
    comment:{
        subscribe(parent, {postId}, { pubsub }, info){
            return pubsub.asyncIterator(`comment ${postId}`)
        }
    }
}

export {Subscription as default}