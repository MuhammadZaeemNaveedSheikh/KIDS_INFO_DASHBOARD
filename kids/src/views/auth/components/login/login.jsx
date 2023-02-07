import React, { Component } from 'react';
import loginImg from '../../../../login.svg';
import { Form, Button, Alert } from 'react-bootstrap';
import { login,reset } from '../../../../actions/auth';

import { Link, Navigate } from 'react-router-dom';
import Modal from "@material-ui/core/Modal"
import { withStyles } from '@material-ui/core/styles';
import M from 'materialize-css';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}


function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = ((theme) => ({
  fgpassword: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  
    
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
class Login extends Component {
  

  state = {
    email: '',
    password: '',
    user: null,
    msg: null,
    variant: null,
    open: false,
    location : '',
    modalStyle: getModalStyle

  };
 

  


  

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.setState({location: "Latitude: " + position.coords.latitude +
  " Longitude: " + position.coords.longitude})
  
      });
    } 
  };
  onSubmit = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)){
      M.toast({html: "invalid email or password",classes:"#c62828 red darken-3"})
      return
    }
    if(this.state.password.length < 8){
      M.toast({html: "invalid email or password",classes:"#c62828 red darken-3"})
      return
    }
    
    {console.log(this.state)}
    login(
      
      {
        email: this.state.email,
        password: this.state.password,
        loc: this.state.location
      },
      user => {
        this.setState({ user, msg: 'Sign in successful', variant: 'success' });
        this.setState({ redirect: '/app/dashboard'});
        M.toast({ html: "Sign in successful", classes: "#43a047 green darken-1" })
      }

    );
  };
  onReset = () => {
    reset(
      {
        email: this.state.email
      },
      user => {
        this.setState({ user, msg: 'Password Reset', variant: 'success' });
        this.setState({ redirect: '/' });
        M.toast({ html: "Password Reset", classes: "#43a047 green darken-1" })
        
      }

    );
  };



  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={this.onChange}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

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
            <div className="footer">
              <Button variant="primary" onClick={this.onSubmit} className="btn">
                Submit
              </Button>
            </div>
            <br></br>
            {/* <Divider/> */}
            <br></br>

            <Modal />

          </Form>
          <div>
          <Form id="reset">
            <Button  onClick={this.handleOpen}>
              Forgot Password
            </Button>
            <Modal
              open={this.state.open}
              className={classes.modal}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={this.modalStyle} className={classes.fgpassword} className={classes.paper}>
                <h2 id="simple-modal-title">Reset Password</h2>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={this.onChange}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Button  onClick={this.onReset}>
              Reset Password
              </Button>


              </div>
            </Modal>
            </Form>
          </div>

        </div>
        {this.state.redirect && <Navigate to={this.state.redirect} />}
      </div>


    );
  }
} 
export default withStyles(useStyles)(Login);
