import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/PostsList.scss';

const PostsList = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        axios.get('https://blog-nu-bice.vercel.app/posts')
            .then(response => response.data)
            .then(data => setPosts(data.reverse()))
    }, [])

    return (
        <>
            {posts && <div className="posts-list">
                { posts.map(post => (
                    <div key={post._id} className="post">
                        <div className="post-header">
                            <h3 className="post-title">{post.title}</h3>
                            <div className="views">{post.viewsCount} views</div>
                        </div>
                        <p className="post-author">by {post.user.fullName}</p>
                        <div className="content">
                            { post.imageURL && <img src={post.imageURL} alt="" height="120px"/> }
                            <p className="post-text">{post.text}</p>
                        </div>
                        <Link to={`/post/${post._id}`}>View full post</Link>
                    </div>
                ))}
            </div>}
        </>
    )
}

export default PostsList;