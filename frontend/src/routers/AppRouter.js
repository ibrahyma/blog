import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from '../components/Category';
import CategoryForm from '../components/CategoryForm';
import Post from '../components/Post';
import Home from '../screens/Home'
import LoginForm from '../screens/LoginForm';
import PostForm from '../screens/PostForm';
import Footer from './Footer'
import Navbar from './Navbar';

export default function AppRouter(props) {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/createCategory" children={ <CategoryForm/> }/>
                <Route path="/createPost" children={ <PostForm/> }/>
                <Route path="/editCategory/:id" children={ <Category/> }/>
                <Route path="/editPost/:id" children={ <Post/> }/>
                <Route path="/category/:id" children={ <Category/> }/>
                <Route path="/post/:id" children={ <Post/> }/>
                <Route path="/login" children={ <LoginForm/> }/>
                <Route path="/" children={ <Home/> }/>
            </Switch>
            <Footer/>
        </Router>
    )
}