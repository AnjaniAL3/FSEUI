import React from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

class InventoryHeader extends React.Component {
    state = {  }

    logoutHandler=()=>{
      sessionStorage.setItem("loggedInUser","");
    }

    // closeNav=()=>{
    //   document.getElementById("mySidenav").style.width = "0";
    // }

    // openNav=()=>{
    //   document.getElementById("mySidenav").style.width = "20%";
    // }

    render() { 
        return ( 
            <div className="inventoryHeader">
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" style={{backgroundColor:"#404040"}}>
                  <p className="navbar-brand" style={{color:"wheat"}}>Just Tweet</p>
                   <p className="nav-item" style={{color:"white"}}>Welcome {sessionStorage.getItem("loggedInUser")}!!</p>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarText" style={{padding:"1%"}}>
                    <ul className="navbar-nav mr-auto nav1">
                      <li className="nav-item active"> 
                        {/* <a className="nav-link">Home <span class="sr-only">(current)</span></a> */}
                      </li>
                      <li className="nav-item">
                       <Link to="/home"> <p className="nav-link nh1">Dashboard</p></Link>
                      </li>
                      <li className="nav-item">
                      <Link to="/products"> <p className="nav-link nh1">Product Details</p> </Link>
                      </li>
                      <li className="nav-item">
                      <Link to="/addProduct"> <p className="nav-link nh1">Add Product</p> </Link>
                      </li>
                    </ul>
                    <span  style={{float:"right"}} onClick={this.logoutHandler}>
                     <Link to="/" style={{color:"white",textDecoration:"none"}}> Logout</Link>
                    </span>
                  </div>
                </nav>
      
  
            </div>
         );
    }
}
 
export default InventoryHeader;