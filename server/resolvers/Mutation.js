const Post = require("../models/Post")
const User = require("../models/User")
const Message = require("../models/message")
const restaurant = require('../models/restaurant')
const Comment = require('../models/comment')
const uuidv4  = require('uuid/v4');

const Mutation = {
    createUser(parent, args, {pubsub}, info){
        async function create(data){
            let Created = await User.find({email: data.email});
            
            const user = {
                _id: uuidv4(),
                ...args.data
            }
            if(Created.length!==0){
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
    updateUser(parent, args, {db}, info){
        async function Update(data){
            const toUpdate = await User.find({_id: data.id})
            if(data.data.name) await User.updateMany({_id:data.id}, {name: data.data.name});
            if(data.data.fruit) await User.updateMany({_id:data.id}, {fruit: data.data.fruit});
            if(data.data.password) await User.updateMany({_id:data.id}, {password: data.data.password});
            return toUpdate;
        }

        return Update(args);
    },
    createPost(parent, args, {db, pubsub}, info){
        const post = {
            _id: uuidv4(),
            ...args.data
        };
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
            _id: uuidv4(),
            ...args.data
        };
        Message.insertMany(message); 
        return message;
    },
    deleteMessage(parent, args, {db}, info){
        async function Delete(id){
            let toDelete = await Message.find({_id: id});
            await Message.deleteMany({_id: id});
            return toDelete[0];
        }  
 
        return Delete(args.id);
    },
    createRestaurant(parent, args, {pubsub}, info){
        async function create(data){
            let Created = await restaurant.find({name: data.name});
            
            const rest = {
                ...args.data
            }
            if(Created.length!==0){
                await restaurant.deleteMany({name: data.name});
            }
            restaurant.insertMany(rest);
            return rest;
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
        async function like(id, userId){
            let data = await Post.find({_id: id});
            let userdata = await User.find({_id: userId});
            userdata[0].Like.push(id)
            data[0].thumb += 1;
            await Post.updateMany({_id: id},  {thumb: data[0].thumb});
            await User.updateMany({_id: userId}, {Like: userdata[0].Like})
            await pubsub.publish(`post`, {
                post: { mutation: 'CREATED', data: data[0] }
            })
            return data;
        }

        return like(args.PostID, args.userId);
    },
    unLike(parent, args, {pubsub}, info){
        async function like(id, userId){
            let data = await Post.find({_id: id});
            let userdata = await User.find({_id: userId});
            userdata[0].Like.pop(id);
            data[0].thumb -= 1;
            await Post.updateMany({_id: id},  {thumb: data[0].thumb});
            await User.updateMany({_id: userId}, {Like: userdata[0].Like})
            await pubsub.publish(`post`, {
                post: { mutation: 'CREATED', data: data[0] }
            })
            return data;
        }

        return like(args.PostID, args.userId);
    },
    createComment(parent, args, {pubsub}, info){
        const comment = {
            _id: uuidv4(),
            ...args.data
        }
        Comment.insertMany(comment); 
        pubsub.publish(`comment ${args.data.PostID}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })
        return comment;
    },
    follow(parent, args, {pubsub}, info){
        async function follow(id, follower, name){
            let data = await Message.find({_id: id});
            data[0].follower.push(follower);
            data[0].followerName.push(name)
            await Message.updateMany({_id: id}, {follower: data[0].follower, followerName: data[0].followerName});
            await pubsub.publish(`message`, {
                message: { mutation: 'CREATED', data: data[0] }
            })
            return data;
        }
        return follow(args.id, args.follower, args.followerName); 
    }
}

module.exports = Mutation;