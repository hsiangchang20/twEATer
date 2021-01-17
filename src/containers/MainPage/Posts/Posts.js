import React from "react";
import { NavLink } from "react-router-dom";
import '../mainpage.css';
import avocado_pic from "../../../components/Images/avocado.png";

export default function Posts() {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const posts_list = postIDs.map((i, index) => (
        <div className="wrap-post100">
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={avocado_pic} alt="IMG" className="user-fruit"/> 
                    <div>
                        <h5>Thomas</h5>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <h4>合益佳雞肉飯</h4>
                </div>
                <div className="posts-body">
                    <h5>燙青菜超多啦</h5>
                </div>
                <li className="posts-readmore" key={index}>
                    <NavLink to={"/post/" + i} className="posts-readmore">
                        Read More {i}
                    </NavLink>
                </li> 
                <div className='posts-likeOrResponse'>
                    <div className="posts-like">
                        Like
                    </div>
                    <div className="posts-response">
                        Response
                    </div>
                </div>
            </div>
            <div className='posts-picture'>
                Food Picture
            </div>
        </div>        
    ));
    return (
        <div>
            <h3>
                Posts
            </h3>
            {posts_list}
        </div>
    )
}
