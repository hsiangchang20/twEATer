import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fruits from "../fruits/fruits";
import "./tweat.css";

export default function Tweat(props){

    const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
	const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]


    const tweats = [0, 1].map(post => (
        <div className="wrap-post100" key={post}>
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={watermelon} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{"post.users[0].name"}</p>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <p>{"< " + "restaurant.name" + " >"}</p>
                </div>
                <div className="posts-body">
                    <p>{/*(post.body.length <= 18) ? post.body : post.body.slice(0, 17) + "  .  .  ."*/"1111111111"}</p>
                </div>
                <div className="posts-time">
                    <p>{/*Time(post.time).toString().slice(4, 24)*/1111111111}</p>
                </div>
                <div className='posts-likeOrResponse'>  
                    <div className="posts-like">
                        <button onClick={/*()=>Like(post._id)*/console.log("nothing")}>
                            <p>Like&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        </button>
                    </div>
                    <div className="posts-response">
                    </div>
                </div>
            </div>
            <div className='posts-picture'>
                <img src={'post.photo'} alt="IMG"/>
            </div>
        </div>        
    ));
    return tweats
}