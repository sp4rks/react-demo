import React from 'react';

import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import { AuthenticationContext } from '@axa-fr/react-oidc-context';

import Definitions from '../Router/Definitions';

class Header extends React.Component {

  buildNavLinks(props) {
    return Definitions.map((route, key )=> {

      var navLink = null;
      let routeVisible = (!route.authRequired || props.oidcUser || !props.isEnabled);
      
      if (routeVisible) {
        navLink = (<Link className="nav-link" to={route.path} key={key}>{route.name}</Link>);
      }

      return navLink;
      
    });
  }

  render () {
    return (
      <AuthenticationContext.Consumer>
        {props => {
          return(
            <Navbar bg="light" className="mb-2">
            <Navbar.Brand href="/">
              <img
                src="/oidc.jpg"
                width="30"
                className="mr-2"
                height="30"
                alt="AppAuth Logo"
              />
              Development
            </Navbar.Brand>
  
            <Nav className="mr-auto">
              {this.buildNavLinks(props)}
            </Nav>
            <Nav>
              {props.oidcUser || !props.isEnabled ? (
                <Button className="btn-info" onClick={props.logout}>Logout</Button>
              ) : (
                <Button className="btn-info" onClick={props.login}>Login</Button>)
              }
            </Nav>
          </Navbar>
          );
        }}
      </AuthenticationContext.Consumer>
    );
  }
}

export default Header;