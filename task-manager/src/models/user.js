const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const Task = require('../models/tasks')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('enter valid email')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6 || value.toLowerCase().localeCompare('password') === 0) {
                throw new Error('password not matched')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }]
})

//applied on document.virtually stores details about task in user model, but this is not persistent.
userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})


//mongoose middleware, delete user and at the same time delete all the tasks associated with the user,
//this will run automatically
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})


//mongoose middleware, before userdata save or update this middleware will be called 
userSchema.pre('save', async function (next) {
    this.password = await bcryptjs.hash(this.password, 8)
    next()
})

//while sending response using res.send('senddata) , JSON.Stringfy is called , ad JSON.Stringfy calles this toJson , it is applied document
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//this method is defined on document , instance method , don't use arrow function , as arrow function does not bind this
userSchema.methods.generateAuthToken = async function () {
    const user = this
    try {
        const jwtToken = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
        user.tokens = user.tokens.concat({ token: jwtToken })
        await user.save()
        return jwtToken
    } catch (error) {
        console.log(error)
    }
}

//for login user check , this method defined on model
userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const userData = await User.findOne({ email: email })
        if (!userData) {
            throw new Error('unauthorized')
        }
        const isPassword = bcryptjs.compare(password, userData['password'])
        if (!isPassword) {
            throw new Error('unauthorized')
        }
        return userData
    }
    catch (error) {
        throw new Error('unauthorized')
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User