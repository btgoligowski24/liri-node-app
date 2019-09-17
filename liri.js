require("dotenv").config();
let axios = require("axios");
let keys = require("./keys.js");
let moment = require("moment");
let fs = require("fs");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

function lookUp() {
    let command = process.argv[2];
    let thingToLookUp = process.argv[3];
    let results;

    switch (command) {
        case "concert-this":
            concertThis(thingToLookUp);
            break;
        case "spotify-this-song":
            spotifyThis(thingToLookUp);
            break;
        case "movie-this":
            movieThis(thingToLookUp);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

function spotifyThis(thingToLookUp) {
    if (!thingToLookUp) {
        thingToLookUp = "The Sign";
    }
    spotify.search({
        type: "track",
        query: thingToLookUp,
        limit: 1
    }).then(response => {
        let song = response.tracks.items[0];
        let artistsArr = song.artists;
        let artist = artistsArr[0].name;
        if (artistsArr.length > 1) {
            for (let i = 1; i < artistsArr.length; i++) {
                artist += " & " + artistsArr[i].name
            }
        }
        let results = "\nArtist(s): " + artist + "\nSong Title: " + song.name + "\nPreview URL: " + song.preview_url + "\nAlbum: " + song.album.name
        console.log(results);
        logAction("spotify-this-song", thingToLookUp, results);
    }).catch(error => {
        console.log("Could not spotify this song!\n" + error)
    })
}

function concertThis(thingToLookUp) {
    axios.get("https://rest.bandsintown.com/artists/" + thingToLookUp + "/events?app_id=codingbootcamp").then(response => {
        let results = "\n";
        for (obj in response.data) {
            let formattedDate = moment(response.data[obj].datetime).format("MM/DD/YYYY");
            if (response.data[obj].venue.region) {
                results += "Venue Name: " + response.data[obj].venue.name + "\nVenue Location: " + response.data[obj].venue.city + ", " + response.data[obj].venue.region + ", " + response.data[obj].venue.country + "\nEvent Date: " + formattedDate + "\n\n";
            } else {
                results += "Venue Name: " + response.data[obj].venue.name + "\nVenue Location: " + response.data[obj].venue.city + ", " + response.data[obj].venue.country + "\nEvent Date: " + formattedDate + "\n\n";
            }
        }
        console.log(results);
        logAction("concert-this", thingToLookUp, results);
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data-----------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    })
}

function movieThis(thingToLookUp) {
    if (!thingToLookUp) {
        thingToLookUp = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + thingToLookUp + "&y=&plot=short&apikey=99214296").then(response => {
            let movie = response.data
            let ratings = movie.Ratings;
            let rtRating = "No data provided";
            for (obj in ratings) {
                if (ratings[obj].Source === "Rotten Tomatoes") {
                    rtRating = ratings[obj].Value;
                }
            }
            let results = "\nMovie Title: " + movie.Title + "\nYear Released: " + movie.Released + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " + rtRating + "\nProduced in: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nStarring: " + movie.Actors;

            console.log(results);
            logAction("movie-this", thingToLookUp, results);
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data-----------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", (error, data) => {
        let contents = data.split(",");
        if (error) throw console.log("Could not perform the random action!\n" + error);
        if (contents[0] === "concert-this") {
            concertThis(contents[1]);
        } else if (contents[0] === "spotify-this-song") {
            spotifyThis(contents[1]);
        } else if (contents[0] === "movie-this") {
            movieThis(contents[1]);
        }
    })
}

function logAction(command, thingToLookUp, results) {
    fs.appendFile("log.txt", command + ": " + thingToLookUp + "\n" + results + "\n\n", "utf8", (err) => {
        if (err)
            throw console.log("The 'data to append' was not appended to the file!\n" + err);
    })
}

lookUp();