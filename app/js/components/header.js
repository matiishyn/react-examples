import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default header">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Imgur Browser
                    </Link>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/">Topik #1</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}