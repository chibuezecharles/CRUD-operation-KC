const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: [true, 'Please enter your Full Name']
    },

    username:{
        type: String,
        unique: true,
        required: [true, 'Please enter your username']
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please enter your a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type: String,
        required: [true, 'Please enter a valid password'],
        trim: true,
    },

    role:{
        type: String,
        enum: ['admin', 'user'],
        default:'user',
    }

},
{
    timestamps:true,
}
);


const Users = mongoose.model('users', usersSchema);

module.exports = Users;