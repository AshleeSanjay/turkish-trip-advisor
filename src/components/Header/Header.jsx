import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./style.js";
import axios from "axios";
const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autoComplete, setAutoComplete] = useState(null);
  const onLoad = (autoC) => setAutoComplete(autoC);
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const onPlaceChanged = () => {
    if (autoComplete != null) {
      // console.log("Location: ", autoComplete.getPlace().geometry);
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      setCoordinates({ lat, lng });
      const loc = autoComplete.getPlace().address_components[0].long_name;
      searchLocation(loc);
    }
  };

  function searchLocation(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
    axios.get(url).then((response) => {
      setData(response.data);
      console.log("Weather: ", response.data);
    });
    setLocation("");
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Turkish Travel Advisor
        </Typography>

        <Box display="flex">
          <div>
            <p>{data.name}</p>
            <div>
              {data.main ? (
                <h5>
                  {data.main.temp.toFixed()}°F {data.weather[0].main}
                </h5>
              ) : null}
            </div>
          </div>
        </Box>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search...."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
