const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const env = require('./environment')
const post_routes = require('./api/routes/PostRoutes')
const category_routes = require('./api/routes/CategoryRoutes')

const auth = require("./services/AuthService")
const auth_routes = require('./api/routes/AuthRoutes')

const port = process.env.PORT || 3030

mongoose.Promise = global.Promise

mongoose.connect(env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false })
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => {
        console.log(`Echec de connexion: ${err}`)
        return
    })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(auth.service)

auth_routes(app)

category_routes(app)

post_routes(app)

http.listen(port)

console.log(`API is listening on port: ${port}`)