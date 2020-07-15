const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http').Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept")
	next()
})

app.use(express.static(__dirname))
app.set('view enginer', 'ejs')

const server = http.listen('8080', () => {
	console.log('listening on: ', server.address().port)
})
