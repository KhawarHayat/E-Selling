import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const SUB_CAT = gql`
query($id: ID){
category(id: $id){
  name 
  SubCategory{
      name
      id
  }
}
}
`


class OptionSubCat extends Component {
    state = {}
    displaySubCat = () => {
     const { loading, category } = this.props.SUB_CAT
     if(loading) return <option>Loading....</option>
     else{
         return category.SubCategory.map(cc => {
             return <option key={cc.id} value={cc.id}>{cc.name}</option>
         })
     }
     }

    render() {
        return (
            <select>
                <option disabled selected value=''>Select the Sub Category</option>
                {this.displaySubCat()}
            </select>
        );
    }
}

export default graphql(SUB_CAT, { name: "SUB_CAT", options: (props)=> {
    return{
    variables: {
        id : props.id
    }
    }
} }) (OptionSubCat);