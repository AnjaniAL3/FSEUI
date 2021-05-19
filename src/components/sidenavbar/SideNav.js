import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SideNavOption from './SideNavOption'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './SideNavOption.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon  from '@material-ui/icons/BookmarkBorder';
import  ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity'; 
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Button} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from 'react-router-dom';


function SideNav() {
const logout=()=>{
    // sessionStorage.clear()
  }

    return (
        <div className="sidenav" >
           <TwitterIcon className="sidenav__twitterIcon"/>
             <Link to="/tweets"><SideNavOption active text="Home" Icon={HomeIcon}/></Link>
            {/* <SideNavOption text="Explore" Icon={SearchIcon}/> */}
            {/* <SideNavOption text="Notifications" Icon={NotificationsNoneIcon}/> */}
            {/* <SideNavOption text="Messages" Icon={MailOutlineIcon}/> */}
            {/* <SideNavOption text="Bookmarks" Icon={BookmarkBorderIcon}/> */}
           <Link to="/home"><SideNavOption text="MyTweets" Icon={ListAltIcon}/></Link> 
           {/* <Link to="/profile"><SideNavOption text="Profile" Icon={PermIdentityIcon}/></Link> */}
            {/* <SideNavOption text="More" Icon={MoreHorizIcon}/> */}
           <Link to="/login"><SideNavOption text="Logout" Icon={ExitToAppIcon} /></Link>
          

          <Button variant="outlined" className="sidenav__tweet" fullWidth>Tweet</Button>
        </div>
    )
}

export default SideNav;


