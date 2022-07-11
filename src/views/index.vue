<template>
  <div id="index">
    <!-- 左侧导航 -->
    <Menu class="menu" :isCollapse="isCollapse"></Menu>
    <!-- 右侧内容 -->
    <Content
      class="content"
      @changeCollapse="changeCollapse"
      :isCollapse="isCollapse"
      :class="{ isActive: isCollapse }"
    ></Content>
  </div>
</template>

<script>
import Menu from "../views/index/menu.vue";
import Content from "../views/index/content.vue";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapse() {
      //   console.log("接收成功了吗");
      this.isCollapse = !this.isCollapse;
    },
  },
  components: {
    Menu,
    Content,
  },
};
</script>

<style lang="less" scoped>
#index {
  // display: flex;
  .menu {
    // width: 15%;
    background-color: skyblue;
    position: fixed;
    top: 0;
    bottom: 0; //定位上下距离为0
  }
  .content {
    // flex: 1;
    margin-left: 200px;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>