import Axios from 'axios';
import React from 'react';

class NewPost extends React.Component {
    state = {
        title: "",
        tags:"",
        body: "",
        author: "",
        date: new Date(),
        isLoggedIn: false,
    }

    componentDidMount() {
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            this.setState({
                author: sessionStorage.getItem("user"),
                isLoggedIn: true,
            })
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = {
                title: this.state.title,
                tags: this.state.tags,
                body: this.state.body,
                author: this.state.author,
                date: this.state.date,
            };
            await Axios.post(
                "https://aalyablogapp.herokuapp.com/server/posts/create/",
                newPost
            );
        } catch (err) {
            console.log(err.response.data.msg)
        }
    }

    render() {
        if(this.state.isLoggedIn){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Title.." />

                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" name="tags" value={this.state.tags} onChange={this.handleChange} className="form-control" placeholder="tags" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Article</label>
                        <input name="body" value={this.state.body} onChange={this.handleChange} className="form-control" rows="3" />
                    </div>
                    <input type="submit" value="create post" className="btn btn-primary" />
                </form>
            </div>
        );
        } else {
            return(
            <div> Sorry you need to login to create post</div>
            )
        }
    }
}

export default NewPost;