import React from "react";

const post = ({ id }) => {
    return (
        <article>
            <h1>Post #{id}</h1>
            <p>This is the {id}-th post</p>
        </article>
    );
};

export default post
