import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthenticationContext } from '@axa-fr/react-oidc-context';
import JSONPretty from 'react-json-pretty';
import { JSONTheme } from '../Config/JSONTheme';
import jwt from 'jwt-simple'

const TokenPage = () => {
  return(
    <span>
      <Row>
        <Col>
          <h2>Token Details</h2>
        </Col>
      </Row>
      <AuthenticationContext.Consumer>
        {props => {
          return(
            <span>
              <Row>
                <Col xs={6}>
                  <h5>ID Token</h5>
                  <JSONPretty
                    data={props.oidcUser ? jwt.decode(props.oidcUser.id_token, '', true) : {user: null}}
                    theme={JSONTheme}
                    style={{fontSize: "1em"}}
                  />
                </Col>
                <Col xs={6}>
                  <h5>Access Token</h5>
                  <JSONPretty
                    data={props.oidcUser ? jwt.decode(props.oidcUser.access_token, '', true) : {user: null}}
                    theme={JSONTheme}
                    style={{fontSize: "1em"}}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  {props.oidcUser ? (<h5>Raw Access Token</h5>) : null}
                  <p className="text-muted" style={{fontSize:"0.8em", overflowWrap:"break-word"}} muted>{props.oidcUser ? props.oidcUser.access_token : null}</p>
                </Col>
              </Row>
            </span>            
          );}
        }

      </AuthenticationContext.Consumer>
    </span>
  )
};

export default TokenPage;
