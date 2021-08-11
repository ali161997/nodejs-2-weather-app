const request = require("request");
const geoCode = (city, callback) => {
  //function to get lat ,lon,address
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    city
  )}.json?access_token=pk.eyJ1IjoiYWxpLWhhc2hlbSIsImEiOiJja3J3a2Jma2cwaGVsMnBvZTRoYmlsenlhIn0.nAQv9ioztaSF_1BzyaGNIg`;
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback("cannot access to location service", undefined);
    } else if (data.body.features.length===0) {
      callback("unable to find location ,try another location", undefined);
    } else {
      callback(undefined, {
        lat: data.body.features[0].center[1],
        long: data.body.features[0].center[0],
        place_name: data.body.features[0].place_name
      });
    }
  });
};
module.exports = geoCode;
