import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//import Post from "../../../components/Post/Post";
//import '../mainpage.css';
import './PostsRender.css'
import avocado_pic from "../../../components/Images/avocado.png";
import { FaThumbsUp } from "react-icons/fa"
import { FaCommentAlt } from "react-icons/fa"
import fruits from "../fruits/fruits";

import {ONE_POST_QUERY, POST_SUBSCRIPTION, USER_QUERY, CREATE_COMMENT_MUTATION, COMMENT_SUBSCRIPTION} from '../../../graphql'
import { useQuery, useSubscription, useMutation } from "@apollo/client";

export default function PostRender(props) {
    const { postid, userid } = props.match.params;

    const { loading, error, data, subscribeToMore, refetch} = useQuery(ONE_POST_QUERY, {variables: {query: postid}});
    const { data: userdata, refetch: refetchUser} = useQuery(USER_QUERY, {variables: {query: userid}});
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState("");
    const [post_time, setPost_time] = useState("");
    const { data: commentdata} = useSubscription(COMMENT_SUBSCRIPTION, {variables: {postId: postid}});
    const [username, setUsername] = useState('');
    const [addComment] = useMutation(CREATE_COMMENT_MUTATION);
    const [body, setBody] = useState('');
    const [init, setInit] = useState(true);
    const [userfruit, setUserfruit] = useState('');
    const [liked, setLiked] = useState(false);

    
	const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
	const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]

    const submitComment = useCallback(()=>{
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
            // console.log(data.posts[0].comments)
            setComment(data.posts[0].comments)
        }
    }, [loading, data])

    useEffect(()=>{
        if(init){
            // console.log('init')
            refetch();
            refetchUser();
            setInit(false);
        }
    }, [init, refetch, refetchUser])

    useEffect(()=>{
        // if(commentdata) console.log(commentdata.comment.data);
        if(commentdata) {
            var time = new Date()
            let dao = commentdata.comment.data
            let add = {Author: dao.Author, body: dao.body, time: time.getTime(), user: dao.user}
            setComment([...comment, add])
            // console.log(commentdata)
        }
    }, [commentdata]);

    useEffect(()=>{
        subscribeToMore({
            document: POST_SUBSCRIPTION,
            updateQuery: (prev,{ subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev
                }
                else {
                    return subscriptionData
                }
            }
        });
    }, [subscribeToMore]);

    useEffect(()=>{
        if(userdata&&!init){
            // console.log(userdata);
            setLiked(userdata.users[0].Like.includes(postid))
            setUsername(userdata.users[0].name);
            setUserfruit(userdata.users[0].fruit);
        }
    }, [userdata, postid, init]);

    const Time = (t) => {
        var time = new Date();
        time.setTime(t);
        return time
    }

    const comments = (comment === [])||!comment ? " " : comment.map(comment => (
        <div className="comment" key = {comment.time}>
            <div className="comment-userdata">
                <img src={fruitlist[comment.user[0].fruit]} alt="IMG" className="userfruit"/>
                <div>
                    <h3>{comment.user[0].name}</h3><span className="date">{Time(comment.time).toString().slice(4, 24)}</span>
                </div>
            </div>
            <div className="body">
                <p className="word">{comment.body}</p>
            </div>
        </div>
    ));

    const mycomment = (
        <div className="mycomment">
            <div className="mycomment-userdata">
                <img src={(post.users !== undefined) ? fruitlist[userfruit] : avocado_pic} alt="IMG" className="userfruit"/>
                <div>
                    <h3>{username}</h3>
                </div>
            </div>
            <div className="body">
                <input type="text" placeholder="Click here to respond ..." className="word" onChange={(e) => setBody(e.target.value)} value={body}/>
                <button className="submit" onClick={submitComment}>
                    <p>&nbsp;&nbsp;Submit&nbsp;&nbsp;</p>
                </button>
            </div>
        </div>
    );


    const postview = (
        <div className="wrap-post1">
            <div className="post-basic-data">
                <div className="post-userdata">
                    <img src={(post.users !== undefined) ? fruitlist[post.users[0].fruit] : avocado_pic} alt="IMG" className="userfruit"/>
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
                    {liked?(<p><FaThumbsUp color="lightgreen"/>&nbsp;&nbsp;&nbsp;{post.thumb}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>):
                    (<p><FaThumbsUp/>&nbsp;&nbsp;&nbsp;{post.thumb}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>)}
                </div>
                <div className="post-comment-number">
                    <p><FaCommentAlt/>&nbsp;&nbsp;{ (post.comments !== undefined) ? post.comments.length : " "}
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
    return ( !postid || loading || error) ? <></> : postview;
}
