import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthenticationContext } from '@axa-fr/react-oidc-context';

import Definitions from '../Router/Definitions';

class Routes extends React.Component {

  buildRoutes(props) {
    return Definitions.map((route, key )=> {
      
      let routeInstance = null;
      let routeVisible = (!route.authRequired || props.oidcUser || !props.isEnabled);
      
      if (routeVisible) {
        routeInstance = (<Route path={route.path} exact={route.exact} component={route.page} key={key}/>);
      }
      return routeInstance;
    });
  };

  render(){
    return(
      <AuthenticationContext.Consumer>
        {props => {
          return(
            <Switch>
              {this.buildRoutes(props)}
            </Switch>
          );
        }}
      </AuthenticationContext.Consumer>
    );
  }
}

export default Routes;
