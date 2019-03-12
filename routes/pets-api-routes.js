var db = require("../models");

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

    //post a new user
    app.post("/api/newuser/", function(req, res){
        db.User.create(req.body)
        .then (function (result){
            res.json(result);
        });
    });

    //change specific pet status
    app.put("/api/pet/:id", function(req, res){
        //if or switch to identify the action
        // if ()
            // req.body data structure
            // {
            //     action: action (Kill, Feed, Sleep, Play(all first letter uppercase))
            // }
        db.Pet.update(
            // update specific info according to the action above
        req.body,
        {
            where: {
                id: req.body.id
            }
        })
        .then (function (result){
            res.json(result);
        });
    });
};