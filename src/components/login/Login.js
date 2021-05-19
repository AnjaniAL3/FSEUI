import React from 'react';
import Header from '../header/Header';
import '../../App.css';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component{
    state={
        uname:'',
        pwd:'',
        loginSuccess:false,
        details:[],
        error:false
    }

    componentDidMount(){
        sessionStorage.clear()
        this.fetchDetails();
    }
    fetchDetails=()=>{
        Axios.get("http://localhost:3000/login/")
            .then(response=>{
                console.log(response.data);
                this.setState({details:response.data});
            },error=>{
                console.log(error);
            })
    }

    handleUserNameChange(e)
    {
        this.setState({uname:e.target.value})
    }
    handlePasswordChange(e)
    {
        this.setState({pwd:e.target.value})
    }
    submit(e)
    {
        e.preventDefault();
        console.log(this.state.details.length)
        let temp=this.state.details.filter(detail=>{
            if(detail.email === this.state.uname && detail.password === this.state.pwd)
            {
                sessionStorage.setItem("loggedInUser",detail.name);
                sessionStorage.setItem("loggedInUserId",detail.email);
                sessionStorage.setItem("displayName",detail.name.replace(/\s+/g,'').toLowerCase())
                return detail;
            }
                
            
        });
        console.log(temp.length);
        if(temp.length!==0){
            console.log("login success")
            this.setState({loginSuccess:true})

        }else{
            this.setState({error:true});
        }
        // this.setState({loginSuccess:true})
    }
render()
{
    if (this.state.loginSuccess){
        this.setState({ loginSuccess: false });
        return <Redirect to={{ pathname : "/tweets" , state : {
            isLoggedIn : true
        }}} />

    }
  
    return (
<div className="register">
<div className="register__header">
  <Header></Header>
  </div >
<div className="container" >
<h2 className="register__heading">User Login</h2>
<hr/>
{this.state.error && (<h4 className="alert alert-danger">Please enter valid username and password</h4>)}
<div className="register__form" >
<form onSubmit={this.submit.bind(this)}>
    <div>
    <label htmlFor="uname"><b>Username</b></label><br/>
 <input type="text"  placeholder="Enter Username" name="uname" required onChange={this.handleUserNameChange.bind(this)}/><br/>
 </div>
 <div>
<label htmlFor="password"><b>Password</b></label><br/>
 <input type="password"  placeholder="Enter Password" name="password" required onChange={this.handlePasswordChange.bind(this)}/><br/>
</div>
<div>
 <label>


 <input type="checkbox" checked="checked" name="remember"/> Remember me
 </label><br />
</div>
<div>
 <button type="submit" className="register__submitButton">Login</button>
 </div>

 <div className="f1" style={{backgroundcolor:"#f1f1f1"}}>
 <span className="fpwd">Forgot password?</span>
 </div>   
  </form>
</div>
</div> 
</div>     
    )
}

}

export default Login;