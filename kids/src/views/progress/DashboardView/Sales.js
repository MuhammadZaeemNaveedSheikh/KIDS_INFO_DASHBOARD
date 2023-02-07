// import React, {useEffect} from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import { Line } from 'react-chartjs-2';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   useTheme,
//   makeStyles,
//   colors
// } from '@material-ui/core';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import firebaseMobile from 'src/views/mobilefirebase';
// import { dataSourceChanged } from '@syncfusion/ej2-grids';


// const useStyles = makeStyles(() => ({
//   root: {}
// }));

// const Sales = ({ className, ...rest }) => {
//   const classes = useStyles();
//   const theme = useTheme();
//   var innerObj = []
//   // var lables = []
//   // var cropData = []










// //   useEffect(() => {
// //     async function fetchData(){
// //       await firebaseMobile.database().ref('PreviousPrices/ Cabbage').once('value',(snap)=>{
// //       var data = snap.val()
// //       var cropD = JSON.parse(Object.values(data)[0])
// //       innerObj = Object.values(cropD)
// //     });
// //     var labels = []
// //   var data = []

// // for (var i=0;i<innerObj.length;i++){
// //   lables.push(Object.values(innerObj[i])[0])
// //   cropData.push(Object.values(innerObj[i])[1])
// // }
// //   }
// //   fetchData()

// //   },[]);









//   const data = {
//     datasets: [
//       {
//         // backgroundColor: colors.indigo[500],
//         // data: [18, 5, 19, 27, 29, 19, 20],
//         data : cropData.slice(1,100),
//         label: 'This year'
//       }
//     ],
//     // labels: ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec']
//     labels: lables.slice(1,100)
//   };

//   const options = {
//     animation: false,
//     cornerRadius: 20,
//     layout: { padding: 0 },
//     legend: { display: false },
//     maintainAspectRatio: false,
//     responsive: true,
//     scales: {
//       xAxes: [
//         {
//           // barThickness: 12,
//           // maxBarThickness: 10,
//           // barPercentage: 0.5,
//           categoryPercentage: 0.5,
//           ticks: {
//             fontColor: theme.palette.text.primary
//           },
//           gridLines: {
//             display: false,
//             drawBorder: true
//           }
//         }
//       ],
//       yAxes: [
//         {
//           ticks: {
//             fontColor: theme.palette.text.secondary,
//             beginAtZero: true,
//             min: 0
//           },
//           gridLines: {
//             borderDash: [2],
//             borderDashOffset: [2],
//             color: theme.palette.divider,
//             drawBorder: false,
//             zeroLineBorderDash: [2],
//             zeroLineBorderDashOffset: [2],
//             zeroLineColor: theme.palette.divider
//           }
//         }
//       ]
//     },
//     tooltips: {
//       backgroundColor: theme.palette.background.default,
//       bodyFontColor: theme.palette.text.secondary,
//       borderColor: theme.palette.divider,
//       borderWidth: 1,
//       enabled: true,
//       footerFontColor: theme.palette.text.secondary,
//       intersect: false,
//       mode: 'index',
//       titleFontColor: theme.palette.text.primary
//     }
//   };

//   return (
//     <Card
//       className={clsx(classes.root, className)}
//       {...rest}
//     >
//       <CardHeader
        
        
//         title="Price Trend For The Last 5 Years"
//       />
//       <Divider />
//       <CardContent>
//         <Box
//           height={400}
//           position="relative"
//         >
//           <Line
//             data={data}
//             options={options}
//           />
//         </Box>
//       </CardContent>
//       <Divider />
//       <Box
//         display="flex"
//         justifyContent="flex-end"
//         p={2}
//       >
//         <Button
//           color="primary"
//           endIcon={<ArrowRightIcon />}
//           size="small"
//           variant="text"
//         >
//           Overview
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// Sales.propTypes = {
//   className: PropTypes.string
// };

// export default Sales;
