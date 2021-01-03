const Post = require("../models/Post")

const User = {
    posts(parent, args, {db}, info) {
        async function searchPost(userID){
            let post = await Post.find({authorID: userID});
            console.log(post);
            return post;
        }

        return searchPost(parent._id);
    }
}

module.exports = User