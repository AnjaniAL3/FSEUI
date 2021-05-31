import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {


    render() { 
        // const menuitem = {
        //     color:"red",
        //     display:'inline',
        //     padding: '10px',
        //     margin: '5px'
        // }

        return (  
            <div className="header">
                <nav className="navbar fixed-top navbar-expand  " style={{backgroundColor:`var(--twitter-color)`,height:'50px',color:'white'}}>
                    <a className="navbar-brand" style={{color:"white"}} href="h#"><b>Just Tweet</b></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText" style={{padding:"1%"}}>
                      <ul className="navbar-nav mr-auto header__navbarul">
                        <li className="nav-item active"> 
                        {/* <a className="nav-link">Home <span class="sr-only">(current)</span></a> */}
                        </li>
                        <li className="nav-item">
                          <Link to="/" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/register" className="nav-link">SignUp</Link>
                        </li>
                      </ul>
                  </div>
                </nav>
            </div>

        );
    }
}
 
export default Header;