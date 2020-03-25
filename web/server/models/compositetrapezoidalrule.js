let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    fx: {type: String},
    range : {type: Number},
    start : {type: Number},
    stop : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Compositetrapezoidalrule = mongoose.model('Compositetrapezoidalrule',userSchema);
module.exports = Compositetrapezoidalrule;

