var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    ma_sp: String,
    ten_sp: String,
    don_gia: String,
    hinh_anh: String,
    mo_ta: String,
    so_luong:String
});

var Product = mongoose.model('Product', productSchema,'Product')
module.exports = Product;