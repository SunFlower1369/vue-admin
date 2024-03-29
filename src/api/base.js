/**
 * 接口配置
 */

const base = {
  host: 'http://localhost:1234', //基础路径
  goodsList: '/api/pageList', //商品列表
  search: '/api/search', //商品搜索
  selectCategory: '/api/backend/itemCategory/selectItmeCategoryByParentId', //类目选择
  uploadImage: '/api/upload', //上传图片
  insertGoods: '/api/backend/item/insertTbItem', //添加商品
  deleteGoods: '/api/backend/item/deleteItemById', //删除商品
  updateGoods: '/api/backend/item/updateTbItem', //编辑商品
  login: '/api/login', //登录接口
  params: '/api/backend/itemParam/selectItemParamAll', //规格参数
  searchParams: '/api//params/search', //规格参数搜索
  insertParams: '/api/backend/itemParam/insertItemParam', //添加规格参数
};

export default base;
