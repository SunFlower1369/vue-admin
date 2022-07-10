<template>
  <div>
    <div id="header">头部</div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#header{
    height: 2rem;
    background-color: blue;;
}
</style>