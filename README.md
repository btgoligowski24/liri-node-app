# liri-node-app

## What Problem Does the App Solve
This app is an intro to command line interface with Node.js. It introduces me to a way to interact with a server via Node.js. It also taught me about using API's within the program. While this is a basic program it is still fairly powerful.

## App Overiew
The app is organized by functions. There is one function that is run and based on what parameter is passed in, it will call other functions.

## How to Use the App
1. **You must have Node.js installed for this to work, this is a prequisite**
1. Open up your command line interface (i.e. terminal on Mac or command prompt on Windows)
2. Navigate to the folder where the program is located
3. Verify required files are present
  1. You should already have the `package.json` file; if you don't, run `npm init -y`. 
  2. Now, make sure to run `npm install` which will install the proper dependencies in this folder.
  3. random.txt exists with contents in the following format {command},{thingToLookUp} (the app will only results the first pair like this, extras will not run)
4. Run the node program by entering one of the follow commands, replacing the text in curly braces (*{text}*) with something matching the text's description. If there are spaces in your description, encapsulate it with quotes (*"this is my selection"*). Things in square brackets([ ]) are optional, there are defaults that are run if you don't input anything:
    * `node liri.js concert-this {artist}`
    * `node liri.js spotify-this-song [{song}]`
    * `node liri.js movie-this [{movie}]`
    * `node liri.js do-what-it-says`
5. Voila, you've used the app. It should print the response to the console (command prompt) and will also create a log file if one doesn't exist or will append to it if it does.

* [Video Demonstration of the App](https://youtu.be/pMihNROo6qE)

## Technology Used
* Node.js
  * Specific Node Pacakages
    * node-spotify-api
    * axios
    * moment
    * dotenv
    * fs
* APIs
  * Spotify
  * Bands in Town
  * OMDB

## Contributors
I am the sole contributor to this project at this time. This likely will not be updated and maintained going forward.