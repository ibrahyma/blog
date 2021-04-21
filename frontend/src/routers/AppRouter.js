import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../screens/Home'
import Footer from './Footer'
import Navbar from './Navbar';

export default function AppRouter(props) {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" children={ <Home/> }/>
            </Switch>
            <Footer/>
        </Router>
    )
}