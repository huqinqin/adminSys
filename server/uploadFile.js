var express = require('express');
var app = express();
var path = require('path');
// 引入解析包
var formidable = require('formidable');
fs = require('fs');

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
// 设置静态文件目录
app.use('/public', express.static('public'));

app.post('/upload', function(req,res){
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8'; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, 'a');
  // 解析 formData 数据
  form.parse(req, (err, fields ,files) => {
    console.log(files.file);
    if(err) return next(err);
    let imgPath = files.file.path;
    let imgName = files.file.name;
    console.log(imgName, imgPath);
    var t = path.basename(imgPath);
    //var t = path.basename(imgPath);
    // 返回路径和文件名
    res.json({code: 1, data: { name: imgName, path: imgPath, newName: t }});
  })
});

app.listen(3010, function () {
  console.log('Example app listening on port 3010!');
});

