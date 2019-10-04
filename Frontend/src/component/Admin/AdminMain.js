import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdminMain extends Component {
     state = {
         category: false,
         subCategory:false,
         Products:false
     }
    handleCategory = (e) => {
     e.preventDefault()
     this.setState({
         category: true
     })
    }

    handleSubCategory = (e) => {
        e.preventDefault()
        this.setState({
            subCategory: true
        })
    }

    handleProduct = (e) => {
        e.preventDefault()
        this.setState({
            Products: true
        })
    }

    RedirectCat = () => {
        if (this.state.category) {
          return <Redirect to='/addCategory' />
        }
      }

      RedirectSubCat = () => {
        if (this.state.subCategory) {
          return <Redirect to='/addSubCategory' />
        }
      }

      RedirectProducts = () => {
        if (this.state.Products) {
          return <Redirect to='/addProducts' />
        }
      }
    render() {
        return (
            <>
            {this.RedirectCat()}
            {this.RedirectSubCat()}
            {this.RedirectProducts()}

                <div className='AdminHeader'>
                    <img src='LOGO.png' alt='Company Logo' />
                </div>
                <div className='AdminContainer'>
                    <div className='Bar'>
                        <p>Categorys</p>
                        <ul>
                        </ul>
                        <button className='Buttons' ><FontAwesomeIcon icon={faPlus} onClick={this.handleCategory} /></button>
                    </div>
                    <div className='Bar'>
                        <p>Sub-Categorys</p>
                        <ul>
                        </ul>
                        <button className='Buttons' onClick={this.handleSubCategory}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <div className='Bar'>
                        <p>Products</p>
                        <ul>
                        </ul>
                        <button className='Buttons' onClick={this.handleProduct}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminMain;