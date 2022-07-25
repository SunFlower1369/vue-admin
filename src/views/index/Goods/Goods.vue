<template>
  <div id="goods">
    <!-- 搜索等 -->
    <div class="search">
      <el-input v-model="searchContent" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="search(searchContent)">查询</el-button>
      <!-- 这是跳转页面的添加 -->
      <!-- <el-button type="primary">
        <router-link to="/addGoods" class="color"> 添加商品</router-link>
      </el-button> -->
      <!-- 这是跳出弹框的添加 -->
      <el-button type="primary" @click="addGoods"> 添加商品 </el-button>
    </div>
    <!-- 数据等 -->
    <div class="information">
      <template>
        <el-table :data="goodsList" style="width: 100%">
          <el-table-column type="selection" width="55" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="id" label="商品ID" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="title" label="商品名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="price" label="商品价格" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="num" label="商品数量" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="category"
            label="规格类目"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sellPoint"
            label="商品卖点"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button size="mini" @click="see(scope.$index, scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页功能 -->
    <Pagination :total="total" :pageSize="pageSize" @changePage="changePage" />
    <!-- changePage为分页页面传过来的参数  @changePage这里的名字必须和pagination中emit中的方法名 相同-->

    <!-- 添加商品弹出框 有三种方法  第一种父传子，在子传父  第二种 ref   第三种  children-->
    <!-- <AddGoodsDialog ref='dialog'
    ></AddGoodsDialog> -->
    <AddGoodsDialog
      :dialogVisible="dialogVisible"
      @changeDialog="changeDialog"
      :title="title"
      :rowData="rowData"
      ref="addGoodsDialog"
    ></AddGoodsDialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Pagination from "../../../components/Pagination";
import AddGoodsDialog from "./AddGood/AddGoodsDialog.vue";
export default {
  components: {
    Pagination,
    AddGoodsDialog,
  },
  data() {
    return {
      searchContent: "",
      goodsList: [],
      total: 100,
      pageSize: 1,
      dialogVisible: false,
      title: "添加商品",
      rowData: {},
    };
  },
  methods: {
    //编辑操作
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.title = "编辑商品";
      this.rowData = row;
      // console.log(row);
      // this.$refs.addGoodsDialog.info = row; // 1.用refs直接读取子组件的数据   2.也可以使用监听器(必须先把值传递过去)this.rowData = row  在addgoods页面
      // console.log(row);    title, sellPoint, cid, price, num, desc, image, id,category
      // let { title, sellPoint, cid, price, num, desc, image, id, category } =
      //   row;
      // this.$axios
      //   .updateGoods({
      //     title,
      //     sellPoint,
      //     cid,
      //     price,
      //     num,
      //     desc,
      //     image,
      //     id,
      //     category,
      //   })
      //   .then((res) => {
      //     // console.log(res.data);
      //     if (res.data.status === 200) {
      //       console.log("有问题吗");
      //     }
      //   });
    },
    //
    // rowData() {},
    //删除操作   已完成
    handleDelete(index, row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.DeleteGoods({ id: row.id }).then((res) => {
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.goodsListSelect();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    see() {},
    //封装成一个方法  请求商品    已完成
    goodsListSelect(page) {
      this.$axios
        .getGoodsList({
          page, //后期肯定根据页数来查询 动态的
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.goodsList = res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pagesize;
            // console.log(this.goodsList);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //更换页码的时候调用goodsListSelect方法    已完成
    changePage(num) {
      this.goodsListSelect(num);
      // console.log("切换了吗");
    },
    //搜索操作    已完成
    search(val) {
      // console.log(val); 接收成功
      this.$axios
        .search({
          search: val,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            this.goodsList = res.data.result;
          } else if (res.data.status === 400) {
            Message.error("没有查询到相关数据哦");
          }
        })
        .catch((error) => {
          console.log(error);
          Message.error(error);
        });
    },
    // 添加商品弹窗    已完成
    addGoods() {
      this.dialogVisible = !this.dialogVisible;
      this.title = "添加商品";
      // this.$refs.dialog.dialogVisible = true
    },
    //封装为组件后的子组件传来取消弹窗
    changeDialog() {
      this.dialogVisible = false;
    },
  },
  created() {
    // 第一次进入   页码设置为1
    this.goodsListSelect(1);
  },
};
</script>

<style lang="less" scoped>
#goods {
  padding: 1rem;
  .search {
    display: flex;
    button {
      margin-left: 1rem;
    }
    .color {
      color: white;
    }
  }
  .information {
    margin: 1rem 0;
  }
}
</style>