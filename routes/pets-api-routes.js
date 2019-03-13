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
        console.log("run!!!")
        console.log(req.body)
        var action = req.body.action;
        console.log(action)
        switch (action){
        // if Feed is sent then update hungry and lastFed to the current time
        case "Feed":
            console.log("run feed!!!")
            db.Pet.update({
                hungry: db.Sequelize.literal('hungry + 1'),
                lastFed: moment()
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (result){
                    console.log("Affected Row: " + result.affectedRows)
                    res.end()
                });
            break;
        
        // if Play is sent then update happy and lastPlayed to the current time
        case "Play": 
            console.log("run play!!!")
            db.Pet.update({
                happy:  + 1,
                lastPlayed: moment()
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (result){
                    console.log("Affected Row: " + result.affectedRows)
                    res.end()
                }); 
            break;  
        
        // if Sleep is sent then update sleepy and lastSlept to the current time
        case "Sleep": 
            console.log("run sleep!!!")
            db.Pet.update({
                sleepy: db.Sequelize.literal('sleepy + 1'),
                lastSlept: moment()
            },
                {
                    where: {
                        id: req.body.id
                    }
                })
                .then (function (result){
                    console.log("Affected Row: " + result.affectedRows)
                    res.end()                
                });  
            break; 
       
        // if Kill is sent then update all status to 0
        case "Kill": 
            console.log("run kill!!!")
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
                .then (function (result){
                    console.log("Affected Row: " + result.affectedRows)
                    res.end()                
                });
            break;   
    }
    
    });
};