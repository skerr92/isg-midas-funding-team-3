//let socket = io()(server)

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
            username: $('#inputEmail'),
            password: $('#inputPassword')
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
    $.post( "/st_register", user)
    console.log("button pressed")
}

function registerAdvisor(user) {
    $.post("/st_register", user, (data) => {
        authenticate(data)
    })
}

function registerDonor(user) {
    $.post(userurl + "auth/do_register", user, (data) => {
        authenticate(data)
    })
}

function login(user) {
    $.post('/login', user)
}
