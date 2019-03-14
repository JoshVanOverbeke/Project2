var db = require("../models");

module.exports = function(app) {
    app.post("/api/newuser", function(req,res){
        console.log(req.body)
        db.User.create(req.body)
        .then(function(result){
            res.json(result);
        });
    });

    app.get("/api/user/:name", function(req,res){
        console.log("======================================")
        console.log(req.params.name)
        console.log("======================================")
        db.User.findOne({
            where: {
                name: req.params.name
            },

            include: [{model:db.Pet}]

        }).then(function(dbUser){
            res.json(dbUser);
            console.log(dbUser)
        });
    });

    app.delete("/api/users/:id",function(req, res){
        db.User.destroy({
            where:{
                id: req.params.id
            }
        }).then(function(dbUser){
            res.json(dbUser);
    });
});

};