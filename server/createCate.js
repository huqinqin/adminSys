var express = require('express');
var app = express();
var url = require('url');
var querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://admin:123456@127.0.0.1:27017/admin";


/*搭建登录服务器*/
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.post('/createCate', function (req, res) {
  var str = "";
  req.on("data",function (chunk) {
    str += chunk;
  });
  req.on("end",function () {
    str = JSON.parse(str);
    str.cateid = parseInt(str.cateid);
    str.classifyid = parseInt(str.classifyid);
    MongoClient.connect(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true},function (err,db) {
      console.log("数据库连接成功");
      if (err) throw err;
      var dbase = db.db('blog');
      dbase.collection('blogCate').insertOne(str,function (err,ress) {
        if(err) throw err;
        console.log("文档插入成功");
        res.send({status: 1});
        db.close();
      });
    });
  });
});
app.get('/allCate',function (req,res) {
  var pagination = {};
  if(req.method == 'GET'){
    var query = url.parse(req.url).query;
  }
  pagination = querystring.parse(query);
  var num = parseInt(pagination.pagination);
  MongoClient.connect(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true},function (err,db) {
    console.log("数据库连接成功");
    if (err) throw err;
    var dbase = db.db('blog');
    dbase.collection('blogCate').find({}).limit(5).skip((num - 1) * 5).toArray(function (err,result) {
      if(err) throw  err;
      dbase.collection('blogCate').find({}).toArray(function (err,resu) {
        res.send(JSON.stringify({result: result,code:0,total:resu.length}));
      });
      db.close();
    });
  });
});
app.post('/updateCate',function (req,res) {
  var str = "";
  req.on("data",function (chunk) {
    str += chunk;
  });
  req.on("end",function () {
    str = JSON.parse(str);
    str.cateid = parseInt(str.cateid);
    str.classifyid = parseInt(str.classifyid);
    MongoClient.connect(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true},function (err,db) {
      console.log("数据库连接成功");
      if (err) throw err;
      var dbase = db.db('blog');
      var whereStr = {_id: str._id};
      console.log(whereStr);
      var updateStr = {$set:str}
      dbase.collection('blogCate').updateOne(whereStr,updateStr,function (err,ress) {
        if(err) throw  err;
        console.log("更新完成!");
        res.send({updateStatus: 1})
        db.close();
      });
    });
  });
});
app.post('/delCateItem',function (req,res) {
  var str = "";
  req.on("data",function (chunk) {
    str += chunk;
  });
  req.on("end",function () {
    str = JSON.parse(str);
    str.cateid = parseInt(str.cateid);
    str.classifyid = parseInt(str.classifyid);
    MongoClient.connect(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true},function (err,db) {
      console.log("数据库连接成功");
      if (err) throw err;
      var dbase = db.db('blog');
      var whereStr = {_id: str._id};
      dbase.collection('blogCate').deleteOne(whereStr,function (err,ress) {
        if(err) throw err;
        console.log("文档删除成功!");
        res.send({delStatus: 1});
        db.close();
      });
    });
  });
})
app.get('/allCateName',function (req,res) {
  MongoClient.connect(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true},function (err,db) {
    console.log("数据库连接成功");
    if (err) throw err;
    var dbase = db.db('blog');
    dbase.collection('blogCate').find({}).toArray(function (err,result) {
      if(err) throw  err;
      res.send(JSON.stringify({result: result,code:0}));
      db.close();
    });
  });
});



app.listen(3012, function () {
  console.log('Example app listening on port 3012!');
});
