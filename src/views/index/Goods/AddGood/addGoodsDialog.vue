<template>
  <div>
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="add-goods">
        <!-- 添加页面 -->
        <div class="content">
          <el-form ref="info" :model="info" label-width="80px" :rules="rules">
            <el-form-item label="类目选择">
              <span>{{ info.catecory }}</span>
              <el-button type="primary" @click="selectSort" class="catecory"
                >类目选择</el-button
              >
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
              <img :src="info.image" style="width: 50px; height: 50px" />
              <el-button
                type="primary"
                @click="innerVisibleImage = true"
                class="catecory"
                >商品图片</el-button
              >
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="info.descs"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>

      <!-- 嵌套的弹窗   类目选择 -->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <GoodsDialogTwo @TwoData="TwoData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="getTwoData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 嵌套的弹窗   上传图片 -->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImage"
        append-to-body
      >
        <GoodsDialogImageUploadVue @uploadImage="uploadImage" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImage = false">取 消</el-button>
          <el-button type="primary" @click="getImageUrl">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import GoodsDialogTwo from "./goodsDialogTwo";
import GoodsDialogImageUploadVue from "./goodsDialogImageUpload.vue";
export default {
  props: ["dialogVisible"],
  components: {
    GoodsDialogTwo,
    GoodsDialogImageUploadVue,
  },
  data() {
    return {
      twoData: {},
      imageData: {},
      info: {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        created: "",
        catecory: "",
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
      innerVisible: false,
      innerVisibleImage: false,
    };
  },
  methods: {
    TwoData(data) {
      this.twoData = data;
      // console.log(this.twoData);
    },
    //接收子组件传过来的类目
    getTwoData() {
      this.innerVisible = false;
      this.info.catecory = this.twoData.name;
    },
    //接收子组件传过来的图片
    uploadImage(val) {
      this.imageData = val;
      console.log(val);
    },
    //赋值给数组 图片的数据
    getImageUrl() {
      this.info.image = this.imageData;
      this.innerVisibleImage = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit() {
      this.$emit("changeDialog");
      console.log(this.info); //已成功获取所有信息
      // this.$axios.InsertGoods().then((res) => {
      //   console.log(res);
      // });
    },
    close() {
      this.$emit("changeDialog");
    },
    selectSort() {
      this.innerVisible = !this.innerVisible;
    },
  },
};
</script>

<style lang="less" scoped>
// .add-goods {
//   .submit {
//     margin-right: 2rem;
//   }
// }
.catecory {
  margin-left: 2rem;
}
</style>