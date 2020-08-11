var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var product = require('./models/product.model');
var khachhang = require('./models/khachhang.model');
var hoadon = require('./models/hoadon.model');
var itemProduct;
var itemProductChange;
var itemKhachHangChange;
var itemHoaDonChange;


mongoose.connect('mongodb+srv://Hungndph07506:Hungndph07506@cluster0-qjk5v.mongodb.net/Assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(r => {
    console.log('Connected');
});
app.use(bodyParser());
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', async (req, res) => {
    let items = await product.find({}).lean()
    res.render('product', { data: items })

})
app.get('/product', async (req, res) => {
    let items = await product.find({}).lean()
    res.render('product', { data: items })


})
app.get('/getproduct', async (req, res) => {
    let pro = await product.find()
    res.send(pro);
})


app.post('/delete', async (req, res) => {
    let id=req.body.id;
    let status= await product.findOneAndDelete({_id:id});
    if (status){
        res.send('Deleted')
    }else {
        res.send('Fail')
    }
})

app.post('/findUser', async (req, res) => {
    let id=req.body.id;
    let pro = await khachhang.findOne({_id:id});
    res.send(pro);
})

app.get('/getuser', async (req, res) => {
    let user = await khachhang.find()
    res.send(user);
})

app.get('/getbill', async (req, res) => {
    let bill = await hoadon.find()
    res.send(bill);
})

app.get('/khachhang', async (req, res) => {
    let items1 = await khachhang.find({}).lean()
    res.render('khachhang', { data: items1 })


})
app.get('/hoadon', async (req, res) => {
    let items2 = await hoadon.find({}).lean()
    res.render('hoadon', { data: items2 })

})




app.post('/update', async (req, res) => {

    var idDel = req.body._id
    itemProductChange = {
        _id: req.body._id,
        ma_sp: req.body.ma_sp,
        ten_sp: req.body.ten_sp,
        don_gia: req.body.don_gia,
        hinh_anh: req.body.hinh_anh,
        mo_ta: req.body.mo_ta,
        so_luong: req.body.so_luong
    };

    try {
        await product.findByIdAndUpdate(idDel, itemProductChange);
        res.redirect('/')
    } catch (e) {
        res.send('Fail: ' + e.message);
        ;
    }
});

app.post('/updateKhachHang', async (req, res) => {

    var idDel = req.body._id
    itemKhachHangChange = {
        _id: req.body._id,
        username: req.body.username,
        name: req.body.name,
        state: req.body.state,
        old: req.body.old,
        address: req.body.address,
        isAdmin: req.body.isAdmin
    };

  
    try {
        await khachhang.findByIdAndUpdate(idDel, itemKhachHangChange);
        res.redirect('/khachHang')
    } catch (e) {
        res.send('Fail: ' + e.message);
        ;
    }
});


app.post('/updateHoaDon', async (req, res) => {

    var idDel = req.body._id
    itemHoaDonChange = {
        _id: req.body._id,
        id_kh: req.body.id_kh,
        id_sp: req.body.id_sp,
        so_luong: req.body.so_luong
    };
    try {
        await hoadon.findByIdAndUpdate(idDel, itemHoaDonChange);
        res.redirect('/hoadon')
    } catch (e) {
        res.send('Fail: ' + e.message);
        ;
    }
});




app.post('/delete/:id', async (req, res) => {
    var idDel = req.body.idDel
    try {
        var stt = await product.findByIdAndDelete(idDel)
        if (!stt) {
            res.send('Nothing');
        } else {
            res.redirect('/')

        }
    } catch (e) {
        console.log(e)

    }


})

app.post('/ddelete/:idKH', async (req, res) => {
    var idDel = req.body.idDel
    try {
        var stt = await khachhang.findByIdAndDelete(idDel)
        if (!stt) {
            res.send('Khong ton tai1');
        } else {
            res.redirect('/khachhang')

        }
    } catch (e) {
        console.log(e)

    }


})

