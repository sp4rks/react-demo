import React from 'react';

import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider, oidcLog, WebStorageStateStore } from '@axa-fr/react-oidc-context';

import Container from 'react-bootstrap/Container';

import Header from './Layout/Header';
import Routes from './Router/Routes';
import CustomCallback from './Pages/CustomCallback';

import AuthConfig from './Config/Auth';
import { ConfigContext } from './Config/ConfigContext';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthConfig;
    this.setters = {
      setClientID: this.setClientID
    };
  }

  setClientID = client_id => {
    this.setState({ client_id });
  };

  render() {
    return(
      <Container className="p-3">
        <ConfigContext.Provider value={{...this.state, ...this.setters}}>
          <AuthenticationProvider
            configuration={this.state}
            loggerLevel={oidcLog.DEBUG}
            isEnabled={true}
            callbackComponentOverride={CustomCallback}
            UserStore={WebStorageStateStore}
          >
            <Router>
              <Header />
              <br />
              <Routes />
            </Router>
          </AuthenticationProvider>
        </ConfigContext.Provider>
      </Container>
    );
  }
}

render(<App />, document.getElementById('root'));
