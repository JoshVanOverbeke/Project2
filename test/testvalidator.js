var db = require("../models")

// db.Pet.update({
//     happy:12,
// },
// {where: {id:1}}).then(function(results){
//     console.log("results: ", results)
// })


db.Pet.findOne({where:{id:1}})
    .then(function(foundPet) {
        return foundPet.update({happy: parseInt(foundPet.happy)+1})
    })
    .then(function(result) {
        console.log("results: ", result)
    })