app.post('/dddelete/:idHD', async (req, res) => {
    var idDel = req.body.idDel
    try {
        var stt = await hoadon.findByIdAndDelete(idDel)
        if (!stt) {
            res.send('Khong ton tai1');
        } else {
            res.redirect('/hoadon')

        }
    } catch (e) {
        console.log(e)

    }


})





app.post('/suaProduct', function (req, res) {
    var c = req.body.c;
    var idDel = null;
    idDel = req.body.idDel;

    itemProduct = {
        idDel1: idDel,
        ma_sp: req.body.ma_sp,
        ten_sp: req.body.ten_sp,
        don_gia: req.body.don_gia,
        hinh_anh: req.body.hinh_anh,
        mo_ta: req.body.mo_ta,
        so_luong: req.body.so_luong
    };

    switch (c) {
        case 'Edit':
            res.render('suaProduct', { data: itemProduct })
            break;

        case 'Đồng ý':
            res.render('/updateKhachHang');
    }

})


app.post('/suaKhachHang', function (req, res) {
    var c = req.body.c;
    var idDel = null;
    idDel = req.body.idDel;

    itemKhachHang = {
        idDel1: idDel,
        MAKH: req.body.MAKH,
        user: req.body.user,
        pass: req.body.pass,
        fullname: req.body.fullname

    };

    switch (c) {
        case 'Edit User':
            res.render('suaKhachHang', { data: itemKhachHang })
            break;

        case 'submit':
            res.render('/update');
    }

})


app.post('/suaHoaDon', function (req, res) {
    var c = req.body.c;
    var idDel = null;
    idDel = req.body.idDel;

    itemHoaDon = {
        idDel1: idDel,
        id_kh: req.body.id_kh,
        id_sp: req.body.id_sp,
        so_luong: req.body.so_luong,

    };

    switch (c) {
        case 'Edit Bill':
            res.render('suaHoaDon', { data: itemHoaDon })
            break;

        case 'submitt':
            res.render('/updateHoaDon');
    }

})



app.post('/themProduct', async (req, res) => {
    var addProduct = new product({
        ma_sp: req.body.ma_sp,
        ten_sp: req.body.ten_sp,
        don_gia: req.body.don_gia,
        hinh_anh: req.body.hinh_anh,
        mo_ta: req.body.mo_ta,
        so_luong: req.body.so_luong
    })

    await addProduct.save(function (ree) {

        if (ree) {
            console.log(ree)
        } else {
            console.log("them product")
        }
    })
    return res.redirect('/product')

});

app.post('/themKhachHang', async (req, res) => {
    var addKhachHang = new khachhang({
        MAKH: req.body.MAKH,
        user: req.body.user,
        pass: req.body.pass,
        fullname: req.body.fullname

    })

    await addKhachHang.save(function (ree) {

        if (ree) {
            console.log(ree)
        } else {
            console.log("them khach hang")
        }
    })
    return res.redirect('/khachhang')

});


app.post('/themHoaDon', async (req, res) => {
    var addHoaDon = new hoadon({
        id_kh: req.body.id_kh,
        id_sp: req.body.id_sp,
        so_luong: req.body.so_luong
    })

    await addHoaDon.save(function (ree) {

        if (ree) {
            console.log(ree)
        } else {
            console.log("them hoa don")
        }
    })
    return res.redirect('/hoadon')

});



