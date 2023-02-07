import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Modal from '@material-ui/core/Modal';
import firebaseMobile from '../../mobilefirebase'
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  Divider,
  TextField,
  CardHeader
} from '@material-ui/core';
// import { Search as SearchIcon } from 'react-feather';
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#FFD700',
  },
  iconHover: {
    color: '#FFDF00',
  },
})(Rating);


const Toolbar = ({ className, ...rest }) => {








  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [queryType,setQueryType] = React.useState("")
  const [modalStyle] = React.useState(getModalStyle);
  const [head,setHead] = React.useState("")
  const [exp,setExp] = React.useState("")
  const [webRate,setWebRate] = React.useState(0)
  const [mobRate,setMobRate] = React.useState(0)
  const [priceRate,setPriceRate] = React.useState(0)
  const [feedRate,setFeedRate] = React.useState(0)
  const handleClose = () => {
    setOpen(false);
  };
  const handleExpChanges = (event) => {
    setExp(
      event.target.value
    );

  
  };
  const handleHeadChanges = (event) => {
    setHead(
      event.target.value
    )
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
    <Box>
    <Card>
          <CardHeader
            subheader=""
            title="Complaint / Suggestion Details"
          />
          <Divider/>
          <div style = {{"display": "flex",
  "flex-direction": "row"}}>
          <Autocomplete
                    id="combo-box-demo"
                    options={["Complaint","Suggestion"]}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    style={{ width: 360, margin: 20 }}
                    onChange={(event, value) => setQueryType(value)}
                    renderInput={(params) => <TextField {...params} label="Query Type?" variant="outlined" />}
                  />
                  
                  </div>
                  <Divider/>
                  <div style = {{"display": "flex",
  "flex-direction": "column"}}>
                  <Divider/>
                  <TextField
              label="Heading (In Few Words)"
              style={{ width: 292, margin: 20 }}
              margin="normal"
              name="answer"
              type="answer"
              variant="outlined"
              onChange={handleHeadChanges}
            />

            <TextField

              label="Explanation"
              style={{ width: 292, margin: 20 }}
              margin="normal"
              name="answer"
              type="answer"
              variant="outlined"
              onChange={handleExpChanges}
            />
            </div>
          </Card>
          <div style = {{"display": "flex",
  "flex-direction": "row"}}>
          <Button
        color="primary"
        variant="contained"
        style={{ width: 220, margin: 20 }}
        onClick={()=>{
          const newReference = firebaseMobile.database().ref('/suggestions').push();
          console.log('Auto generated key: ', newReference.key);

newReference
  .set({
    email: JSON.parse(localStorage.userinfo).email,
    queryType : queryType,
    head : head,
    body : exp 
  })
  .then(() => console.log('Data updated.'));
  setOpen(false)
        }}
        
      >
        Send
    </Button>
    <Button
        color="primary"
        variant="contained"
        style={{ width: 220, margin: 20 }}
        onClick={()=>{
          setOpen(false)
        }}
        
      >
        Cancel
    </Button>
    </div>

      </Box>

  </div>
  )
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={1400}>
              <Typography>
                Welcome to Kids App
                <br></br>
                The App is developed so that we can add information about the kids
               <br></br>kids user will be able to add kids' names, skill levels, and current progress on the storybook and activities.

                
              
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <br></br>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Developed By :
        </Button>
        
        <Button
          color="primary"
          variant="contained"
        >
          z1techs
        </Button>
      </Box>
      <Divider style={{'margin-top':10}}/>
      <Box mt={3}>
      <Card>
          <CardContent>
            <Box maxWidth={1400}>
              <Typography>
                <h2>Thank you for using our services.</h2>
               <br></br>If you found our services helpful in any way, please rate our servies. Your reponse means a lot to us.   
              </Typography>
            </Box>
          </CardContent>
        
      
      <div >
      <Box component="fieldset"  borderColor="transparent"  display="flex"
        justifyContent="flex-start" flexDirection="row">
        <Typography component="legend">How would you rate our web application?</Typography>
        <StyledRating
          defaultValue={webRate}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<StarIcon  />}
          onChange={(event, newValue) => {
            setWebRate(Number(newValue));
          }}
          size="large"
        />
      </Box>
      <Box component="fieldset"  borderColor="transparent"  display="flex"
        justifyContent="flex-start" flexDirection="row">
        <Typography component="legend">How would you rate our mobile application?</Typography>
        <StyledRating
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<StarIcon  />}
          size="large"
          onChange={(event, newValue) => {
            setMobRate(Number(newValue));
          }}
        />
      </Box>
      <Box component="fieldset"  borderColor="transparent"  display="flex"
        justifyContent="flex-start" flexDirection="row">
        <Typography component="legend">How close is the predicted price to actual price?</Typography>
        <StyledRating
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<StarIcon  />}
          size="large"
          onChange={(event, newValue) => {
            setPriceRate(Number(newValue));
          }}
        />
      </Box>
      <Box component="fieldset"  borderColor="transparent"  display="flex"
        justifyContent="flex-start" flexDirection="row">
        <Typography component="legend">How would you rate our feedback system?</Typography>
        <StyledRating
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<StarIcon  />}
          size="large"
          onChange={(event, newValue) => {
            setFeedRate(Number(newValue));
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
      >
        <Button 
        style={{margin: 10}}
        color="primary"
        variant="contained"
        onClick={()=>{
          const newReference = firebaseMobile.database().ref('/ratings').push();
          console.log('Auto generated key: ', newReference.key);

newReference
  .set({
    email: JSON.parse(localStorage.userinfo).email,
    webRate : webRate,
    mobRate : mobRate,
    priceRate : priceRate,
    feedRate : feedRate,
  })
  .then(() => console.log('Data updated.'));
        }}
        >
          Submit
        </Button>
        <Button 
        style={{margin: 10}}
        color="primary"
        variant="contained"
        onClick = {()=>{
          setOpen(true)
        }}
        >
          Got A Complaint / Suggestion?
        </Button>
        </Box>
    </div>
    </Card>
    </Box>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {body}
  </Modal>
    </div>
    
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
