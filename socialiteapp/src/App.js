import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FacebookLogin from 'react-facebook-login';
import Image from 'material-ui-image';
import axios from 'axios';
import img from './socialite.png';
import './App.css';
import graph from 'fb-react-sdk';
import {Doughnut} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

var divStyle = {
  height: 1356,
  backgroundImage: `url(${"socialite.png"})`
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
     token: 'E',
     response: [],
     facebookel: '',
     chartdata: [],
     yearone: 0,
     yeartwo: 0,
     yearthree: 0,
     data: {
      labels: [
       '2016',
       '2017',
       '2018'
      ],
      datasets: [{
       data: [100,100,100],
       backgroundColor: [
       '#FF6384',
       '#36A2EB',
       '#FFCE56'
       ],
       hoverBackgroundColor: [
       '#FF6384',
       '#36A2EB',
       '#FFCE56'
       ]
      }]
     }
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
  axios.get('https://graph.facebook.com/v3.0/me?fields=posts{object_id}&access_token='+ this.state.token +'')

  .then( (response) => {
    this.setState({response: response.data.posts.data});
    console.log(this.state.response);
    this.looptest();

  })
  .catch( (error) => {
    console.log(error);
  });  
}

responseFacebook(response) {
  console.log(response);
 this.setState({token: response.accessToken ,
                facebookel: 'none'});
                this.test();
             
}




  looptest() {
    
    graph.setAccessToken(this.state.token);
    graph.setVersion("3.0");
    console.log(this.state.token);

    var newArray = [];  
    var localyearone = 0;
    var localyeartwo = 0;
    var localyearthree = 0;

    const datasetsCopy = this.state.data.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);
  

     this.state.response.map((data,index) => {
      graph.get(data.id, function(err, res) {
       console.log(res.created_time.split('-',5)[0]);
        if(res.created_time.split('-',5)[0] == '2016')  {
            localyearone = localyearone+1; 
            console.log(localyearone);
        }

          if (res.created_time.split('-',5)[0] == '2017')  {
               localyeartwo = localyeartwo+1; 
          }
         
           if (res.created_time.split('-',5)[0] == '2018')  {
               localyearthree = localyearthree+1;  
           }     

           dataCopy[0] = localyearone;
        console.log('year1',localyearone);
   
        dataCopy[1] = localyeartwo;
        console.log('year2',localyeartwo);
   
       
        dataCopy[2] = localyearthree;
        console.log('year3',localyearthree);
   
   
        datasetsCopy[0].data = dataCopy;

        

      }
    );
   

       });

      
       this.setState({
        data: Object.assign({}, this.state.data, {
            datasets: datasetsCopy
        })
    });
   
  
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
            scope="user_posts,user_likes"
            callback={this.responseFacebook}
             />
            </div>


           <button
               className="btn-margin"
               onClick={this.test}
             >
               TEST
             </button>

            
            <div><Doughnut data={this.state.data}/></div>
     </div>
     </MuiThemeProvider>

  
    );
  }
}

export default App;
