var messages = {
    goodStatus: [
        "Anything fun to do today? :) ",
        "Pur, Pur, Pur.... ꒰๑´•.̫ • `๑꒱ ",
        "It's a good day for a walk!(◕‿◕✿) ",
        "I think I'm quite handsome today, right? .。`ﾟヽ(｡◕‿◕｡)ﾉﾟ.:｡+ﾟ ",
        "(`･ω･´)ゞ Hi, Hi!!",
        "(੭ु ‾̑ω‾̑)੭ु Give me a hug!! ",
        "RUN RUN RUN ─=≡Σ((( つ•̀ω•́)つ !! ",
        "ヽ(○´∀`)ﾉ♪ Soooooo happy~~! Let's play! ",
        "(๑¯ิε ¯ิ๑)  Love you sooo much ~! ",
        "(•‾̑⌣‾̑•)✧˖° You look good today! "
    ],
    hungry2: "I need a snack（¯﹃¯）",
    hungry1: "I'm Hungry!! :( ",
    hungry0: "I'M STARVING!! I'd like a big chocolate brownie! ",
    sleepy2: "?(￣△￣?)...",
    sleepy1: "I'm very tired. ٩(๑´0`๑)۶ ",
    sleepy0: "Exhausted....I can't open my eyes...zzZ ",
    happy2: "(ਛ_≻ਛ) Em....",
    happy1: "Play with me!!! （/TДT)/ ",
    happy0: "Leave me alone! I don't wanna see your face!! (/= _ =)/~┴┴ ",
    hp2: "I'm not feeling well (,,•́ . •̀,,) ",
    hp1: "I'm dying. Send me to the vet ASAP... ",
    play: "Playing ╭(●｀∀´●)╯╰(●’◡’●)╮ ... ",
    sleep: "(-.-)..zzZZ ",
    feed: "Yum, yum, yum....ԅ(¯﹃¯ԅ) "
}


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
        }).then(function (result) {
            console.log("changes made!");
            //uodate the info
            showPetInfo(id);
        })
    })




})


// function to show/update info of specific pet
const showPetInfo = function (id) {
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
        $(".modal-title").html("<b>" + data.name + "</b> | Owner: " + data.User.name)
        $("#hpBar").attr("style", "width:" + hp + "%")
        $("#hungryBar").attr("style", "width:" + hungry + "%")
        $("#sleepyBar").attr("style", "width:" + sleepy + "%")
        $("#happyBar").attr("style", "width:" + happy + "%")
        // manage the message:
        let message = messageGenerator(parseInt(data.hp),parseInt(data.hungry),parseInt(data.sleepy),parseInt(data.happy))
        console.log("The message is:")
        console.log(message)
        $("#message").html(message)
        // show the modal
        $('#petStatus').modal('show')
    })
}


const messageGenerator = function(hp, hungry, sleepy, happy){
    var message = ''
        if (hp === 1) {
            message = message.concat(messages.hp1)
        } else if (hp === 2) {
            message = message.concat(messages.hp2)
        }
        if(hungry === 0){
            message = message.concat(messages.hungry0)
        }
        if(hungry === 1){
            message = message.concat(messages.hungry1)
        }
        if(hungry === 2){
            message = message.concat(messages.hungry2)
        }
        if(sleepy === 0){
            message = message.concat(messages.sleepy0)
        }
        if(sleepy === 1){
            message = message.concat(messages.sleepy1)
        }
        if(sleepy === 2){
            message = message.concat(messages.sleepy2)
        }
        if(happy === 0){
            message = message.concat(messages.happy0)
        }
        if(happy === 1){
            message = message.concat(messages.happy1)
        }
        if(happy === 2){
            message = message.concat(messages.happy2)
        }
        if(happy > 2 && sleepy > 2 && hungry >2){
            let random = Math.floor(Math.random()*messages.goodStatus.length)
            message = message.concat(messages.goodStatus[random])
        }
    return message
}