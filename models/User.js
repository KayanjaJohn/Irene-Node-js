const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
username:{
    type: String,
    // required: true,
    // trim: true
},
email:{
    type: String,
    // trim: true,
    // required: true
},
password:{
    type: String,
    // trim: true,
},
age:{
    type: Number,
    // trim: true,
    // required: true
},
date:{
    type: String,
    // trim: true,
    // required: true
},
sex:{
    type: String,
    // required: true
}

});
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'password'
});

module.exports = mongoose.model('Registration', userSchema);