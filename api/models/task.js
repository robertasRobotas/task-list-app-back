const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const taskSchema = mongoose.Schema({
    taskTitle: {type: String, required: true, min : 3},
    taskStatus : {type: Boolean, required : true},
    listID : {type: String, required : true}
});


module.exports = mongoose.model('Task', taskSchema);