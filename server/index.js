//第一次使用express 搭建express
const express = require('express');
//此app可以根据自己喜好更改
const app = express();
//路由导进来   router.js
const router = require('./router');
//post使用
app.use(express.urlencoded({ extended: true }));
//上传图片的静态资源管理
app.use(express.static('upload')); //可以直接访问图片  http://localhost:3000/图片名称.jpg
//使用路由
app.use('/', router);

//监听
app.listen(1234, () => {
  console.log('我启动了');
});
