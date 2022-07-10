<template>
  <div id="index">
      <!-- 左侧导航 -->
      <Menu class="menu"></Menu>
      <!-- 右侧内容 -->
      <Content class="content"></Content>
  </div>
</template>

<script>
import Menu from '../components/index/menu.vue'
import Content from '../components/index/content.vue'
export default {
    components:{
        Menu,
        Content
    }

}
</script>

<style lang="less" scoped>
#index{
    // display: flex;
    .menu{
        width: 15%;
        background-color: pink;
        position: fixed;
        top: 0;
        bottom: 0;//定位上下距离为0
    }
    .content{
        // flex: 1;
        margin-left: 15%;
    }
}
</style>