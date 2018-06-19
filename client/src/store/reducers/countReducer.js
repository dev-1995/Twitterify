import {SET_VIEW_COUNT} from '../actions/action';


const reducer = (state={},action) =>{
	if(action.type===SET_VIEW_COUNT)
	{
		if(state.ViewCount[action.value])
		{
			let obj = {...state.ViewCount};
			obj[action.value] = 1;
			return {
				...state,
				ViewCount:obj
			}
		}
		else
		{	
			let obj = {...state.ViewCount};
			console.log(obj[action.value] );
			return {
				...state,
				ViewCount:obj
			}
		}	
	}
}
export default reducer;