const express = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const routes = new express.Router()
const authentication = require('../authorization/auth')
const { Router } = require('express')
const sender = require('../mail/sender')
const producer = require('../rabbitmq/producer')



/*************************************  CREATE USER **************************************/


//save the user
routes.post('/saveuser', async (req, res) => {
    const user = new User(req.body)
    try {
        const userData = await user.save()
        const authToken = await userData.generateAuthToken()
        sender(userData.email)
        res.status(201).send({ userData, authToken })
    } catch (error) {
        res.status(400).send('user NOT saved , try again !!!')
    }
})

/*************************************  UPDATE AND FETCH USER DETAILS RELATED STUFF **************************************/

//get a all user
routes.get('/getalluser', authentication, async (req, res) => {
    res.status(200).send(req.user)
})

//update an user details
routes.patch('/updateuser', authentication, async (req, res) => {
    const checkFields = Object.keys(req.body)
    const updateAbleFields = ["name", "age", "email", "password"]
    const isUpdatable = checkFields.every(eachData => updateAbleFields.includes(eachData))
    if (!isUpdatable) {
        return res.status(404).send('data is not allowed to update')
    }
    try {
        checkFields.forEach(element => {
            req.user[element] = req.body[element]
        })
        const updatedUser = await req.user.save()
        return res.status(201).send(updatedUser)
    }
    catch (error) {
        return res.status(404).send(error)
    }
})

/*************************************  LOGIN RELATED STUFF **************************************/

//log in user api with generating jet token
routes.get('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const authToken = await user.generateAuthToken()
        res.status(200).send({ user, authToken })
    }
    catch (error) {
        res.status(404).send('bad request')
    }
})

//loogout user from only selected devices
routes.get('/users/logout', authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('user logged out')
    } catch (e) {
        res.status(500).send('need authorization')
    }
})

//logout user from devices
routes.get('/users/logoutall', authentication, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('user logged out from all devices')
    } catch (e) {
        res.status(500).send(e)
    }
})

/*************************************  USER DELETE CODE **************************************/

routes.delete('/delete/user', authentication, async (req, res) => {
    try {
        //const deleteUser = await User.findByIdAndDelete({ _id: req.user._id })
        await User.remove()
        res.status(200).send(deleteUser)
    } catch (error) {
        res.status(500).send('internal error')
    }
})



module.exports = routes

/*************************************  EXTRA MODIFIED CODE **************************************/


//working with objects
// routes.post('/trial', (req, res) => {
//    console.log(req.body)
//    const obj1= {"new-data" : "16"}
//    req.body = {...req.body , ...obj1}
//    console.log(req.body)
//    console.log(req.body['new-data'])
//    req.body['new-data'] = "45"
//    console.log(req.body['new-data'])
//    console.log(req.body)
//    console.log(Object.keys(req.body))
//    console.log(Object.values(req.body))
//    console.log(Object.entries(req.body))
// })

//get a specific user with mongoose find() method with query string
// routes.get('/getuser', async (req, res) => {
//     try {
//         const userResult = await User.find({ name: req.query.name })

//         if (!userResult) {
//             return res.status(404).send('no user is there')
//         }
//         res.status(200).send(userResult)
//     } catch (error) {
//         return res.status(500).send('no task is there')
//     }
// })