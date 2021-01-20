import React, { useEffect, useState } from "react";
import "./restaurant.css";
import {RESTAURANT_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import avocado_pic from "../../../components/Images/avocado.png"

export default function Restaurant(props) {
    //const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { name, userid } = props.match.params;
    const { loading, error, data} = useQuery(RESTAURANT_QUERY, {variables: {name: name}});
    const [rest, {loading2, data2}] = useLazyQuery(RESTAURANT_QUERY)
    const [restaurant, setRestaurant] = useState('dao')
    const [photo, setPhoto] = useState('')
    useEffect(()=>{    
        console.log(data)    
        if (data && (data.restaurant[0])){
            setRestaurant(data.restaurant[0]);
            if (data.restaurant[0].posts[0]){
                setPhoto(data.restaurant[0].posts[0].photo)
            }
            
        }
    })

    const restaurant_view = (restaurant === 'dao') ? (<div className="name"><p>Restaurant does not exist</p></div>) : (
        <div className="wrap-restaurant">
            <div className="name">
                <p>{'< ' + restaurant.name + ' >'}</p>
            </div>
            {photo!==""?<img src={photo}></img>:""}
            <div className="info">
                <p>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.type}</p>
                <p>Telephone&ensp;&nbsp;:&nbsp;&nbsp; {restaurant.tele}</p>
                <p>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.address}</p>
                <p>Openhours&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.Openhours}</p>
            </div>
        </div>
    )

    const posts_list = (!restaurant.posts) ? (<></>) : restaurant.posts.map(post => (
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
                    <p>{"Time(post.time).toString().slice(4, 24)"}</p>
                </div>
                <div className='posts-likeOrResponse'>  
                    <div className="posts-like">
                        <button onClick={/*()=>Like(post._id)*/console.log("nothing")}>
                            <p>Like&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>
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
            <p className="view-posts">&nbsp;&nbsp;&nbsp;Relating Posts:</p>
            {posts_list}
        </>
    );
}