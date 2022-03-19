var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var dbb = 'mongodb+srv://admin:02072002Ngoc@cluster0.wh96s.mongodb.net/DuLieuDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(dbb).catch(error => {
    console.log("lỗi xảy ra " + error)
})
router.get('/cars',function (req,res, next){

       Car.find({},function (err , data){
           res.render('cars' , {ds : data})
       })



});

router.get('/how', function(req, res, next) {

    var danhsach = [
        {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
            "albumId": 1,
            "id": 3,
            "title": "officia porro iure quia iusto qui ipsa ut modi",
            "url": "https://via.placeholder.com/600/24f355",
            "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
            "albumId": 1,
            "id": 4,
            "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
            "url": "https://via.placeholder.com/600/d32776",
            "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        }
    ]

    res.render('what', { title: 'home' , danhsach : danhsach});
});

router.get('/mu', function(req, res, next) {
  res.render('hello', { title: 'something' });
});
router.get('/ao', function(req, res, next) {
  res.render('hello', { title: 'something' });
});
router.get('/bao', function(req, res, next) {
  res.render('bao', { title: 'something' });
});


var fs = require('fs')
router.post('/lab3' , function (req,res ){
   var email = req.body.Email
  var sdt = req.body.Sdt
  var nd = req.body.noiDung

    res.render('hello',{title : 'ok' , messge : ''})
  fs.writeFile('Trave/' + email + ".txt" , 'số điện thoại : ' + sdt + '\n' +  'Nội dung : ' + nd ,function (Error){
      if(Error){
        messgae = Error;
      }else {
        messgae = "Chúng tôi đã nhận phản hồi "
      }

  });
});

// buoc 1 : khởi tạo khung - schema
var carSchema = new mongoose.Schema({
    tenAnh:'string' ,
    noiDung : 'string',
    linkAnh : 'string'
});
// bước 2 : liên kết schema với mongoDB with mongoose
var Car = mongoose.model('car' , carSchema);

router.post('/addCar',function (req ,res){
    var tenAnh = req.body.tenAnh;
    var noiDung = req.body.noiDung;
    var linkAnh = req.body.linkAnh;



    // bước 3 : khởi tạo giá Car với giá trị lấy dc
    const  car = new Car({
        tenAnh : tenAnh,
        noiDung : noiDung,
        linkAnh : linkAnh
    })
    car.save(function (error){
       var mess;
       if(error == null ){
           mess = "Thêm thành công "

       }else {
           mess = error
       }
    });

    res.render('cars',{messgae : ''});
});
router.get('/themCar',function (req ,res){
    res.render('themCar',{});
})
router.get('/suaCar',function (req ,res){
    res.render('suaCar',{});
})
router.post('/updateCar',function (req , res){
    var tenAnh = req.body.tenAnh;
    var noiDung = req.body.noiDung;
    var linkAnh = req.body.linkAnh;

    Car.updateOne({tenAnh: tenAnh},{$set : {tenAnh : tenAnh , noiDung : noiDung , linkAnh : linkAnh}},(err,obj) =>{
        if (err) throw err;
        console.log("update thành công");
    })
})
router.post('/xoaHA', function (request, response){
    var id = request.body.id;

    console.log(id);

    Car.deleteOne({_id :id},  function (err){
        // if(err) throw err;
        // console.log('Xoa thanh cong');
    });
});


var multer = require('multer');
const e = require("express");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(file.mimetype == 'image/jpeg'){
            cb(null, 'uploads/');
        }else {
            cb(new Error("Chỉ được up load file .jpg và không được quá  5  file"), false)
        }

    },
    filename: function(req, file, cb) {
         cb(null, Date.now() +".jpg"  );
    },
});

var upload1 = multer({ storage: storage , litmits : {
        filesize : 1 * 1024 ,
        files : 5
    }});
router.get('/upload', function (req , res){
    res.render('upload',{title : "Up load file"});
})
router.post('/upload' ,upload1.single('avatar'), (req , res , next ) =>{
    const file = req.file;
    if(!file){
        res.send("lỗi rồi ")
    }else {
        res.send("up load thành công")
    }
})


module.exports = router;
