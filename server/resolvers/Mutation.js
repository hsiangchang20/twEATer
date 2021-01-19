const Post = require("../models/Post")
const User = require("../models/User")
const Message = require("../models/message")
const restaurant = require('../models/restaurant')
const Comment = require('../models/comment')
const uuidv4  = require('uuid/v4');

const Mutation = {
    createUser(parent, args, {pubsub}, info){
        console.log(args.data);

        async function create(data){
            let Created = await User.find({email: data.email});
            
            const user = {
                _id: uuidv4(),
                ...args.data
            }
            if(Created.length!==0){
                console.log(Created);
                throw new Error('email taken');
            }
            else{
                User.insertMany(user); 
                return user;
            }
        }

        return create(args.data);
    },
    deleteUser(parent, args, {db}, info){
        async function checkEmail(emailAddress){
            let target = await User.find({email: emailAddress})
            console.log(target);
            return target;
        }
        async function Delete(Email){
            let toDelete = await checkEmail(Email);
            
            if(toDelete.length===0){
                throw new Error('email not taken');
            }
            else{
                await User.deleteMany({email: Email});
                return toDelete[0];
            }
        }

        return Delete(args.email);
    },
    createPost(parent, args, {db, pubsub}, info){
        const post = {
            _id: uuidv4(),
            ...args.data
        };
        console.log(post)
        Post.insertMany(post)

        pubsub.publish(`post`, {
            post: { mutation: 'CREATED', data: post }
        })

        return post;
    },
    deletePost(parent, args, {db}, info){
        async function Delete(id){
            let toDelete = await Post.find({_id: id});
            
            if(toDelete.length===0){
                throw new Error('post not found');
            }
            else{
                await Post.deleteMany({_id: id});
                return toDelete[0];
            }
        }

        return Delete(args.id);
    },
    sendMessage(parent, args, {pubsub}, info){
        const message = {
            ...args.data
        };
        Message.insertMany(message);
        return message;
    },
    createRestaurant(parent, args, {pubsub}, info){
        console.log(args.data);

        async function create(data){
            let Created = await restaurant.find({name: data.name});
            
            const rest = {
                ...args.data
            }
            if(Created.length!==0){
                console.log(Created);
                throw new Error('restaurant taken');
            }
            else{
                restaurant.insertMany(rest); 
                return rest;
            }
        }

        return create(args.data);
    },
    deleteRestaurant(parent, args, {pubsub}, info){
        async function Delete(name){
            let toDelete = await restaurant.find({name: name});
            
            if(toDelete.length===0){
                throw new Error('restaurant not found');
            }
            else{
                await restaurant.deleteMany({name: name});
                return toDelete[0];
            }
        }

        return Delete(args.name);
    },
    Like(parent, args, {pubsub}, info){
        async function like(id){
            let data = await Post.find({_id: id});
            data[0].thumb += 1;
            await Post.updateMany({_id: id},  {thumb: data[0].thumb});
            console.log(data);
            await pubsub.publish(`post`, {
                post: { mutation: 'CREATED', data: data[0] }
            })
            return data;
        }

        return like(args.PostID);
    },
    createComment(parent, args, {pubsub}, info){
        async function create(data){            
            const comment = {
                _id: uuidv4(),
                ...args.data
            }
            Comment.insertMany(comment); 
            return comment;
        }

        return create(args.data);
    }
}

module.exports = Mutation;