import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core'
import { ChatBubbleOutline, FavoriteBorder, Publish, Repeat, VerifiedUser } from '@material-ui/icons'
import AuthContext from './auth-context'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';

export class Post extends React.Component {

    state = {
        showComments: [],
        comment: '',
        show: false,
        tag: '',
        isTag: false,
        likes: []
    }

    static contextType = AuthContext;

    onChangeHandler = (e) => {
        console.log(this.state.isTag);
        console.log(e);
        const target = e.target.name
        let values = e.target.value
        let id = e.target.id
        console.log(values.lastIndexOf(''));
        if (values === "@") {
            this.setState({ isTag: true })
            this.setState({ [target]: values })
        }
        else if (this.state.isTag === true && e.key) {
            let str = this.state.comment.substring(this.state.comment.indexOf('@') + 1)
            console.log("str", str);
            if (this.context.tags.includes(str)) {
                this.setState({ comment: values })
                this.setState({ isTag: false })
            }
            else {
                alert("invalid tag")
            }
        }
        else {
            this.setState({ [target]: values })
        }
    }

    handler = (id, e) => {
        let cid = +id
        const target = e.target.id
        console.log(target)
        if (this.state[target].includes(cid)) {
            if (target === "likes") {
                e.target.classList.remove("likeIcon")
                this.props.unlike(id)
            }
            // console.log(this.state[target]);
            let c = this.state[target]
            let filtered = c.filter(i => i !== cid)
            console.log("fil", filtered);
            this.setState({ [target]: filtered }, () => { console.log(this.state[target]) })
        }
        else {
            if (target === "likes") {
                e.target.classList.add("likeIcon")
                this.props.like(id)
            }
            // console.log(this.state[target]);
            let c = this.state[target]
            // console.log(c);
            c.push(cid)
            console.log("push", c);
            this.setState({ target: c }, () => { console.log(this.state[target]) })
        }
    }

    tagHandler = (e) => {
        console.log("hiiiii")
    }

    onPostClick = (id) => {
        console.log(this.context.tags)
        if (this.state.isTag) {
            console.log("in  1 st if");
            console.log(this.state.isTag, this.state.comment.substring(this.state.comment.lastIndexOf('@') + 1));
            if (this.state.isTag && this.context.tags.includes(this.state.comment.substring(this.state.comment.lastIndexOf('@') + 1))) {
                console.log("check");
                let comment = { text: this.state.comment, timestamp: +new Date(), userName: sessionStorage.getItem("loggedInUser") }
                this.setState({ comment: '' })
                this.props.onComment(id, comment)
                this.setState({ isTag: false })
            }
            else {
                alert("invalid tag name")
            }
        }
        else {
            let comment = { text: this.state.comment, timestamp: +new Date(), userName: sessionStorage.getItem("loggedInUser") }
            console.log("in comment");
            this.props.onComment(id, comment)
            this.setState({ comment: '' , isTag:false})
        }

    }

    onKeyDown = (e) => {
        // let id = e.target.id
        console.log("in key");
        if (e.keyCode === 32 && this.state.isTag === true) {
            this.onChangeHandler(e)
            e.preventDefault();
            e.stopPropagation();
        }

    }

    likesHandler = (id, event) => {
        //  document.getElementById(`like-${id}`).classList.add('likeicon')
        this.handler(id, event)
    }

    render() {

        return (

            // View Tweets
            <div id={this.props.id} className="post">
                <div className="post__avatar">
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3v0LQ9qKIBTA0914vAWWocZ79cns389qVg&usqp=CAU" />
                </div>
                <div className="post__body">
                    <div className="post__header">
                        {/* tweets */}
                        <div className="post__headerText">
                            <h3>{this.props.username} <span><VerifiedUser className="post__badge" /> </span> <span className="post__displayName">@{this.props.displayName}</span></h3>
                            {this.props.username === sessionStorage.getItem('loggedInUser') && (
                                <div style={{ float: 'right' }}>
                                    <DeleteIcon className="post__deleteIcon" onClick={() => this.props.deleteTweet(this.props.id)} />
                                </div>
                            )}
                        </div>
                        <p style={{ padding: '', top: 0, fontSize: '70%' }}>{this.props.time}</p>
                        <div className="post__headerDesc">
                            <p style={{ fontSize: '160%' }}>{this.props.text} </p>
                        </div>
                    </div>
                    {/* like and comment options */}
                    {this.props.image && (<img src={this.props.image} alt="" />)}
                    <div className="post__footer">
                        <div> <ChatBubbleOutline id="showComments" fontSize="small" onClick={this.handler.bind(this, this.props.id)} /></div>
                        {/* <Repeat id="showReTweet" onClick={this.handler.bind(this, this.props.id)} fontSize="small" /> */}
                        <div > <FavoriteBorder id="likes" className={`like-${this.props.id}`} fontSize="small" onClick={this.likesHandler.bind(this, this.props.id)} /></div>
                        {/* <Publish fontSize="small" /> */}
                        <p>{this.props.likes}</p>
                    </div>

                    {this.state.show ?
                            <div>
                                <ul>
                                    {this.context.tags.filter(t => t.includes(this.state.tag)).map(t => (
                                        <li id={t} onClick={this.tagHandler(t)}>{t}</li>

                                    ))}
                                </ul>
                            </div>
                    : ""}

                    {/* view comments */}
                    {this.state.showComments.includes(this.props.id) ?
                        <div className="post__comments">
                            <p style={{ marginLeft: '10px' }}>Replies</p>
                            {this.props.comments.sort((x, y) => y.timestamp - x.timestamp).map(comment => (
                                    <div className="post__comment">
                                        <div style={{ display: 'flex' }}>
                                            <strong style={{ flex: '1', color: 'var(--twitter-color)' }}>{comment.userName}</strong>
                                            <p style={{ float: 'right', color: 'gray' }}>{moment(comment.timestamp).fromNow()}</p>
                                        </div>
                                        <p> {comment.text}</p>
                                    </div>
                            ))}  
                        </div>
                    : ""}

                    {/* post comment */}
                    {!this.props.mytweets && <div className="reply__container">
                        <textarea className="reply__textarea" id={this.props.id} name="comment" value={this.state.comment} type="text" onChange={this.onChangeHandler} onKeyDown={this.onKeyDown} />
                        <button className="reply__button" onClick={() => this.onPostClick(this.props.id)}>Reply</button>
                    </div>}
                </div>
            </div>
        )
    }

}
export default Post
