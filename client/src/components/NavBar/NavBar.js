import React from 'react';
import {NavItem,Navbar} from 'react-materialize';
import {Link} from 'react-router-dom';

const Navigation = (props) => 
{
	return ( <Navbar brand={<Link to="/" className="brandLogo" componentclass="span"><img alt="twitter" src={require("../../assets/twitter.png")} /><h4 >Twitterify</h4></Link>} right>

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