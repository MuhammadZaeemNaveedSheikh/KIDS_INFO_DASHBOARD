import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import firebase from './firebase.js'
import Modal from '@material-ui/core/Modal';
import firebaseMobile from '../../mobilefirebase'


import {
  Box,
  Button,
  CardContent,
  Card,
  TextField,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  TableContainer,
  Paper
} from '@material-ui/core';
import axios from 'axios';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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
  actions: {
    justifyContent: 'flex-end'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  papers :{
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
    widht: 800
  },
}));

function getRandom(length) {

  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

}






const QuestionTable = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openAtt, setOpenAtt] = React.useState(false);
  const [openHis, setOpenHis] = React.useState(false);
  const [files, setFiles] = useState("")
  const [usersData, setUsersData] = useState({})
  const [answers, setAnswer] = useState("")
  const [history, setHistory] = useState({})
  const handleChanges = (event) => {
    setAnswer(
      event.target.value
    );
  };

  const handleClose = () => {
    setOpen(false);
    setUsersData("")
  };

  const handleCloseAtt = () => {
    setOpenAtt(false);
    setUsersData("")
  };
  const handleCloseHis = () => {
    setOpenHis(false);
  };


  const handleChange = (files) => {
    setFiles(files)
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Farmer's Query</h2>
      <p>
        Write your answer below. Share your contact info on your own risk. You can also attach pictures if you want.
    </p>
      <form
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader=""
            title="Answer"
          />

          <Divider />

          <CardContent>
            <TextField
              fullWidth
              label="Question"
              margin="normal"
              name="question"
              type="question"
              variant="outlined"
              disabled
              value={usersData.question}
            />
            <TextField
              fullWidth
              label="Answer"
              margin="normal"
              name="answer"
              type="answer"
              variant="outlined"
              onChange={handleChanges}
            />
            <input type="file" name="file" multiple="multiple" onChange={(event) => {
              handleChange(event.target.files)
            }} />
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
              onClick={() => {
                var index
                let bucketName = "default"
                var fileLinks = []
                if (files.length>0){
                for (index = 0; index < files.length; index++) {
                  let file = files[index]
                  var add = getRandom(10)
                  let storageRef = firebaseMobile.storage().ref(`${add}${file.name}`)
                  let uploadTask = storageRef.put(file)
                  uploadTask.on('state_changed',
                    () => {
                      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        fileLinks.push(downloadURL);
                        var ids = usersData.id
                        firebaseMobile.database().ref('queries/' + `${ids}`).set({
                          ...usersData,
                          answer: answers,
                          ansPics: fileLinks.join(),
                          answeredOn: today,
                          isAnswered : 1,
                          answeredBy: JSON.parse(localStorage.getItem("userinfo")).displayName
                        })
                        window.location.reload()
                        setOpen(false);

                      });
                    }
                  );
                  if (index == files.length - 1) {
                    console.log(fileLinks)
                  }
                }
              }
              else{
                
                    var ids = usersData.id
                    firebaseMobile.database().ref('queries/' + `${ids}`).set({
                      ...usersData,
                      answer: answers,
                      answeredOn: today,
                      isAnswered : 1,
                      answeredBy: JSON.parse(localStorage.getItem("userinfo")).displayName
                    })
                    window.location.reload()
                    setOpen(false);
                
              }

              }}
            >
              Submit Answer
        </Button>
            <Button
              onClick={handleClose}
              variant="contained"
            >
              Cancel
        </Button>
          </Box>
        </Card>
      </form>

    </div>
  );







const attachmentBody = (
  <div style={modalStyle} className={classes.paper}>
    <Card>
          <CardHeader
            subheader=""
            title="Attachments"
          />
          <Divider />
          {usersData.questionPics != undefined && usersData.questionPics.map((order, index) => (
            <Box>
            <img 
            src= {order}
            alt="new"
            />
            </Box>
          ))}
         


      </Card>
      <Button
              onClick={handleCloseAtt}
              variant="contained"
            >
              Continue
        </Button>
  </div>
)


