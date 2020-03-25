let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    XR : {type: Number},
    XL : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Multiplelinearregression = mongoose.model('Multiplelinearregression',userSchema);
module.exports = Multiplelinearregression;
