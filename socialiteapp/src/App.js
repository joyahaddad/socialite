import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import Image from 'material-ui-image';
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
          title="S o c i a l i t e"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{
            backgroundColor: 'rgba(0,0,0,.9)',
            fontFamily:'montserrat',
          }}

           />
          

        <Image src="https://images.unsplash.com/photo-1522897048979-e407743f3603?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc4fc93c0182e8346741c14f49cca546&auto=format&fit=crop&w=1651&q=80" 
         style ={{
          padding: 400,
         }}
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
