const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    name: {type: String, required: true, min : 3},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

    },
    password: {type: String, required: true, min : 5},
    userSecretKey : {type : String}
});

module.exports = mongoose.model('User', userSchema);