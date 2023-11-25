const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type :String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    goalTime: {
        type: Date,
        required: false,
    },
    priority: {
        type: String,
        enum: ['Low','Medium','High'],
        default: 'Medium',
    },
    status: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'Tasks',
});

const Task = mongoose.model('Task',taskSchema);

module.exports=Task;