import React, { useState, useEffect } from 'react'
import './Feed.css'
import AddTweet from './AddTweet'
import Post from './Post'
import axios from 'axios';
import moment from 'moment'
function Feed() {
  const [tweets, setTweets] = useState([])
  const [tweet, setTweet] = useState('')
  const [tweetImg, setTweetImg] = useState('')
  const [comment, setComment] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    fetchTweets();
  }, [])

  const deleteTweet = (id) => {
    console.log(id);

    axios.delete('http://localhost:3000/tweets/' + id)
      .then(response => {
        console.log("Deletion Success");
        fetchTweets();
      }, error => {
        console.log("error occurred");
      })
  }
  const postComment = (id, comment) => {
    let comments = []
    comments = tweets.filter(t => t.id === id)[0].comments
    console.log(comments);
    comments.push(comment)


    axios.patch(`http://localhost:3000/tweets/${id}`, { comments: comments })
      .then(response => {
        console.log(response.data);


      }, error => {
        console.log(error);
      })
  }
  const tweetChangeHandler = (e) => {
    setIsError(false)
    console.log("in hand");
    let target = e.target.id
    if (target === "tweet") {
      setTweet(e.target.value)
    }

    else if (target === "tweetImg") {
      setTweetImg(e.target.value)
    }

    else if (target === "comment") {
      setComment(e.target.value)
    }

  }

  const validate = () => {
    if (tweet === '') {
      setIsError(true)
    }
    else {
      return false;
    }
  }

  const likesHandler = (id) => {
    // document.getElementByClassName('kk').classList.add('likeicon')

    let likes = tweets.filter(t => t.id === id)[0].likes + 1
    axios.patch(`http://localhost:3000/tweets/${id}`, {
      likes: likes
    })
      .then(response => {
        console.log(response.data);
        fetchTweets()

      }, error => {
        console.log(error);
      })
  }
  const unlikeHandler = (id) => {
    // document.getElementByClassName('kk').classList.add('likeicon')

    let likes = tweets.filter(t => t.id === id)[0].likes
    if (likes !== 0) {
      likes--;
    }
    axios.patch(`http://localhost:3000/tweets/${id}`, {
      likes: likes
    })
      .then(response => {
        console.log(response.data);
        fetchTweets()

      }, error => {
        console.log(error);
      })
  }

  const addTweet = (e) => {
    console.log("in add tweet");

    e.preventDefault();
    let res = validate();
    if (res === false) {

      let data = {
        "tweet": tweet,
        "tweetImg": tweetImg,
        "comments": [],
        "createdBy": sessionStorage.getItem("loggedInUser"),
        "createdTs": +new Date(),
        "userId": sessionStorage.getItem("loggedInUserId"),
        "displayName": sessionStorage.getItem("loggedInUser").replace(/\s+/g, '').toLowerCase(),
        "likes": 0


      }

      axios.post('http://localhost:3000/tweets', data)
        .then(response => {
          console.log(response.data);
          setIsSuccess(true)
          fetchTweets()
          setTweet('')
          setTweetImg('')

        }, error => {
          console.log(error);
        })
    }

  }



  const fetchTweets = (e) => {
    console.log(moment(1617443660543).fromNow())
    axios.get('http://localhost:3000/tweets')
      .then(response => {
        console.log(response.data);
        let sorted = response.data.sort((x, y) => {
          return y.createdTs - x.createdTs
        })
        setTweets(sorted)


      }, error => {
        console.log(error)
      })
  }

  return (
    <div className="feed" >
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <AddTweet onChange={tweetChangeHandler} addTweet={addTweet} tweet={tweet} tweetImg={tweetImg} />
      {isError && (<h5 className="alert alert-danger">Tweet cannot be null</h5>)}
      {tweets.map(tweet => (
        <Post id={tweet.id} username={tweet.createdBy} text={tweet.tweet} likes={tweet.likes}
          time={moment(tweet.createdTs).fromNow()}
          displayName={tweet.displayName}
          avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3v0LQ9qKIBTA0914vAWWocZ79cns389qVg&usqp=CAU"}
          image={tweet.tweetImg} onComment={postComment} comments={tweet.comments} deleteTweet={deleteTweet} like={likesHandler} unlike={unlikeHandler} />
      ))}

    </div>
  )
}

export default Feed
