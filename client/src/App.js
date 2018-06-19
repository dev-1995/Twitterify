import React, { Component } from 'react';
// import logo from './logo.svg';
import { Row,Col} from 'react-materialize';
import Tweet from './components/Tweet/Tweet';
import './App.css';
import Navigation from './components/NavBar/NavBar';
import FullTweet from './components/FullTweet/FullTweet';
import {BrowserRouter,Route} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionType from './store/actions/action';

class App extends Component {
 

  componentDidMount() {
    axios.get('/profile').then(response=>{
      this.props.setLogin(true);
      this.props.setUsername(response.data.data.name);
      this.props.setDP(response.data.data.profile_image_url);
      this.getTweets();
    })
    .catch(error=>console.log(error));
   
  }

  getTweets = ()=>
  {
    axios.get('/tweets').then(response=>{
        this.props.storeTweets(response.data.tweets);        
     }).catch(error=>console.log(error));
  }
   
   
  render() {
    return (
      
         <BrowserRouter>
              <div>       
                  <Navigation IsLoggedIn={this.props.IsLoggedIn} Username = {this.props.Username} DisplayPic = {this.props.ProfilePic} />
                  <Row>
                  <Col s={3}>
                  
                  </Col>
                   <Col s={6}>
                   <Route path="/" exact render={()=> {return this.props.Tweets.map((tweet,index)=>{
                    return <Tweet tweet={tweet} key={index} /> 

                   })}} />
                  <Route path="/tweet/:id"  component={FullTweet}  />
                    
                   
                  </Col>
                   <Col s={3}>
                  </Col>
                  
                  </Row>
                </div>
          </BrowserRouter>  
      
     )
  }
}
const mapStateToProps = state => {
    return {
        IsLoggedIn: state.tlReduce.IsLoggedIn,
        Tweets:state.tlReduce.Posts,
        Username:state.tlReduce.Username,
        ProfilePic:state.tlReduce.DisplayPic,
        CurrUser:state.CurrUser,
        TweetId:state.TweetId,
        Liked:state.Liked,
        FullTweet:state.FullTweet,
        ProfileImg:state.ProfileImg,
        UserHandle:state.UserHandle
    };
};

const mapDispatchToProps = dispatcher => {
  return {
        storeTweets: (data)=>dispatcher({type:actionType.STR_TWEETS,value:data}),
        setDP: (url)=>dispatcher({type:actionType.SET_DP,value:url}),
        setUsername: (name)=>dispatcher({type:actionType.SET_NAME,value:name}),
        setLogin: (val)=>dispatcher({type:actionType.SET_LOGIN,value:val}),
        setFullTweet: (text)=>dispatcher({type:actionType.SET_FULL_TWEET,value:text}),
        setTweetId: (id)=>dispatcher({type:actionType.SET_TWEET_ID,value:id}),
        setCurrUser: (user)=>dispatcher({type:actionType.SET_CURR_USER,value:user}),
        setTwitHandle: (handle)=>dispatcher({type:actionType.SET_HANDLE,value:handle}),
        setProfileImg: (img)=>dispatcher({type:actionType.SET_PROF,value:img}),
        setLike: (like)=>dispatcher({type:actionType.SET_LIKE,value:like}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
