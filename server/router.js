const express = require('express');
const router = express.Router();
//这是上传图片所用的
const multer = require('multer');
const fs = require('fs');

//导入数据库
const sqlFun = require('./mysql');

//导入模块  jwt  token
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret');

//创建路由接口
// router.get("/", (req, res) => {
//   res.send("成功没");
// });

//登录的接口
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  //创建sql语句
  const sql = 'select * from user where username=? and password=?';
  //arr参数
  const arr = [username, password];
  //调用数据库查询方法
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      //查询到表示登录成功

      //生成登录状态token
      let token = jwt.sign(
        {
          id: result[0].id,
          username: result[0].username,
        },
        jwtSecret.secret,
        //配置过期时间
        {
          expiresIn: 20 * 1,
        }
      );
      res.send({
        status: 200,
        token, //把生成的token返回
        msg: '登录成功',
      });
    } else {
      //没查询到，表示登录失败
      res.send({
        status: 400,
        msg: '用户名密码错误',
        // token,
      });
    }
  });
});

//注册的接口
router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const arr = [username, password, email];
  const sql = 'insert into user values(null,?,?,?)';
  sqlFun(sql, arr, (result) => {
    //返回的是影响行数
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '注册成功',
      });
    } else {
      res.send({
        status: 400,
        msg: '注册失败',
      });
    }
  });
});

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

//规格参数
router.get('/backend/itemParam/selectItemParamAll', (req, res) => {
  var page = req.query.page || 1;
  let sqlLen = 'select * from params ';
  sqlFun(sqlLen, null, (data) => {
    var sql =
      'select * from params  order by id desc limit 10 offset ' +
      (page - 1) * 10;
    let len = data.length;
    sqlFun(sql, null, (result) => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result,
          pagesize: 10,
          total: len,
        });
      } else {
        res.send({
          status: 400,
          msg: '暂无数据',
        });
      }
    });
  });
});

//规格参数模糊搜索接口
router.get('/params/search', (req, res) => {
  var page = req.query.page || 1;
  const search = req.query.search;
  //concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"  根据search来搜索
  // order by id desc ; 搜索到的数据倒叙
  //limit 10 offset ' + (page-1)*10;  根据给的偏移量page只显示10条数据，page=1，就是1-10；page=2，就是11-20
  const sql =
    'select * from params where concat(`id`,`itemCatId`,`paramData`) like "%' +
    search +
    '%"' +
    ' order by id desc limit 10 offset ' +
    (page - 1) * 10;
  sqlFun(sql, [search, page], (result) => {
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

//添加规格参数接口
router.get('/backend/itemParam/insertItemParam', (req, res) => {
  var itemCatId = req.query.itemCatId;
  var paramData = req.query.paramData;
  sql = 'insert into params values(null,?,?)';
  sqlFun(sql, [itemCatId, paramData], (result) => {
    if (result.affectedRows > 0) {
      //影响行数大于0
      res.send({
        status: 200,
        msg: '添加成功！',
      });
    } else {
      res.send({
        status: 400,
        msg: '添加失败！',
      });
    }
  });
});

//删除规格参数
router.get('/params/delete', (req, res) => {
  var id = req.query.id;
  var sql = 'delete from params where id=?';
  sqlFun(sql, [id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
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

//获取内容分类-
router.get('/content/title', (req, res) => {
  var sql = 'select * from content';
  sqlFun(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 400,
        msg: '读取失败',
      });
    }
  });
});

//删除内容分类
router.get('/content/delete', (req, res) => {
  var pid = req.query.pid;
  var sql = 'delete from content where pid=?';
  sqlFun(sql, [pid], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '删除成功',
      });
    } else {
      res.send({
        status: 400,
        msg: '删除失败',
      });
    }
  });
});

//添加内容分类
router.get('/content/insert', (req, res) => {
  var name = req.query.name;
  var pid = Math.floor(Math.random() * 100000); //随机生成的5位数
  var id = Math.floor(Math.random() * 100000);
  var sql = 'insert into content values(?,?,?)';
  sqlFun(sql, [id, name, pid], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '添加成功',
      });
    } else {
      res.send({
        status: 400,
        msg: '添加失败',
      });
    }
  });
});

//根据内容分类pid查询contentinfo
router.get('/content/contentInfo', (req, res) => {
  var pid = req.query.pid;
  var sql = 'select * from contentinfo where pid=?';
  console.log(pid);
  sqlFun(sql, [pid], (result) => {
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

module.exports = router;
