import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/Post.css';

const Post = () => {
    const [isAuth, setIsAuth, token, setToken] = useOutletContext();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(response => response.data)
            .then(data => setPost(data))
    }, [id])

    const deletePost = () => {
        axios.delete(`http://localhost:3000/posts/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(navigate('/posts'))
    }

    if (post !== null){
        return (
            <div className="post-single">
                    <div className="post-header">
                        <h3 className="post-title">{post.title}</h3>
                        <div>
                            <div className="views">{post.viewsCount} views</div>
                            <a href="#" onClick={deletePost}>Delete post</a>
                        </div>
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