import React from 'react';
import { Button } from 'react-materialize';
const Paginate = (props)=>
{
	return (
	 <Button waves='light' onClick={props.click}  className="loadMore">More</Button>)
}
export default Paginate;