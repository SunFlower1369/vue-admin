<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      accordion
      @node-click="getData"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
      },
    };
  },
  methods: {
    getData(data, node) {
      this.$emit('TreeData', data);
    },
    selectCategory() {
      this.$axios
        .GetSelectCategory()
        .then((res) => {
          // console.log(res.data);
          return resolve(res.data.result);
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    loadNode(node, resolve) {
      // console.log(node);
      if (node.level === 0) {
        //这里是进入页面的时候获取第一层的数据
        this.$axios
          .GetSelectCategory()
          .then((res) => {
            // console.log(res.data);
            return resolve(res.data.result);
          })
          .catch((error) => {
            this.$message.error(error);
            // // return resolve([{ name: "region" }]);
          });
      }
      if (node.level >= 1) {
        //请求你点击的下面的数据
        this.$axios
          .GetSelectCategory({ id: node.data.cid })
          .then((res) => {
            // console.log(res.data);
            // console.log(res);
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            this.$message.error(error);
            // return resolve([{ name: "region" }]);
          });
      }
    },
  },
};
</script>

<style></style>
