let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    fx : {type: String},
    XR : {type: Number},
    XL : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Flaseposition = mongoose.model('Flaseposition',userSchema);
module.exports = Flaseposition;