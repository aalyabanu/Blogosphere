import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import blogpen from './blogpen.png';



const PostList = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const getPosts = async () => {
            const postCol = await axios.get(`https://aalyablogapp.herokuapp.com/server/posts/`)
            setPosts(postCol.data.reverse())

        }
        getPosts();
    }, [])

    const renderPosts = () => {
        return posts.map((post, i) => {

            return (
                <li className="mb-6" key={i}>

                    <Link to={`/posts/${post._id}`} className="hidden sm:flex sm:bg-white sm:shadow-md sm:mx-6">

                        <div className="sm:block sm:flex">
                            <img className="h-32" src={blogpen} alt="a pen" />
                        </div>
                        <div className="sm:flex-col justify-between ml-4 center">
                            <h3 className="font-bold text-xl text-pink-500">{post.author}  </h3>
                            <h2 className="font-bold text-xl">{post.title}</h2>
                            <p className="text-gray-700">{post.date}</p>
                        </div>
                        <div className="sm:flex sm:items-center sm:ml-auto ">
                            {
                                post.tags ?
                                    post.tags.map((tag, index) =>
                                        <span key={index} className="text-orange-500 bg-orange-100 font-bold m-4 p-2 rounded">{tag}</span>
                                    ) : ""
                            }
                        </div>
                    </Link>

{/* when the screen is smaller than sm */}
                    <Link to={`/posts/${post._id}`} className="bg-white shadow-md mx-6 sm:hidden">

                        <div className="flex ">
        
                            <div>
                            <img className="h-32" src={blogpen} alt="a pen" />
                        </div>
                        <div className="flex-col justify-between ml-6 center">
                            
                            <h2 className="font-bold text-xl">{post.title}</h2>
                            <div className="flex space-between ">
                            {
                                post.tags ?
                                    post.tags.map((tag, index) =>
                                        <span key={index} className="text-orange-500 bg-orange-100 font-bold p-2 rounded">{tag}</span>
                                    ) : ""
                            }
                        </div>
                        <p className="font-bold text-l text-pink-500">{post.author}  </p>
                            <p className="text-gray-700">{post.date}</p>
                        </div>
                        </div>

                    </Link>

                </li>
            )
        })
    }
    return (
        <div className="post-list">
            <h1 className="ml-6 text-3xl text-pink-800">Latest Posts</h1>
            {posts.length === 0 ? (
                <p className="ml-6">Loading blog posts...</p>
            ) : (
                    <ul className="ml-6">{renderPosts()}</ul>
                )}


        </div>
    )
}


export default PostList;