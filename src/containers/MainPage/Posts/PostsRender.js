import React, { useEffect, useState } from "react";
import Post from "../../../components/Post/Post";
import '../mainpage.css';
import avocado_pic from "../../../components/Images/avocado.png";

import {ONE_POST_QUERY, POST_SUBSCRIPTION} from '../../../graphql'
import { useQuery, useLazyQuery, useSubscription } from "@apollo/client";

export default function PostRender(props) {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;

    const { loading, error, data, subscribeToMore} = useQuery(ONE_POST_QUERY, {variables: {query: id}});
    const [post, setPost] = useState([]);
    const {data: posts, loading2} = useSubscription(POST_SUBSCRIPTION);

    useEffect(()=>{
        if (data !== undefined){
            setPost(data.posts[0])
            console.log(data.posts[0])
            console.log(data.posts[0].comments)
        }
        console.log(data);
        console.log(loading);
    }, [loading, data])

    useEffect(()=>{
        if(posts!==undefined)
            console.log(posts.post.data.thumb)
    }, posts);

    useEffect(()=>{
        subscribeToMore({
            document: POST_SUBSCRIPTION,
            updateQuery: (prev,{ subscriptionData }) => {
                if (!subscriptionData.data) {
                    console.log('dao');
                    return prev
                }
                else {
                    console.log(subscriptionData)
                    return subscriptionData
                }
            }
        });
    }, [subscribeToMore]);

    const nothing = (
        <div></div>
    )

    const postview = (
        <div className="wrap-post1">
            <div className="post-basic-data">
                <div className="post-userdata">
                    <img src={avocado_pic} alt="IMG" className="userfruit"/>
                    <div>
                        <h3>{/*post.users[0].name*/"???"}</h3>
                    </div>
                </div>
                <div className="post-restaurant">
                    <h4>{post.restaurant}</h4>
                </div>
                <div className="post-time">
                    <h5>{Date(post.time).slice(0, 24)}</h5>
                </div>
            </div>
            <div className="post-picture">
                <img src={post.photo} alt="IMG"/>
            </div>
            <div className="post-body">
                {post.body}
            </div>
            <div className="post-response">
                <div className="post-like-number">
                    likes : {post.thumb}
                </div>
                <div className="post-comment-number">
                    comments : {/*post.comments.length*/"???"}
                </div>
            </div>
            <div className="post-comments">
                good
            </div>
        </div>
    )
    
    return ( !id || loading || error) ? nothing : postview;
    
    /*
    return id && postIDs.includes(id) ? (
        <Post id={id} />
    ) : (
            <div>
                <h3>Error: Post #{id} IS DELETED</h3>
            </div>
        )  
    */  
}
/*
export default class PostRender extends Component {
    render() {
        const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
        const { id } = this.props.match.params;
        return id && postIDs.includes(id) ? (
            <Post id={id} />
        ) : (
                <div>
                    <h3>Error: Post #{id} NOT FOUND</h3>
                </div>
            )
    }
}
*/