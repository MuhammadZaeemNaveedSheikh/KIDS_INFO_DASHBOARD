import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../actions/auth';
import Autocomplete from '@material-ui/lab/Autocomplete';
import M from 'materialize-css';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Modal,
  TextField,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  TableHead
} from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import firebaseMobile from '../../mobilefirebase'


import firebase from "./firebase"
import { ContactSupportOutlined } from '@material-ui/icons';
import axios from 'axios';
var XLSX = require("xlsx")
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
var myCurrentDate = new Date();
var month = (myCurrentDate.getMonth() + 1)
var day = myCurrentDate.getDate()
if ((Number(day)) < 10) {
  day = String('0' + myCurrentDate.getDate());
}
if ((Number(month)) < 10) {
  month = String('0' + month);
}

var date = day + '-' + (month) + '-' + myCurrentDate.getFullYear();
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > *': {
      margin: theme.spacing(1),
    },

  },


  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



const AdminView = () => {
  const classes = useStyles();
  const [name] = useState(data);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openAutofetch, setOpenAutofetch] = React.useState(false);
  const [openNoti, setOpenNoti] = React.useState(false);
  const [rows, setRows] = useState([])
  // const [cols,setCols] = useState()
  const [showTable, setshowtable] = useState(false)
  const [Error, checkError] = useState(true)
  const [cityData, setCityData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [doneInserting, setdoneInserting] = useState(false)
  const [doneInserting1, setdoneInserting1] = useState(false)
  const [crop, selectCrop] = useState("")
  const [city, selectCity] = useState("")
  const [head, setHead] = useState("")
  const [Notibody, setBody] = useState("")

  async function insertDataAutofetch() {
    for (var i = 1; i < cityData.length; i++) {
      const res = await db.collection(String(cityData[i][1]).replace('/', '')).doc().set({
        Area: cityData[i][0],
        Date: date,
        Price: cityData[i][2]
      });
    }
    setdoneInserting(true)
  }
  async function insertData() {


    for (var i = 0; i < rows.length; i++) {
      const res = await db.collection(String(rows[i][1])).doc().set({
        Area: rows[i][2],
        Date: rows[i][3],
        Price: rows[i][1]
      });
    }
    setdoneInserting(true)
  }


  async function handleSendNoti() {
    const itemsRef = firebaseMobile.database().ref('farmer');
    var farmers = []
    var cropE = false
    var cityE = false
    var name = ""
    var name2 = ""
    itemsRef.on('value', (snapshot) => {
      var data = snapshot.val()
      if (Object.keys(data).length > 1) {
        for (let i = 0; i < Object.keys(data).length; i++) {
          farmers.push(data[Object.keys(data)[i]])
        }
      }
      else {
        farmers.push(data[Object.keys(data)[0]])
      }
      farmers.forEach((element) => {
        element.preference.crops.forEach((crops) => {
          if (crop.name == crops) {
            cropE = true
            name = element.preference.name
          }

        })
        if (element.preference.location.location.trim() == city.name.trim()) {
          cityE = true
          name2 = element.preference.name
        }
        else {
          cityE = false
          cropE = false
        }

        if (cityE && cropE && name == name2) {
          console.log(element.token)
          firebaseMobile.database().ref("Notifications/"+Date.now()).set({
            Body: Notibody,
            Heading: head,
            Area : city.name,
            Crop: crop.name,
            Date: date,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
          axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://exp.host/--/api/v2/push/send',
            data: {
              to: element.token,
              title: head,
              body: Notibody
            },
            headers: { 'content-type': 'application/json' }
          }).then(
            res => {
              if (res.status == 200) {
                M.toast({ html: "Notification Sent", classes: "#43a047 green darken-1" })
                setOpenNoti(false)
              }
              else {
                console.log(res)
                M.toast({ html: "Some Error Occured.", classes: "#43a047 red darken-1" })
                setOpenNoti(false)
              }
            },

          )
        }
      })
    })



  }


  const handleHeadChanges = (event) => {
    setHead(
      event.target.value
    );
  };
  const handleBodyChanges = (event) => {
    setBody(
      event.target.value
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenNoti = () => {
    setOpenNoti(true);
    setLoading1(false);
  };




  const handleAutofetchOpen = () => {
    setOpenAutofetch(true);
  }




  function checkErrors(rows) {
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      for (var j = 0; j < row.length; j++) {
        if (rows[i][j] == " " || rows[i][j] == undefined || rows[i][j] == "NaN") {
          return true
        }
      }
    }
    return false
  }



  function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);



    var date = String(date_info.getFullYear() + "-" + (date_info.getMonth() + 1) + "-" + date_info.getDate());
    return date
  }




  const handleClose = () => {
    setOpen(false);
    setshowtable(false)
  };



  const handleCloseAutofetch = () => {
    setOpenAutofetch(false);
    setdoneInserting(false)
  }
  const handleCloseNoti = () => {
    setOpenNoti(false);
    setLoading1(false);
  }



  const fileHandler = (event) => {
    if (event.target.files.length > 0) {
      setshowtable(true)
    }
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        setRows(resp.rows)
        checkError(checkErrors(resp.rows))

      }
    });

  }
  const hellojee = () => {
    insertDataAutofetch();
    setLoading(true)
  }
  const hello1 = () => {
    insertData();
    setLoading(true)
  }
  const hello2 = () => {
    handleSendNoti();
    setLoading1(true)

  }

  const onSubmit = async () => {
    fetchData().then((res) => {
      console.log(res[1])
      setCityData(res)

    })
    handleAutofetchOpen()

  };


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
  const Autofetchbody = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Autofetch Data</h2>
      {cityData.length == 0 &&
        <p>Please Wait while we fetch the data from websites.</p>}
      {cityData.length == 0 &&
        <div>
          <p>Once the data is fetched, it will be displayed to you in a table.</p>
          <BeatLoader size={45} color="green" loading /></div>
      }
      {cityData.length > 0 &&

        <Card>
          <CardHeader
            subheader=""
            title="Fetched Data"
          />
          <Divider />
          <TableContainer component={Paper} style={{ maxHeight: 500 }}>

            <Table className={classes.table} aria-label="simple table" stickyHeader>
              <TableHead >
                <TableRow>
                  <TableCell>Crop Name</TableCell>
                  <TableCell align="right">Crop Price</TableCell>
                  <TableCell align="right">Area</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {cityData.slice(1).map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell component="th" scope="row">
                      {row[1]}
                    </TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    <TableCell align="right">{row[0]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          {cityData.length == 0 && <Button
            color="primary"
            disabled
            variant="outlined"
            style={{ marginRight: 10 }}

          >

            Continue

          </Button>}
          {cityData.length > 0 && doneInserting && <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={handleCloseAutofetch}
          >

            Done

          </Button>}
          {cityData.length > 0 && !loading && <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={hellojee}


          >
            Continue

          </Button>}
          {cityData.length > 0 && <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={hellojee}
            disabled

          >
            {loading && <BeatLoader color="green" />
            }

          </Button>}
          <Button
            color="secondary"
            variant="outlined"
            style={{ alignSelf: "right" }}
            onClick={handleCloseAutofetch}
          >
            Cancel

          </Button>


        </Card>
      }
    </div>
  )






  const SendNotiBody = (
    <div style={modalStyle} className={classes.paper}>
      <Box>
        <Card>
          <CardHeader
            subheader=""
            title="Notification Details"
          />
          <Divider />
          <div style={{
            "display": "flex",
            "flex-direction": "row"
          }}>
            <Autocomplete
              id="combo-box-demo"
              options={cropList}
              autoHighlight
              getOptionLabel={(option) => option.name}
              style={{ width: 220, margin: 20 }}
              onChange={(event, value) => selectCrop(value)}
              renderInput={(params) => <TextField {...params} label="Select Crop" variant="outlined" />}
            />
            <Autocomplete
              id="combo-box-demo"
              options={majorCitiesList}
              autoHighlight
              getOptionLabel={(option) => option.name}
              style={{ width: 220, margin: 20 }}
              onChange={(event, value) => selectCity(value)}
              renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
            />

          </div>
          <Divider />
          <div style={{
            "display": "flex",
            "flex-direction": "row"
          }}>
            <Divider />
            <TextField
              label="Notification Heading"
              style={{ width: 220, margin: 20 }}
              margin="normal"
              name="answer"
              type="answer"
              variant="outlined"
              onChange={handleHeadChanges}
            />

            <TextField

              label="Notification Body"
              style={{ width: 220, margin: 20 }}
              margin="normal"
              name="answer"
              type="answer"
              variant="outlined"
              onChange={handleBodyChanges}
            />
          </div>
        </Card>
        <div style={{
          "display": "flex",
          "flex-direction": "row"
        }}>
          {!doneInserting1 && !loading1 && <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={hello2}


          >
            Continue

          </Button>}
          {!doneInserting1 && <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={hello2}
            disabled

          >
            {loading1 && <BeatLoader color="green" />

            }

          </Button>}
          <Button
            color="primary"
            variant="contained"
            style={{ width: 220, margin: 20 }}
            onClick={handleCloseNoti}

          >
            Cancel
          </Button>
        </div>

      </Box>

    </div>
  )

















  const body = (
    <div style={modalStyle} className={classes.paper}>
      {doneInserting && <h2>
        Uploading and inserting data into database, please dont close the application!
      </h2>}
      <h2>Upload File</h2>
      <p>
        Upload a excel containing prices of a single crop. Please note that
      </p>
      <p>
        1 - If the file contains anamolies, the data will not be inserted to database.
      </p>
      <p>
        2 - The only accepted file type is .xlsx or Excel file in simple words.
      </p>
      <p style={{ color: "Red" }}>
        3 - Don't add any extra rows or columns, just the crop name, crop price, area and date (in exact this order).
      </p>
      <p style={{ color: "Red" }}>
        4 - After you select a file, a preview of file will be given. If the values match the column, press continue. Else check your file.
      </p>

      {Error && showTable && <p>
        Your file contains an error! Please change the file.
      </p>}

      <Card>
        <CardHeader
          subheader=""
          title="File"
        />

        <Divider />

        <CardContent>
          <input type="file" name="file" accept=".xlsx" onChange={fileHandler.bind(this)} />
        </CardContent>
        <Divider />
        {!Error && showTable && <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Crop Name</TableCell>
                <TableCell align="right">Crop Price/100 KG</TableCell>
                <TableCell align="right">Area</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows.slice(1, 5).map((row) => (
                <TableRow key={row[0]}>
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                  <TableCell align="right">{row[2]}</TableCell>

                  <TableCell align="right">{ExcelDateToJSDate(Number(row[3]))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
        <Divider />


        {doneInserting && !Error && <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: 10 }}
          onClick={handleClose}

        >
          Done

        </Button>}
        {/*  */}
        {!doneInserting && !loading && <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: 10 }}
          onClick={hello1}


        >
          Continue

        </Button>}
        {!doneInserting && <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: 10 }}
          onClick={hello1}
          disabled

        >
          {loading && <BeatLoader color="green" />
          }

        </Button>}
        <Button
          color="secondary"
          variant="outlined"
          style={{ alignSelf: "right" }}
          onClick={handleClose}
        >
          Cancel

        </Button>





      </Card>

    </div>
  );


  return (
    <Page
      className={classes.root}
      title="Admin Portal"
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        style={{ marginLeft: 20 }}
      >
        <div style={{ margin: 10 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpenNoti}

          >
            Send Notifications
          </Button>
        </div>
        <div style={{ margin: 10 }}>

          <Button
            color="primary"
            variant="contained"
            onClick={handleOpen}

          >
            Upload File

          </Button>

        </div>
        <div style={{ margin: 10 }}>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 28 }}
            onClick={onSubmit}

          >
            Auto Fetch
          </Button>
        </div>

      </Box>

      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results name={name} />
        </Box>
      </Container>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Modal
        open={openAutofetch}
        onClose={handleCloseAutofetch}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {Autofetchbody}
      </Modal>
      <Modal
        open={openNoti}
        onClose={handleCloseNoti}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {SendNotiBody}
      </Modal>

    </Page>

  );
};

