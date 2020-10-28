const express = require('express')
require('./db/mongoose')

const app = express()
const task = require('./routes/task')
const user = require('./routes/user')

const port = process.env.PORT

app.use(express.json())
app.use(task)
app.use(user)

const myApp = app.listen(port, () => {
    var host = myApp.address().address
})