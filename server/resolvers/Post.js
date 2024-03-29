const User = require("../models/User")
const Comment = require("../models/comment")

const Post = {
    users(parent, args, {db}, info) {
        async function searchPost(userID){
            let author = await User.find({_id: userID});
            return author;
        }
        return searchPost(parent.authorID); 
    },

    comments(parent, args, {db}, info) {
        async function searchPost(PostID){
            let comment = await Comment.find({PostID: PostID});
            return comment;
        }
        return searchPost(parent._id); 
    }

}

module.exports = Post