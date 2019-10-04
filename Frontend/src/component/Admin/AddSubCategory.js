import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { flowRight as compose } from 'lodash'

const GET_CAT = gql`
{
    categories {
        name
        id
    }
}
`
const ADDSUBCATEGORY = gql`
mutation ($name: String!, $catID: ID!){
    addSubCategory(name:$name, catID:$catID) {
        name
        catID
    }
}
`


class AddSubCategory extends Component {
    state = {}

    handleSelect = (e) => {
        this.setState({
            selected: e.target.value
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
    e.preventDefault()
       this.props.ADDSUBCATEGORY({
        variables: {
               name: this.state.subCat,
               catID: this.state.selected
           }
       }).then((data) => {
           console.log(data)
       })
    }


    displayCategories = () => {
        const { loading, categories } = this.props.GET_CAT

        if (loading == true) {
            return <option>Loading...</option>
        }
        else {
            return categories.map(cc => {
                return <option key={cc.id} value={cc.id}>{cc.name}</option>
            })
        }
        
    }

    render() {
        console.log(this.state)

        return (
            <div className='AddSubCat'>
                <div className='AdminHeader'>
                    <img src='LOGO.png' alt='Company Logo' />
                    <p>Logout</p>
                    <p>Main</p>
                </div>
                <div className='margin'>
                <div>
                    <select onChange={this.handleSelect} value={this.state.selected} className='box' >
                    <option value="" disabled selected>Select your option</option>
                        {this.displayCategories()}
                    </select>
                </div>
                <div>
                    <input
                        name='subCat'
                        placeholder='Sub Category'
                        value={this.state.value}
                        type='text'
                        onChange={this.handleChange}
                    />
                    
                </div>
                <button onClick={this.onSubmit}>ADD</button>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(GET_CAT, {name : "GET_CAT"}),
    graphql(ADDSUBCATEGORY, {name : "ADDSUBCATEGORY"})
)(AddSubCategory);