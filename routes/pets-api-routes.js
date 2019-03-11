var db = require("../models");

module.exports = function(app) {
    app.get("/api/pets", function(req, res){
        db.Pets.findAll({
            include: [{model: db.Owner}]
        })
        .then (function (dbPets){
            res.json(dbPets);
        });
    });

    app.post("/api/pets/:id", function(req, res){
        db.Pets.create(req.body)
        .then (function (dbPets){
            res.json(dbPets);
        });
    });

    app.put("/api/pets/:id", function(req, res){
        db.Pets.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        })
        .then (function (dbPets){
            res.json(dbPets);
        });
    });
};