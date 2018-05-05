import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import './App.css';
import graph from 'fb-react-sdk';

class App extends Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.test = this.test.bind(this);
    this.looptest = this.looptest.bind(this);
    this.State = {
      token: 'E',
      response: []
    }
  }

 login() {
   this.props.auth.login();
 }
 
 logout() {
   this.props.auth.logout();
 }

 test(){
  axios.get('https://graph.facebook.com/v3.0/me?fields=posts&access_token='+ this.state.token +'')

  .then( (response) => {
    this.setState({response: response.data.posts.data});
    console.log(this.state.response);
  })
  .catch( (error) => {
    console.log(error);
  });  
}

  responseFacebook(response) {
    console.log(response);
    this.setState({token: response.accessToken});
  }

  looptest() {
    return ( 
      this.state.response.map((todos,index) => {
         return(<li>5</li>)
       })
       ) 

   }


  render() {

    return (
      <div>
        <MuiThemeProvider>
          <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
           />

           <FacebookLogin
            appId = "1645847055464084"
            cookie = {true}
            autoLoad={true}
            fields="name,email,picture"
            scope="user_posts"
            callback={this.responseFacebook}
             />

            <button
               className="btn-margin"
               onClick={this.test}
             >
               TEST
             </button>
     <ul>{this.looptest}</ul>
     </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
