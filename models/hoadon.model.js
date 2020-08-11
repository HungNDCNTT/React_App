var mongoose = require('mongoose');
var hoadonSchema = new mongoose.Schema({
    id_kh: String,
    id_sp: String,
    so_luong: String
});

var Hoadon = mongoose.model('hoadon', hoadonSchema,'Bills')
module.exports = Hoadon;