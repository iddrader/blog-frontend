import axios from 'axios';
import { redirect, useOutletContext, useNavigate } from 'react-router-dom';
import '../styles/CreatePost.scss';

const CreatePost = () => {
    const [isAuth, setIsAuth, token, setToken, userId, setUserId, serverURL] = useOutletContext();
    const navigate = useNavigate();

    const handleCreatePost = (event) => {
        event.preventDefault();
        const form = event.target.form;
        axios.post(`${serverURL.current}/posts`, {
                title: form.createTitle.value,
                text: form.createText.value,
                imageURL: form.createImageURL.value,
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(navigate('/posts'))
            .catch(err => console.log(err))


    }

    if(!isAuth) return <div>Login first</div>
    
    return (
        <div className="create-post-page">
            <div className="create-post-container">
                <h3>Create Post</h3>
                <form>
                    <label htmlFor="createTitle">
                        <div className="create-title">Title</div>
                        <input type="text" name="createTitle" id="create-title"/>
                    </label>
                    <label htmlFor="createText">
                        <div className="create-text">Text</div>
                        <textarea name="createText" id="create-text" rows="10"/>
                    </label>
                    <label htmlFor="createImageURL">
                        Image URL (optional)
                        <input type="text" name='createImageURL' id='createImageURL' />
                    </label>
                    <button type="submit" onClick={handleCreatePost}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;