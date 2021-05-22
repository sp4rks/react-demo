import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import AuthConfig from '../Config/Auth';
import { ConfigContext } from '../Config/ConfigContext';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  handleEditClick(key) {
    this.setState({
      editing: key
    });
  }

  handleUpdateClick(key) {
    let newValue = document.getElementById(key).value;
    console.log('Updating ' + key + ' from ' + this.context[key] + ' to ' + newValue);
    console.log(newValue);
    this.context.setClientID(newValue);
    this.setState({
      editing: false
    });
  }

  handleCancelClick() {
    this.setState({
      editing: false
    });
  }

  renderNormalRow(key, value) {
    if (!(key in AuthConfig)) {
      return null;
    }
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value.toString()}</td>
        <td>{this.state.editing ? <span/> : <Button size={"sm"} hidden={this.state.editing} onClick={() => this.handleEditClick(key)}>Edit</Button>}</td>
      </tr>
    );
  }

  renderEditingRow(key, value) {
    if (!(key in AuthConfig)) {
      return null;
    }

    return (
      <tr key={key}>
        <td>{key}</td>
        <td><Form.Control id={key} defaultValue={value}></Form.Control></td>
        <td>
          <Button size={"sm"} variant="success" onClick={() => this.handleUpdateClick(key)}>Update</Button>{'   '}
          <Button size={"sm"} variant="danger" onClick={() => this.handleCancelClick()}>Cancel</Button>
        </td>
      </tr>
    );
  }

  renderConfig() {
    return Object.keys(this.context).map((key, i) => (
      key === this.state.editing ?
        this.renderEditingRow(key, this.context[key])
         : 
        this.renderNormalRow(key, this.context[key])
    ));
  }

  render() {
    return(
      <span>
        <Row>
          <Col>
            <h2>Home</h2>
            <p>A simple, configurable OIDC enabled application useful in demonstrations and proofs of concept.</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Config</h5>
            <Form>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderConfig()}
              </tbody>
            </Table>
            </Form>
          </Col>
        </Row>
      </span>
    );
  }
}
HomePage.contextType = ConfigContext;

export default HomePage;
