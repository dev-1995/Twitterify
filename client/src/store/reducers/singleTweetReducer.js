import * as actionType from '../actions/action';
import { updateState } from '../utility.js'
const initialState = {
    ProfileImg:'',
    CurrUser:'',
    UserHandle:'',
    Liked:false,
    TweetId:'',
    FullTweet:''
}
const reducer =(state=initialState,action)=>{
	switch (action.type) {
		
		case actionType.SET_FULL_TWEET:
			return updateState(state,{FullTweet:action.value})
				 
		case actionType.SET_TWEET_ID:
			return updateState(state,{TweetId:action.value})
			
		case actionType.SET_CURR_USER:
			return updateState(state,{CurrUser:action.value})
			 
		case actionType.SET_HANDLE:
			return updateState(state,{UserHandle:action.value})
			
		case actionType.SET_LIKE:
			return updateState(state,{Liked:action.value})
			
		case actionType.SET_PROF:
			return updateState(state,{ProfileImg:action.value})
		default:
			break;	 
	}
	return state;
}

export default reducer;
 