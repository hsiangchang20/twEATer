import React, { useEffect, useState } from "react";
import "./restaurant.css";
import {RESTAURANT_QUERY, USER_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import avocado_pic from "../../../components/Images/avocado.png"
import { FaThumbsUp } from "react-icons/fa";

export default function Restaurant(props) {
    //const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { name, userid } = props.match.params;
    const { loading, error, data} = useQuery(RESTAURANT_QUERY, {variables: {name: name}});
    const { data: userData } = useQuery(USER_QUERY, {variables: {query: userid}})
    const [rest, {loading2, data2}] = useLazyQuery(RESTAURANT_QUERY)
    const [restaurant, setRestaurant] = useState('dao')
    const [photo, setPhoto] = useState('')
    const [posts, setPosts] = useState([]);
    useEffect(()=>{    
        console.log(data)    
        if (data && (data.restaurant[0])){
            setRestaurant(data.restaurant[0]);
            if (data.restaurant[0].posts[0]){
                setPhoto(data.restaurant[0].posts[0].photo)
            }
            
        }
    })

    useEffect(()=>{
        if(userData&&data){
            let POST = [];
            for(let i=0;i<data.restaurant[0].posts.length;i++){
                if(userData.users[0].Like.includes(data.restaurant[0].posts[i]._id)){
                    const dao = {...data.restaurant[0].posts[i]}
                    dao.liked = true;
                    POST.push(dao)
                }
                else{
                    const dao = {...data.restaurant[0].posts[i]}
                    dao.liked = false;
                    POST.push(dao)
                }
            }
            console.log(POST)
            setPosts(POST);
        }
    }, [userData, data])

    const Time = (t) => {
        var time = new Date();
        time.setTime(t);
        //console.log(time);
        return time
    }

    const restaurant_view = (restaurant === 'dao') ? (<div className="name"><p>Restaurant does not exist</p></div>) : (
        <div className="wrap-restaurant">
            <div className="name">
                <p>{'< ' + restaurant.name + ' >'}</p>
            </div>
            {photo!==""?<img className="photo" src={photo}></img>:""}
            <div className="info">
                <p>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.type}</p>
                <p>Telephone&ensp;&nbsp;:&nbsp;&nbsp; {restaurant.tele}</p>
                <p>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.address}</p>
                <p>Openhours&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.Openhours}</p>
            </div>
        </div>
    )

    const posts_list = (!restaurant.posts) ? (<></>) : posts.map(post => (
        <div className="wrap-post100" key={post.time}>
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={avocado_pic} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{post.users[0].name}</p>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <p>{"< " + restaurant.name + " >"}</p>
                </div>
                <div className="posts-body">
                    <p>{(post.body.length <= 18) ? post.body : post.body.slice(0, 17) + "  .  .  ."}</p>
                </div>
                <div className="posts-time">
                    <p>{Time(post.time).toString().slice(4, 24)}</p>
                </div>
                <div className='posts-likeOrResponse'>  
                    <div className="posts-like">
                        <button onClick={/*()=>Like(post._id)*/console.log("nothing")}>
                            {post.liked?(<p><FaThumbsUp color="lightblue"/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>):
                            (<p><FaThumbsUp/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>)}
                        </button>
                    </div>
                    <div className="posts-response">
                        <p>Comment
                            <NavLink to={"/postrender/" + post._id + "/" + userid} className="posts-readmore">
                                Read More&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <div className='posts-picture'>
                <img src={post.photo} alt="IMG"/>
            </div>
        </div>        
    ));

    return (loading || error) ? (<></>) : (
        <>
            {restaurant_view}
            {(restaurant.posts && restaurant.posts.length !== 0) ? (<p className="view-posts">&nbsp;&nbsp;&nbsp;Relating Posts:</p>) : <></>}
            {posts_list}
        </>
    );
}