import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import '../styles/Profile.scss';
import { v4 as uuidv4 } from 'uuid';

function Profile () {
    const [isAuth, setIsAuth, token, setToken, userId, setUserId, serverURL] = useOutletContext();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();

    useEffect(() => {
        axios.get(`${serverURL.current}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.data)
            .then(data => setUser(data))

        axios.get(`${serverURL.current}/myposts`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.data)
            .then(data => setPosts(data))
    }, [serverURL, token])



    return (
        <>
            { user ? 
                <div className="userInfo">
                    <h2 className="userFullname">{user.fullName}</h2>
                    <p>{user._id}</p>
                    <p>Created on {user.createdAt}</p>
                    <div className="userPosts">
                        <div className="border"></div>
                        <h2>Posts</h2>
                        <div className="profilePosts">
                            {posts && 
                                posts.map(post => (
                                    <div key={uuidv4()}>
                                        <h4><Link to={`/post/${post._id}`}>{post.title}</Link></h4>
                                        <p>{post.text}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            :
                <div className="loading"></div>
            }
        </>
    )
}

export default Profile;