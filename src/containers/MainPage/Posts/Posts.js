import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './posts.css';
//import avocado_pic from "../../../components/Images/avocado.png";
import { FaThumbsUp } from "react-icons/fa"
import { FaCommentAlt } from "react-icons/fa"
import fruits from "../fruits/fruits";

import {POST_QUERY, LIKE_MUTATION} from '../../../graphql'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

export default function Posts(props) {
    const { userid } = props.match.params;
    console.log(userid)
    const { loading, error, data, refetch} = useQuery(POST_QUERY);
    const [posts, setPosts] = useState([]);
    const [like] = useMutation(LIKE_MUTATION);
    const [init, setInit] = useState(true)
    
	const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
	const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]
    
    useEffect( ()=> {
        //console.log(data);
        if (data !== undefined){
            setPosts(data.posts);
            console.log(data);
        }
    }, [data])

    useEffect(()=>{
        if(init){
            refetch();
            setInit(false);
        }
    })

    const Like = useCallback((id) => {
        return like({
            variables: {
                PostID: id
            }
        })
    }, [like])

    const Time = (t) => {
        var time = new Date();
        time.setTime(t);
        //console.log(time);
        return time
    }

    const nothing = (
        <div></div>
    )

    const posts_list = posts.map(post => (
        <div className="wrap-post100" key={post.time}>
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={fruitlist[post.users[0].fruit]} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{post.users[0].name}</p>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <p>{"< " + post.restaurant + " >"}</p>
                </div>
                <div className="posts-body">
                    <p>{(post.body.length <= 18) ? post.body : post.body.slice(0, 17) + "  .  .  ."}</p>
                </div>
                <NavLink to={"/postrender/" + post._id + "/" + userid} className="posts-readmore">
                    Read More
                </NavLink>
                <br></br><br></br>
                <div className="posts-time">
                    <p>{Time(post.time).toString().slice(4, 24)}</p>
                </div>
                <div className="posts-like">
                    <button onClick={()=>Like(post._id)}>
                        <p>Like&nbsp;&nbsp;<FaThumbsUp/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </button>
                    <button>
                        <p>Comment&nbsp;&nbsp;<FaCommentAlt/></p>
                    </button>
                </div>
            </div>
            
            <div className="posts-picture">
                <img src={post.photo} alt="IMG"/>
            </div>
        </div>        
    ));
    return (
        <div>
            {loading ? nothing : posts_list}
        </div>
    )
}
