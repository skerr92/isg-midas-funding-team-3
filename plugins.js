let socket = io()

const userurl = window.location.href

$(() => {
    if (TOKEN_KEY === " " || NAME_KEY === " ") {
        localStorage.setItem(TOKEN_KEY, " ")
        localStorage.setItem(NAME_KEY, " ")
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
})

function authenticate(res) {
    let authresponse = res

    if(!authresponse.token)
        return;

    console.log(res.token.toString())
    console.log(JSON.stringify(res.name.name))
    localStorage.setItem(TOKEN_KEY, res.token.toString())
    localStorage.setItem(NAME_KEY, JSON.stringify(res.name))
}