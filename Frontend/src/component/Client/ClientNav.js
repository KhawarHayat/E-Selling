import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const Categories = gql`
{
    categories{
        name
        id
        SubCategory {
            name
            id
        }
    }
}
`

class ClientNav extends Component {
    state = {}
    displayCat = () => {
        return (
            <Query query={Categories}>
                {({ loading, data }) => {
                    if (loading) return <p className='Category'>Loading</p>
                    else {
                        console.log(data)
                        return data.categories.map((cat) => {
                            return (
                                <div>
                                    <p id={cat.id} className='Category' onClick={() => { this.setState({ catID: cat.id }) }}>{cat.name}</p>
                                    {this.state.catID === cat.id ? (
                                        cat.SubCategory.map((sub) => {
                                            return <p className='SubCategory' id={sub.id} onClick={() => this.props.SubCat(sub.id)}>{sub.name}</p>
                                        })
                                    ) : (
                                            <p style={{display: 'none'}}></p>
                                        )


                                    }
                                </div>
                            )
                        })
                    }
                }
                }
            </Query>
        )
    }
    render() {
        return (
            <div className='ClientNav'>
                {this.displayCat()}
            </div>
        );
    }
}

export default ClientNav;