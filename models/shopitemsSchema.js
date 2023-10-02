const mongoose = require('mongoose');


const shopitemsSchema = new mongoose.Schema(
{
    name:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    isInStock:{
        type: Boolean,
        default:true,
    },

    userId:{
        type: mongoose.Schema.ObjectId,
        ref:'users',
    }

},
{
    timestamps:true,
}
);

const shopitems = mongoose.model('shopitems', shopitemsSchema);

module.exports =shopitems;