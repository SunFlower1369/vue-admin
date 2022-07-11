//第一次使用express 搭建express
const express = require("express");
//此app可以根据自己喜好更改
const app = express();
//路由导进来   router.js
const router = require("./router");
//使用路由
app.use("/", router);

//监听
app.listen(1234, () => {
  console.log(1234);
});
