import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import { graphql, withApollo } from 'react-apollo'
import compose from 'lodash'


const addCategory = gql`
mutation($name: String!){
    addCategory(name:$name){
       name
       id
    }
}
`
class AddCotegory extends Component {
    state = {  }
    handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
    }

    onSubmit = (e) => {
     e.preventDefault()
     this.props.addCategory({
         variables :{
          name: this.state.category
         }
     })

    }
    render() { 
        return ( 
            <div className='Main'>

            <div className='AdminHeader'>
                    <img src='LOGO.png' alt='Company Logo' />
                    <p>Logout</p>
                    <p>Main</p>
            </div>
            <div className='AdminAddCategory'>
                <label>Category:</label>
             <input 
             name='category'
             placeholder='Electronic'
             value={this.state.value}
             onChange={this.handleChange}
             />
             <button onClick={this.onSubmit}>Submit</button>
            </div>
                
            </div>
         );
    }
}
 
export default graphql(addCategory, {name: "addCategory"})(AddCotegory);