import Axios from 'axios';
import React from 'react';
import { useState } from 'react';

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  

    const savePost = async (e) => {
        e.preventDefault();
        const tagsArray = tags.split(",")

        const newPost = {
            title,
            tags: tagsArray,
            body,
            author: sessionStorage.getItem("user"),
            date: new Date(),
        };
        await Axios.post(
            "https://aalyablogapp.herokuapp.com/server/posts/create/",
            newPost
        );
        setTitle("");
        setTags("");
        setBody("");

    }

    if (isLoggedIn) {
        return (
            <div className="w-full max-w-2xl m-auto mt-10">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
      </label>
                    <input className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        Tags
      </label>


                    <input className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Tags seperated by comma" value={tags} onChange={(e) => setTags(e.target.value)} />

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                        Content
      </label>
                    <textarea rows="10" className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={savePost}>Save Post</button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="w-full max-w-2xl m-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p class="text-sm text-gray-600 flex items-center">
                    <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg>
        Members only
      </p>
                <h2>Please login to create a post.</h2>
            </div>
        )
    }
}

export default NewPost;




