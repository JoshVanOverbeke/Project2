var db = require("../models");
var moment = require("moment");
// db.Pet.update({
//     happy:12,
// },
// {where: {id:1}}).then(function(results){
//     console.log("results: ", results)
// })

db.Pet.findAll({})
.then(function(foundPet) {
    return timeUpdate(foundPet)
})
.then(function(results) {
    for(let j in results){
        db.Pet.update({
            alive: results[j].alive,
            hp: results[j].hp,
            hungry: results[j].hungry,
            sleepy: results[j].sleepy,
            happy: results[j].happy,
            lastFed: results[j].lastFed,
            lastSlept: results[j].lastSlept,
            lastPlayed: results[j].lastPlayed
        },
        {
            where: {
                id: results[j].id
            }
        })
    }
    console.log("results: ", results)
})

// db.Pet.findAll({where:{id:1}})
//     .then(function(foundPet) {
//         return foundPet.update({happy: parseInt(foundPet.happy)+1})
//     })
//     .then(function(result) {
//         console.log("results: ", result)
    // })
function timeUpdate(dbData) {
    let petArray = [];
    for (let i in dbData) {
        let momDifFed = parseFloat(moment().diff(dbData[i].dataValues.lastFed, 'minutes', true));
        let momDifSlept = parseFloat(moment().diff(dbData[i].dataValues.lastSlept, 'minutes', true));
        let momDifPlayed = parseFloat(moment().diff(dbData[i].dataValues.lastPlayed, 'minutes', true));
        // =================================================================================
        //if 10 minutes have passed, subtract 5 from hungry
        if (momDifFed >= 10) {
            //update [dbData[i]].hungry
            dbData[i].dataValues.hungry -= 5;
            dbData[i].dataValues.lastFed = moment().format()
        }
        //if 8 minutes have passed, subtract 4 from hungry/sleepy/play
        //update lastFed/Slept/Played to reflect [dbData[i]].hungry decreases happened 
        else if (momDifFed >= 8) {
            dbData[i].dataValues.hungry -= 4;
            dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 8, 'minutes').format()
        }
        else if (momDifFed >= 6) {
            dbData[i].dataValues.hungry -= 3;
            dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 6, 'minutes').format()
        }
        else if (momDifFed >= 4) {
            dbData[i].dataValues.hungry -= 2;
            dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 4, 'minutes').format()
        }
        else if (momDifFed >= 2) {
            dbData[i].dataValues.hungry -= 1;
            dbData[i].dataValues.lastFed = moment().subtract(momDifFed - 2, 'minutes').format()
        };
        // =================================================================================
        //if 10 minutes have passed, subtract 5 from sleepy
        if (momDifSlept >= 10) {
            //update [dbData[i]].hungry
            dbData[i].dataValues.sleepy -= 5;
        }
        //if 8 minutes have passed, subtract 4 from hungry/sleepy/play
        //update lastFed/Slept/Played to reflect [dbData[i]].hungry decreases happened 
        else if (momDifSlept >= 8) {
            dbData[i].dataValues.sleepy -= 4;
            dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 8, 'minutes').format()
        }
        else if (momDifSlept >= 6) {
            dbData[i].dataValues.sleepy -= 3;
            dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 6, 'minutes').format()
        }
        else if (momDifSlept >= 4) {
            dbData[i].dataValues.sleepy -= 2;
            dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 4, 'minutes').format()
        }
        else if (momDifSlept >= 2) {
            dbData[i].dataValues.sleepy -= 1;
            dbData[i].dataValues.lastSlept = moment().subtract(momDifSlept - 2, 'minutes').format()
        };
        // =================================================================================
        //if 10 minutes have passed, subtract 5 from happy
        if (momDifPlayed >= 10) {
            //update [dbData[i]].hungry
            dbData[i].dataValues.happy -= 5;
        }
        //if 8 minutes have passed, subtract 4 from hungry/sleepy/play
        //update lastFed/Slept/Played to reflect [dbData[i]].hungry decreases happened 
        else if (momDifPlayed >= 8) {
            dbData[i].dataValues.happy -= 4;
            dbData[i].dataValues.lastPlayed = moment().subtract(momDifPlayed - 8, 'minutes').format()
        }
        else if (momDifPlayed >= 6) {
            dbData[i].happy -= 3;
            dbData[i].lastPlayed = moment().subtract(momDifPlayed - 6, 'minutes').format()
        }
        else if (momDifPlayed >= 4) {
            dbData[i].dataValues.happy -= 2;
            dbData[i].dataValues.lastPlayed = moment().subtract(momDifPlayed - 4, 'minutes').format()
        }
        else if (momDifPlayed >= 2) {
            dbData[i].dataValues.happy -= 1;
            dbData[i].dataValues.lastPlayed = moment().subtract(momDifPlayed - 2, 'minutes').format()
        };
        // =================================================================================
        //set statuses to zero if below zero
        if (dbData[i].dataValues.hungry < 0) {
            dbData[i].dataValues.hungry = 0;
            dbData[i].dataValues.lastFed = moment().subtract(4, 'minutes').format();
            console.log("LAst played up: ", dbData[i].lastFed)
        }
        if (dbData[i].dataValues.sleepy <= 0) {
            dbData[i].dataValues.sleepy = 0;
            dbData[i].dataValueslastPlayed = moment().subtract(2, 'minutes').format();
            console.log("LAst played up: ", dbData[i].dataValues.lastPlayed);
            console.log("This moment minus 2: ", moment().subtract(5, 'minutes').format())
        }
        if (dbData[i].dataValues.happy < 0) {
            dbData[i].dataValues.happy = 0;
        }
        if (dbData[i].dataValues.hungry === 0 && dbData[i].dataValues.sleepy === 0 && dbData[i].dataValues.happy === 0) {
            dbData[i].dataValues.hp = 0;
            dbData[i].dataValues.alive = 0
        }
        else if (dbData[i].dataValues.hungry === 0 && dbData[i].dataValues.sleepy === 0 || dbData[i].dataValues.sleepy === 0 && dbData[i].dataValues.happy === 0 || dbData[i].dataValues.hungry === 0 && dbData[i].dataValues.happy === 0) {
            dbData[i].dataValues.hp = 1
        }
        else if (dbData[i].dataValues.hungry === 0 || dbData[i].dataValues.sleepy === 0 || dbData[i].dataValues.happy === 0) {
            dbData[i].dataValues.hp = 2
        }
        else {
            dbData[i].dataValues.hp = 3;
        }
    petArray.push(dbData[i].dataValues)

    }
    return petArray
};