import * as actionType from '../actions/action';
const initialState = {
	  IsLoggedIn:false,
    Posts : [],
    Username:'',
    DisplayPic:''
}
const reducer =(state=initialState,action)=>{
	switch (action.type) {
		case actionType.STR_TWEETS:
			return {
				...state,
				Posts:state.Posts.concat(action.value)
			}
		case actionType.SET_DP:
			return{
				...state,
				DisplayPic:action.value
			}
		case actionType.SET_NAME:
			return {
				...state,
				Username:action.value
			}
		case actionType.SET_LOGIN:
			return {
				...state,
				IsLoggedIn:action.value
			}
		default:
			break;
	}
	return state;
}

export default reducer;
 