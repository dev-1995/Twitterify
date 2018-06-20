import {SET_VIEW_COUNT} from '../actions/action';

const initialState = {
    views: []
};

const reducer = ( state = initialState, action ) => {
    if ( action.type === SET_VIEW_COUNT) {
    		
    		var obj = {[action.value]:1};
    		var arr = state.views.concat(obj);
    		console.log(arr);
            return {
                ...state,
                views: arr
            }
         
    }
    return state;
};

export default reducer;