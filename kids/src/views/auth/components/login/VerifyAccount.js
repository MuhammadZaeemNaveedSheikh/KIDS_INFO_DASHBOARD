import React, { Component } from 'react';
import loginImg from '../../../../login.svg';
import { Form, Button, Alert } from 'react-bootstrap';
import { activate } from '../../../../actions/auth';
import {Navigate } from 'react-router-dom';
import M from 'materialize-css';

class VerifyAccount extends Component {
  state = {
    email: '',
    password: '',
    user: null,
    msg: null,
    variant: null,
    open: false,
    token:window.location.href.split("/")[window.location.href.split("/").length-1],
    verified:true,
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => {
    activate(
      {    
       
        token:this.state.token
      },
      user => {
        this.setState({ user, msg: 'Account Verified', variant: 'success' });
        this.setState({ redirect: '/' });
        M.toast({ html: "Account Verified", classes: "#43a047 green darken-1" })
      }
    );
  };
  render() {
    const { classes } = this.props
    return (
      <div className="base-container" ref={this.props.containerRef}>
        
        <div className="header">Login</div>
        <div className="content">
          <Form id="login">
            <div className="image">
              <img src={loginImg} alt="" />
            </div>
            {this.state.msg ? (
              <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null}

            <div className="form">
              

              {/* <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={this.onChange}
                  type="password"
                  placeholder="Enter New Password"
                />
              </Form.Group> */}
            </div>
            <div className="footer">
              <Button variant="primary" onClick={this.onSubmit} className="btn">
                Verify Account
              </Button>
            </div>
          
         
              
          </Form>
          <div>
          
          </div>

        </div>
        {this.state.redirect && <Navigate to={this.state.redirect} />}
      </div>


    );
  }
}
export default (VerifyAccount);
