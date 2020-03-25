let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    fx : {type: String},
    h : {type: Number},
    x : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Forward = mongoose.model('Forward',userSchema);
module.exports = Forward;

