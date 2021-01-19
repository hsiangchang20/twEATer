import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//import Post from "../../../components/Post/Post";
//import '../mainpage.css';
import './PostsRender.css'
import avocado_pic from "../../../components/Images/avocado.png";

import {ONE_POST_QUERY, POST_SUBSCRIPTION, USER_QUERY, CREATE_COMMENT_MUTATION, COMMENT_SUBSCRIPTION} from '../../../graphql'
import { useQuery, useLazyQuery, useSubscription, useMutation } from "@apollo/client";

export default function PostRender(props) {
    const { postid, userid } = props.match.params;

    const { loading, error, data, subscribeToMore} = useQuery(ONE_POST_QUERY, {variables: {query: postid}});
    const { data: userdata} = useQuery(USER_QUERY, {variables: {query: userid}});
    const [post, setPost] = useState([]);
    const [post_time, setPost_time] = useState("");
    const { data: commentdata, loading2} = useSubscription(COMMENT_SUBSCRIPTION, {variables: {postId: postid}});
    const [username, setUsername] = useState('');
    const [addComment] = useMutation(CREATE_COMMENT_MUTATION);
    const [body, setBody] = useState('');
    const [comment, setComment] = useState([]);

    const createComment = useCallback(()=>{
        if(body==='') return
        addComment({
            variables: {
                authorID: userid,
                body: body,
                Author: username,
                PostID: postid,
            }
        })
        setBody('');
    })

    useEffect(()=>{
        if (data !== undefined){
            setPost(data.posts[0])
            var time = new Date()
            time.setTime(data.posts[0].time)
            setPost_time(time)
            console.log(data.posts[0].comments)
            setComment(data.posts[0].comments)
        }
    }, [loading, data])

    useEffect(()=>{
        if(commentdata) console.log(commentdata.comment.data);
        if(commentdata) {
            // let Com = comment;
            // console.log(typeof( Com))
            // Com.push(commentdata.comment.data)
            // setComment([Com]);
            // let add = [...commentdata.comment.data]
            var time = new Date()
            let dao = commentdata.comment.data
            let add = {Author: dao.Author, body: dao.body, time: time.getTime()}
            setComment([...comment, add])
        }
    }, commentdata);

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

    useEffect(()=>{
        if(userdata) setUsername(userdata.users[0].name);
    }, userdata);

    const Time = (t) => {
        var time = new Date();
        time.setTime(t);
        return time
    }

    const comments = (comment === [])||!comment ? " " : comment.map(comment => (
        <div className="comment" key = {comment}>
            <div className="comment-userdata">
                <img src={avocado_pic} alt="IMG" className="userfruit"/>
                <div>
                    <h3>{comment.Author}</h3><span className="date">{Time(comment.time).toString().slice(4, 24)}</span>
                </div>
            </div>
            <div className="body">
                <p className="word">{comment.body}</p>
                <p className="like">Like</p>
            </div>
        </div>
    ));

    const mycomment = (
        <div className="comment">
            <div className="comment-userdata">
                <img src={avocado_pic} alt="IMG" className="userfruit"/>
                <div>
                    <h3>銀河眼光子龍</h3><span className="date">{"11:11:11"/*Time(comment.time).toString().slice(4, 24)*/}</span>
                </div>
            </div>
            <div className="body">
            <input type="text" placeholder="Allen" />
                <p className="word">dao</p>
            </div>
        </div>
    );

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
                    <p>comments : { (post.comments !== undefined) ? post.comments.length : " "}
                        <NavLink to={"/restaurant/" + post.restaurant + "/" + userid} className="post-restaurant-info">
                            查看餐廳資訊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </NavLink>
                    </p>
                </div>
            </div>
            <div className="post-comments">
                {comments}
                {mycomment}
            </div>
        </div>
    )
    return ( !postid || loading || error || loading2) ? nothing : postview;
}
