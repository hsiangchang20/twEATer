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

        async function GetUserbyName(n){
            let data = await User.find({name: { "$regex": n, "$options": "i" }})
            return data;
        }

        if (!args.query) return GetUser();
        else return GetUserbyName(args.query);
    },

    posts(parent, args, {db}, info){
        async function GetPost(){
            let data = await Post.find()
            console.log(data);
            return data;
        }

        async function GetPostbyID(n){
            console.log(n);
            let data = await Post.find({_id: n})
            return data;
        }

        if (!args.query) return GetPost();
        else return GetPostbyID(args.query);
    },
    
    login(parent, args, {db}, info){
        console.log(args.data);
        async function GetUserData(data){
            let user = await User.find({email: data.email, password: data.password})
            
            if(user.length===0){
                throw new Error('wrong email or password')
            }
            else{
                return user[0];
            }   
        } 
        return GetUserData(args.data);
    },

    message(parent, args, {db}, info){
        async function GetMessage(n){
            let data = await Message.find({$or:[{'sender': n}, {'receiver': n}]});
            return data;
        } 
        return GetMessage(args.name);
    },  
 
    restaurant(parent, args, {db}, info){
        async function GetRestaurantData(name){
            let data = await restaurant.find({name: name});
            console.log(data);
            return data;
        }
        return GetRestaurantData(args.name)
    }
}
 
module.exports = Query