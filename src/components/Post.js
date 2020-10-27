import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import blogpen from './blogpen.png';

const Post = (props) => {
    const [post, setPost] = useState(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory();
    const deletePost = async () => {
        await axios.delete(`https://aalyablogapp.herokuapp.com/server/posts/${props.match.params.id}`)
            .then(
                window.location = "/posts"
            )
            .catch((err) => console.error(err))
        history.push("/posts")
    }
    var status=sessionStorage.getItem("isLoggedIn");
    useEffect(() => {
        const getPost = async () => {
            const postDoc = await axios.get(`https://aalyablogapp.herokuapp.com/server/posts/${props.match.params.id}`);
            setPost(postDoc);
        }
        getPost()
        if (status === "true") {
            setIsLoggedIn(true)
            }
    }, [props.match.params.id, status])

    const renderTags = () => {
        const postData = post;
        return postData.data.tags.map((tag, i) => {
            return <li key={i} className="text-teal-500 bg-teal-100 font-bold m-4 p-2 rounded">{tag}</li>
        })

    }

    const renderPost = () => {

        return (
            <div className=" bg-white shadow-md m-4 p-4" >
                <h2 className="font-bold text-2xl text-pink-800 m-4">{post.data.title}</h2>
                <ul className="flex items-center ml-auto">{renderTags()}</ul>
                <p className="m-4">{post.data.body}</p>
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={blogpen} alt="a pen" />
                    <div className="text-sm">
                        <p className="text-pink-700 leading-none">{post.data.author}</p>
                        <p className="text-gray-600">{post.data.date}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div >
            {post && renderPost()}
            {(isLoggedIn)?(
            <div>
                <button className=" float-right mr-6 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => history.push(`/edit/${props.match.params.id}`)}>Edit</button>
                <button className=" float-right bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded" onClick={deletePost}>Delete</button>
            </div>):("")
}
        </div>
    )
}

export default Post;