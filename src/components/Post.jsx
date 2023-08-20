import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/Post.scss';

const Post = () => {
    const [isAuth, setIsAuth, token, setToken] = useOutletContext();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://blog-nu-bice.vercel.app/posts/${id}`)
            .then(response => response.data)
            .then(data => setPost(data))
    }, [id, isEditing])

    const deletePost = () => {
        axios.delete(`https://blog-nu-bice.vercel.app/posts/${id}`,
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

        axios.patch(`https://blog-nu-bice.vercel.app/posts/${id}`,
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

    if (post !== null && isEditing === false){
        return (
            <div className="post-single">
                    <div className="post-header">
                        <h3 className="post-title">{post.title}</h3>
                        <div>
                            <div className="views">{post.viewsCount} views</div>
                        </div>
                    </div>
                    <p className="post-author">by {post.user.fullName}</p>
                    <p className="post-text-single">{post.text}</p>
                    <div className="buttons">
                        <Link to='/posts'>- Go back</Link>
                        <div className="edit-buttons">
                            <a href="#" onClick={handleEditingChange}>Edit</a>
                            <a href="#" onClick={deletePost}>Delete post</a>
                        </div>
                    </div>
            </div>
    )} else if (post !== null && isEditing === true) {
        return (
            <div className="create-post-page">
                <div className="create-post-container">
                <form action="">
                    <label htmlFor="title" className="post-title">Title</label>
                    <input type="text" name="title" id="create-title" defaultValue={post.title} />
                    <label htmlFor="text">Text</label>
                    <textarea type="text" name="text" id="create-text" defaultValue={post.text} rows={10}/>
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