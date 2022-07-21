<template>
  <div>
    <el-row>
      <el-col>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="skyblue"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="isCollapse"
        >
          <el-menu-item>
            <span slot="title">伟伟的后台管理系统</span>
          </el-menu-item>
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/params">
            <i class="el-icon-setting"></i>
            <span slot="title">规格参数</span>
          </el-menu-item>
          <el-menu-item index="/sort">
            <i class="el-icon-setting"></i>
            <span slot="title">广告分类</span>
          </el-menu-item>
          <el-submenu index="/order">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/order/orderList">订单列表</el-menu-item>
              <el-menu-item index="/order/orderReturn">退货订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  mounted() {
    //获取地址栏中的路由，设置elementui中的导航栏选中状态
    // this.defaultActive = window.location.pathname;
  },
  data() {
    return {
      // isCollapse: false,
      // defaultActive: "/",
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item:hover {
  background-color: skyblue;
}
</style>