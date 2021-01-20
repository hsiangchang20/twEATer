const Message = require("../models/message");
const Post = require("../models/Post")
const User = require("../models/User")
const restaurant = require('../models/restaurant')

const Query = {
    users(parent, args, {db}, info){
        async function GetUser(){
            let data = await User.find()
            return data;
        }

        async function GetUserbyID(n){
            let data = await User.find({_id: { "$regex": n, "$options": "i" }})
            return data;
        }

        if (!args.query) return GetUser();
        else return GetUserbyID(args.query);
    },
 
    posts(parent, args, {db}, info){
        async function GetPost(){
            let data = await Post.find().sort({$natural:-1})
            return data;
        }

        async function GetPostbyID(n){
            let data = await Post.find({_id: n})
            return data;
        }

        if (!args.query) return GetPost();
        else return GetPostbyID(args.query);
    },
    
    login(parent, args, {db}, info){
        async function GetUserData(data){
            let uselessUser = await User.find({name: "allenwu0902"})
            let user = await User.find({email: data.email, password: data.password})
            
            if(user.length===0){
                console.log(uselessUser);
                return uselessUser[0];
            }
            else{
                console.log(user);
                return user[0];
            }   
        } 
        return GetUserData(args.data);
    },

    message(parent, args, {db}, info){
        async function GetMessage(n){
            let data = await Message.find();
            return data;
        } 
        return GetMessage(args.author); 
    },  
 
    restaurant(parent, args, {db}, info){
        async function GetRestaurantData(rest){
            let data = undefined
            if(rest.name!=='') {data = await restaurant.find( { name: rest.name, })}
            else if(rest.time===''&&rest.type===''&&rest.cost===''&&rest.staple===''&&rest.location===''&&rest.Star===''){
                data = await restaurant.find();
            }
            else {
                data = await restaurant.find({  time: { "$regex": rest.time, "$options": "i" },
                                                type: { "$regex": rest.type, "$options": "i" },
                                                cost: { "$regex": rest.cost, "$options": "i" },
                                                staple: { "$regex": rest.staple, "$options": "i" },
                                                location: { "$regex": rest.location, "$options": "i" },
                                                Star: { "$regex": rest.Star, "$options": "i" }});
            }
            return data;
        }
        return GetRestaurantData(args)
    }
}
 
module.exports = Query