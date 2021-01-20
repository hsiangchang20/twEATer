const Post = require("../models/Post")

const Restaurant = {
    posts(parent, args, {db}, info) {
        async function searchPost(restaurant){
            let post = await Post.find({restaurant: restaurant.name, })
            return post;
        }
        return searchPost(parent);
    }
}

module.exports = Restaurant 