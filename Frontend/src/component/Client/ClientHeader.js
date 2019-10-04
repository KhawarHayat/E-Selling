import React, { Component } from 'react';
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
const ClientHeader = () => {
    return (
        <div className="ClientHeader">
            <img src='LOGO.png' />
            <a><FontAwesomeIcon icon={faCartArrowDown}/></a>
            <a ><FontAwesomeIcon icon={faTwitter} /></a>
            <a ><FontAwesomeIcon icon={faGithub} /></a>
            <a><FontAwesomeIcon icon={faFacebook} /></a>
        </div>
    );
}

export default ClientHeader;