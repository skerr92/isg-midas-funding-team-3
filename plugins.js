let socket = io()

const userurl = window.location.href

$(() => {
    if(TOKEN_KEY === " " || NAME_KEY === " ") {
        localStorage.setItem(TOKEN_KEY, " ")
        localStorage.setItem(NAME_KEY, " ")
    }

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