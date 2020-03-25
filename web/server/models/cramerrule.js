let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    A : {type: Array},
    B : {type: Array},
    create_date:{type:Date , default:Date.now}
});

let Cramerrule = mongoose.model('Cramerrule',userSchema);
module.exports = Cramerrule;
