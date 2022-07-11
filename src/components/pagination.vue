<template>
  <el-pagination
    :page-size="pageSize"
    layout="total, prev, pager, next,jumper"
    :total="total"
    class="pagination"
    @current-change="changePage"
  >
    <!-- 这里犯了错  明明是点击事件@  结果弄成了绑定： -->
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    changePage(page) {
      //子传父使用emit 传到goods页面去后需要接收
      this.$emit("changePage", page);
      //   console.log(page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin: 20px;
}
</style>