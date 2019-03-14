var db = require("../models");
var moment = require("moment");


module.exports = function(app) {
    //get all pets
    //get a specific pet info
    app.get("/api/pets/", function(req,res){
        db.Pet.findAll({
            include: [{model: db.User}],
        })
        .then (function (dbPets){
            res.json(dbPets);
        });
    });
    app.get("/api/pet/:id", function(req,res){
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

    app.put("/api/p/", function(req, res){
        console.log("The put route for all");
        console.log("the req.body: ", req.body);
        for(let i in req.body.pets){
            db.Pet.update({
                alive: req.body.pets[i].alive,
                hp: req.body.pets[i].hp,
                hungry: req.body.pets[i].hungry,
                sleepy: req.body.pets[i].sleepy,
                happy: req.body.pets[i].happy,
                lastFed: req.body.pets[i].lastFed,
                lastSlept: req.body.pets[i].lastSlept,
                lastPlayed: req.body.pets[i].lastPlayed
            },
            {
                where: {
                    id: req.body.pets[i].id
                }
            })
            .then (function (result){
                console.log("finished");
                res.json(result)
            });
        }
    });
    // update the columns depending on what was sent
    app.put("/api/pets/:id", function(req, res){
        
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
};
