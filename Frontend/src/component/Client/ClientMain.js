import React, { Component } from 'react';
import { BallBeat } from 'react-pure-loaders';
import ClientHeader from './ClientHeader'
import ClientNav from './ClientNav';
import ClientCard from './ClientCard';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import AddSubCategory from '../Admin/AddSubCategory';

const Product = gql`
query ($id: ID){
 Subcategory(id: $id){
     id
     name
     Products {
         name
         id
         pic
         price
         model
         catID
         subCatID
     }
 }   
} 
`


class Main extends Component {
    state = {
    }
    handleProducts = (id) => {
        this.setState({
            SubCat: id,
        })
    }

    displayProducts = () => {
        if (this.state.SubCat) {
            return <Query query={Product} variables={{ id: this.state.SubCat }}>
                {({ loading, data }) => {
                    if (loading) return <center><div><BallBeat color={'#000'} loading={loading} /></div></center>
                    else {
                        console.log(data)
                        return data.Subcategory.Products.map((pro) => {
                            return <ClientCard name={pro.name} price={pro.price} src={`http://localhost:4000/static/uploads/${pro.pic}`} model={pro.model} id={pro.id} />
                        })
                    }
                }
                }
            </Query>
        }
    }

    render() {
        return (
            <>
                <ClientHeader style={{ position: 'fixed' }} />
                <div className='ClientAlign'>
                    <ClientNav SubCat={this.handleProducts} />
                    <div className='displayProducts'>
                        {this.displayProducts()}
                    </div>
                </div>
            </>
        );
    }
}

export default Main;