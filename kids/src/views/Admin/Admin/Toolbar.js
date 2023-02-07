import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment'; 
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
// import { Search as SearchIcon } from 'react-feather';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import firebase from "./firebase"
import { ContactSupportOutlined } from '@material-ui/icons';
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});


const data = [
  {
    Crop: "",
    Area: "",
    Date: "",
    Price: ""
  }


];

const useStyles = makeStyles((theme) => ({

  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

const Toolbar = ({ className, ...rest }) => {


  const classes = useStyles();
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
  const newCurrentDate = date;
  const [crop, selectCrop] = useState("Wheat")
  const [city, selectCity] = useState("Wazirabad")
  const [price, selectPrice] = useState(1)
  const [tabledata, setTableData] = useState(data)
  const [selected, change] = useState(false)
  


  function getMarker(value) {
    selectCrop(value.name)
    change(true)
    var newData = []
    selectCrop((crop) => {
      selectCrop(value.name)
      firebase.firestore().collection(String(crop)).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          newData.push(doc.data())
        })
        setTableData(newData)
        setTableData((tabledata) => {
          setTableData(newData)
          return tabledata
        })

      })
      return crop;
    })
  }
  function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // async function getData() {
  //   db.collection(String(crop.name))
  //     .get()
  //     .then(querySnapshot => {
  //       const documents = querySnapshot.docs.map(doc => doc.data())
  //       console.log(documents.values)
  //     })
  // };


  async function insertData() {


    const res = db.collection(String(crop)).doc().set({
      Area: city.name,
      Date: newCurrentDate,
      Price: price
    });


  }
  const handlePriceChange = (e) => {
    selectPrice(e.target.value)
  }

  return (

    <div
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={1500}>
              <Typography style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bolder' }}>
                Admin Portal
            </Typography>
              <Typography>
                <Box display="flex" justifyContent="flex-end" style={{ marginLeft: 20 }}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={cropList}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    //defaultValue = {cropList[Object.keys(cropList)[0][0]]}
                    style={{ width: 300, margin: 20 }}
                    onChange={(event, value) => getMarker(value)}
                    // onInputChange = {(event,value) => getMarker(value)}
                    renderInput={(params) => <TextField {...params} label="Crops" variant="outlined" />}
                  />
                  <Autocomplete
                    id="combo-box-demo"
                    options={majorCitiesList}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300, margin: 20 }}
                    //defaultValue = {majorCitiesList[Object.keys(majorCitiesList)[0][0]]}
                    onChange={(event, value) => selectCity(value)}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                  />
                  <Typography style={{ marginTop: 50, fontSize: 20, border: '1px solid black', marginBottom: 50, padding: 10 }}>
                    {newCurrentDate}
                  </Typography>


                  <TextField id="outlined-basic" label="Price" variant="outlined" style={{ width: 300, margin: 30, marginTop: 50 }} onChange={handlePriceChange} />
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    style={{ fontSize: 20, backgroundColor: '#61A979', color: 'white', height: 45, marginTop: 33, marginRight: 60, marginTop: 50 }}
                    onClick={insertData}
                  >
                    Submit
                </Button>
                </Box>


              </Typography>
              {selected && (
                <Card
                  className={clsx(classes.root, className)}
                  {...rest}
                >
                  <CardHeader title="Prices" />
                  <Divider />
                  <PerfectScrollbar >
                    <Box minWidth={800} >
                      <Table style={{ marginLeft: 20 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Crop
                </TableCell>
                            <TableCell>
                              City
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
                              Price
                </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tabledata.map((order) => (
                            <TableRow
                              hover
                            >
                              <TableCell>
                                {crop}
                              </TableCell>
                              <TableCell>
                                {order.Area}
                              </TableCell>
                              <TableCell>
                                {order.Date}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  color="primary"
                                  label={order.Price}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </PerfectScrollbar>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                  >
                  </Box>
                </Card>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <br></br>

    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};
const cropList = [
  { name: 'Apple (Ammre)' },
  { name: 'Apple (Gatcha)' },
  { name: 'Apple (Golden)' },
  { name: 'Apple Kala Kullu (Pahari)' },
  { name: 'Apricot White' },
  { name: 'Apricot Yellow' },
  { name: 'Banana(DOZENS)' },
  { name: 'Banola' },
  { name: 'Banola Cake' },
  { name: 'Batho' },
  { name: 'Bitter Gourd (کریلا)' },
  { name: 'Bottle Gourd (کدو)' },
  { name: 'Brinjal' },
  { name: 'Brown Sugar(شکر)' },
  { name: 'Cabbage' },
  { name: 'Canola' },
  { name: 'Capsicum (شملہ مرچ)' },
  { name: 'Carrot' },
  { name: 'Carrot China' },
  { name: 'Cauliflower' },
  { name: 'Cocoyam(اروی)' },
  { name: 'Cocunut' },
  { name: 'Coriander (دھنیا)' },
  { name: 'Cucumber (Kheera)' },
  { name: 'Dates (Aseel)' },
  { name: 'Fenugreek(میتھی)' },
  { name: 'feutral early(100 Pcs) فروٹر' },
  { name: 'Garlic (China)' },
  { name: 'Garlic (Local)' },
  { name: 'Ginger (Thai)' },
  { name: 'Ginger(China)' },
  { name: 'Gram Black' },
  { name: 'Gram Flour (بیسن)' },
  { name: 'Gram Pulse' },
  { name: 'Gram White(Imported)' },
  { name: 'Gram White(local)' },
  { name: 'Grapefruit(100Pcs)' },
  { name: 'Grapes (Other)' },
  { name: 'Grapes Gola' },
  { name: 'Grapes Sundekhani' },
  { name: 'green chickpeas(چھولیا)' },
  { name: 'Green Chilli' },
  { name: 'Green Fodder' },
  { name: 'Green Onion' },
  { name: 'Groundnut' },
  { name: 'Guava' },
  { name: 'Jaggery (گڑ)' },
  { name: 'Jaman' },
  { name: 'jujube(بیر)' },
  { name: 'Kinnow (100Pcs)' },
  { name: 'Lady Finger/Okra (بھنڈی توری)' },
  { name: 'Lemon (China)' },
  { name: 'Lemon (Desi)' },
  { name: 'Lemon (Other)' },
  { name: 'Lychee' },
  { name: 'Maize' },
  { name: 'Mango (Malda)' },
  { name: 'Mango Desi' },
  { name: 'Mango Saharni' },
  { name: 'Mango(Anwer Ratol)' },
  { name: 'Mango(Chounsa)' },
  { name: 'Mango(Desahri)' },
  { name: 'Mango(Sindhri)' },
  { name: 'Mash' },
  { name: 'Mash Pulse(Imported) washed' },
  { name: 'Mash Pulse(local)' },
  { name: 'Masoor Pulse (Imported)' },
  { name: 'Masoor Pulse(local)' },
  { name: 'Masoor Whole (Imported)' },
  { name: 'Masoor Whole(local)' },
  { name: 'Melon' },
  { name: 'Millet' },
  { name: 'Mint(پودینہ)' },
  { name: 'Mongray' },
  { name: 'Moong' },
  { name: 'Moong Pulse' },
  { name: 'Mustard Greens(ساگ سرسوں)' },
  { name: 'Mustard seed' },
  { name: 'Onion' },
  { name: 'Orange(100Pcs)' },
  { name: 'Paddy (IRRI)' },
  { name: 'Paddy Basmati' },
  { name: 'Paddy Kainat' },
  { name: 'Papaya(پپیتا)' },
  { name: 'Peach' },
  { name: 'Peach Special' },
  { name: 'Pear' },
  { name: 'Peas' },
  { name: 'Persimmon(جاپانی پھل)' },
  { name: 'Plum' },
  { name: 'Pomegranate Desi' },
  { name: 'Pomegranate(Badana)' },
  { name: 'Pomegranate(Kandhari)' },
  { name: 'Potato Fresh' },
  { name: 'Potato Store' },
  { name: 'Potato Sugar free' },
  { name: 'Pumpkin' },
  { name: 'Radish' },
  { name: 'RapeSeed (Torya)' },
  { name: 'Red Chilli Whole (Dry)' },
  { name: 'Rice (IRRI)' },
  { name: 'Rice Basmati (385)' },
  { name: 'Rice Basmati Super (New)' },
  { name: 'Rice Basmati Super (Old)' },
  { name: 'Rice Kainat (New)' },
  { name: 'Seed Cotton(Phutti)' },
  { name: 'Sesame(تِل)' },
  { name: 'Sorghum' },
  { name: 'Spinach' },
  { name: 'Strawberry' },
  { name: 'Sugar' },
  { name: 'sugarcane' },
  { name: 'Suger Beet(چقندر)' },
  { name: 'Sunflower' },
  { name: 'Sweet Musk Melon' },
  { name: 'Sweet Musk Melon (Shireen)' },
  { name: 'Sweet Potato(شکر قندی)' },
  { name: 'Tinda Desi' },
  { name: 'Tindian' },
  { name: 'Tomato' },
  { name: 'Turmeric Whole(ثابت ہلدی)' },
  { name: 'Turnip' },
  { name: 'Water chestnut(سنگھاڑا)' },
  { name: 'Watermelon' },
  { name: 'Wheat' },
  { name: 'Wheat Straw' },
  { name: 'Zucchini (گھیا توری)' }
];
const majorCitiesList = [
  { name: 'Bahawalpur' },
  { name: 'Bahawalnagar' },
  { name: 'Rahim Yar Khan' },
  { name: 'Dera Ghazi Khan' },
  { name: 'Layyah' },
  { name: 'Muzaffargarh' },
  { name: 'Rajanpur' },
  { name: 'Faisalabad' },
  { name: 'Chiniot' },
  { name: 'Jhang' },
  { name: 'Toba Tek Singh' },
  { name: 'Gujranwala' },
  { name: 'Gujrat' },
  { name: 'Hafizabad' },
  { name: 'Mandi Bahauddin' },
  { name: 'Narowal' },
  { name: 'Sialkot' },
  { name: 'Lahore' },
  { name: 'Nankana Sahib' },
  { name: 'Qasur' },
  { name: 'Sheikhupura' },
  { name: 'Multan' },
  { name: 'Khanewal' },
  { name: 'Lodhran' },
  { name: 'Vehari' },
  { name: 'Rawalpindi' },
  { name: 'Attock' },
  { name: 'Chakwal' },
  { name: 'Jhelum' },
  { name: 'Sahiwal' },
  { name: 'Okara' },
  { name: 'Pakpattan' },
  { name: 'Sargodha' },
  { name: 'Bhakkar' },
  { name: 'Khushab' },
  { name: 'Mianwali' }




];
export default Toolbar;
