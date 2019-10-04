import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { gql } from 'apollo-boost'
import axios from 'axios'
import Options from './OptionSubCat'

// Qureies 
const CATEGORY = gql`
{
    categories {
        name
        id
    }
}
`
const SUB_CAT = gql`
query ($id: ID){
    category(id: $id){
        name
        SubCategory{
            name
            id
        }
    }
}
`
const ADDPRODUCT = gql`
mutation ($name: String!, $pic: String!, $model: String!, $price: Int!,$catID: ID!, $subCatID: ID!){
    addProduct( name: $name, pic: $pic, price: $price, model: $model, catID: $catID, subCatID: $subCatID){
        name
    }
}
`


class AddProducts extends Component {
    state = {
        selectedFile: null,
        pic: null,
        model: null,
        name: null,
        price: 0,
        catID:null,
        subCatID:null,
    }

    fileSelectedHandle = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    handleUpload = () => {
        const fd = new FormData()
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        axios.post('http://localhost:4000/upload', fd)
            .then((res) => {
                console.log(res.data.name)
                this.setState({
                    pic: res.data.name
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.name === 'price' ? parseInt(e.target.value) : e.target.value
        })
    }

    displaySubCat = () => {
        if (this.state.catID) {
            return (
                <Query query={SUB_CAT} variables={{ id: this.state.catID }}>
                    {({ loading, data }) => {
                        if (loading) return <option disabled>Loading...</option>
                        else {
                            return data.category.SubCategory.map(cc => {
                                return <option key={cc.id} value={cc.id}>{cc.name}</option>
                            })

                        }
                    }

                    }
                </Query>
            )
        }


    }

    handleSelectCAT = (e) => {
        this.setState({
            catID: e.target.value
        })
    }

    handleSelectSUBCAT = (e) => {
        this.setState({
            subCatID: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.pic === null || this.state.name === null ||this.state.model === null ||this.state.price === null ||this.state.catID === null ||this.state.subCatID === null){
          alert('Something is missing')  
        }
        else{
         this.props.ADDPRODUCT({
             variables: {
                 name: this.state.name,
                 price: this.state.price,
                 pic: this.state.pic,
                 model:this.state.model,
                 catID: this.state.catID,
                 subCatID: this.state.subCatID
             }
         }).then(({data}) => {
           console.log({data})
         })
        }
    }
    render() {
        return (
            <div className='AddProducts'>
                <input
                  style={{display:"none"}}
                    type='file'
                    onChange={this.fileSelectedHandle}
                    ref={fileInput => this.fileInput = fileInput}
                />
                <button onClick={() => this.fileInput.click()}>Pick File</button>
                <button onClick={this.handleUpload}>Upload</button>

                <select onChange={this.handleSelectCAT} value={this.state.catID}>
                    <option value='' disabled selected>Select Category</option>
                    <Query query={CATEGORY}>
                        {({ loading, data }) => {
                            if (loading) return <option disabled>Loading...</option>
                            else {
                                return data.categories.map(cc => {
                                    return <option key={cc.id} value={cc.id}>{cc.name}</option>
                                })
                            }

                        }}
                    </Query>
                </select>
                <select onChange={this.handleSelectSUBCAT} value={this.state.subCatID}>
                    <option disabled selected>Select SubCategory</option>
                    {this.displaySubCat()}
                </select>



                <input
                    name='name'
                    type='text'
                    placeholder='Name'
                    onChange={this.handleChange}
                    value={this.state.value}
                    required
                />

                <input
                    name='model'
                    type='text'
                    placeholder='Model'
                    onChange={this.handleChange}
                    value={this.state.value}
                    required
                />

                <input
                    name='price'
                    type='number'
                    placeholder='Rs/-'
                    onChange={this.handleChange}
                    value={this.state.value}
                    required
                />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}



export default graphql(ADDPRODUCT, {name: 'ADDPRODUCT'})(AddProducts);