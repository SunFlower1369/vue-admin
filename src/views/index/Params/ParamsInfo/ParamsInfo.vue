<template>
  <div id="info">
    <h2>规格与包装</h2>
    <!-- 搜索 -->
    <div class="search">
      <el-input type="text" v-model="searchKeyWords" class="search-input" />
      <el-button
        type="primary"
        class="search-button"
        @click="search(searchKeyWords)"
        >查看</el-button
      >
      <el-button type="primary" class="search-button" @click="add"
        >添加</el-button
      >
    </div>
    <!-- 主体显示内容 -->
    <div class="content">
      <template>
        <el-table :data="paramsInfo" style="width: 100%">
          <el-table-column prop="id" label="规格参数ID" width="130">
          </el-table-column>
          <el-table-column prop="itemCatId" label="类目ID" width="130">
          </el-table-column>
          <el-table-column prop="paramName" label="规格名称" width="180">
          </el-table-column>
          <el-table-column
            prop="paramData"
            label="规格参数"
            show-overflow-tooltip
          >
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

    <!-- 分页 -->
    <Pagination
      :pageSize="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @changePage="changePage"
    />

    <!-- 添加弹窗 -->
    <AddParamsInfo ref="addParamsInfo"></AddParamsInfo>
  </div>
</template>

<script>
import Pagination from '../../../../components/Pagination.vue';
import AddParamsInfo from './AddParamsInfo.vue';
export default {
  components: {
    AddParamsInfo,
    Pagination,
  },
  data() {
    return {
      searchKeyWords: '',
      paramsInfo: [],
      total: 0,
      pageSize: 1,
    };
  },
  methods: {
    //这里封装的方法  获取规格参数
    getParamsInfo(page) {
      this.$axios
        .getParams({ page })
        .then((res) => {
          //   console.log(res.data);
          if (res.data.status === 200) {
            this.paramsInfo = res.data.result;
            this.pageSize = res.data.pagesize;
            this.total = res.data.total;
          } else {
            console.log('请求出问题了');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击搜索按钮
    search(val) {
      this.$axios.searchParams({ search: val }).then((res) => {
        // console.log(val);
        // console.log(res);
        if (res.data.status === 200) {
          this.paramsInfo = res.data.result;
        }
      });
    },
    changePage(num) {
      this.getParamsInfo(num);
      //   console.log(num);
    },
    //添加
    add() {
      //   console.log(this.$refs.addParamsInfo);
      this.$refs.addParamsInfo.dialogVisible = true;
    },
    see() {},
    handleEdit() {},
    handleDelete() {},
  },
  created() {
    //第一次进入页面 直接调用方法进行查询显示第一页
    this.getParamsInfo(1);
  },
};
</script>

<style lang="less" scoped>
#info {
  //   background-color: yellow;
  padding: 1rem;
  h2 {
    margin: 1rem 0;
  }
  .search {
    display: flex;
    margin: 1rem 0;
    .search-input {
      width: 80%;
    }
    .search-button {
      margin: 0 0 0 2rem;
    }
  }
  .pagination {
    margin: 1rem auto;
    text-align: center;
  }
}
</style>
