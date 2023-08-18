import { useEffect, useState } from "react";
import '../styles/PostsList.css';

const PostsList = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/posts', {mode: "cors"})
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])

    return (
        <div className="posts-list">
            {posts && posts.map(post => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    )
}

export default PostsList;