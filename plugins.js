let socket = io()

const userurl = window.location.href

$(() => {
    if (TOKEN_KEY === " " || NAME_KEY === " ") {
        localStorage.setItem(TOKEN_KEY, " ")
        localStorage.setItem(NAME_KEY, " ")
        localStorage.setItem(USER_KEY, " ")
    }
    $('#advisor_signup').click(() => {
            if ($('#inputPassword').val() === $('#inputRPassword').val()) {
                const advisorUser = {
                    firstName: $('#inputFirstName').val(),
                    lastName: $('#inputLastName').val(),
                    email: $('#inputEmail').val(),
                    password: $('#inputPassword').val(),
                    accountType: 'Financial Advisor'
                }
            }
        }
    )
    $('#standard_signup').click(() => {
        if ($("#inputPassword").val() === $("#inputRPassword").val()) {
            const user = {
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                accountType: "Basic User"
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