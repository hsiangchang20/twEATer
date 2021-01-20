const User = require("../models/User")

const Message = {
    users(parent, args, {db}, info) {
        async function searchUser(message){
            let mess = await User.find({_id: message.author})
            return mess;
        }
        return searchUser(parent);
    }
}

module.exports = Message  