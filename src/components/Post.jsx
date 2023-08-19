import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/Post.css';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(response => response.data)
            .then(data => setPost(data))
    }, [id])

    if (post !== null){
        return (
            <div className="post-single">
                    <div className="post-header">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="views">{post.viewsCount} views</div>
                    </div>
                    <p className="post-author">by {post.user.fullName}</p>
                    <p className="post-text">{post.text}</p>
                    <Link to='/posts'>- Go back</Link>
            </div>
    )} else {
        return (
            <div>
                
            </div>)
    }
    
}

export default Post;