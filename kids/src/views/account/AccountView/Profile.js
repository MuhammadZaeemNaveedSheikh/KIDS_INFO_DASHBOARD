import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {uploadPicture} from '../../../actions/auth'
import M from 'materialize-css';
import firebase from "../../FarmerQueries/FarmerQueries/firebase"
import {BeatLoader} from 'react-spinners';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));
function getRandom(length) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}
const Profile = ({ className, ...rest }) => {
  const[user,setUser] = useState({
  })
  const [files,setFiles] = useState()
  const [url,setUrl] = useState()
  const [loading,setLoading] = useState(false)
  const[file,setFile] = useState()
  const handleChangeFiles = async() => {
    var index
    let bucketName = "default"
    var fileLinks = []
    //Get file
  var file = files[0];
  //Create a storage ref
  var add = getRandom(10)
  var storageRef = firebase.storage().ref(`${add}${file.name}`);
  //Upload file
  setLoading(true)
  await storageRef.put(file).then(function(snapshot){
    (snapshot.ref.getDownloadURL().then((downloadURL)=>{
      //This is the value of uploaded file
      console.log(downloadURL)
      var data = {
        email : user.jobTitle,
        pp : downloadURL
      }
      console.log(data)
      uploadPicture(data,
        user => {
          M.toast({html:"Image Uploaded Succesfully",classes:"#43a047 green darken-1"})
        window.location.href = '/registerlogin';
        M.toast({html: "Please relogin",classes:"#c62828 red darken-3"})
        }
      )
    }
    
    )
    )
    
    // $(`${add}${file.name}`).val(snapshot.downloadURL);
  });
  


    // for (index = 0; index < files.length; index++) {
    //   let file = files[index]
    //   var add = getRandom(10)
    //   let storageRef = firebase.storage().ref(`${add}${file.name}`)
    //   let uploadTask = storageRef.put(file)
    //   await uploadTask.on('state_changed',
    //     () => {
    //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         fileLinks.push(downloadURL);
    //         // window.location.reload()
    //       });
    //     }
    //   );
    //   if (index == files.length - 1) {
    //     console.log(fileLinks)
    //   }
    // }
    
  
  }
  useEffect(()=>{
    setUser({
      avatar: JSON.parse(localStorage.getItem("userinfo")).picture,
      country: 'Pakistan',
      jobTitle: JSON.parse(localStorage.getItem("userinfo")).email,
      name: JSON.parse(localStorage.getItem("userinfo")).displayName,
      timezone: 'GMT+5'
    })
  },[]);
  const onChange = e => {
    if (e.target.name == "file") {
      setFile({ [e.target.name]: e.target.files[0] });
    }
    else{
      setFile({ [e.target.name]: e.target.value });
    }
    console.log(e.target.files[0])
  };
  const classes = useStyles();
  const {loading1} = loading;
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.jobTitle}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {` ${user.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input
        color="primary"
        fullWidth 
        type="file" 
        name="file" 
        onChange={(event) => {
           setFiles(event.target.files)
             }} 
        />
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={(event) => {
            handleChangeFiles()
              }}
              disabled={loading1}
        >
         {loading && <BeatLoader color="green" /> }
            
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
