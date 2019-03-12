var db = require("../models");

module.exports = function(app) {
    app.post("api/users", function(req,res){
        db.User.create(req.body)
        .then(function(dbUser){
            res.json(dbUser);
        });
    });
    //post a new user
    app.post("/api/newuser/", function(req, res){
        db.User.create(req.body)
        .then (function (result){
            res.json(result);
        });
    });

    app.get("api/users/:id", function(req,res){
        db.User.findOne({
            where: {
                id: req.params.id
            },

            include: [{model:db.User}]

        }).then(function(dbUser){
            res.json(dbUser);
        });
    });

    app.delete("api/users/:id",function(req, res){
        db.User.destroy({
            where:{
                id: req.params.id
            }
        }).then(function(dbUser){
            res.json(dbUser);
    });
});

};