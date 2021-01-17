import React, { useEffect } from "react";
import Post from "../../../components/Post/Post";
import '../mainpage.css';
import avocado_pic from "../../../components/Images/avocado.png";


export default function PostRender(props) {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;
    const post = (
        <div className="wrap-post100">
            Hello
        </div>
    )

    return (
        <div className="wrap-post1">
            <div className="post-basic-data">
                <div className="post-userdata">
                    <img src={avocado_pic} alt="IMG" className="userfruit"/>
                    <div>
                        <h3>Thomas</h3>
                    </div>
                </div>
                <div className="post-restaurant">
                    <h4>合益佳雞肉飯</h4>
                </div>
                <div className="post-time">
                    <h5>12月25日5點49分</h5>
                </div>
            </div>
            <div className="post-picture">
                <img src="https://i.imgur.com/qmVhrwq.png" alt="IMG"/>
            </div>
            <div className="post-body">
                安德魯要光明磊落吃斜管麵
            </div>
            <div className="post-response">
                <div className="post-like-number">
                    likes:13
                </div>
                <div className="post-comment-number">
                    comments:43
                </div>
            </div>
            <div className="post-comments">
                good
            </div>
        </div>
    )
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