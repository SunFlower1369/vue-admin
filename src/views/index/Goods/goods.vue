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
          <el-table-column prop="date" label="规格类目" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sellPoints"
            label="商品卖点"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
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
    ></AddGoodsDialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Pagination from "../../../components/pagination.vue";
import AddGoodsDialog from "./AddGood/addGoodsDialog.vue";
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
    };
  },
  methods: {
    //编辑操作
    handleEdit() {},
    //删除操作
    handleDelete() {},
    //封装成一个方法  请求商品
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
            // console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //更换页码的时候调用goodsListSelect方法
    changePage(num) {
      this.goodsListSelect(num);
      // console.log("切换了吗");
    },
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
    // 添加商品弹窗
    addGoods() {
      this.dialogVisible = !this.dialogVisible;
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