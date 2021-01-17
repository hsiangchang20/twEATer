import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../mainpage.css'

import {POST_QUERY} from '../../../graphql'
import { useQuery } from "@apollo/client";

export default function Posts() {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    console.log('dao');
    const { loading, error, data} = useQuery(POST_QUERY)
    
    useEffect( ()=> {
        console.log(data);
    }, [data])

    const posts_list = postIDs.map((i, index) => (
        <div className="wrap-post100">
           <li key={index}>
                <NavLink to={"/post/" + i}>
                    dao {i}
                </NavLink>
            </li> 
        </div>
        
    ));
    return (
        <div className="posts-overview" id="style-3">
            <h3>
                Posts
            </h3>
            {posts_list}
        </div>
    )
}
