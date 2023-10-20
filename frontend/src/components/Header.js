import React from 'react';
import logo from '../images/Vector__header.svg';
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Место"></img>
            <div className="header__nav">
                <p className="header__text">{props.mail}</p>
                <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
            </div>
        </header>
    );
}

export default Header;