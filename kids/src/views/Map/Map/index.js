import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import MapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'
import './mapbox-gl-geocoder.css'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import data from "../../../../src/CropDataPunjab.json"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderBottom: '2px solid grey'
  },
  gridList: {
    width: 500,
    height: "100%"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


  
const AboutUs = () => {
  const { datas, isLoading, errorMessage } = useOpenWeather({
    key: '27c4af4d122ffdf8c00ec690ff7a7583',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  const filterResults = useCallback((result) =>
  result.id.toLowerCase().includes("place"),[])

  const top5 = (cityName) => {
    var cityData = data.CropData.filter((crop) => {
      return crop.District == cityName

    });
    cityData.sort(function (a, b) {
      return b.Area - (a.Area);
    })
    var top5Crops = cityData.slice(0, 6);
    return top5Crops

  }
  const MAPBOX_TOKEN = "pk.eyJ1IjoibGV0c3dvcmtqYWZhciIsImEiOiJja2tvaWNpY2wwMzlqMnVzMW9kaHEydDFvIn0.ed14dpE2FS9AgV9waHFu8A"
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const [viewport, setViewport] = useState({
    latitude: 30.3894007,
    longitude: 69.3532207,
    zoom: 5.5,
    width: '100vw',
    height: '100vh'

  },
  )
  const geolocateControlStyle = {
    right: 10,
    top: 14
  };

  const navControlStyle = {
    right: 10,
    bottom: 30
  }
  const [position, setPosition] = useState({
    longitude: 30.3894007,
    latitude: 69.3532207
  });
  const onMapClick = (event) => {
    setPosition({ longitude: event.center[0], latitude: event.center[1] });
  };
  const [areaName, setAreaname] = useState(
    "Default"
  )
  const classes = useStyles();
  const [weather, setWeather] = useState({});
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, cityName) => (
    <div>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div" style={{ fontSize: '20px' }}>Major Crops Data For {cityName}</ListSubheader>
          </GridListTile>
          {top5(cityName).map((crop, key) => (
            <GridListTile key={key} style={{ widht: '100%' }}>
              <img src={crop.Picture} alt={crop.CropName} />
              <GridListTileBar
                title={crop.CropName}
                subtitle={<div><div>Area Under Crop: {crop.Area} Acres</div><div>Production Of Crop: {crop.Production} Tonnes</div></div>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div>
        
      </div>
    </div>
  );
  const fetchAddress = async (longitude, latitude) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=${MAPBOX_TOKEN}`)
      .then(response => response.json())
      .then(data => setAreaname(data.features[0].place_name.split(',')[0]));

  };
  const fetchWeather = async (lat, long) => {
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "802d0ce01dmsh4ce490d5e127fb6p14b224jsnad82357d8795",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
      }
    })
      .then(async response => {
        setWeather(await response.json());
      })
      .catch(err => {
        console.error(err);
      });
      
  }
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
    <>
      <div style={{ height: "100%" }}>
        <MapGL
          ref={mapRef}
          {...viewport}
          style={{ cursor: "crosshair" }}
          width="100%"
          height="100%"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
          mapStyle="mapbox://styles/letsworkjafar/ckkpfkasp0w2s17mxxi99bmcx"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          doubleClickZoom={false}
        >
          <NavigationControl style={navControlStyle} />
          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onViewportChange={handleViewportChange}
            zoom={12}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
            countries={"pk"}
            marker={true}
            onResult={e => {
              onMapClick(e.result);
              toggleDrawer('right', true)(e.result);
              setAreaname(e.result.place_name.split(',')[0])
              fetchWeather(e.result.center[1], e.result.center[0])
            }}
            filter={filterResults}
          />
          <Marker
            longitude={position.longitude}
            latitude={position.latitude}
          >
            <img src="/marker.svg" style={{ height: "36px", width: "36px" }} alt="" />
          </Marker>
        </MapGL>
        <div style={{ maxWidth: '100px !important' }}>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {state.right ? list('right', areaName) : null}

          </Drawer>
        </div>
      </div>

    </>

  );
};

export default AboutUs;
