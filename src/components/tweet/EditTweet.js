import React from 'react';
import '../../App.css';
import TweetHeader from '../header/TweetsHeader';
import SideNav from '../sidenavbar/SideNav';
import { Redirect } from "react-router-dom";
import Axios from 'axios';

class EditTweet extends React.Component {
    state = {
        id: 0,
        tweet: '',
        tweetError: false,
        isSuccess: false,
    }

    componentDidMount = () => {
        this.setState({
            tweet: this.props.location.state.tweet[0].tweet,
            id: this.props.location.state.tweet[0].id
        }, () => console.log(this.state))

    }

    validate() {
        if (this.state.tweet === '') {
            this.setState({ tweetError: true })
        }
        else {
            return true;
        }
    }

    tweetChangeHandler = (e) => {
        this.setState({ tweet: e.target.value });
        this.setState({ tweetError: false })
    }

    editTweet = (e) => {
        e.preventDefault();
        let res = this.validate();
        if (res === true) {
            res = false;
            let data = {
                "tweet": this.state.tweet,
                "createdBy": sessionStorage.getItem("loggedInUser"),
                "createdTs": Date().toLocaleString(),
                "userId": sessionStorage.getItem("loggedInUserId")
            }

            Axios.put('http://localhost:3000/tweets/' + this.state.id, data)
                .then(response => {
                    console.log(response);
                    this.setState({ isSuccess: true });
                }, error => {
                    console.log(error);
                })
        }

    }

    render() {
        if (sessionStorage.getItem("loggedInUser") === '') {
            return <Redirect to={{ pathname: "/" }} />
        }
        if (this.props.location.state === undefined) {
            return (
                <div>
                    <h1>Please navigate from tweets page!!!! </h1>
                </div>
            )
        }
        return (
            <div>
                <TweetHeader></TweetHeader>
                <SideNav></SideNav>
                <h3 className="he1">Edit Tweet</h3>
                <hr />
                <div className="c2">

                    <form style={{ bottom: '0px' }}>
                        <label htmlFor="tweet"><b>Tweet</b></label>
                        <input type="text" placeholder="Write tweet" name="tweet" required value={this.state.tweet} onChange={this.tweetChangeHandler} />
                        {this.state.tweetError && (<h5 className="alert alert-danger">Tweet cannot be null</h5>)}
                        <button type="submit" className="l1" onClick={this.editTweet.bind(this)}>Edit Tweet</button>
                    </form>
                </div>
                <div style={{ textAlign: "center" }}>
                    {this.state.isSuccess && (<h3 className="alert-sucess" style={{ backgroundColor: "green", color: "white" }}>Tweet edited successfully</h3>)}
                </div>
            </div>
        );
    }
}

export default EditTweet;