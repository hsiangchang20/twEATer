const Post = require("../models/Post")

const Restaurant = {
    posts(parent, args, {db}, info) {
        async function searchPost(restaurant){
            let post = await Post.find({restaurant: restaurant});
            console.log(post);
            return post;
        }

        return searchPost(parent.name);
    }
}

module.exports = Restaurant