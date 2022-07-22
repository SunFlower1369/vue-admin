const express = require('express');
const router = express.Router();
//这是上传图片所用的
const multer = require('multer');
const fs = require('fs');

//导入数据库
const sqlFun = require('./mysql');

//创建路由接口
// router.get("/", (req, res) => {
//   res.send("成功没");
// });

/**
 * 获取分页  {total：'', arr:[{}],pagesize:8}
 * 参数page   页码
 */
router.get('/pageList', (req, res) => {
  const page = req.query.page || 1;
  const sqlLen = 'select * from project where id';
  sqlFun(sqlLen, null, (data) => {
    let len = data.length;
    const sql =
      'select * from project order by id desc limit 10 offset ' +
      (page - 1) * 10;
    sqlFun(sql, null, (result) => {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pagesize: 10,
          total: len,
        });
      } else {
        res.send({
          status: 400,
          msg: '查询失败',
        });
      }
    });
  });
});

//商品模糊搜索接口   不带分页功能
router.get('/search', (req, res) => {
  const search = req.query.search;
  //concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"  根据search来搜索
  // order by id desc ; 搜索到的数据倒叙
  const sql =
    'select * from project where concat(`title`,`sellPoint`,`descs`) like "%' +
    search +
    '%"' +
    ' order by id desc limit 10  ';
  //  offset   (page - 1) * 10;
  sqlFun(sql, [search], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 400,
        msg: '暂无数据',
      });
    }
  });
});

//选择类目接口
router.get('/backend/itemCategory/selectItmeCategoryByParentId', (req, res) => {
  const id = req.query.id || 1;
  const sql = 'select * from category where id=?';
  const arr = [id];
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 400,
        msg: '暂无数据',
      });
    }
  });
});

// 上传图片
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), function (req, res, next) {
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.json({ res_code: '0', name: file.originalname, url: file.path });
});

//添加商品接口
router.get('/backend/item/insertTbItem', (req, res) => {
  var title = req.query.title || '';
  var cid = req.query.cid || '';
  var category = req.query.category || '';
  var sellPoint = req.query.sellPoint || '';
  var price = req.query.price || '';
  var num = req.query.num || '';
  var desc = req.query.desc || '';
  var image = req.query.image || '';
  const sql = "insert into project values (null,?,?,?,?,?,?,?,'',1,'','',?)";
  var arr = [title, category, image, sellPoint, price, cid, num, desc];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      //影响行数
      res.send({
        status: 200,
        msg: '添加成功',
      });
    } else {
      res.send({
        status: 500,
        msg: '添加失败',
      });
    }
  });
});

//删除商品的接口
router.get('/backend/item/deleteItemById', (req, res) => {
  var id = req.query.id;
  var arr = [id];
  var sql = 'delete from project where id=?';
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      //影响行数大于0
      res.send({
        status: 200,
        result,
        msg: '删除成功！',
      });
    } else {
      res.send({
        status: 400,
        msg: '删除失败！',
      });
    }
  });
});

//编辑商品修改商品的接口
router.get('/backend/item/updateTbItem', (req, res) => {
  var id = req.query.id;
  var title = req.query.title || '';
  var sellPoint = req.query.sellPoint || '';
  var price = req.query.price || '';
  var num = req.query.num || '';
  var descs = req.query.descs || '';
  var image = req.query.image || '';
  var cid = req.query.cid || '';
  var category = req.query.category || '';
  var arr = [title, sellPoint, cid, price, num, descs, image, category, id];
  var sql =
    'update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=?,category=? where id=?';
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '修改成功',
        sql: this.sql,
      });
    } else {
      res.send({
        status: 500,
        msg: '修改失败',
        sql: '',
      });
    }
  });
  return sql;
});

module.exports = router;
