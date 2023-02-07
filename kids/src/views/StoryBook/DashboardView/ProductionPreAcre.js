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
  Grid
} from '@material-ui/core';
import { fetchData } from "../../../actions/auth"
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import firebase from "../../FarmerQueries/FarmerQueries/firebase.js";
import reportWebVitals from 'src/reportWebVitals';




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
  const [data, setData] = useState({})
  const [open, setOpen] = useState(false)
  const handleClose = () => { setOpen(false); setData("") };
  const [modalStyle] = React.useState(getModalStyle);
  const [chapter, setChapter] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [keys, setKeys] = React.useState([]);
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
            <TextField id="outlined-basic" value={data.chapter} label="Chapter" type="number" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={((event) => {
              setChapter(event.target.value)
              setData({
                ...data,
                chapter: event.target.value
              })
            })} /><br></br>
            <TextField id="outlined-basic" value={data.title} label="Title" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} onChange={((event) => {
              setTitle(event.target.value)
              setData({
                ...data,
                title: event.target.value
              })
            })} /><br></br>

            <Button variant="outlined" style={{ marginTop: 10, marginBottom: 30 }} color="primary" onClick={(() => {
              firebase.database().ref('data/').child(keys[data.id]).update(data);
              setOpen(false)
            })}>Update</Button>
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
      <CardHeader title="Kids Details" />
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
                    Chapter
                  </TableCell>

                  <TableCell>
                    Title
                  </TableCell>
                  <TableCell>
                    Total Downloads
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
                    <TableCell>{row.chapter}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      {row.downloads}
                    </TableCell>
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
                      <Button variant="outlined" color="primary" onClick={(() => {
                        row.downloads = row.downloads + 1
                        firebase.database().ref('data/').child(keys[index]).update(row);
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
