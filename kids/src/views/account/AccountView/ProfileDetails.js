import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {displayName} from '../../../actions/auth' 
import M from 'materialize-css';
import {BeatLoader} from 'react-spinners';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { values } from 'lodash';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const[user,setUser] = useState({

  })
  const [loading,setLoading] = useState(false)
  const [name,setName]=useState()



  const [values, setValues] = useState({
    firstName: JSON.parse(localStorage.getItem("userinfo")).displayName,
    lastName: 'Naveed',
    email: 'zaeemnaveeed5@gmail.com',
    phone: '+923321965860',
    state: 'Islamabad',
    country: 'Paksitan'
  });

  const handleChange = (e) => {
    setName(

      e.target.value
    );
    
    setValues({
      ...values,
      firstName : e.target.value
    })
    console.log(e.target.value)
  

  };




  useEffect(()=>{
    setUser({
      avatar: JSON.parse(localStorage.getItem("userinfo")).picture,
      country: 'Pakistan',
      jobTitle: JSON.parse(localStorage.getItem("userinfo")).email,
      name: JSON.parse(localStorage.getItem("userinfo")).displayName,
      timezone: 'GMT+5'
    })
  },[]);

  const onSubmit = (value) => {
    
    displayName(
      {
        email:user.jobTitle,
        displayName:name

      
      },
      user => {
        if(name.length<=5){
          M.toast({html: "username should be more than 5 characters",classes:"#c62828 red darken-3"})
          return
        }
        setLoading(true)
        
        
        M.toast({ html: "Name Changed Successfully", classes: "#43a047 green darken-1" })
        window.location.href = '/registerlogin';
        M.toast({html: "Please relogin",classes:"#c62828 red darken-3"})
      }

    );
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField  
                // contentEditable = {true}
                fullWidth
                label="User Name"
                name="firstName"
                required
                value={values.firstName}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                disabled
                value={user.jobTitle}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading && <BeatLoader color="green" /> }
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
