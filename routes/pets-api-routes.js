//dependencies
var express = require("express");
const router = express.Router()
var db = require("../models");
var moment = require("moment");



// module.exports = function(app) {
    //get all pets
    //get a specific pet info
    router.get("/api/pets/", function(req,res){
        db.Pet.findAll({
            include: [{model: db.User}],
        })
        .then (function (dbPets){
            res.json(dbPets);
        });
    });
    router.get("/api/pet/:id", function(req,res){
        db.Pet.findOne({
            include: [{model: db.User}],
            where:{
                id: req.params.id
            }
        })
        .then (function (dbPets){
            res.json(dbPets);
        });
    });
    //post a new pet
    app.post("/api/newpet", function(req, res){
        db.Pet.create(req.body)
        .then (function (result){
            res.json(result);
        });
    });
    //udpates the pet information based on time
    app.put("/api/p/", function(req, res){
        db.Pet.findAll({})
        .then(function(foundPets) {
            return timeUpdate(foundPets)
        })
        .then(function(results) {
            for(let j in results){
                db.Pet.update({
                    alive: results[j].alive,
                    hp: results[j].hp,
                    hungry: results[j].hungry,
                    sleepy: results[j].sleepy,
                    happy: results[j].happy,
                    lastFed: results[j].lastFed,
                    lastSlept: results[j].lastSlept,
                    lastPlayed: results[j].lastPlayed
                },
                {
                    where: {
                        id: results[j].id
                    }
                })
            }
            console.log("results: ", results)
        }).then (function (result){
            console.log("finished");
            res.json(result)
        });
         //function that updates the pet information based off time
    function timeUpdate(dbData) {
        let petArray = [];
        for (let i in dbData) {
            let momDifFed = parseFloat(moment().diff(dbData[i].dataValues.lastFed, 'minutes', true));
            let momDifSlept = parseFloat(moment().diff(dbData[i].dataValues.lastSlept, 'minutes', true));
            let momDifPlayed = parseFloat(moment().diff(dbData[i].dataValues.lastPlayed, 'minutes', true));
            // =================================================================================
            //if 10 minutes have passed, subtract 5 from hungry
            if (momDifFed >= 10) {
                //update [dbData[i]].hungry
                dbData[i].dataValues.hungry -= 5;
                dbData[i].dataValues.lastFed = moment().format()
            }
            //if 8 minutes have passed, subtract 4 from hungry/sleepy/play
            //update lastFed/Slept/Played to reflect [dbData[i]].hungry decreases happened 
            else if (momDifFed >= 8) {
                dbData[i].dataValues.hungry -= 4;
                dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 8, 'minutes').format()
            }
            else if (momDifFed >= 6) {
                dbData[i].dataValues.hungry -= 3;
                dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 6, 'minutes').format()
            }
            else if (momDifFed >= 4) {
                dbData[i].dataValues.hungry -= 2;
                dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 4, 'minutes').format()
            }
            else if (momDifFed >= 2) {
                dbData[i].dataValues.hungry -= 1;
                dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 2, 'minutes').format()
            };
            // =================================================================================
            //if 10 minutes have passed, subtract 5 from sleepy
            if (momDifSlept >= 10) {
                //update [dbData[i]].hungry
                dbData[i].dataValues.sleepy -= 5;
            }
            //if 8 minutes have passed, subtract 4 from hungry/sleepy/play
            //update lastFed/Slept/Played to reflect [dbData[i]].hungry decreases happened 
            else if (momDifSlept >= 8) {
                dbData[i].dataValues.sleepy -= 4;
                dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 8, 'minutes').format()
            }
            else if (momDifSlept >= 6) {
                dbData[i].dataValues.sleepy -= 3;
                dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 6, 'minutes').format()
            }
            else if (momDifSlept >= 4) {
                dbData[i].dataValues.sleepy -= 2;
                dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 4, 'minutes').format()
            }
            else if (momDifSlept >= 2) {
                dbData[i].dataValues.sleepy -= 1;
                dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 2, 'minutes').format()
            };
            // =================================================================================
            //if 10 minutes have passed, subtract 5 from happy
            if (momDifPlayed >= 10) {
                //update [dbData[i]].hungry
                dbData[i].dataValues.happy -= 5;
            }
            //if 8 minutes have passed, subtract 4 from hungry/sleepy/play
            //update lastFed/Slept/Played to reflect [dbData[i]].hungry decreases happened 
            else if (momDifPlayed >= 8) {
                dbData[i].dataValues.happy -= 4;
                dbData[i].dataValues.lastPlayed = moment().subtract(momDifPlayed - 8, 'minutes').format()
            }
            else if (momDifPlayed >= 6) {
                dbData[i].happy -= 3;
                dbData[i].lastPlayed = moment().subtract(momDifPlayed - 6, 'minutes').format()
            }
            else if (momDifPlayed >= 4) {
                dbData[i].dataValues.happy -= 2;
                dbData[i].dataValues.lastPlayed = moment().subtract(momDifPlayed - 4, 'minutes').format()
            }
            else if (momDifPlayed >= 2) {
                dbData[i].dataValues.happy -= 1;
                dbData[i].dataValues.lastPlayed = moment().subtract(momDifPlayed - 2, 'minutes').format()
            };
            // =================================================================================
            //set statuses to zero if below zero
            if (dbData[i].dataValues.hungry < 0) {
                dbData[i].dataValues.hungry = 0;
            }
            if (dbData[i].dataValues.sleepy <= 0) {
                dbData[i].dataValues.sleepy = 0;
            }
            if (dbData[i].dataValues.happy < 0) {
                dbData[i].dataValues.happy = 0;
            }
            if (dbData[i].dataValues.hungry === 0 && dbData[i].dataValues.sleepy === 0 && dbData[i].dataValues.happy === 0) {
                dbData[i].dataValues.hp = 0;
                dbData[i].dataValues.alive = 0
            }
            else if (dbData[i].dataValues.hungry === 0 && dbData[i].dataValues.sleepy === 0 || dbData[i].dataValues.sleepy === 0 && dbData[i].dataValues.happy === 0 || dbData[i].dataValues.hungry === 0 && dbData[i].dataValues.happy === 0) {
                dbData[i].dataValues.hp = 1
            }
            else if (dbData[i].dataValues.hungry === 0 || dbData[i].dataValues.sleepy === 0 || dbData[i].dataValues.happy === 0) {
                dbData[i].dataValues.hp = 2
            }
            else {
                dbData[i].dataValues.hp = 3;
            }
        petArray.push(dbData[i].dataValues)
    
        }
        console.log("Ran timeupdate")
        return petArray
    };
    });
   
    // update the columns depending on what was sent
    router.put("/api/pets/:id", function(req, res){
        
        var action = req.body.action;
        console.log(action)
        var actionKey;
        switch (action){
        // if Feed is sent then update hungry and lastFed to the current time
        case "Feed":
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
            // update the lastFed time
            db.Pet.update({

                lastFed: moment().format()
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then (function (result){
                    res.end()
                });
        // if hungry is at zero then increase hp by one
            if (req.body.hungry=0){
                db.Pet.findOne(
                    {
                        where: {
                            id:req.params.id
                        }
                    })
                    .then(function(foundPet) {
                    return foundPet.update({hp: parseInt(foundPet.hp)+1})
                    })
                    .then(function(result) {
                    console.log("results: ", result)
                    });
            }
            break;
        
        // if Play is sent then update happy and lastPlayed to the current time
        case "Play": 
            console.log("run play!!!")
            // increment happy by one
            db.Pet.findOne(
                {
                    where: {
                        id:req.params.id
                    }
                })
                .then(function(foundPet) {
                return foundPet.update({happy: parseInt(foundPet.happy)+1})
                })
                .then(function(result) {
                console.log("results: ", result)
                });
            // update the lastPlayed time
            db.Pet.update({
                lastPlayed: moment().format()
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then (function (result){
                    res.end()
                }); 
            // update hp if happy is 0
                if (req.body.happy=0){
                    db.Pet.findOne(
                        {
                            where: {
                                id:req.params.id
                            }
                        })
                        .then(function(foundPet) {
                        return foundPet.update({hp: parseInt(foundPet.hp)+1})
                        })
                        .then(function(result) {
                        console.log("results: ", result)
                        });
                }

            break;  
        
        // if Sleep is sent then update sleepy and lastSlept to the current time
        case "Sleep": 
            console.log("run sleep!!!")
            // increment Sleepy by one
            db.Pet.findOne(
                {
                    where: {
                        id:req.params.id
                    }
                })
                .then(function(foundPet) {
                return foundPet.update({sleepy: parseInt(foundPet.sleepy)+1})
                })
                .then(function(result) {
                console.log("results: ", result)
                });
            // update the lastSlept time
            db.Pet.update({
                lastSlept: moment().format()
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then (function (result){
                    res.end()                
                });  

            // increment hp if sleepy is 0
                if (req.body.sleepy=0){
                    db.Pet.findOne(
                        {
                            where: {
                                id:req.params.id
                            }
                        })
                        .then(function(foundPet) {
                        return foundPet.update({hp: parseInt(foundPet.hp)+1})
                        })
                        .then(function(result) {
                        console.log("results: ", result)
                        });
                }
                
            break; 
       
        // if Kill is sent then update all status to 0
        case "Kill": 
            console.log("run kill!!!")
            db.Pet.update({
                alive: 0,
                sleepy: 0,
                hungry: 0,
                happy: 0,
                hp: 0
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then (function (result){
                    res.end()                
                });
            break;

        case "Resurrect": 
            console.log("==========================run resurrect!!!=========================")
            db.Pet.update({
                alive: 1,
                sleepy: 5,
                lastSlept: moment().format(),
                hungry: 5,
                lastFed: moment().format(),
                happy: 5,
                lastPlayed: moment().format(),
                hp: 3
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then (function (result){
                    res.end()                
                });
            break;
    }
    
    });
// };

//export router
module.exports = router