const historyModal = (
  <div style={modalStyle} className={classes.papers}>
    <Box minWidth={800}>
    <Card>
          <CardHeader
            subheader=""
            title="Answered Questions"
          />
<TableContainer component={Paper} style={{ maxHeight: 500 }}>
<Table stickyHeader>

  <TableHead>
    <TableRow>
      <TableCell>
        Question
    </TableCell>
      <TableCell>
        Asked By
    </TableCell>
      <TableCell sortDirection="desc">
        <Tooltip
          enterDelay={300}
          title="Sort"
        >
          <TableSortLabel
            active
            direction="desc"
          >
            Asked On
        </TableSortLabel>
        </Tooltip>
      </TableCell>
      <TableCell>
        Answer
    </TableCell>
      <TableCell>
        Answered By
    </TableCell>
    <TableCell sortDirection="desc">
        <Tooltip
          enterDelay={300}
          title="Sort"
        >
          <TableSortLabel
            active
            direction="desc"
          >
            Answered On
        </TableSortLabel>
        </Tooltip>
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>

    {history.length > 0 && history.map((order, index) => (
      <TableRow
        hover
      >
        <TableCell>
          {order.question}
        </TableCell>
        <TableCell>
          {order.askedBy}
        </TableCell>
        <TableCell>
          {order.askedOn}
        </TableCell>
        <TableCell>
        {order.answer}
        </TableCell>
        <TableCell>
        {order.answeredBy}
        </TableCell>
        <TableCell>
        {order.answeredOn}
        </TableCell>
      </TableRow>
    )
    )}

  </TableBody>

</Table>
</TableContainer>
</Card>
</Box>
<Divider/>
<Divider/>
<Divider/>
<Button
               onClick={(() => {
                setOpenHis(false);
                
              })} style={{ backgroundColor: '#61A979', color: 'white' }}

            >
              Done
        </Button>
  </div>
)





  useEffect(() => {
    
    const itemsRef = firebaseMobile.database().ref('queries');
    var temp = []
    var datas = []
    var historys = []
    itemsRef.on('value', (snapshot) => {
      temp = snapshot.val()
      temp.forEach((element) => {
        if(element.isAnswered==0){
          datas.push(element);
        }
        else{
          historys.push(element)
        }
    });

      if (datas == null) {
        setOrders([])
        setHistory(historys)

      }
      else {
        setHistory(historys)
        setOrders(datas)
      }
    })
  }, [])

  return (
    <div>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box
          display="flex"

          style={{ marginLeft: 20 }}
        ><CardHeader title="Question / Answers" />
          <div style={{ margin: 10 }}>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ marginLeft: 20 }}
            ></Box>

            <Button
               onClick={(() => {
                setOpenHis(true);
                
              })} style={{ backgroundColor: '#61A979', color: 'white' }}

            >
              History
        </Button>
          </div>

        </Box>


        <Divider />

        <PerfectScrollbar>

          <Box minWidth={800}>
          <TableContainer component={Paper} style={{ maxHeight: 500 }}>
            <Table stickyHeader>

              <TableHead>
                <TableRow>
                  <TableCell>
                    Question
                </TableCell>
                  <TableCell>
                    Asked By
                </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                    </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    Attachments
                </TableCell>
                  <TableCell>
                    Answer
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {orders.length > 0 && orders.map((order, index) => (
                  <TableRow
                    hover
                  >
                    <TableCell>
                      {order.question}
                    </TableCell>
                    <TableCell>
                      {order.askedBy}
                    </TableCell>
                    <TableCell>
                      {order.askedOn}
                    </TableCell>
                    <TableCell>
                    {order.questionPics != undefined &&
                    <Button 
                    onClick={(() => {
                      setOpenAtt(true);
                      setUsersData({
                        ...order,
                        id: index
                      })
                    })}
                         style={{ backgroundColor: '#61A979', color: 'white' }}>
                        See Attachments
                    </Button>}
                    {order.questionPics == undefined &&
                    <p>
                      No Attachments
                    </p>
                    }
                    </TableCell>
                    <TableCell>
                      <Button onClick={(() => {
                        setOpen(true);
                        setUsersData({
                          ...order,
                          id: index
                        })
                        
                      })} style={{ backgroundColor: '#61A979', color: 'white' }}>
                        Answer
                    </Button>
                    </TableCell>
                  </TableRow>
                )
                )}

              </TableBody>

            </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
        </Box>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Modal
        open={openAtt}
        onClose={handleCloseAtt}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {attachmentBody}
      </Modal>
      <Modal
        open={openHis}
        onClose={handleCloseHis}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        { historyModal}
      </Modal>

    </div>
  );
};

QuestionTable.propTypes = {
  className: PropTypes.string
};

export default QuestionTable;
