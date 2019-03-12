var db = require("../models");
var moment = require("moment");

module.exports = function(app) {
    //get all pets
    app.get("/", function(req, res){
        db.Pet.findAll({
            include: [{model: db.User}]
        })
        .then (function (dbPets){
            res.render("index", dbPets)
        });
    });

    //get a specific pet info
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
    })


    //post a new pet
    app.post("/api/newpet/", function(req, res){
        db.Pet.create(req.body)
        .then (function (result){
            res.json(result);
        });
    });
  
    // update the columns depending on what was sent
    app.put("/api/pets/:id", function(req, res){
        // if the hp and alive is sent then update that
        if (req.body.hp && req.body.alive){
            db.Pets.update({
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
        
            db.Pets.update({
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
        
            db.Pets.update({
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

            db.Pets.update({
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
        
            db.Pets.update({
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