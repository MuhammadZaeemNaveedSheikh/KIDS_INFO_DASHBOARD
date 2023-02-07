import React, { Component } from 'react';
import loginImg from '../../../../login.svg';
import { Form, Button, Alert } from 'react-bootstrap';
import { register } from '../../../../actions/auth';
import { Navigate } from 'react-router-dom';
import M from 'materialize-css';
import '../../../../../src/App.css'
import {BeatLoader} from 'react-spinners';
import {css} from '@emotion/core';
import { SettingsOverscanTwoTone } from '@material-ui/icons';
class Register extends Component {
  state = {
    email: '',
    password: '',
    passwordCheck: '',
    displayName: '',
    image:'',
    url:'',
    user: null,
    msg: null,
    variant: null,
    verified:false,
    loading:false
  };
  loaderCSS = css`
  margin-top:100px;
 `
 
  onChange = e => {
    if (e.target.name == "file") {
      this.setState({ [e.target.name]: e.target.files[0] });
    }
    else{
      this.setState({ [e.target.name]: e.target.value });
    }
  };
 
  
  onSubmit = () => {
    
    let form = new FormData()
    form.append("email",this.state.email)
    form.append("password",this.state.password)
    form.append("passwordCheck",this.state.passwordCheck)
    form.append("displayName",this.state.displayName)
    form.append("profilePicture",this.state.file)
    form.append("verified",this.state.verified)
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)){
      M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
      return
    }if(this.state.password.length < 8){
      M.toast({html: "password should be minimum 8 characters",classes:"#c62828 red darken-3"})
      return
    }
    if(!this.state.password === this.state.passwordCheck){
      M.toast({html: "password and confirm password are not same",classes:"#c62828 red darken-3"})
      return
    }
    
   
    
    register(
      
      form,
      user => {
        
        this.setState({ user, msg: 'Sign up successful', variant: 'success' });
        setTimeout(() => {
          this.setState({ redirect: '/app/dashboard' });
        },500);
        M.toast({html:"Sign up successful",classes:"#43a047 green darken-1"})
      },
      ()=>{
        this.setState({loading:false})
      }
     
   
    );
    
    this.setState({loading:true})
    
  
  };

  
  render() {
    const {loading} = this.state.loading;

    return (
      
      <div className="base-container" ref={this.props.containerRef}>
      
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="" />
          </div>
          <div className="form">
            <Form id="register">
              {this.state.msg ? (
                <Alert variant={this.state.variant}>{this.state.msg}</Alert>
              ) : null}

              <div className="form-group">
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="displayName"
                    onChange={this.onChange}
                    type="text"
                    placeholder="Name"
                  />
                </Form.Group>
              </div>
              <div className="form-group">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={this.onChange}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className="form-group">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
              </div>
              <div className="form-group">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password Confirm</Form.Label>
                  <Form.Control
                    name="passwordCheck"
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password Confirm"
                  />
                </Form.Group>
              </div>
              <div className="form-group">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    name="file"
                    onChange={this.onChange}
                    type="file"
                  />
                </Form.Group>
              </div>
              <Button variant="primary" onClick={this.onSubmit}  className="btn waves-effect waves-light" disabled={this.state.loading}>
                {this.state.loading && <BeatLoader color="green" /> 
                }
                Register
              </Button>
              
            </Form>
          </div>
        </div>
        {this.state.redirect && <Navigate to={this.state.redirect} />}
      </div>
    );
  }
}
export default Register;
