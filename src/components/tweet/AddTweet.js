import { Button } from '@material-ui/core'
import React from 'react'
import './AddTweet.css'
import {Avatar} from '@material-ui/core'


class AddTweet extends React.Component {
    state = { 
        tweet:'',
        tweetImg:'',
        tweetError:false,
        isSuccess:false,
        categories:[]
    }

    render() { 
   
            return (
                    <div className="tweetBox">
                        <form>
                            <div className="tweetBox__input">
                                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3v0LQ9qKIBTA0914vAWWocZ79cns389qVg&usqp=CAU"/>
                                <input id="tweet" placeholder="Whats happening"  type="text" value={this.props.tweet} onChange={this.props.onChange}/>
                            {/* <input placeholder="Enter iamge url" type="text"/> */}
                            </div>
                            <input id="tweetImg" className="tweetBox__imageInput" placeholder="Optional :Enter image url" type="text" value={this.props.tweetImg} onChange={this.props.onChange}/>
                            <Button  onClick={this.props.addTweet} className="tweetBox__tweetButton">Tweet</Button>
                        </form>   
                    </div>
)}}

export default AddTweet;