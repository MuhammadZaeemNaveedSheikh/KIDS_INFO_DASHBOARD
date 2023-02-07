import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { verify } from '../../../actions/auth';
import {  Navigate } from 'react-router-dom';
import M from 'materialize-css';


class ChangePassword extends Component {


  state = {
    email: '',
    password: '',
    user: null,
    msg: null,
    variant: null,
    open: false,
    // token:window.location.href.split("/")[window.location.href.split("/").length-1],
    
  };
//   componentDidMount() {
//     const { token } =  this.props.params;
//     this.fetchData(token);
// }
// componentDidMount() {
//   const { id } = this.props.params;
//   // ...
// }
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => {
    if(this.state.password.length < 8){
      M.toast({html: "password should be 8 characters atleast",classes:"#c62828 red darken-3"})
      return
    }
    verify(
      {
        
        password: this.state.password,
      },
      user => {
        this.setState({ user, msg: 'Password Changed', variant: 'success' });
        this.setState({ redirect: `/NewPassword/${this.state.email}` });
        M.toast({ html: "Password Changed", classes: "#43a047 green darken-1" })
      }

    );
  };




  render() {
    const { classes } = this.props
    return (
      <div className="base-container" ref={this.props.containerRef}>
        
        <div className="header">Update Password</div>
        <div className="content">
          <Form id="login">
            
            {this.state.msg ? (
              <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null}

            <div className="form">
              

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={this.onChange}
                  type="password"
                  placeholder="Enter New Password"
                />
              </Form.Group>
            </div>
            <div className="footer">
              <Button variant="primary" onClick={this.onSubmit} className="btn">
                Update Password
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
export default (ChangePassword);
