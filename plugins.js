const userurl = 'http://localhost:8080/'
console.log(userurl)

const NAME_KEY = 'name';
const TOKEN_KEY = 'token';
const USER_KEY = 'user'



$(() => {
    if(TOKEN_KEY === " " || NAME_KEY === " " || USER_KEY) {
        localStorage.setItem(TOKEN_KEY, " ")
        localStorage.setItem(NAME_KEY, " ")
        localStorage.setItem(USER_KEY, " ")
    }
    $('#login-btn').click(()=>{
        const user = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }
        login(user)
    })
    $('#standard_signup').click(() => {
        //console.log("user clicked")
        if ($("#inputPassword").val() === $("#inputRPassword").val()) {
            const user = {
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                accountType: "Basic User"
            }
            console.log(user)
            register(user)

        }
    })
    //console.log("hi there")
    $('#advisor_signup').click(() => {
        if ($("#inputPassword").val() === $("#inputRPassword").val()) {
            const user = {
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                accountType: "Financial Advisor User"
            }
            registerAdvisor(user)
        }
    })

    $('#donor_signup').click(() => {
        //if ($("#inputPassword").val() === $("#inputRPassword").val()) {
        const user = {
            firstName: $("#inputFirstName").val(),
            lastName: $("#inputLastName").val(),
            email: $("#inputEmail").val(),
            password: $("#inputPassword").val(),
            accountType: "Donor User"
        }
        registerDonor(user)
        //}
    })

    $("#sendAdvisee").click(()=>{
        sendMessage({
            name: "Bob Marley",
            message:$("#message").val()
        });
        $("#message").val('')
    })

    $("#sendFA").click(()=>{
        console.log("were are trying to send")
        sendMessage({
            name: "Robert Marley, Jr MBA, CFA",
            message:$("#message").val()
        });
        $("#message").val('')
    })
    //getMessages()
    // $('#joinNewsletter').click(() => {
    //     const user = {
    //         firstName: "anon",
    //         lastName: "anon",
    //         email: $("#inputEmail").val(),
    //         password: null,
    //         accountType: "Newsletter only"
    //     }
    //     registerNewsletter(user)
    // })

})

function authenticate(res) {
    let authresponse = res
    console.log(res)

    if(!authresponse.token)
        return;

    console.log(res.token.toString())
    console.log(JSON.stringify(res.name.name))
    localStorage.setItem(TOKEN_KEY, res.token.toString())
    localStorage.setItem(NAME_KEY, JSON.stringify(res.name))
    localStorage.setItem(USER_KEY, JSON.stringify(res.accountType))
}

function register(user) {
    console.log(user)
    $.post( userurl+"/st_register", user)
    console.log("button pressed")
}

function registerAdvisor(user) {
    $.post(userurl+"/st_register", user, (data) => {
        authenticate(data)
    })
}

function registerDonor(user) {
    $.post(userurl + "auth/do_register", user, (data) => {
        authenticate(data)
    })
}

function registerLiteracy(user) {
    $.post("/lt_register", user, (data) => {
        authenticate(data)
    })
}

// function registerNewsletter(user) {
//     $.post("/nl_register", user, (data) => {
//         authenticate(data)
//     })
// }

function login(user) {
    $.post(userurl+'auth/login', user)
}
function addMessages(message){
    console.log("The name is: "+message.name)
    $("#msgs .jumbotron").prepend(`<h4>${message.name}</h4><p>${message.message}</p>`)
}
function getMessages(){
    $.get('http://localhost:8080/messages', (data) => {
        //console.log(data)
        data.forEach(addMessages);
    })
}




function sendMessage(message){
    $.post(userurl+'messages', message)
}