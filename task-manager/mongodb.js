// import packages
const mongoDB = require('mongodb')
const chalk=require('chalk')
//take mongodb client
const mongoDBClient = mongoDB.MongoClient
//get connectionURL
const connectionURL = 'mongodb://127.0.0.1:27017'
//get database
const databaseName = "task-manager"



//use connect function to connect database
mongoDBClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log(error)
    }
    console.log(chalk.inverse.green('database connected'))
    const db = client.db(databaseName)

    // use collecton reference , and insertedMany function with array of docs , callback function
    db.collection('users').insertMany([{
        description: 'soumajit2',
        complete: true
    }, {
        description: 'roy2',
        complete: true
    }, {
        description: 'kumar2',
        complete: false
    }], (error, result) => {
        if (error) {
            return console.log('failed')
        }
        console.log(result.insertedIds)
    })
})