# Project2
This application will take in arguments of a command term and search term and the different commands will either display to the screen concert, song, or movie information.

## Installing / Getting started

In order to run this application, you will have to clone the github repository listed under links.

### Initial Configuration

Before starting development of this application, a Spotify API key needs to be obtained and installation of axios, dotenv, moment, and node-spotify-api npm packages is needee.  The api keys for IMDB and Bandsintown is also needed, but the bootcamp provided keys for these. 


## Running the tests

This application will take in arguments, of which the first argument after the file needs to be one of the following commands:

* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

The following arguments would be an artist or band for concert-this, song title for spotify-this-song, movie title for movie-this, and nothing for do-what-it-says.

These arguments will display venue, venue location, and date if concert-this is specified in the command argument.  The screen will display artist, song title, link to a preview of the song, and album if spotify-this-song is specified. For movie-this, the screen will display movie title, release year, IMDB rating, Rotten Tomatoes rating, language of movie, plot of the movie, and actors in the movie.  The do-what-it-says command will pull text from a file, random.txt, and execute what is stored on the file.  In addition, the screen outputs will be logged to a log.txt file and stored in the Liribot directory.

#### Argument 1 - Command
Type: `String`  
Default: `" "`

It needs to match one of the following:

* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

If it is not the text listed, then it will do nothing.

#### Argument 2 - search term
Type: `string`  
Default: `" "`

* concert-this - needs artist or band as search term
* spotify-this-song - needs song title as search term
* movie-this - needs movie title as search term
* do-what-it-says - no search term needed

## Test scenario 1

command = concert-this
search term = elton john

Typed into command line --> "node liri.js concert-this elton john"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario1.PNG)

## Test scenario 2

command = concert-this
search term = gjafo

Typed into command line --> "node liri.js concert-this gjafo"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario2.PNG)

## Test scenario 3

command = concert-this
search term = "blank"

Typed into command line --> "node liri.js concert-this"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario3.PNG)

## Test scenario 4

command = spotify-this-song
search term = blank space

Typed into command line --> "node liri.js spotify-this-song blank space"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario4.PNG)

## Test scenario 5

command = spotify-this-song
search term = afzsfv

Typed into command line --> "node liri.js spotify-this-song afzsfv"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario5.PNG)

## Test scenario 6

command = spotify-this-song
search term = "blank"

Typed into command line --> "node liri.js spotify-this-song"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario6.PNG)

## Test scenario 7

command = movie-this
search term = trolls

Typed into command line --> "node liri.js movie-this trolls"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario7.PNG)

## Test scenario 8

command = movie-this
search term = arufhd

Typed into command line --> "node liri.js movie-this arufhd"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario8.PNG)

## Test scenario 9

command = movie-this
search term = "blank"

Typed into command line --> "node liri.js movie-this"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario9.PNG)

## Test scenario 10

command = do-what-it-says
search term = "blank"

Typed into command line --> "node liri.js do-what-it-says"

![Image of scenario 1](https://github.com/cvanglee/LIRIBot/blob/master/images/Scenario10.PNG)

## Links

- Repository: