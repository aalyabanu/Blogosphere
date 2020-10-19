import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import PropTypes from "prop-types";

const Post=(props) =>{
    const [post, setPost] =useState(undefined);
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const history=useHistory();
    const  deletePost =async() =>{
        await axios.delete(`https://aalyablogapp.herokuapp.com/server/posts/${props.match.params.id}`)
        .then(
            window.location = "/posts"  
        )
        .catch((err) => console.error(err))
        history.push("/posts")
    }

    useEffect(()=> {
        const getPost =async() =>{
            const postDoc=await axios.get(`https://aalyablogapp.herokuapp.com/server/posts/${this.props.match.params.id}`);
            setPost(postDoc);
        }
        getPost()
    }, [ props.match.params.id])

    const renderTags=() => {
        const postData=post.data();
        return postData.tags.map((tag,i)=>{
            return <li key={i}>{tag}</li>
        })
    }
    const renderPost=()=>{
        const postData=post.data();
        return(
            <>
<h2>{postData.title}</h2>
<ul>{renderTags()}</ul>
<p>{postData.body}</p>
            </>
        )
    }

    return(
        <div className="post">
            {post && renderPost()}
            <button onClick={() =>history.push(`/edit/${props.match.params.id}`)}>Edit</button>
            <button onClick={deletePost}>Delete</button>
            
        </div>
    )
}



//     componentDidMount() {
//         // displaying individual post
//         if (!this.props.post) {
//             axios.get(`https://aalyablogapp.herokuapp.com/server/posts/${this.props.match.params.id}`)
//                 .then((response) => {
//                     this.setState({ post: response.data })
//                     if (this.state.post) {
//                         document.querySelector(".post").style.display = "block";
//                     }
//                 })
//                 .catch((err) => console.error(err));
//         }
//     }

//     componentDidUpdate() {
//         if (
//             sessionStorage.getItem("isLoggedIn") === "true" &&
//             this.state.post.author === sessionStorage.getItem("user")
//         ) {
//             this.setState((prevState) => {
//                 if (!prevState.isLoggedIn) {
//                     return { isLoggedIn: true };
//                 }
//             })
//         }
//     }

//     confirmDelete(id) {
//         confirmAlert({
//             title: "Confirm to delete this post.",
//             message: "Are you sure you want to delete the post?",
//             buttons: [
//                 {
//                     label: "Yes",
//                     onClick: () => this.deletePost(id),
//                 },
//                 {
//                     label: "No",
//                     onClick: () =>
//                         console.log(
//                             "No, not deleting the post."
//                         ),
//                 }
//             ]
//         })
//     }
//     deletePost(id) {

//         axios.delete(`https://aalyablogapp.herokuapp.com/server/posts/${id}`)
//             .then(
//                 window.location = "/posts"  
//             )
//             .catch((err) => console.error(err))


//         // window.location = "/posts"
//     }

//     render() {
//         //rendering posts as a part of the PostList component
//         if (this.props.post) {
//             let date = new Date(this.props.post.date).toDateString();
//             let displayMonth = date.substring(4, 10);
//             let displayYear = date.substring(10);
//             let displayDate = `${displayMonth},${displayYear}`

//             return (
//                 <div className="card">
//                     <div className="card-body">
//                         <Link to={"/posts/" + this.props.post._id}>
//                             <h1 className="post-title">
//                                 {this.props.post.title}
//                             </h1>
//                             <h2 className="post-tags">
//                                 {this.props.post.tags}
//                             </h2>
//                             <h5>
//                                 <span className="author">{this.props.post.author}
//                                 </span>
//                             </h5>
//                             <div dangerouslySetInnerHTML={{
//                                 __html: this.props.post.body
//                                     .substring(0, 400)
//                                     .trim() + "...",
//                             }}></div>
//                             <small>
//                                 <time>
//                                     <div>
//                                         <span>Published on </span>
//                                         {displayDate}
//                                     </div>
//                                 </time>
//                             </small>
//                             <br />
//                         </Link>
//                     </div>
//                 </div>
//             );
//         }
//         //to render the SHOW page for all the individual posts
//         else {
//             //store the date that needs to be dispalyed
//             let date = new Date(this.state.post.date).toDateString();
//             let displayMonth = date.substring(4, 10);
//             let displayYear = date.substring(10);
//             let displayDate = `${displayMonth},${displayYear}`;
//             return (
//                 <div className="post" style={{ display: "none" }}>
//                     <div className="card">
//                         <div className="card-body">
//                             <h1 className="post-title">{this.state.post.title}</h1>
//                             <h2 className="post-tags">{this.state.post.tags}</h2>
//                             <h3 className="author">{this.state.post.author}</h3>
//                             <time>
//                                 <div>
//                                     <span> Published on</span>
//                                     {displayDate}
//                                 </div>
//                             </time>
//                             <div className="post-body" dangerouslySetInnerHTML={{ __html: this.state.post.body, }}></div>

//                             {/* checking if user is logged in inorder to render delete and update buttons */}
//                             {(
//                                 sessionStorage.getItem("isLoggedIn") === "true") ? (
//                                     <span>
//                                         <Link to={`/post/${this.state.post._id}/edit`} className="btn btn-outline-primary">Edit</Link>
//                                         <button onClick={() => this.confirmDelete(this.state.post._id)} className="btn btn-outline-danger">Delete</button>
//                                     </span>
//                                 ) : ("")}
//                         </div>
//                     </div>
//                 </div>
//             )

//         }
//     }
// }
// Post.propTypes = {
//     post: PropTypes.object,
// }
export default Post;