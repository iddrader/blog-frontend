import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import '../styles/PostsList.scss';

const PostsList = () => {
    const [isAuth, setIsAuth, token, setToken, userId, setUserId, serverURL] = useOutletContext();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        axios.get(`${serverURL.current}/posts`)
            .then(response => response.data)
            .then(data => setPosts(data.reverse()))
    }, [])

    return (
        <>
            {posts ? 
                <div className="posts-list">
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
                </div>
            : 
                <div className="loading"></div>
            }
        </>
    )
}

export default PostsList;