/**
 * 接口配置
 */

const base = {
  host: 'http://localhost:1234', //基础路径
  goodsList: '/api/pageList', //商品列表
  search: '/api/search', //商品搜索
  selectCategory: '/api/backend/itemCategory/selectItmeCategoryByParentId', //类目选择
  uploadImage: '/api/upload', //上传图片
  isnertGoods: '/api/backend/item/insertTbItem', //添加商品
};

export default base;
