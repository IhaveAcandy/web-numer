let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    XR : {type: Number},
    XL : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Ludecomposition = mongoose.model('Ludecomposition',userSchema);
module.exports = Ludecomposition;
