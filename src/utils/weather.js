const request = require("request");
const getWeather = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=da0c5898af427c20512f9dc7bbd3e844`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("cannot access service", undefined);
    } else if (body.error) {
      callback("cannot get data to your location", undefined);
    } else {
      callback(undefined, body);
    }
  });
};
module.exports = getWeather;
