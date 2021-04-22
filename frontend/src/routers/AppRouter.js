import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CategoryPage from '../components/CategoryPage/CategoryPage';
import Home from '../screens/Home/Home'
import Footer from './Footer'
import Navbar from './Navbar';

export default function AppRouter(props) {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/createCategory" children={ <Home/> }/>
                <Route path="/createPost" children={ <Home/> }/>
                <Route path="/editCategory/:id" children={ <Home/> }/>
                <Route path="/editPost/:id" children={ <Home/> }/>
                <Route path="/category/:id" children={ <CategoryPage/> }/>
                <Route path="/post/:id" children={ <Home/> }/>
                <Route path="/login" children={ <Home/> }/>
                <Route path="/" children={ <Home/> }/>
            </Switch>
            <Footer/>
        </Router>
    )
}