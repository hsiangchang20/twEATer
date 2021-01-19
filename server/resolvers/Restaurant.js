const Post = require("../models/Post")

const Restaurant = {
    posts(parent, args, {db}, info) {
        async function searchPost(restaurant){
            let post = await Post.find({restaurant: restaurant.name, })
                                        // time: { "$regex": restaurant.time, "$options": "i" },
                                        // type: { "$regex": restaurant.type, "$options": "i" },
                                        // cost: { "$regex": restaurant.cost, "$options": "i" },
                                        // staple: { "$regex": restaurant.staple, "$options": "i" },
                                        // location: { "$regex": restaurant.location, "$options": "i" },
                                        // Star: { "$regex": restaurant.Star, "$options": "i" }});
            console.log(post);
            return post;
        }

        return searchPost(parent);
    }
}

module.exports = Restaurant 