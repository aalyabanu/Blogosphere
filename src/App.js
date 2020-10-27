import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";

import PostList from "./components/PostList"
import Post from "./components/Post";
import Login from "./components/RegisterLogin/Login"
import Register from "./components/RegisterLogin/Register";
import NewPost from "./components/NewPost"
import EditPost from "./components/EditPost"

//importing components
import Header from "./components/Header"


const App = () => (

  <div className="container">
    <Router>
      <Header />
      <Switch>
        <Route path="/posts" exact component={PostList} />
        <Route path="/posts/:id" component={Post} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/new" exact component={NewPost} />
        <Route path="/edit/:id" exact component={EditPost} />
      </Switch>

    </Router>

  </div>
);


export default App;
