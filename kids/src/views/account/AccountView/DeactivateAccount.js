import React, { Component } from 'react';
import { Form, Button} from 'react-bootstrap';
import { deactivate } from '../../../actions/auth';

import {Navigate } from 'react-router-dom';
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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
class DeactivateAccount extends Component {


  state = {
    email: '',
    password: '',
    newpassword:'',
    user: null,
    msg: null,
    variant: null,
    open: false,
    modalStyle: getModalStyle,
    token:null

  };
  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => {
    if(this.state.password.length < 8){
      M.toast({html: "password should be minimum 8 characters",classes:"#c62828 red darken-3"})
      return
    }
    
    deactivate(
      {
        email: JSON.parse(localStorage.getItem("userinfo")).email,
        password: this.state.password,
      },
      user => {
        this.setState({ user, msg: 'Account Deactivated', variant: 'success' });
        this.setState({ redirect: '/' });
        localStorage.clear()
        M.toast({ html: "Account Deactivated Successfully", classes: "#43a047 green darken-1" })
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
        <div className="header">Deactivate Account</div>
        <div className="content">
          <Form id="login">
            
            <Modal />

          </Form>
          <div>
          <Form id="reset">
            <Button  onClick={this.handleOpen} style={{backgroundColor:"#c62828"}}>
            Deactivate Account
            </Button>
            <Modal
              open={this.state.open}
              className={classes.modal}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={this.modalStyle} className={classes.fgpassword}>
                <h2 id="simple-modal-title">Verify  to Deactivate Account</h2>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={this.onChange}
                  disabled
                  type="email"
                  placeholder={JSON.parse(localStorage.getItem("userinfo")).email}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={this.onChange}
                  type="password"
                  placeholder="Enter password"
                />
              </Form.Group>
              
              
              <Button  onClick={this.onSubmit} style={{backgroundColor:"#c62828"}}>
              Deactivate Account
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
export default withStyles(useStyles)(DeactivateAccount);
