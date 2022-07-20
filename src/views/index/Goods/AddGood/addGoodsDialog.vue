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
            <el-form-item label="商品图片">
              <img :src="info.image" />
              <el-button
                type="primary"
                @click="innerVisibleImage = true"
                class="catecory"
                >商品图片</el-button
              >
            </el-form-item>
            <el-form-item label="商品描述">
              <WangEditor @desc="desc" :src="info.desc"></WangEditor>
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
        <GoodsDialogImageUpload @uploadImage="uploadImage" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImage = false">取 消</el-button>
          <el-button type="primary" @click="getImageUrl">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import GoodsDialogTwo from "./GoodsDialogTwo";
import GoodsDialogImageUpload from "./GoodsDialogImageUpload";
import WangEditor from "./WangEditor";
export default {
  props: ["dialogVisible"],
  components: {
    GoodsDialogTwo,
    GoodsDialogImageUpload,
    WangEditor,
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
        desc: "",
        cid: "",
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
      this.info.cid = this.twoData.cid;
    },
    //接收子组件传过来的图片
    uploadImage(val) {
      this.imageData = val;
      // console.log(val);
    },
    //赋值给数组 图片的数据
    getImageUrl() {
      this.info.image = this.imageData;
      this.innerVisibleImage = false;
    },
    //接收富文本传过来的描述
    desc(val) {
      console.log(val); //已接收到
      this.info.desc = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit() {
      this.$refs.info.validate((valid) => {
        if (valid) {
          // console.log(this.info);
          let { title, price, num, sellPoint, image, catecory, desc, cid } =
            this.info;
          this.$axios
            .InsertGoods({
              //这里是传的数据
              title,
              price,
              num,
              sellPoint,
              image,
              catecory,
              desc,
              cid,
            })
            .then((res) => {
              // console.log("进来了吗");
              if (res.data.status === 200) {
                // console.log("进来了吗1");
                this.close(); //关闭弹窗
                this.$parent //调用父组件刷新数据
                  .goodsListSelect(1);
                //传数据给后端
                this.$message({
                  message: "恭喜你，添加成功！",
                  type: "success",
                });
              } else {
                this.$message.error("报错了哦");
              }
            })
            .catch((error) => {
              this.$message.error("添加出错！");
              // console.log(error);
              // console.log(this.info);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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