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

    const comments = [0,1].map(comment => (
        <div className="post" key = {comment}>
            <div className="post-userdata">
                <img src={avocado_pic} alt="IMG" className="userfruit"/>
                <div>
                    <h3>Thomas</h3>
                </div>
            </div>
            <p className="meta"><span className="date">October 10, 2011</span><span class="posted">Posted by <a href="#">Someone</a></span></p>
            <div style={{clear: "both"}}>&nbsp;</div>
            <div className="entry">
                <p>This is <strong>Highway  </strong>, a free, fully standards-compliant CSS template designed by <a href="http://templated.co" rel="nofollow">TEMPLATED</a>.  This free template is released under the <a href="http://templated.co/license">Creative Commons Attribution</a> license, so you’re pretty much free to do whatever you want with it (even use it commercially) provided you give us credit for it. Have fun :)</p>
                <p>Sed lacus. Donec lectus. Nullam pretium nibh ut turpis. Nam bibendum. In nulla tortor, elementum ipsum. Proin imperdiet est. Phasellus dapibus semper urna. Pellentesque ornare, orci in felis. Donec ut ante. In id eros. Suspendisse lacus turpis, cursus egestas at sem.</p>
                <p className="links"><a href="#">Read More</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" title="b0x w">Comments</a></p>
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
                {comments}
            </div>
        </div>
    )
    
    return ( !id || loading || error) ? nothing : postview;
}
