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
  const [name, setname] = useState('');
  const [skill, setskill] = useState('');
  const [progress, setprogress] = useState('');
  const [story, setstory] = useState('');
  const [activities, setactivities] = useState('');
  const [insert, setInsert] = useState(false);


  useEffect(() => {


  });
  function addData() {

    const newReference = firebase.database().ref('/data').push();
    console.log('Auto generated key: ', newReference.key);

    newReference
      .set({
        name: name,
        skill: skill,
        progress: progress,
        story: story,
        activites: activities,
        age : "",
        language: "",
        chapter: "",
        bonus: "",
        title: "",
        downloads: 0
      })
      .then(() => window.location.reload(false));

  }



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


  const handlename = (event) => {
    setname(
      event.target.value
    )
  }
  const handleskill = (event) => {
    setskill(
      event.target.value
    )
  }
  const handleprogress = (event) => {
    setprogress(
      event.target.value
    )
  }
  const handlestory = (event) => {
    setstory(
      event.target.value
    )
  }
  const handleactivities = (event) => {
    setactivities(
      event.target.value
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
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Card

            >
              <CardHeader title="Add Kids Information" style={{ textAlign: 'center' }} />
              <Divider /><div style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                <TextField id="outlined-basic" label="Kid Name" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handlename} /><br></br>
                <TextField type="number"  id="outlined-basic" label="Skill Level" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handleskill} /><br></br>
                <TextField id="outlined-basic" label="Current Progress" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handleprogress} /><br></br>
                <TextField id="outlined-basic" label="Story Book" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handlestory} /><br></br>
                <TextField id="outlined-basic" label="Activities" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handleactivities} /><br></br>
                <Button variant="outlined" style={{ marginTop: 10, marginBottom: 30 }} color="primary" onClick={addData}>Add Kid Info</Button>
              </div>
            </Card>

          </Grid>

          <Grid

            item
            lg={6}
            md={6}
            xl={12}
            xs={4}
          >
            <ProductionPreAcre />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};



export default Dashboard;
