require("dotenv").config();
let axios = require("axios");
let keys = require("./keys.js");
let moment = require("moment");
let fs = require("fs");
let spotify = new Spotify(keys.spotify);


function lookUp() {
    let command = process.argv[2];
    let thingToLookUp = process.argv[3];
    let results;

    if (command === "concert-this") {
        concertThis(thingToLookUp);
    } else if (command = "spotify-this-song") {
        spotifyThis(thingToLookUp);
    } else if (command = "movie-this") {
        movieThis(thingToLookUp);
    } else if (command = "do-what-it-says") {
        doWhatItSays();
    }
}

function spotifyThis(thingToLookUp) {

    logAction("spotify-this-song", thingToLookUp, results);
}

function concertThis(thingToLookUp) {

    logAction("concert-this", thingToLookUp, results);

}

function movieThis(thingToLookUp) {
    // omdbAPIkey = 99214296
    logAction("movie-this", thingToLookUp, results);
}

function doWhatItSays() {
    fs.readFile("random.txt", (err, data) => {
        let contents = data.split(",");
        if (err) throw err;
        if (contents[0] === "concert-this") {
            concertThis(contents[1]);
        } else if (contents[0] = "spotify-this-song") {
            spotifyThis(contents[1]);
        } else if (contents[0] = "movie-this") {
            movieThis(contents[1]);
        }
    })
}

function logAction(command, thingToLookUp, results) {
    fs.appendFile("log.txt", command + ": " + thingToLookUp + "\n" + results + "\n\n\n", "utf8", (err) => {
        if (err) throw err;
        console.log("The 'data to append' was not appended to the file!")
    })
}

lookUp();