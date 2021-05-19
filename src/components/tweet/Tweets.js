import React from 'react';
import '../../App.css';
import TweetHeader from '../header/TweetsHeader';
import SideNav from '../sidenavbar/SideNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Feed from "./Feed";


class Tweets extends React.Component {
    state = { 
        tweets:[],
        tempTweets:[],
        multiSearchTweets:[],
        editId:0,
        editClicked:false,
        searchValue:'',
        tableView:true,
        tweets1:[]
     }

     

   

     toggleHandler=(e)=>{
      this.setState({tableView:!(this.state.tableView)});
     }

     editHandler=(e)=>{
       console.log("in edit handler");
       this.setState({editId:e.target.id});
      this.setState({editClicked:true})
     }

     search=(e)=>{
        let value=e.target.value;
        if(value==''){
          this.fetchTweets();
        }
        else{
        this.setState({searchValue: value});
        let searchTweet=this.state.tempTweets.filter(tweet=>{
          return tweet.userId.toLowerCase().match(value.toLowerCase())||tweet.createdBy.toLowerCase().match(value.toLowerCase())||tweet.tweet.toLowerCase().match(value.toLowerCase());
        })
        this.setState({tweets:searchTweet});
      }

     }

    render() { 
      if(sessionStorage.getItem("loggedInUser")===''){
        return <Redirect to={{ pathname : "/" }} />
    }

      if(this.state.editClicked){
        this.setState({editClicked:false});
        return <Redirect to={{pathname:"/editTweet" ,state:{
          tweet:this.state.tweets.filter(p=>p.id===this.state.editId)
        }}}></Redirect>
      }
        return ( 
            <div className="bgblack">

            
            <div className="d-flex">
     
      
       
            {/* Widgets */}

            <SideNav></SideNav>
            <Feed  />
     


            
              
        </div>
       
        </div>
     
         );
    }
}
 
export default Tweets;