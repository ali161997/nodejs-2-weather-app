const express = require("express");
const geoCode = require("./utils/geoCode");
const getWeather = require("./utils/weather");
const path = require("path");
const app = express();
const hbs = require("hbs");
const { response } = require("express");
//define paths to hbs configs
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialDirectory = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view location location
app.set("views", viewsDirectory);
app.set("view engine", "hbs");
hbs.registerPartials(partialDirectory);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ali hashem",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "hello from about ",
    name: "ali hashem",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "hello from help ",
    name: "ali hashem",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "Error ",
    name: "ali hashem",
    error: "help document not exist",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address"
    })
  }
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error
      })
    }
    getWeather(data.lat, data.long, (error, data) => {
      if (error) {
        return res.send({
          error
        })
      }
      console.log(data)
      let forcast = `${data.weather[0].description} ,temp :${data.main.temp} ,pressure :${data.main.pressure} ,humidity :${data.main.humidity}`;
      let location = `${data.sys.country}/${data.name} `
      res.send({
        address: req.query.address,
        forcast,
        location
      });
    });

  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must send search term" })
  }
  res.send({
    products: []
  });
});
app.get("*", (req, res) => {
  res.render("error404", {
    title: "Error 404",
    name: "ali hashem",
    error: "document not exist",
  });
});

app.listen(3000, () => {
  console.log("app started");
});
