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

    //post a new user
    app.post("/api/newuser/", function(req, res){
        db.User.create(req.body)
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
        // if hungry is sent then update hungry and lastFed to the current time
        else if (req.body.hungry){
            db.Pets.update({
                hungry: req.body.hungry,
                lastFed: Sequelize.NOW
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
        // if happy is sent then update happy and lastPlayed to the current time
        else if (req.body.happy){
            db.Pets.update({
                happy: req.body.happy,
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
        }
        // if sleepy is sent the update sleepy and lastSlept to the current time
        else if (req.body.happy){
            db.Pets.update({
                sleepy: req.body.sleepy,
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
        }
        
    });
};