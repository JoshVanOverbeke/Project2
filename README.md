# Project2
This application is a game to have fun.  If a user comes to the page,they need to register or log in before creating a pet.  The owners can feed, put the cat down for a nap, play with, or kill their pet. Other people can also feed, nap, play, and kill any pets. If a hasn't been fed, played, or napped in a long time the pet will die.  If the pet dies, the owner can resurrect their pet.

## Installing / Getting started

This application doesn't require any other installation for a user.

## Initial Configuration

Before starting development of this application, we needed to npm install express-jwt, express, moment, express-handlebars, mysqul2, and sequelize packages. We created the database on jawsDB and deployed to Heroku.


## Running the tests

We ran tests creating a user and creating a pet.  Made pets with all of our gifs. We fed, played, and napped a pet to make sure the bars increase.  We also killed a pet and resurrected it.  Changed our time to minutes to simulate time passing to make sure that the feed, sleep, play, and hp decreases if it has been too long.  Made sure authentication works and a user needs to be logged in before they can play with the pet.  

## Code Snippet

// increment hungry by one
     db.Pet.findOne(
        {
            where: {
                id:req.params.id
            }
        })
        .then(function(foundPet) {
        return foundPet.update({hungry: parseInt(foundPet.hungry)+1})
        })
        .then(function(result) {
        console.log("results: ", result)
        });

## Built With
* jquery
* Bootstrap
* express-handlebars
* express
* moment
* sequelize
* express-jwt
* jwt

## Links

- Deployment page: https://pet-park.herokuapp.com/
- Repository: https://github.com/JoshVanOverbeke/Project2