var db = require("../models");

module.exports = function(app) {
    
    app.get("/", function(req, res){
        db.Pet.findAll({
            include: [{model: db.User}]

        })
        .then (function (dbPets){
            res.render("index", dbPets)
          })

    });

}