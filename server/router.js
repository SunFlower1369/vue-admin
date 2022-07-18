const express = require('express');
const router = express.Router();

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

module.exports = router;
