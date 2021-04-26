import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';


class Header extends Component {
   
    render() { 
        return ( 
            <header className="headers">
                <Link to=""><img src={require('./logo.png')} /></Link>
                
                <AuthOptions />
            </header>
         );
    }
}
 
export default Header;