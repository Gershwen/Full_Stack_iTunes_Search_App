const express = require("express");
//We use Helmet for an added layer of security
const helmet = require("helmet");
//Using isomorphic fetch package to run the fecth API on the server
const fetch = require("isomorphic-fetch");
const bodyParser = require("body-parser");
const app = express();

//Using body parser to get data from the body of the HTTP request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

let search = "";
let media = "";

// Testing below fetch
module.export = function getData() {
  fetch(`https://itunes.apple.com/search?term=titanic&media=movie&limit=1`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

//POST
app.post("/api", (req, res) => {
  search = `${req.body.search}`;
  media = `${req.body.select}`;

  // Fetching data from API
  fetch(`https://itunes.apple.com/search?term=${search}&media=${media}&limit=5`)
    .then((response) => response.json())
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

//Below allows Express to serve up resources from React in production
if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
  'frontend', 'build','index.html'));
  });
  }

// Get port from environment and store in Express.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
