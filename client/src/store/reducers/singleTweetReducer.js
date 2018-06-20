import * as actionType from '../actions/action';
import { updateState } from '../utility.js'
const initialState = {
    ProfileImg:'',
    CurrUser:'',
    UserHandle:'',
    Liked:false,
    TweetId:'',
    FullTweet:'',
    Views:{}
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
		case actionType.SET_VIEW_COUNT:
			if(state.Views[action.value])
			{
				const obj  = {...state.Views}
				obj[action.value] = obj[action.value] + 1;
				return updateState(state,{Views:obj});
			}
			else
			{
				const obj  = {...state.Views}
				obj[action.value] = 1;
				return updateState(state,{Views:obj});
			}
		default:
			break;	 
	}
	return state;
}

export default reducer;
 