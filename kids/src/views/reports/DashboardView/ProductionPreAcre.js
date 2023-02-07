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
  TextField
} from '@material-ui/core';
import { fetchData } from "../../../actions/auth"
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import firebase from "../../FarmerQueries/FarmerQueries/firebase.js";


const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ProductionPreAcre = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders, setTableData] = useState([]);
  const [orig, setorig] = useState('');
  useEffect(() => {
    //settabledata
    var starCountRef = firebase.database().ref('data/');
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
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
                    Skill level
                  </TableCell>

                  <TableCell>
                    Current Progress
                  </TableCell>
                  <TableCell>
                    Story Book
                  </TableCell>
                  <TableCell>
                    Activities
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {orders.map((row) => (
                  <TableRow>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.skill}</TableCell>
                    <TableCell>{row.progress}</TableCell>
                    <TableCell>{row.story}</TableCell>
                    <TableCell>{row.activites}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>

    </Card>
  );
};

ProductionPreAcre.propTypes = {
  className: PropTypes.string
};

export default ProductionPreAcre;
