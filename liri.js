require("dotenv").config();
let axios = require("axios");
let keys = require("./keys.js");
let dotenv = require("dotenv");
let moment = require("moment");
let fs = require("fs");
let spotify = new Spotify(keys.spotify);

// omdbAPIkey = 99214296