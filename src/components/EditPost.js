import React, {useEffect, useState } from 'react';
import Axios from 'axios';


const EditPost = (props) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");


    const savePost = async (e) => {
        e.preventDefault();
                try {
                    const editedPost = {
                        title,
                        tags,
                        body,
                        author,
                        date,
                    };
                    console.log(editedPost)
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
    }

    useEffect(() => {
        const getPost = async () => {
            Axios.get(`https://aalyablogapp.herokuapp.com/server/posts/${props.match.params.id}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setTags(response.data.tags);
                    setBody(response.data.body);
                    setAuthor(response.data.author);
                    setDate(response.data.date)
                })
        }
        getPost()
    }, [props.match.params.id])


    return (
        <div className="edit-recipe">
            <h1>Edit Recipe</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title.." />

                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="form-control" placeholder="tags" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Article</label>
                    <input name="body" value={body} onChange={(e) => setBody(e.target.value)} className="form-control" rows="3" />
                </div>
                <button type="submit" onClick={savePost} >Save Post </button>
            </form>

        </div>)
}


export default EditPost;