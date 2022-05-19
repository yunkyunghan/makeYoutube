const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId,
        ref: 'User' // User.js에서 모든 정보를 불러올 수 있어서  type을 schema로 함.
    },
    title : {
        type: String,
        maxlength: 50
    },
    description : {
        type: String
    },
    privacy : { // 0이 privacy, 1이 public.
        type: Number
    },
    filePath : {
        type: String
    },
    category : {
        type: String
    },
    views : {
        type: Number,
        default: 0
    },
    duration : {
        type: String
    },
    thumbnail : {
        type: String
    }
}, { timestamps: true})




const Video = mongoose.model('User', videoSchema);

module.exports = { Video }