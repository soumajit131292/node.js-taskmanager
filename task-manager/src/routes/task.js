const express = require('express')
const authentication = require('../authorization/auth')
const Tasks = require('../models/tasks')
const routes = new express.Router()

//save the task
routes.post('/savetask', authentication, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send('task saved')
    } catch (error) {
        res.status(400).send(error, 'task NOT saved . Try again')
    }
})

//get all task with with query string present as well as not present the query string
//get task using pagination concept, for that need limit and skip object,
//url is --> /tasks?limit=10&skip=10
routes.get('/gettask', authentication, async (req, res) => {
    // await req.user.populate('tasks').execPopulate()
    //req.query.completed get a string vlaue , so to set match.completed='boolean' , need to assign boolean
    //value , so if (req.query.completed === 'true') it actually returuns boolean value
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed !== true
    }
    console.log(req.query.completed)
    console.log(match)
    await req.user.populate({
        path: 'tasks',
        match,
        options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip)
        }
    }).execPopulate()
    res.status(200).send(req.user.tasks)
})

//get a specific task with mongoose findById() method with request params
routes.get('/gettask/:id', async (req, res) => {
    try {
        const taskByID = await Tasks.findById({ _id: req.params.id })
        if (!taskByID) {
            return res.status(404).send('no task is there')
        }
        res.send(taskByID)
    }
    catch (e) {
        console.log(e)
        return res.status(500).send('no task is there')
    }
})

//update a task
routes.patch('/update/task', authentication, async (req, res) => {
    const fields = Object.keys(req.body)
    const updateableFields = ['description', 'completed']
    const task = await Tasks.findOne({ _id: req.query.id, owner: req.user._id })
    try {
        const isFiledPresent = fields.every(element => updateableFields.includes(element)
        )
        if (!isFiledPresent) {
            throw new Error('update task fileds only')
        }
        fields.forEach(element => {
            task[element] = req.body[element]
        })
        const updatedTask = await task.save()
        res.status(200).send(updatedTask)
    } catch (error) {
        res.status(500).send('error')
    }
})

//authenticate a user and delete a task by id 
routes.delete('/delete/task', authentication, async (req, res) => {
    try {
        const deleteTask = await Tasks.findByIdAndDelete({ _id: req.query.id, owner: req.user._id })
        res.status(201).send(deleteTask)
    }
    catch (error) {
        res.status(500).send()
    }
})



module.exports = routes

//AZURE - GCP VPN connection
// https://cloudywithachanceofbigdata.com/creating-a-site-to-site-vpn-connection-between-gcp-and-azure-with-google-private-access/#:~:text=The%20Virtual%20Network%20Gateway%20in,and%20a%20GCP%20VPN%20Gateway.