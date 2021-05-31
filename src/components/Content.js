import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Homepage from './home/Homepage';
import Tweets from './tweet/Tweets';
import Register from './register/Register';
import Login from './login/Login';



class Content extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div>
            {/* Content goes here */}
            <Switch>
                <Route exact path='/' component={Login}></Route>    
                <Route path='/tweets' component={Tweets}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path="/home" component={Homepage}></Route>
            </Switch> 
            </div>
         );
    }
}
 
export default Content;