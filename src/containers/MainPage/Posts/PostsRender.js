import React, { useEffect } from "react";
import Post from "../../../components/Post/Post";

import {ONE_POST_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";

export default function PostRender(props) {
    const postIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { id } = props.match.params;
    const { loading, error, data} = useQuery(ONE_POST_QUERY, {variables: {query: id}});

    useEffect(()=>{
        console.log(data);
    })

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