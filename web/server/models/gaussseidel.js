let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    XR : {type: Number},
    XL : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Gaussseidel = mongoose.model('Gaussseidel',userSchema);
module.exports = Gaussseidel;
