import React, { Component } from 'react';
// import logo from './logo.svg';
import { Row,Col} from 'react-materialize';
import Tweet from './components/Tweet/Tweet';
import './App.css';
import Navigation from './components/NavBar/NavBar';
import {BrowserRouter,Route} from 'react-router-dom';
import axios from 'axios';
class App extends Component {
  state = {
    IsLoggedIn:false,
    Posts : [],
    Username:'',
    DisplayPic:''
  };

  componentDidMount() {
    axios.get('/profile').then(response=>{
      this.setState({IsLoggedIn:true,Username:response.data.data.name,DisplayPic:response.data.data.profile_image_url});
      this.getTweets();
    })
    .catch(error=>console.log(error));
   
  }
  getTweets = ()=>
  {
    axios.get('/tweets').then(response=>{
        
        this.setState({Posts:this.state.Posts.concat(response.data.tweets)});

        
     }).catch(error=>console.log(error));
  }

   
  render() {
    return (
      <BrowserRouter>
        <div>       
            <Navigation IsLoggedIn={this.state.IsLoggedIn} Username = {this.state.Username} DisplayPic = {this.state.DisplayPic} />
           
          <Row>
          <Col s={3}>
          
          </Col>
           <Col s={6}>
           <Route path="/" render={()=> {return this.state.Posts.map((tweet,index)=>{
            return <Tweet tweet={tweet} key={index} /> 

           })}} />
           
          </Col>
           <Col s={3}>
          </Col>
          
          </Row>
          </div>
          </BrowserRouter>
     )
  }
}

export default App;
