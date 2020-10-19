import React, { lazy, Suspense } from 'react';
import axios from "axios";
const Post = lazy(() => import("./Post"));

const baseURL = "https://aalyablogapp.herokuapp.com/server/posts/";

const loader = () => (
    <div className="container-spin">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            //set the number of recent posts to be rendered to 5
            noOfPosts: 5,
        }
    }
    componentDidMount() {
        axios.get(`${baseURL}`)
            .then((response) => {
                this.setState({ posts: response.data.reverse() })

                //hide spinner
                document.querySelector(".spinner-border").style.display = "none";
            })
            .catch((err) => console.error(err))
    }
    render() {
        return (
            <div className="post-list">
                <h1>Latest Posts</h1>

                {/* display spinner */}
                <div className="container-spin">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

                {this.state.posts
                    .slice(0, this.state.noOfPosts)
                    .map((currentPost) => (
                        <Suspense
                            key={currentPost._id} fallback={loader()}>
                            <Post post={currentPost} />
                        </Suspense>
                    ))}

                {/* to load more post */}
                {this.state.posts[this.state.noOfPosts] ? (
                    <button className="btn btn-link" onClick={() =>
                        this.setState({
                            noOfPosts: this.state.noOfPosts + 3,
                        })}>Show more posts...</button>) : (
                        ""
                    )}

            </div>
        );
    }
}

export default PostList;