app.post('/', async (req, res) => {
    var c = req.body.c;
    var idDel = null;
    idDel = req.body.idDel;

    var ma_sp = null, ten_sp = null, don_gia = null, hinh_anh = null, mau_sac = null;

    itemProduct = {
        idDel1: idDel,
        ma_sp: req.body.ma_sp,
        ten_sp: req.body.ten_sp,
        don_gia: req.body.don_gia,
        hinh_anh: req.body.hinh_anh,
        mo_ta: req.body.mo_ta,
        so_luong: req.body.so_luong
    };

    itemKhachHang = {
        idDel1: req.body.idDel,
        MAKH: req.body.MAKH,
        user: req.body.user,
        pass: req.body.pass,
        fullname: req.body.fullname

    }

    itemHoaDon = {
        idDel1: req.body.idDel,
        id_kh: req.body.id_kh,
        id_sp: req.body.id_sp,
        so_luong: req.body.so_luong
    }

    switch (c) {
        case 'Product':
            let items = await product.find({}).lean()
            res.render('product', { data: items })
            break;

        case 'Customer':
            let items1 = await khachhang.find({}).lean()
            res.render('khachhang', { data: items1 })
            break;

        case 'Bill':
            let items2 = await hoadon.find({}).lean()
            res.render('hoadon', { data: items2 })
            break;

        case 'Sửa':
            res.render('suaProduct', { data: itemProduct })
            break;

        case 'Edit Product':
            var _id = req.body._id;
            itemProductChange = {
                _id: req.body._id,
                ma_sp: req.body.ma_sp,
                ten_sp: req.body.ten_sp,
                don_gia: req.body.don_gia,
                hinh_anh: req.body.hinh_anh,
                mo_ta: req.body.mo_ta,
                so_luong: req.body.so_luong
            };

            try {
                await product.findByIdAndUpdate(_id, itemProductChange);
                res.redirect('/')
            } catch (e) {
                res.send('Fail: ' + e.message);
                ;
            }
            break;

        case 'Add Product':
            res.render('themProduct')
            break;

        case 'Submit Product':
            var addProduct = new product({
                ma_sp: req.body.ma_sp,
                ten_sp: req.body.ten_sp,
                don_gia: req.body.don_gia,
                hinh_anh: req.body.hinh_anh,
                mo_ta: req.body.mo_ta,
                so_luong: req.body.so_luong
            })

            await addProduct.save(function (ree) {

                if (ree) {
                    console.log(ree)
                } else {
                    console.log("product")
                }
            })
            return res.redirect('/')
            break;

        case 'Add User':
            res.render('themKhachHang')
            break;

        case 'Submit User':
            var addKhachHang = new khachhang({
                MAKH: req.body.MAKH,
                user: req.body.user,
                pass: req.body.pass,
                fullname: req.body.fullname

            })
            await addKhachHang.save(function (ree) {

                if (ree) {
                    console.log(ree)
                } else {
                    console.log("khachag")
                }
            })
            return res.redirect('/khachhang')
            break;

        case 'Edit User':
            res.render('suaKhachHang', { data: itemKhachHang })
            break

        case 'OK':
            var _id = req.body._id;
            itemKhachHangChange = {
                _id: req.body._id,
                MAKH: req.body.MAKH,
                user: req.body.user,
                pass: req.body.pass,
                fullname: req.body.fullname

            };
            try {
                await khachhang.findByIdAndUpdate(_id, itemKhachHangChange);
                res.redirect('/khachhang')
            } catch (e) {
                res.send('Fail: ' + e.message);
                ;
            }
            break;

            case 'Add Bill':
                res.render('themHoaDon')
            break;

            case 'Submit Bill':
            var addHoaDon = new hoadon({
                id_kh: req.body.id_kh,
                id_sp: req.body.id_sp,
                so_luong: req.body.so_luong
            })
            await addHoaDon.save(function (ree) {

                if (ree) {
                    console.log(ree)
                } else {
                    console.log("hoadon")
                }
            })
            return res.redirect('/hoadon')
            break;

            case 'Edit bill':
                res.render('suaHoaDon', { data: itemHoaDon })
                break

            case 'submitt':

                var _id = req.body._id;
                itemHoaDonChange = {
                    _id: req.body._id,
                    id_kh: req.body.id_kh,
                    id_sp: req.body.id_sp,
                    so_luong: req.body.so_luong
                };
                try {
                    await hoadon.findByIdAndUpdate(_id, itemHoaDonChange);
                    res.redirect('/hoadon')
                } catch (e) {
                    res.send('Fail: ' + e.message);
                    ;
                }
                break;
    }

})

app.listen(1280, function () {
    console.log("start server");
})

