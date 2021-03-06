import React from 'react';
import { CardPanel } from 'react-materialize';
const Tweet = (props)=>
{
	return ( 
		
		 <CardPanel  className="light-blue lighten-3 black-text">
		 
		 <img className="handleImg" alt={props.tweet.user.name} src={props.tweet.user.profile_image_url} />
		 <span className="handleName">{props.tweet.user.name} </span>
		 <span className="handleScreen">@{props.tweet.user.screen_name} </span>
		 
		 <br />
            <div>
            <span>{props.tweet.text}</span>
            </div>
        </CardPanel>
        )
}
export default Tweet;