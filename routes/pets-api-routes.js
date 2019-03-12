var db = require("../models");

module.exports = function(app) {
    //get all pets
    app.get("/", function(req, res){
        db.Pets.findAll({
            include: [{model: db.User}]
        })
        .then (function (dbPets){
            res.render("index", dbPets)
        });
    });

    //get a specific pet info
    app.get("/api/pet/:id", function(req,res){
        db.Pets.findOne({
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
        db.Pets.create(req.body)
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
        // if Feed is sent then update hungry and lastFed to the current time
        var action = req.body.action;
        switch (action) {
        case Feed:
        
            db.Pets.update({
                hungry: db.Sequelize.literal('hungry + 1'),
                lastFed: db.Sequelize.NOW
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });
        
        // if Play is sent then update happy and lastPlayed to the current time
        case Play:
            db.Pets.update({
                happy: db.Sequelize.literal('happy + 1'),
                lastPlayed: Sequelize.NOW
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });   
        
        // if Sleep is sent the update sleepy and lastSlept to the current time
        case Sleep:
            db.Pets.update({
                sleepy: db.Sequelize.literal('sleepy + 1'),
                lastSlept: Sequelize.NOW
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (dbPets){
                    res.json(dbPets);
                });
        // if Kill is sent then kill the pet by setting all to 0
        case Kill:
            db.Pets.update({
                alive: 0,
                hungry: 0,
                happy: 0,
                sleepy: 0
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
        
    });
};