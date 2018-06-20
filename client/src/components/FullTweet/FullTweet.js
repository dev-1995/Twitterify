import React,{Component} from 'react';
import { CardPanel } from 'react-materialize';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions/action';

class FullTweet extends Component{
	
	componentDidMount()
	{
		
		if(this.props.match.params.id)
		{
			console.log(this.props);
			axios.get('/tweet/'+this.props.match.params.id).then(response=>{
				const tempObj = {...response.data.data};
				
				this.props.setFullTweet(tempObj.full_text);
				this.props.setTweetId(tempObj.id_str);
				this.props.setCurrUser(tempObj.user.name);
				this.props.setTwitHandle(tempObj.user.screen_name);
				this.props.setProfileImg(tempObj.user.profile_image_url);
				this.props.setLike(tempObj.favorited);
				this.props.setViewCount(tempObj.id_str);
			}).catch(error=>console.log(error))
		}
	}
	  
	likeTweet = ()=>{
		
		axios.get('/like/'+this.props.TweetId).then(response=>{
			this.props.setLike(true);
		}).catch(error=>console.log(error))
	}

	unlikeTweet = ()=>{
		
		axios.get('/unlike/'+this.props.TweetId).then(response=>{
			this.props.setLike(false);
		}).catch(error=>console.log(error))
	}
	render()
	{
		return (
			 <CardPanel  className="light-blue lighten-3 black-text">
		 	 <img className="handleImg" alt={this.props.CurrUser} src={this.props.ProfileImg} />
			 <span className="handleName">{this.props.CurrUser} </span>
			 <span className="handleScreen">@{this.props.UserHandle} </span>
			 <br />
	            <div>
	            <span>{this.props.FullTweet}</span>
	            <br />
	         	{this.props.Liked ?
	         		   <a onClick={this.unlikeTweet} className="likeButton">
	             <span className="entypo-heart" style={{'color':'red'}}></span>UNLIKE
	             </a> :
	         	 <a  onClick={this.likeTweet} className="likeButton">
	             <span className="entypo-heart"></span>LIKE
	             </a>}
	             <span className="viewCount">{1} Views</span>
	            </div>
        </CardPanel>
			)
	}
}
const mapStateToProps = state => {
    return {
       
        CurrUser:state.tweetReduce.CurrUser,
        TweetId:state.tweetReduce.TweetId,
        Liked:state.tweetReduce.Liked,
        FullTweet:state.tweetReduce.FullTweet,
        ProfileImg:state.tweetReduce.ProfileImg,
        UserHandle:state.tweetReduce.UserHandle,
        ViewCount:state.tlReduce.Views
    };
};

const mapDispatchToProps = dispatcher => {
  return {
     
        setFullTweet: (text)=>dispatcher({type:actionType.SET_FULL_TWEET,value:text}),
        setTweetId: (id)=>dispatcher({type:actionType.SET_TWEET_ID,value:id}),
        setCurrUser: (user)=>dispatcher({type:actionType.SET_CURR_USER,value:user}),
        setTwitHandle: (handle)=>dispatcher({type:actionType.SET_HANDLE,value:handle}),
        setProfileImg: (img)=>dispatcher({type:actionType.SET_PROF,value:img}),
        setLike: (like)=>dispatcher({type:actionType.SET_LIKE,value:like}),
        setViewCount: (tweetId)=>dispatcher({type:actionType.SET_VIEW_COUNT,value:tweetId}),
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(FullTweet);