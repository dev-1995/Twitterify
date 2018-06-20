import React, { Component } from 'react';
// import logo from './logo.svg';
import { Row,Col} from 'react-materialize';
import Tweet from './components/Tweet/Tweet';
import './App.css';
import Navigation from './components/NavBar/NavBar';
import FullTweet from './components/FullTweet/FullTweet';
import Paginate from './components/Paginate/Paginate';
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
      console.log(this.props,response);
      this.getTweets();
    })
    .catch(error=>{ this.props.setLogin(false);console.log(error)});
   
  }

  getTweets = (count)=>
  {
    axios.get('/tweets/'+this.props.PageCount).then(response=>{
        this.props.storeTweets(response.data.tweets);        
     }).catch(error=>console.log(error));
  }

  getMoretweets = ()=>
  {
    this.props.updatePageCount();
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
                   <Route path="/"  exact render={()=> {return this.props.Tweets.map((tweet,index)=>{
                    return <Tweet tweet={tweet} key={index} /> 

                   })}} />
                  {this.props.IsLoggedIn ? 
                  <Route path="/" exact render={()=><Paginate click={this.getMoretweets} />} />
                  :null
                  }
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
        PageCount:state.tlReduce.PageCount
    };
};

const mapDispatchToProps = dispatcher => {
  return {
        storeTweets: (data)=>dispatcher({type:actionType.STR_TWEETS,value:data}),
        setDP: (url)=>dispatcher({type:actionType.SET_DP,value:url}),
        setUsername: (name)=>dispatcher({type:actionType.SET_NAME,value:name}),
        setLogin: (val)=>dispatcher({type:actionType.SET_LOGIN,value:val}),
        updatePageCount: (count)=>dispatcher({type:actionType.UPDATE_PAGE_COUNT,value:count}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
