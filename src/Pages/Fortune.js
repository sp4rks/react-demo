import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthenticationContext } from '@axa-fr/react-oidc-context';

const forceWrap = {
  overflowWrap: "break-word"
}

class FortunePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fortune: 'Your fortune is uncertain.',
      access_token: null
    };
  }

  static contextType = AuthenticationContext;

  getFortune(token) {
    fetch('http://fortunedev:3000/', {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            fortune: result.fortune,
            username: result.username,
            generated: result.generated
          });
        },
        (error) => {
          this.setState({
            fortune: 'Fortune favours the bold'
          });
        }
      )
  }

  componentDidMount() {
    this.getFortune(this.context.oidcUser.access_token);
  }

  render () {
    return(
      <AuthenticationContext.Consumer>
        {props => {
          return(
            <span>
              <Row>
                <Col>
                  <h2>Your Fortune!</h2>
                  <h4 className="text-muted">Is as follows</h4>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <h5>{this.state.fortune}</h5>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12}>
          <p className="text-muted" style={forceWrap}>Generated for {this.state.username} at {this.state.generated}</p>
                </Col>
              </Row>
              <Row hidden>
                <Col xs={12}>
                  <p className="text-muted" style={forceWrap}>{props.oidcUser.access_token}</p>
                </Col>
              </Row>
            </span>
          );
        }}
      </AuthenticationContext.Consumer>
    )
  }
}

export default FortunePage;
