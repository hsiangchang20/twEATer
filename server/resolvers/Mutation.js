const Post = require("../models/Post")
const User = require("../models/User")
const Message = require("../models/message")
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
    createPost(parent, args, {db}, info){
        const post = {
            _id: uuidv4(),
            ...args.data
        };
        console.log(post)
        Post.insertMany(post)

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
    }
}

module.exports = Mutation;