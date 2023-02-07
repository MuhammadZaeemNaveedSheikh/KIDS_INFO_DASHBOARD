import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuestionTable from './QuestionTable';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }, container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const FarmerQueries = () => {
  const classes = useStyles();
  if(localStorage.getItem("token")==undefined){
    window.location.href = 'http://localhost:3000/registerlogin';
    return(
      <div style={{textAlign:"center"}}>
        <h1 >404</h1>
      </div>
    )
  }
  if(localStorage.getItem("token")==undefined){
    window.location.href = 'http://localhost:3000/registerlogin';
    return(
      <div style={{textAlign:"center"}}>
        <h1 >404</h1>
        <h2>You are not logged in.</h2>
        <h2>Redirecting to login/signup pages.</h2>
      </div>
    )
  }
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >

      <Container maxWidth={false}>
        
        <Grid
          container
          spacing={3}
        >
          <Grid

            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <QuestionTable />
            
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};



export default FarmerQueries;
