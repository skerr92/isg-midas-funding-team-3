let socket = io()(server)

const userurl = window.location.href
const advisoruserurl = window.location.href

$(() => {
    if(TOKEN_KEY === " " || NAME_KEY === " " || USER_KEY) {
        localStorage.setItem(TOKEN_KEY, " ")
        localStorage.setItem(NAME_KEY, " ")
        localStorage.setItem(USER_KEY, " ")
    }
    $('#standard_signup').click(() => {
        if ($("#inputPassword").val() === $("#inputRPassword").val()) {
            const user = {
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                accountType: "Basic User"
            }
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
        }
    })

    $('#donor_signup').click(() => {
        if ($("#inputPassword").val() === $("#inputRPassword").val()) {
            const user = {
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                accountType: "Donor User"
            }
        }
    })
})

function authenticate(res) {
    let authresponse = res

    if(!authresponse.token)
        return;

    console.log(res.token.toString())
    console.log(JSON.stringify(res.name.name))
    localStorage.setItem(TOKEN_KEY, res.token.toString())
    localStorage.setItem(NAME_KEY, JSON.stringify(res.name))
    localStorage.setItem(USER_KEY, JSON.stringify(res.accountType))
}

function register(user) {
    $.post(userurl + "auth/st_register", user, (data) => {
        authenticate(data)
    })
}

function registerAdvisor(advisorUser) {
    $.post(advisoruserurl + "auth/ad_register", advisorUser, (data) => {
        authenticate(data)
    })
}