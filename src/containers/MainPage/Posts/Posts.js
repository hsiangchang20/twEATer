import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './posts.css';
import avocado_pic from "../../../components/Images/avocado.png";

import {POST_QUERY, LIKE_MUTATION} from '../../../graphql'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

export default function Posts() {
    //console.log('dao');
    const { loading, error, data} = useQuery(POST_QUERY);
    const [posts, setPosts] = useState([]);
    const [like] = useMutation(LIKE_MUTATION);
    
    useEffect( ()=> {
        //console.log(data);
        if (data !== undefined){
            setPosts(data.posts);
        }
        //console.log(data);
    }, [data])

    const Like = useCallback((id) => {
        return like({
            variables: {
                PostID: id
            }
        })
    }, [like])

    const nothing = (
        <div></div>
    )

    const posts_list = posts.map(post => (
        <div className="wrap-post100" key={post.time}>
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={avocado_pic} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{post.users[0].name}</p>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <p>{"< " + post.restaurant + " >"}</p>
                </div>
                <div className="posts-body">
                    <p>{post.body}</p>
                </div>
                <li className="posts-readmore">
                    <NavLink to={"/post/" + post._id} className="posts-readmore">
                        Read More
                    </NavLink>
                </li> 
                <div className='posts-likeOrResponse'>
                    <button onClick={()=>Like(post._id)}>
                        <div className="posts-like">
                            Like
                        </div>
                    </button>
                    <div className="posts-response">
                        Response
                    </div>
                </div>
            </div>
            <div className='posts-picture'>
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
