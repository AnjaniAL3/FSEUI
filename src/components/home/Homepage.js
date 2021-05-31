import React from 'react';
import SideNav from '../sidenavbar/SideNav';
import '../../App.css';
import axios from 'axios'
import Post from '../tweet/Post'
import moment from 'moment'

class Homepage extends React.Component {
    state={
      mytweets:[]
    }

    // sel(prop,e)
    // {   console.log("p"+prop)
    //     this.setState({selected:prop})
    // }

    componentDidMount(){
        axios.get('http://localhost:3000/tweets',{
            params: {
                "userId": "swa@gmail.com",
          }})
        .then(response=>{
          console.log(response.data);
          let sorted = response.data.sort((x,y)=>{
            return y.createdTs-x.createdTs
          })
         this.setState({mytweets:sorted})
        },error=>{
          console.log(error)
        })
    }

    

    
render()
{
    return (
        <div className="bgblack">
            <div className="d-flex">
                <SideNav></SideNav>
                    <div className="feed" >
                        <div className="feed__header">
                            <h2> My tweets</h2>
                        </div>
                        {this.state.mytweets.map(tweet=>
                        <Post id={tweet.id} 
                              username={tweet.createdBy} 
                              text={tweet.tweet}
                              likes={tweet.likes}
                              time={moment(tweet.createdTs).fromNow()} 
                              displayName={tweet.displayName} 
                              avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3v0LQ9qKIBTA0914vAWWocZ79cns389qVg&usqp=CAU"} 
                              image={tweet.tweetImg }
                               
                              comments={tweet.comments}
                              deleteTweet={tweet.deleteTweet}
                        mytweets/>
)}
                    </div> 
            </div> 
        </div>  
    )
}
}
 
export default Homepage;