export default AdminView;


const cropList = [
  { name: 'Wheat' },
  { name: 'Rice' },
  { name: 'Cotton' },
  { name: 'Sugarcane' },
  { name: 'Maize' },
  { name: 'Gram' },
  { name: 'Moong' },
  { name: 'Chillies' },
  { name: 'Onion' },
  { name: 'Potato' },
  { name: 'Tomato' },
  { name: 'Garlic' },
  { name: 'Apple' },
  { name: 'Apricot' },
  { name: 'Bajra' },
  { name: 'Banana (Rabi)' },
  { name: 'Banana (Kharif)' },
  { name: 'Carrot' },
  { name: 'Castor Seed' },
  { name: 'Cauliflower' },
  { name: 'Canola' },
  { name: 'Sunflower' },
  { name: 'Tobacco' },
  { name: 'Rapeseed & Mustard Crop' },
  { name: 'Ground Nut' },
  { name: 'Guar Seed' },
  { name: 'Guava (Rabi)' },
  { name: 'Guava (Kharif)' },
  { name: 'Jowar' },
  { name: 'Linseed' },
  { name: 'Matter (Green) ' },
  { name: 'Peach' },
  { name: 'Pear' },
  { name: 'Plum' },
  { name: 'Pomegranate' },
  { name: 'Sesamum' },
  { name: 'Turmeric' },
  { name: 'Turnip' }
]


