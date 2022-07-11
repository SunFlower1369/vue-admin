<template>
  <div>
    <div id="header">
      <i
        class="icon el-icon-s-fold"
        @click="change"
        v-if="isCollapse === true"
      ></i>
      <i
        class="icon el-icon-s-unfold"
        @click="change"
        :isCollapse="isCollapse"
        v-else
      ></i>
      头部
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  methods: {
    change() {
      //修改父组件的数据    注意 父组件中的名字必须和changeCollapse 相同  例如  @changeCollapse = '方法名'
      this.$emit("changeCollapse");
    },
  },
};
</script>

<style lang="less" scoped>
#header {
  height: 2rem;
  background-color: blue;
}
.icon {
  font-size: 24px;
}
</style>