const User = require("../models/User")

const Post = {
    users(parent, args, {db}, info) {
        async function searchPost(userID){
            let author = await User.find({_id: userID});
            console.log(author);
            return author;
        }

        return searchPost(parent.authorID); 
    }
}

module.exports = Post