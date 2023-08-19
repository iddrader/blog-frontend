import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/PostsList.css';

const PostsList = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => response.data)
            .then(data => setPosts(data.reverse()))
    }, [])

    return (
        <div className="posts-list">
            {posts && posts.map(post => (
                <div key={post._id} className="post">
                    <div className="post-header">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="views">{post.viewsCount} views</div>
                    </div>
                    <p className="post-author">by {post.user.fullName}</p>
                    <p className="post-text">{post.text}</p>
                    <Link to={`/post/${post._id}`}>View full post</Link>
                </div>
            ))}
        </div>
    )
}

export default PostsList;