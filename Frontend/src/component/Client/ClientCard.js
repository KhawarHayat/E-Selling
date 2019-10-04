import React, { Component } from 'react';
const ClientCard = (props) => {
    return ( 
        <div className='ClientCard' id={props.id}>
        <img src={props.src}/>
        <label>Name:</label>
        <p className='CardName'>{props.name}</p>
        <label>Model:</label>
        <p className ='CardName'>{props.model}</p>
        <label>Price:</label>
        <p className='CardPrice'>Rs {props.price}-/</p>
       <center> <button>Add To Cart</button> </center>
        </div>
     );
}
 
export default ClientCard;