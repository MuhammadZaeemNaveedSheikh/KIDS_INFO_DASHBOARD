import React, { useState,useEffect } from 'react';
import { fetchLinks } from '../../../actions/auth';
import {BeatLoader} from 'react-spinners';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableSortLabel,
  TableCell,
  Link,
  Tooltip,
  TableHead,
  TableRow
} from '@material-ui/core';

import clsx from 'clsx';
import {
  
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

// import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList =({ className, ...rest })=> {
  const classes = useStyles();
  const [orders,setProducts] = useState(data);
  const [answer,setAnswer] = useState("")
  const [loading,setLoading] = useState(false)
  const [origList,setorig] = useState(orders)
  
  const handleChanges = (event) => {
    setLoading(true)
    var orig = origList;
    if(event.target.value.length>0 && event.target.value!='' && event.target.value!=undefined){
      const result = orders.filter(function(item) {
        if(item[0].includes(event.target.value)){
        return item[0].includes(event.target.value)
        }
      });
      setProducts(result)
    }
    else{
      setProducts(orig)
    }
  };

  useEffect(() => {
    fetchLinks().then((res)=>{
      setProducts(res)
      setorig(res)  
    })
  },[]);
  
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
      title="Files"
    >
      <Container maxWidth={false}>
      <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >

        
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Files"
                variant="outlined"
                onChange = {handleChanges}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
        <Box mt={3}>
        <TableContainer  style={{ maxHeight: 700 }}>
            <Table stickyHeader>

              <TableHead>
                <TableRow>
                  <TableCell>
                    File Name
                </TableCell>
                  <TableCell>
                    File Link
                </TableCell>
                  
                </TableRow>
              </TableHead>

              <TableBody>
                
{orders.length > 0 &&  orders.map((order, index) => (
                  <TableRow
                    hover
                  >
                    <TableCell>
                      {order[0]}
                    </TableCell>
                    <TableCell>
                    <a href={order[1]}  target="_blank">{order[1]}</a>
                 
                      
                    </TableCell>
                    
                  </TableRow>
                )
                )}

              

                
              </TableBody>

            </Table>
            </TableContainer>
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
