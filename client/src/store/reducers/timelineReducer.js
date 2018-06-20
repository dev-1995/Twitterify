import * as actionType from '../actions/action';
import { updateState } from '../utility';

const initialState = {
	  IsLoggedIn:false,
    Posts : [],
    Username:'',
    DisplayPic:'',
    Views:[],
    PageCount:5
}
const reducer =(state=initialState,action)=>{
	switch (action.type) {
		case actionType.STR_TWEETS:
			return updateState(state,{Posts:[...action.value]})

		case actionType.SET_DP:
			return updateState(state,{DisplayPic:action.value})

		case actionType.SET_NAME:
			return updateState(state,{Username:action.value})
			
		case actionType.SET_LOGIN:
			return updateState(state,{IsLoggedIn:action.value})
			
		case actionType.SET_VIEW_COUNT:
		console.log(action.value,state.Views);
			return updateState(state,{Views:state.Views.concat(action.value)});

		case actionType.UPDATE_PAGE_COUNT:
			return updateState(state,{PageCount:state.PageCount+5});

		default:
			return state;
	}
	
}

export default reducer;
 