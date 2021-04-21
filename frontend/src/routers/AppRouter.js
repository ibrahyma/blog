import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header'
import Home from '../screens/Home'
import Footer from './Footer'
import PostPage from '../screens/PostPage';
import AdminLogin from '../screens/AdminLogin';
import AdminPage from '../screens/AdminPage';
import AdminPostPage from '../screens/AdminPostPage';
import Navbar from './Navbar';
import AdminCategoryPage from '../screens/AdminCategoryPage';
import CategoryPage from '../screens/CategoryPage';

export default function AppRouter(props) {
    return (
        <Router>
            <Header/>
            <Navbar/>
            <Switch>
                <Route path="/addPost" children={ <AdminPostPage/> }/>
                <Route path="/addCategory" children={ <AdminCategoryPage/> }/>
                <Route path="/editPost/:id" children={ <AdminPostPage/> }/>
                <Route path="/editCategory/:id" children={ <AdminCategoryPage/> }/>
                <Route path="/post/:id" children={ <PostPage/> }/>
                <Route path="/category/:id" children={ <CategoryPage/> }/>
                <Route path="/admin" children={ <AdminPage/> }/>
                <Route path="/login" children={ <AdminLogin/> }/>
                <Route path="/" children={ <Home/> }/>
            </Switch>
            <Footer/>
        </Router>
    )
}