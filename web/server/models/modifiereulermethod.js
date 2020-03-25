let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    XR : {type: Number},
    XL : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Modifiereulermethod = mongoose.model('Modifiereulermethod',userSchema);
module.exports = Modifiereulermethod;

