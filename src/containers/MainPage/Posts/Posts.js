import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../mainpage.css';
import avocado_pic from "../../../components/Images/avocado.png";

import {POST_QUERY} from '../../../graphql'
import { useQuery } from "@apollo/client";

export default function Posts() {
    //console.log('dao');
    const { loading, error, data} = useQuery(POST_QUERY);
    const [posts, setPosts] = useState([]);
    
    useEffect( ()=> {
        //console.log(data);
        if (data !== undefined){
            setPosts(data.posts);
        }
        //console.log(data);
    }, [data])
    const nothing = (
        <div></div>
    )

    const posts_list = posts.map(post => (
        <div className="wrap-post100" key={post.time}>
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={avocado_pic} alt="IMG" className="user-fruit"/> 
                    <div>
                        <h4>{post.users[0].name}</h4>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <h4>{post.restaurant}</h4>
                </div>
                <div className="posts-body">
                    <h5>{post.body}</h5>
                </div>
                <li className="posts-readmore">
                    <NavLink to={"/post/" + post.time} className="posts-readmore">
                        Read More
                    </NavLink>
                </li> 
                <div className='posts-likeOrResponse'>
                    <div className="posts-like">
                        Like
                    </div>
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
            <h3>
                Posts
            </h3>
            {loading ? nothing : posts_list}
        </div>
    )
}
