var db = require("../models");
var moment = require('moment');

module.exports = function(app) {
    // const updateStatus = function(data){
    //     for(let i in ){
    //         if (data[i].dataValues.hungry > 0){
    //             if (parseInt(moment().diff(data[i].req.body.lastFed, 'hours', true))>=2){
    //                 //subtract 1 from hungry
    //                 //update lastFed to currenttime moment().subtract(parseInt(moment().diff(data[i].req.body.lastFed, 'hours', true))-2, 'hours')
    //             }
    //             else if (parseInt(moment().diff(data[i].req.body.lastFed, 'hours', true))>=4){
    //             //subtract 2 from hungry
    //             //update lastFed to currenttime
    //             }
    //             else if (parseInt(moment().diff(data[i].req.body.lastFed, 'hours', true))>=6){
    //             //subtract 3 from hungry
    //             //update lastFed to currenttime
    //             }
    //             else if (parseInt(moment().diff(data[i].req.body.lastFed, 'hours', true))>=8){
    //             //subtract 4 from hungry
    //             //update lastFed to currenttime
    //             }
    //             else if (parseInt(moment().diff(data[i].req.body.lastFed, 'hours', true))>=10){
    //             //subtract 5 from hungry
    //             //update lastFed to currenttime 
    //             }
    //             else {
    //                 //nothing
    //             }
    //         }
    //     }

    // };
    app.get("/", function(req, res){
        db.Pet.findAll({
            include: [{model: db.User}]

        })
        .then (function (dbPets){
            for(let i in dbPets){
            console.log("Table data: ", dbPets[i].dataValues);
            console.log("hours: ", moment().diff(dbPets[i].dataValues.lastFed, 'hours', true));
            console.log("")
            };

            res.render("index", dbPets)
        });
    });

}