import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import tlReducer from './store/reducers/timelineReducer';
import tweetReducer from './store/reducers/singleTweetReducer';

const rootReducer = combineReducers({
	tlReduce:tlReducer,
	tweetReduce:tweetReducer
});
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
