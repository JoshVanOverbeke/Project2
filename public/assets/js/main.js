$(document).ready(function () {
    //clickhandlers for log in model

    //clickhandlers for sign up model
        //POST: new user
        //data structure
        // {
        //     name: name,
        //     password: password,
        // }

    //clickhandlers for create pet model
        //POST: new pet
        //data structure
        // {
        //     name: name,
        //     img: img src,
        //     UserId: log in user id
        // }

    //clickhandlers for pets
    $("article").on("click", function (e) {
        e.preventDefault()
        console.log("click")
        // get the id from article data-id
        var id = $(this).data("id");
        console.log("Show the info of pet id: " + id)
        showPetInfo(id)
    })

    //click handlebars for actions
    $(".action").on("click", function (e) {
        e.preventDefault()
        let id = $(this).data("id");
        let action = $(this).text()
        console.log("Do " + action + " to the pet id " + id)
        let requestBody = {
            action: action
        }
        console.log("PUT requst.body is")
        console.log(requestBody)
        // PUT: change specific data of specific pet
        $.ajax({
            url: "/api/pet/" + id,
            type: 'PUT',
            data: "requestBody",
          }).then(function(result){
            console.log("changes made!");
            //uodate the info
            showPetInfo(id);
          })
    })




})


// function to show/update info of specific pet
const showPetInfo = function(id){
    // GET: specific pet info
    $.get("/api/pet/" + id, function (data) {
        // convert into percentage
        var hp = parseInt(data.hp) * (100 / 3)
        var hungry = parseInt(data.hungry) * 20
        var sleepy = parseInt(data.sleepy) * 20
        var happy = parseInt(data.happy) * 20
        console.log("hp: " + hp)
        console.log("hungry: " + hungry)
        console.log("sleepy: " + sleepy)
        console.log("happy: " + happy)
        // change the texts and progress bars
        $(".modal-title").html("<b>" + data.name + "</b> | Owener: " + data.User.name)
        $("#hpBar").attr("style", "width:" + hp + "%")
        $("#hungryBar").attr("style", "width:" + hungry + "%")
        $("#sleepyBar").attr("style", "width:" + sleepy + "%")
        $("#happyBar").attr("style", "width:" + happy + "%")
        // show the modal
        $('#petStatus').modal('show')
    })
}