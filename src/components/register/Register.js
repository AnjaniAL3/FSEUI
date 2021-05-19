  
import React from 'react';
import '../../App.css';
import Header from '../header/Header';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


// const SIGNUP_SUCCESS = "Signup successful."

// const SIGNUP_ERROR = "Please try again later."

// function passwordValidate(pass) {
//     const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})");
//     if (strongRegex.test(pass)) {
//         return false;
//     }
//     else {
//         return true;
//     }
// }
// || passwordValidate(state.password)

function validate(state) {
    console.log("in errors");
    console.log(state);
    const errors = [];
    
    
  
    if (state.firstName === "") {

        errors.push("First name is required");
        state.errors1["fn"]="First name is required";
    }
    if (state.lastName === "") {

        errors.push("Last name is required")
        state.errors1["ln"]="Last name is required";
    }
    if (state.dob === "" || state.dob === '0001-01-01') {

        errors.push("DOB is required");
        state.errors1["dob"]="DOB required";

    }
    if (state.mobile === "") {

        errors.push("Mobile Number is required");
        state.errors1["ph"]="Phone number is required";
    }
    if (state.mobile.length < 10 || state.mobile.length > 10) {

        errors.push("Mobile Number should be of 10 digits")
        state.errors1["phl"]="Mobile Number should be of 10 digits";
    }
    if (state.email.length < 5) {

        errors.push("Email should be at least 5 charcters long");
        state.errors1["em1"]="Email should be at least 5 charcters long";
    }
    if (state.email.split("").filter(x => x === "@").length !== 1) {

        errors.push("Email should contain a @");
        state.errors1["em2"]="Email should contain @";
    }
    if (state.email.indexOf(".") === -1) {

        errors.push("Email should contain at least one dot");
        state.errors1["em3"]="Email should contain at least one dot";
    }

    if (state.password.length < 6 ) {

        errors.push("Password should be at least 6 characters long");
        state.errors1["pwd"]="Password should be atleast 6 characters long"
    }

    if (state.password !== state.confirmpassword ) {

        errors.push("Password and Confirm password should be same");
        state.errors1["cpwd"]="Password and Confirm password should be same"
    }

    return errors;
}
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signupSuccess: false,
            signupError: false,
            firstName: '',
            lastName: '',
            dob: '',
            mobile: '',
            confirmpassword:'',
            error:false,
            errors1:{}
         
        }

    }
    handleEmailChange = (eve) => {
        console.log(eve.target.value)
        this.setState({ email: eve.target.value });
        this.setState({errors1:{}})
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
        this.setState({errors1:{}})
    }
    handleConfirmPasswordChange = (e) => {
        this.setState({ confirmpassword: e.target.value });
        this.setState({errors1:{}})
    }
    handleFirstNameChange = (e) => {
        this.setState({errors1:{}})
        if (e.target.value.match("^[A-Za-z]*$") != null) {
            this.setState({ firstName: e.target.value })
        }
        else {
            this.setState({ error: 'Enter a valid firstname' })
        }

    }
    handleLastNameChange = (ev) => {
        this.setState({errors1:{}})
        if (ev.target.value.match("^[A-Za-z]*$") != null) {
            this.setState({ lastName: ev.target.value })
        }
    }
    handleDobChange = (e) => {
        this.setState({ dob: e.target.value })
        this.setState({errors1:{}})
    }
    handleMobileChange = (event) => {
        this.setState({ mobile: event.target.value })
        this.setState({errors1:{}})
    }
     
        handleSubmit(event)
        {
            event.preventDefault();
            const errors=validate(this.state);
            this.setState({errors:errors});
            if(errors.length>0){
                console.log("errors")
                console.log(errors);
                this.setState({error:true});
            }else{
                console.log("success")
                this.setState({signupSuccess:true})
                let data={
                    "email":this.state.email,
                    "password":this.state.password,
                    "name":this.state.firstName+" "+this.state.lastName,
                    "dob":this.state.dob,
                    "phone":this.state.phone
    
                };
                console.log(data);
                axios.post('http://localhost:3000/login',data)
                    .then(resp=>{
                        console.log(resp);
                        return <Redirect to={{
                            pathname: "/", state: {
                                isLoggedIn: true
                            }
                        }} />
                    },error=>{
                        console.log("error");
                        console.log(error);
                    })
            }
          
        }

    

    render() {


        return (

    <div className="register" >
        <div className="register__header">
    <Header></Header>
    </div>
    <div className="container">
    <h3 className="register__heading">User Signup</h3>
    <hr/>
    <div className="register__form" >
    <form  onSubmit={this.handleSubmit.bind(this)}  style={{bottom:'0px'}} noValidate>
    <div>
    <label><b>First Name</b></label>
    <input type="text" placeholder="Enter Firstname" name="fname" required  onChange={this.handleFirstNameChange.bind(this)} />
    <div className="invalid-feedback">Please provide Name</div>
     {this.state.error===true && (<div className="alert-danger">{this.state.errors1["fn"]}</div>)}
    </div>
<div>
    <label><b>Last Name</b></label>
    <input type="text" placeholder="Enter Lastname" name="lname" required onChange={this.handleLastNameChange.bind(this)} />
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["ln"]}</div>)}
    </div>
    <div>
     <label><b>Email</b></label>
    <input type="email" placeholder="This will be your Username" name="uname" required onChange={this.handleEmailChange.bind(this)} />
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["em1"]}</div>)}
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["em2"]}</div>)}
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["em3"]}</div>)}
    </div>
    <div>
    <label><b>Date Of Birth</b></label>
    <input type="date" placeholder="Enter DoB" name="dob" style={{backgroundColor:'white'}} required onChange={this.handleDobChange.bind(this)} />
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["dob"]}</div>)}
    </div>
    <div>
    <label><b>Phone Number</b></label>
    <input type="number" placeholder="Enter 10 digit phone number" name="pno" minLength="10" maxLength="10" required="true" onChange={this.handleMobileChange.bind(this)} />
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["ph"]}</div>)}
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["ph1"]}</div>)}
    </div>
    <div>
    <label><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required onChange={this.handlePasswordChange.bind(this)} />
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["pwd"]}</div>)}
    </div>
    <div>
    <label><b>Confirm Password</b></label>
    <input type="password" placeholder="Re-enter Password" name="conpwd" required onChange={this.handleConfirmPasswordChange.bind(this)} />
    {this.state.error===true && (<div className="alert-danger">{this.state.errors1["cpwd"]}</div>)}
    </div>
    {/* <label>
        <input type="checkbox" checked="checked" name="remember" required /> I accept the <p>terms and conditions</a>
      </label> */}
        {/* {this.state.error===true && (<div className="alert-danger">{this.state.errors.map(m=>m)}</div>)} */}
        {this.state.signupSuccess===true && (<div className="alert alert-success">Signup Success! Please Login</div>)}
        <div >
    <button className="register__submitButton" type="submit">Signup</button>
    </div>
    </form>
    </div>
    </div>
</div>


            
        );
           
    }
}

export default Register;