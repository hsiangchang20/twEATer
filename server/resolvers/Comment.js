const User = require("../models/User")

const Comment = {
    user(parent, args, {db}, info) {
        async function searchComment(userID){
            let author = await User.find({_id: userID});
            return author;
        }

        return searchComment(parent.authorID); 
    },
}

module.exports = Comment