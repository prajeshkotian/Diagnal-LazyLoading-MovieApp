// JavaScript source code
import React from 'react';
import './Post.css';

function Post(props) {
    
    return (
        <div className="Post">
            <img src={"/Assets/Posters/" + props.img} alt='not found' />
            <h5>{props.title}</h5>
        </div>
        );
}

export default Post;