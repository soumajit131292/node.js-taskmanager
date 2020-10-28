const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    }
})
const Tasks = mongoose.model('tasks',taskSchema )

module.exports = Tasks