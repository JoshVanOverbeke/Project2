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
    app.post("/api/newpet/", function(req, res){
        db.Pet.create(req.body)
        .then (function (result){
            res.json(result);
        });
    });

    app.put("/api/p/", function(req, res){
        console.log("The put route");
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
            .then (function (dbPets){
                console.log("finished");
            });
        }
    });
    // update the columns depending on what was sent
    app.put("/api/pets/:id", function(req, res){
        // if the hp and alive is sent then update that
        if (req.body.hp && req.body.alive){
            db.Pet.update({
                hp: req.body.hp,
                alive: req.body.alive
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });
        }

        switch (action){
        // if Feed is sent then update hungry and lastFed to the current time
        case Feed:
        
            db.Pet.update({
                hungry: db.Sequelize.literal('hungry + 1'),
                lastFed: moment()
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });
            break;
        
        // if Play is sent then update happy and lastPlayed to the current time
        case Play: 
        
            db.Pet.update({
                happy: db.Sequelize.literal('happy + 1'),
                lastPlayed: moment()
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                }); 
            break;  
        
        // if Sleep is sent then update sleepy and lastSlept to the current time
        case Sleep: 

            db.Pet.update({
                sleepy: db.Sequelize.literal('sleepy + 1'),
                lastSlept: moment()
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });  
            break; 
       
        // if Kill is sent then update all status to 0
        case Kill: 
        
            db.Pet.update({
                alive: 0,
                sleepy: 0,
                hungry: 0,
                happy: 0
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });
            break;
    }
    
    });
};