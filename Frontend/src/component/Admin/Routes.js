import React, { Component } from 'react';
import '../AdminCss/AdminMain.css'
import "../ClientCss/ClientCss.css"
import AdminMain from './AdminMain'
import AddCategory from './AddCategory'
import  AddSubCategory  from "./AddSubCategory";
import AddProducts from './AddProducts'
import ClientMain from '../Client/ClientMain'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Routes extends Component {
    state = {}
    render() {
        return (
            <Router>
                <Route exact path='/' component={ClientMain}/>
                <Route exact path='/adminMain' component={AdminMain}/>
                <Route exact path='/addProducts' component={AddProducts}/>
                <Route exact path='/addCategory' component={AddCategory}/>
                <Route exact path='/addSubCategory' component={AddSubCategory}/>
                
            </Router>
        );
    }
}

export default Routes;