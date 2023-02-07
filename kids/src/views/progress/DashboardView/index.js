import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Doughnut } from 'react-chartjs-2';
import { fetchData } from '../../../actions/auth'
import { Line } from 'react-chartjs-2';
import firebaseMobile from 'src/views/mobilefirebase';
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Card,
  Button,
  CardContent,
  TextField,
  colors,
  Typography,
  useTheme,
  Divider,
  CardHeader

} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductionPreAcre from './ProductionPreAcre';
import Sales from './Sales';
import PieChartDetails from './PieChartDetails';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Nutrients from './NutrientsPerkg';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./style.css";
import LineChart from './LineChart'
import firebase from "../../FarmerQueries/FarmerQueries/firebase.js"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    height: '100%'
  },
  root1: {
    height: '100%'
  }, container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
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
  gridList: {
    width: 500,
    height: 150,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();





  if (localStorage.getItem("token") == undefined) {
    window.location.href = 'http://localhost:3000/registerlogin';
    return (
      <div style={{ textAlign: "center" }}>
        <h1 >404</h1>
      </div>
    )
  }
  if (localStorage.getItem("token") == undefined) {
    window.location.href = 'http://localhost:3000/registerlogin';
    return (
      <div style={{ textAlign: "center" }}>
        <h1 >404</h1>
        <h2>You are not logged in.</h2>
        <h2>Redirecting to login/signup page.</h2>
      </div>
    )
  }


  

  return (
    <Page
      className={classes.root}
      title="Current Progress"
    >

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
         
          <Grid

            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <ProductionPreAcre />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};



export default Dashboard;
