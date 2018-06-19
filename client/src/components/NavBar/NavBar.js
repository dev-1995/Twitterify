import React from 'react';
import {NavItem,Navbar} from 'react-materialize';


const Navigation = (props) => 
{
	return ( <Navbar brand={<div className="brandLogo"><img alt="twitter" src={require("../../assets/twitter.png")} /><h4 >Twitterify</h4></div>} right>

        {props.IsLoggedIn ? 
          <div>
          <NavItem className="dpImg" href="#">
          <img className="imgCircle" alt="{props.Username}" src={props.DisplayPic} /> 
          </NavItem>
           
          <NavItem href="#">
           {props.Username.toUpperCase()}
          </NavItem>
          <NavItem  >
          Logout</NavItem>
          </div>
          
          : <NavItem href="http://127.0.0.1:5000/auth/twitter">Login</NavItem>
           }
           
      </Navbar>)
}
export default Navigation;