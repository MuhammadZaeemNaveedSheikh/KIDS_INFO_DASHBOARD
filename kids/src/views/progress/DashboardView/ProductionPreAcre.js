import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  TableContainer,
  makeStyles,
  TextField,
  Modal,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core';

import firebase from "../../FarmerQueries/FarmerQueries/firebase.js";
import { Row } from 'react-bootstrap';
import { row } from '@syncfusion/ej2-grids';
import { SmsOutlined } from '@material-ui/icons';


// const useStyles = makeStyles(() => ({
//   root: {},
//   actions: {
//     justifyContent: 'flex-end'
//   }
// }));
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
  paper: {
    position: 'absolute',
    width: 400,
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
const ProductionPreAcre = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders, setTableData] = useState([]);
  const [orig, setorig] = useState('');
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);

  const [modalStyle] = React.useState(getModalStyle);



  const [name, setname] = useState('');
  const [skill, setskill] = useState('');
  const [progress, setprogress] = useState('');
  const [story, setstory] = useState('');
  const [activities, setactivities] = useState('');
  const [insert, setInsert] = useState(false);
  const [age, setAge] = React.useState('');
  const [bonus, setbonus] = React.useState('');
  const [lang, setlanguage] = React.useState('');
  const [data, setData] = React.useState({})
  const [keys,setKeys] = React.useState([])
  const [chapter, setchapter] = React.useState('');
  const handleClose = () => {setOpen(false); setData("")};
  useEffect(() => {
    //settabledata
    var starCountRef = firebase.database().ref('data/');
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      
      if (data != null) {
        setKeys(Object.keys(data))
        var newArrayDataOfOjbect = Object.values(data)
        console.log(newArrayDataOfOjbect)
        setTableData(newArrayDataOfOjbect)
        setorig(newArrayDataOfOjbect)
      }
      else {

      }
    });

  }, [])




  const handleChange = (event) => {
    setlanguage(event.target.value);
    setData({
      ...data,
      language : event.target.value
    })
  };

  const handlename = (event) => {
    setAge(
      event.target.value
    )
    setData({
      ...data,
      age : event.target.value
    })
  }
  const handleskill = (event) => {
    setskill(
      event.target.value
    )
  }
  const handleprogress = (event) => {
    setchapter(
      event.target.value
    )
    setData({
      ...data,
      chapter : event.target.value
    })
      
  }
  const handlestory = (event) => {
    setbonus(
      event.target.value
    )
    setData({
      ...data,
      bonus: event.target.value
    })
  }




  const handlesearch = (event) => {
    var newData = []
    for (var i = 0; i < orig.length; i++) {
      if (orig[i].name.includes(event.target.value)) {
        newData.push(orig[i])
      }
    }
    setTableData(newData)
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid

        item
        lg={6}
        md={6}
        xl={12}
        xs={4}
      >
        <Card

        >
          <CardHeader title="Current Progress" style={{ textAlign: 'center' }} />
          <Divider /><div style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>

            <TextField id="outlined-basic" type="number"  value = {data.age} label= "Age" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handlename} /><br></br>
            <div>
              <InputLabel id="demo-simple-select-label" style={{ marginTop: 10, marginBottom: 10 }}>Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.language}
                label="Age"
                onChange={handleChange}
                style={{ width: 180 }}
              >
                <MenuItem value={'Arabic'}>Arabic</MenuItem>
                <MenuItem value={'Chinese(s)'}>Chinese(s)</MenuItem>
                <MenuItem value={'Chinese(t)'}>Chisnese(t)</MenuItem>
                <MenuItem value={'Dutch-Netherlands'}>Dutch-Netherlands</MenuItem>
                <MenuItem value={'English'}>English</MenuItem>
                <MenuItem value={'Filipino'}>Filipino</MenuItem>
                <MenuItem value={'french'}>french</MenuItem>
                <MenuItem value={'Geman'}>Geman</MenuItem>
                <MenuItem value={'Italian'}>Italian</MenuItem>
                <MenuItem value={'Korean'}>Korean</MenuItem>
                <MenuItem value={'Portugese'}>Portugese</MenuItem>
                <MenuItem value={'Russian'}>Russian </MenuItem>
                <MenuItem value={'Spain'}>Spain</MenuItem>
              </Select></div>
            <TextField type="number"  id="outlined-basic" value = {data.chapter} label={"Chapter"} variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handleprogress} /><br></br>
            <TextField id="outlined-basic" value = {data.bonus} label="Bonus" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={handlestory} /><br></br>
            <Button variant="outlined" style={{ marginTop: 10, marginBottom: 30 }} color="primary" onClick={(()=>{
              firebase.database().ref('data/').child(keys[data.id]).update(data);
              setOpen(false)
            })} >Update</Button>
          </div>
        </Card>

      </Grid>

    </div>

  )
  return (


    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      <CardHeader title="Current Progress" />
      <Divider />
      <TextField id="outlined-basic" label="Search" variant="outlined" style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }} onChange={handlesearch} />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <TableContainer style={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Kids Name
                  </TableCell>
                  <TableCell>
                    Age
                  </TableCell>

                  <TableCell>
                    Language
                  </TableCell>
                  <TableCell>
                    Chapter
                  </TableCell>
                  <TableCell>
                    Bonus
                  </TableCell>
                  <TableCell>
                    Edit
                  </TableCell>
                  <TableCell>
                    Download
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {orders.map((row, index) => (
                  <TableRow>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.language}</TableCell>
                    <TableCell>{row.chapter}</TableCell>
                    <TableCell>{row.bonus}</TableCell>

                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={(() => {
                        setOpen(true);
                        setData({
                          ...row,
                          id: index
                        });
                      })}>Edit</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick= {(()=>{
                        window.location.href = '/app/story';
                      })}>Download</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

    </Card>

  );
};

ProductionPreAcre.propTypes = {
  className: PropTypes.string
};

export default ProductionPreAcre;
