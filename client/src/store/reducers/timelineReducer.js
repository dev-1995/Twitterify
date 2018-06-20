import * as actionType from '../actions/action';
import { updateState } from '../utility';

const initialState = {
	  IsLoggedIn:false,
    Posts : [],
    Username:'',
    DisplayPic:'',
    PageCount:5
}
const reducer =(state=initialState,action)=>{
	switch (action.type) {
		case actionType.STR_TWEETS:
			console.log(action.value)
			return updateState(state,{Posts:[...action.value]})

		case actionType.SET_DP:
			return updateState(state,{DisplayPic:action.value})

		case actionType.SET_NAME:
			return updateState(state,{Username:action.value})
			
		case actionType.SET_LOGIN:
			return updateState(state,{IsLoggedIn:action.value})

		case actionType.UPDATE_PAGE_COUNT:
			const newState = {...state,PageCount:state.PageCount+5}
			return newState;
			

		default:
			return state;
	}
	
}

export default reducer;
 