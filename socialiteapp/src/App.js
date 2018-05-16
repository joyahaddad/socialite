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
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import iconleft from './lefticon.png'
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


var divStyle = {
    backgroundColor: '#3b5998',
    textAlign: 'center',
    fontFamily: 'sifonn'
  }


  const stylesLikes = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)',
    },
  };



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
     images: [],
     imageTitles: [],
     yeardata: {
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
     },

     monthdata: {
      labels: [
       'Jan',
       'Feb',
       'Mar',
       'Apr',
       'May',
       'Jun',
       'Jul',
       'Aug',
       'Sep',
       'Oct',
       'Nov',
       'Dec'
      ],
      datasets: [{
       data: [1,1,1,1,1,1,1,1,1,1,1,1],
       backgroundColor: [
       '#FF6384',
       '#36A2EB',
       '#FFCE56',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB',
       '#36A2EB'
       ],
       hoverBackgroundColor: [
       '#FF6384',
       '#36A2EB',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56',
       '#FFCE56'
       ]
      }]
     }
   };
   this.responseFacebook = this.responseFacebook.bind(this);
   this.test = this.test.bind(this);
   this.fetch_likes = this.fetch_likes.bind(this);
   this.draw_images = this.draw_images.bind(this);
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
   this.fetch_likes();
   //this.setState({images: pageurls});

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
  var monthscount = [1,1,1,1,1,1,1,1,1,1,1,1];

  const datasetsCopy = this.state.yeardata.datasets.slice(0);
  const dataCopy = datasetsCopy[0].data.slice(0);

  const datasetsCopy2 = this.state.monthdata.datasets.slice(0);
  const dataCopy2 = datasetsCopy2[0].data.slice(0);


   this.state.response.map((res,index) => {
      console.log(res);
        console.log(res.data.created_time.split('-',5)[0]);
         if(res.data.created_time.split('-',5)[0] == '2016')  {
             localyearone = localyearone+1; 
         }

           if (res.data.created_time.split('-',5)[0] == '2017')  {
                localyeartwo = localyeartwo+1; 
           }
          
            if (res.data.created_time.split('-',5)[0] == '2018')  {
                localyearthree = localyearthree+1;  
                 monthscount[res.data.created_time.split('-',5)[1]-1] = monthscount[res.data.created_time.split('-',5)[1]-1] + 1;
                 console.log(res.data.created_time.split('-',5)[1]-1);
                 console.log('monthscount ',monthscount[res.data.created_time.split('-',5)[1]]-1); 
            }     

            dataCopy[0] = localyearone;
         console.log('year1',localyearone);
    
         dataCopy[1] = localyeartwo;
         console.log('year2',localyeartwo);
    
        
         dataCopy[2] = localyearthree;
         console.log('year3',localyearthree);

    
         datasetsCopy[0].data = dataCopy;

         for (var n=0; n<11; n++) {
         dataCopy2[n] = monthscount[n];
         }

         datasetsCopy2[0].data = dataCopy2;

         this.setState({
          monthdata: Object.assign({}, this.state.monthdata, {
              datasets: datasetsCopy2
          })
          });
        console.log(monthscount);

         this.setState({
          yeardata: Object.assign({}, this.state.yeardata, {
              datasets: datasetsCopy
          })
          });     
 
},this);

}


draw_images() {

  return(this.state.images.map((data,index) => {
      return(<img key={index} src={data}/>);
  }));
  
}


fetch_likes(){
  
  graph.setAccessToken(this.state.token);
  graph.setVersion("3.0");
  var flag = false ;
  var paged_res;
  var next_req;
  var page = 0;
  var pageurls = [];
  var titlelikes=[];


  axios.get('https://graph.facebook.com/v3.0/me?fields=likes&access_token='+ this.state.token +'')

  .then( (res) => {
    
    console.log(res);
    res.data.likes.data.map((data,index) => {
      
      console.log(data);
      pageurls.push('https://graph.facebook.com/v3.0/' + data.id+ '/picture?fields=url&access_token='+ this.state.token +'');
      titlelikes.push(data.name);
      this.setState({images: pageurls});
      this.setState({imageTitles: titlelikes});
    },this);

  })
  .catch( (error) => {
    console.log(error);
  });  

}

///////

 
  render() {

      const stylefbdiv = {
        display: this.state.facebookel
      }
    
    return (


        <MuiThemeProvider>
                <div>
          <Card>

                  <div style={divStyle}>
                  <div style={stylefbdiv}>
                  <CardMedia>
            <img src={img} alt="img" />
            
            </CardMedia>

                  
                <FacebookLogin
                  appId = "1645847055464084"
                  cookie = {true}
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="user_posts,user_likes"
                  callback={this.responseFacebook}
                   />
                   </div>
                   </div>  
                    
            
            </Card>



           

       <AppBar
          title=""
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementLeft={<img src={iconleft} style={{height: 54}}/>}
          iconElementRight={<FlatButton label="Log Out" />}
          style={{
            backgroundColor: '#3b5998',
            fontFamily:'montserrat',
          }}
           />

          <button
               className="btn-margin"
               onClick={this.test}
             >
               TEST
             </button>
          

            
            <div><Doughnut data={this.state.yeardata} redraw={true}/></div>
          
            <div><Doughnut data={this.state.monthdata} redraw={true}/></div>



  <div style={stylesLikes.root}>
    <GridList style={stylesLikes.gridList} cols={2.2}>
      {this.state.images.map((data,index) => (
        <GridTile
          key={index}
          title={this.state.imageTitles[index]}
          titleStyle={stylesLikes.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={data} />
        </GridTile>
      ))}
    </GridList>
  </div>



 
          
     </div>
     </MuiThemeProvider>

  
    );
  }
}

export default App;