const majorCitiesList = [
  { name: ' Attock ' },
  { name: ' Rawalpindi ' },
  { name: ' Islamabad ' },
  { name: ' Jhelum ' },
  { name: ' Chakwal ' },
  { name: ' Sargodha ' },
  { name: ' Khushab ' },
  { name: ' Mianwali ' },
  { name: ' Bhakkar ' },
  { name: ' Faisalabad ' },
  { name: ' T.T. Singh ' },
  { name: ' Jhang ' },
  { name: ' Chiniot ' },
  { name: ' Gujrat ' },
  { name: ' M.B. Din ' },
  { name: ' Sialkot ' },
  { name: ' Narowal ' },
  { name: ' Gujranwala ' },
  { name: ' Hafizabad ' },
  { name: ' Sheikhupura ' },
  { name: ' Nankana Sahib ' },
  { name: ' Lahore ' },
  { name: ' Kasur ' },
  { name: ' Okara ' },
  { name: ' Sahiwal ' },
  { name: ' Pakpattan ' },
  { name: ' Multan ' },
  { name: ' Lodhran ' },
  { name: ' Khanewal ' },
  { name: ' Vehari ' },
  { name: ' Muzaffargarh ' },
  { name: ' Layyah ' },
  { name: ' D.G. Khan ' },
  { name: ' Rajan Pur ' },
  { name: ' Bahawalpur ' },
  { name: ' Rahim Yar Khan ' },
  { name: ' Bahawalnagar ' }
]