import React from "react";
import Post from "../../../components/Post/Post";


export default function PostRender(props) {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;
    return id && postIDs.includes(id) ? (
        <Post id={id} />
    ) : (
            <div>
                <h3>Error: Post #{id} NOT FOUND</h3>
            </div>
        )    
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