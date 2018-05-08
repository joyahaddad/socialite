import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import Image from 'material-ui-image';
import axios from 'axios';
import img from './bg.jpeg';
import './App.css';
import graph from 'fb-react-sdk';

var divStyle = {
  backgroundImage: `url('{img}')`
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
     token: 'E',
     response: [],
     facebookel: ''
   };
   this.responseFacebook = this.responseFacebook.bind(this);
   this.test = this.test.bind(this);
   this.looptest = this.looptest.bind(this);
  
      }


 goTo(route) {
   this.props.history.replace(`/${route}`)
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
    this.setstate({response: response.data.posts.data});
    console.log(this.state.response);
  })
  .catch( (error) => {
    console.log(error);
  });  
}

responseFacebook(response) {
  console.log(response);
 this.setState({token: response.accessToken ,
                facebookel: 'none'});
}


  looptest() {
    return ( 
      this.state.response.map((todos,index) => {
         return(<li>5</li>)
       })
       )    
   }

  
  render() {

      const stylefbdiv = {
        display: this.state.facebookel
      }

    return (


        <MuiThemeProvider>
                <div style= {divStyle}>

       <AppBar
          title="S o c i a l i t e"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{
            backgroundColor: 'rgba(0,0,0,.9)',
            fontFamily:'montserrat',
          }}
           />
         
        <div style={stylefbdiv}>
        <FacebookLogin
            appId = "1645847055464084"
            cookie = {true}
            autoLoad={false}
            fields="name,email,picture"
            scope="user_posts"
            callback={this.responseFacebook}
             />
            </div>


           <button
               className="btn-margin"
               onClick={this.test}
             >
               TEST
             </button>

              
            
     <ul>{this.looptest}</ul>
     </div>
     </MuiThemeProvider>

  
    );
  }
}

export default App;
