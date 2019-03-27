require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

//You should then be able to access your keys information like so
var spotify = new Spotify(keys.spotify);

var test = process.argv;
var action = test[2];
var search = test[3];

//making a for loop to go through the process.argv array in the command line.
for(i = 4; i < test.length; i++) {
    search += "+" +test[i];
    console.log(search);
}


//switch is a statement (if/else could also work here)
//this directs which function will get run
function switchWrapper() {
switch (action) {
    case "movie-this":
      movieThis();
      break;
    
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifyThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }
}

switchWrapper();

    function movieThis() {
        
        var URL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

        console.log(URL);

        axios.get(URL).then(function(response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
        });
        
    }

    function concertThis() {
        var URL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

        console.log(URL);

        axios.get(URL).then(function(response){
            for(i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                //moment is a module in node that it changes dates and time formats. (similar to moment.JS)
                //This is why we had to require it at the top of our code so that we could 
                //access this module to utilize it when searching information about different shows.
                console.log("Date of show" + moment(response.data[i].datetime).format("L"));
            }



        });
    }


//this is using spotifys API, reading through this is what we came up with. 
//searching for a particular song, taking our input and setting it to the first
//search. It's just giving the most popular instead of giving all the results for
//the name of that song. 
    function spotifyThis() {
        spotify.search({ type: 'track', query: search,limit:1 })
        
        .then(function(response) {
            console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Song Preview: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name);

     });
    }
//utf8 is a universal character that translates the string to english that is 
//found in the file it's reading.
//fs is "filesystem" that comes with node that lets you access files.
    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function(error,data){
            if (error) {
                console.log(error);
            }
        var songArr = data.split(",");
        console.log(songArr);

        var songArr2 = songArr[1].split(" ");
        console.log(songArr2);

        action = songArr[0];
        search = songArr2[0];
        for (i = 1; i < songArr2.length; i++) {
            search += "+" + songArr2[i];
        }
        console.log(search);
        console.log(action);
        switchWrapper();


        });
    }



    
    


