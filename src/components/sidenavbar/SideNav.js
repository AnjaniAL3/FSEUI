import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SideNavOption from './SideNavOption'
import './SideNavOption.css'
import  ListAltIcon from '@material-ui/icons/ListAlt';
import {Button} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function SideNav() {
const logout=()=>{
    // sessionStorage.clear()
  }
    return (
        <div className="sidenav" >
          <TwitterIcon className="sidenav__twitterIcon"/>
          <Link to="/tweets"><SideNavOption active text="Home" Icon={HomeIcon}/></Link>
          <Link to="/home"><SideNavOption text="MyTweets" Icon={ListAltIcon}/></Link> 
          <Link to="/login"><SideNavOption text="Logout" Icon={ExitToAppIcon} /></Link>
          <Button variant="outlined" className="sidenav__tweet" fullWidth>Tweet</Button>
        </div>
    )
}

export default SideNav;


