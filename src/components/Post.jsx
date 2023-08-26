import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/Post.scss';

const Post = () => {
    const [isAuth, setIsAuth, token, setToken, userId, setUserId, serverURL] = useOutletContext();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${serverURL.current}/posts/${id}`)
            .then(response => response.data)
            .then(data => setPost(data))
    }, [id, isEditing, serverURL])

    const deletePost = () => {
        axios.delete(`${serverURL.current}/posts/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(navigate('/posts'))
    }

    const handleEditing = (event) => {
        event.preventDefault();
        const form = event.target.form;

        axios.patch(`${serverURL.current}/posts/${id}`,
        {
            title: form.title.value,
            text: form.text.value,
        },
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(setIsEditing(false))
          .then(navigate(`/post/${id}`))
    }

    const handleEditingChange = () => {
        setIsEditing(!isEditing);
    }

    const createComment = (event) => {
        event.preventDefault();
        const form = event.target.form;
        axios.post(`${serverURL.current}/posts/${id}/comment`, {
            comment: {
                userId: userId,
                text: form.text.value,
            }
        },
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        form.text.value = "";
    }

    if (post !== null && isEditing === false){
        return (
            <>
                <div className="post-single">
                        <div className="post-header">
                            <h3 className="post-title">{post.title}</h3>
                            <div>
                                <div className="views">{post.viewsCount} views</div>
                            </div>
                        </div>
                        <p className="post-author">by {post.user.fullName}</p>
                        <img src={post.imageURL} alt="" width="100%"/>
                        <p className="post-text-single">{post.text}</p>
                        <div className="buttons">
                            <Link to='/posts'>- Go back</Link>
                            { userId == post.user._id && <div className="edit-buttons">
                                <a href="#" onClick={handleEditingChange}>Edit</a>
                                <a href="#" onClick={deletePost}>Delete post</a>
                            </div> }
                        </div>
                </div>
                <div className="comments">
                    {isAuth && <div className="createComment">
                        <form>
                            <label htmlFor="text">Comment</label>
                            <textarea type="text" name="text" />
                            <button onClick={createComment}>Submit</button>
                        </form>
                    </div> }
                    { post.comments && post.comments.map(comment => (
                        <div key={comment} className="comment">
                            <div className="commentUser">{comment.userId}</div>
                            <p className="commentText">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </>
    )} else if (post !== null && isEditing === true) {
        return (
            <div className="create-post-page">
                <div className="create-post-container">
                    <h3>Edit</h3>
                    <form action="">
                        <label htmlFor="title" className="post-title">
                            Title
                            <input type="text" name="title" id="create-title" defaultValue={post.title} />
                        </label>
                        <label htmlFor="text">
                            Text
                            <textarea type="text" name="text" id="create-text" defaultValue={post.text} rows={10}/>
                        </label>
                        <button onClick={handleEditing}>Submit</button>
                    </form>
                    <Link to='/posts'>- Go back</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                
            </div>)
    }
    
}

export default Post;