<template>
  <div class="add-goods">
    <!-- 面包屑 -->
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 添加页面 -->
    <div class="content">
      <el-form ref="info" :model="info" label-width="80px" :rules="rules">
        <el-form-item label="类目选择">
          <el-button type="primary">类目选择</el-button>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="info.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="info.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="info.sellPoint"></el-input>
        </el-form-item>
        <!-- <el-form-item label="发布时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="info.created"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <el-form-item label="商品图片">
          <el-button type="primary">商品图片</el-button>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="info.descs"></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        created: "",
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>

<style lang="less" scoped>
.add-goods {
  padding: 20px;
  .header {
    margin: 20px 0;
  }
  .content {
    padding: 20px;
  }
  .submit {
    float: right;
  }
}
</style>