const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const listSchema = mongoose.Schema({
    userID: {type: String, required: true, min : 3},
    listName : {type: String, required : true},
    tasksID :[],
    date : {type: String, required : true}
});

module.exports = mongoose.model('List', listSchema);