import React, { useEffect, useState } from "react";
//import Post from "../../../components/Post/Post";
//import '../mainpage.css';
import './PostsRender.css'
import avocado_pic from "../../../components/Images/avocado.png";

import {ONE_POST_QUERY, POST_SUBSCRIPTION} from '../../../graphql'
import { useQuery, useLazyQuery, useSubscription } from "@apollo/client";

export default function PostRender(props) {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;

    const { loading, error, data, subscribeToMore} = useQuery(ONE_POST_QUERY, {variables: {query: id}});
    const [post, setPost] = useState([]);
    const [post_time, setPost_time] = useState("");
    const {data: posts, loading2} = useSubscription(POST_SUBSCRIPTION);

    useEffect(()=>{
        if (data !== undefined){
            setPost(data.posts[0])
            var time = new Date()
            time.setTime(data.posts[0].time)
            setPost_time(time)
        }
        console.log(data);
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

    const Time = (t) => {
        var time = new Date();
        time.setTime(t);
        console.log(time);
        return time
    }

    const comments = (post.comments === undefined) ? " " : post.comments.map(comment => (
        <div className="comment" key = {comment}>
            <div className="comment-userdata">
                <img src={avocado_pic} alt="IMG" className="userfruit"/>
                <div>
                    <h3>{comment.Author}</h3><span className="date">{comment.time}</span>
                </div>
            </div>
            <div className="body">
                <p className="word">{comment.body}</p>
                <p className="like">Like</p>
            </div>
        </div>
    ));

    const nothing = (
        <div></div>
    )

    const postview = (
        <div className="wrap-post1">
            <div className="post-basic-data">
                <div className="post-userdata">
                    <img src={avocado_pic} alt="IMG" className="userfruit"/>
                    <div>
                        <h3>{ (post.users !== undefined) ? " " + post.users[0].name : " "}</h3>
                    </div>
                </div>
                <div className="post-restaurant">
                    <p>{'< ' + post.restaurant + ' >'}</p>
                </div>
                <div className="post-time">
                    <h5>{post_time.toString().slice(0, 24)}</h5>
                </div>
            </div>
            <div className="post-picture">
                <img src={post.photo} alt="IMG"/>
            </div>
            <div className="post-body">
                <p>{post.body}</p>
            </div>
            <div className="post-response">
                <div className="post-like-number">
                    <p>likes : {post.thumb} &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>
                <div className="post-comment-number">
                    <p>comments : { (post.comments !== undefined) ? post.comments.length : " "}</p>
                </div>
            </div>
            <div className="post-comments">
                {comments}
            </div>
        </div>
    )
    return ( !id || loading || error) ? nothing : postview;
}
