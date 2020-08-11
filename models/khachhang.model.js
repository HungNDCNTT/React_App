var mongoose = require('mongoose');
var khachhangSchema = new mongoose.Schema({
   MAKH: String,
   user: String,
    pass: String,
    fullname: String

});

var Khachhang = mongoose.model('Khachhang', khachhangSchema,'Users')
module.exports = Khachhang;