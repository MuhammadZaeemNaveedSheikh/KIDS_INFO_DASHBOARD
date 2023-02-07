import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Divider
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Notifications from './Notifications';
import Password from './Password';
import Deactivate from './DeactivateAccount';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  if(localStorage.getItem("token")==undefined){
    window.location.href = 'http://localhost:3000/registerlogin';
    return(
      <div style={{textAlign:"center"}}>
        <h1 >404</h1>
        <h2>You are not logged in.</h2>
        <h2>Redirecting to login/signup page.</h2>
      </div>
    )
  }

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
      <br></br>
      <Divider />
      <br></br>
      <Container maxWidth="lg">
        <Box mt={3}>
        <Password />
          <Deactivate />
          
        </Box>
      </Container>
    </Page>
  );
};

export default Account;
