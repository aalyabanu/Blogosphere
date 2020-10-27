import React, {useEffect, useState } from 'react';
import Axios from 'axios';


const EditPost = (props) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
     const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  

    const savePost = async (e) => {
        e.preventDefault();
        const tagsArray = tags.split(",")
                try {
                    const editedPost = {
                        title,
                        tags:tagsArray,
                        body,
                        author,
                        date,
                    };
     
                    await Axios.post(
                        `https://aalyablogapp.herokuapp.com/server/posts/edit/${props.match.params.id}`,
                        editedPost
                    )
                    .then(
                        (res)=> (window.location=`/posts/${this.props.match.params.id}`)
                    )
                } catch (err) {
                console.log(err)
                }
                setTitle("");
                setTags("");
                setBody("");
    }

    useEffect(() => {
        const getPost = async () => {
            Axios.get(`https://aalyablogapp.herokuapp.com/server/posts/${props.match.params.id}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setTags(response.data.tags.join(","));
                    setBody(response.data.body);
                    setAuthor(response.data.author);
                    setDate(response.data.date)
                })
        }
        getPost()
    }, [props.match.params.id])


    if (isLoggedIn){
    return (
        <div className="w-full max-w-2xl m-auto mt-10">
        
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">Tags</label>
                    <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

              
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exampleFormControlTextarea1">Article</label>
                    <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} className="shadow appearance-none border rounded mb-6 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" />
            
                    <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={savePost}>Save Changes</button>
            </form>

        </div>)
    }
}


export default EditPost;