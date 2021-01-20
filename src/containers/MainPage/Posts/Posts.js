import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './posts.css';
//import avocado_pic from "../../../components/Images/avocado.png";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { FaCommentAlt } from "react-icons/fa"
import fruits from "../fruits/fruits";

import {POST_QUERY, LIKE_MUTATION, USER_QUERY, UNLIKE_MUTATION, POST_SUBSCRIPTION} from '../../../graphql'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

export default function Posts(props) {
    const { userid } = props.match.params;
    const { loading, error, data, refetch} = useQuery(POST_QUERY);
    const { data: userData, refetch: refetchUser } = useQuery(USER_QUERY, {variables: {query: userid}})
    const [posts, setPosts] = useState([]);
    const [like] = useMutation(LIKE_MUTATION);
    const [unlike] = useMutation(UNLIKE_MUTATION)
    const [init, setInit] = useState(true);
    
	const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
	const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]
    
    useEffect(()=>{
        if(userData&&data){
            let POST = [];
            for(let i=0;i<data.posts.length;i++){
                if(userData.users[0].Like.includes(data.posts[i]._id)){
                    const dao = {...data.posts[i]}
                    dao.liked = true;
                    POST.push(dao)
                }
                else{
                    const dao = {...data.posts[i]}
                    dao.liked = false;
                    POST.push(dao)
                }
            }
            console.log(POST)
            setPosts(POST);
        }
    }, [userData, data])

    useEffect(()=>{
        if(init){
            refetch();
            refetchUser();
            setInit(false);
        }
    })

    const Like = useCallback((id, userid, dao) => {
        like({
            variables: {
                PostID: id,
                userId: userid
            }
        })
        const index = dao.findIndex((element)=>element._id===id);
        dao[index].liked = true
        setPosts(dao);
    }, [like])

    const unLike = useCallback((id, userid, dao)=>{
        unlike({
            variables: {
                PostID: id,
                userId: userid
            }
        })
        const index = dao.findIndex((element)=>element._id===id);
        dao[index].liked = false
        setPosts(dao);
    }, [unlike])

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
                    {post.liked?(<button onClick={()=>unLike(post._id, userid, posts)}>
                        <p>unLike&nbsp;&nbsp;<FaThumbsUp color="lightblue"/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </button>):(<button onClick={()=>Like(post._id, userid, posts)}>
                        <p>Like&nbsp;&nbsp;<FaThumbsUp/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </button>)}
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
