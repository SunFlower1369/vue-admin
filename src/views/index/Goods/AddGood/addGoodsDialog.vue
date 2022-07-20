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
            <el-form-item label="类目选择" prop="category">
              <span>{{ info.category }}</span>
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
            <el-form-item label="商品卖点" prop="sellPoint">
              <el-input v-model="info.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="image">
              <img :src="info.image" style="width:100px;height:100px"/>
              <el-button
                type="primary"
                @click="innerVisibleImage = true"
                class="catecory"
                >商品图片</el-button
              >
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
              <WangEditor @desc="desc" :src="info.desc" ref="myEditor"></WangEditor>
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
        category: "",
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
      this.info.category = this.twoData.name;
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
          let { title, price, num, sellPoint, image, category, desc, cid } =
            this.info;
          this.$axios
            .InsertGoods({
              //这里是传的数据
              title,
              price,
              num,
              sellPoint,
              image,
              category,
              desc,
              cid,
            })
            .then((res) => {
              // console.log("进来了吗");
              if (res.data.status === 200) {
                // console.log("进来了吗1");
                this.close(); //1  关闭弹窗
                this.$parent //2  调用父组件刷新数据
                  .goodsListSelect(1);
                //3   传数据给后端
                this.$message({
                  message: "恭喜你，添加成功！",
                  type: "success",
                });
                // 4   添加成功后再次点击添加还会有上次数据 因此成功后必须清空   
                this.$refs.info.resetFields();
                //上面清空只能清空除了富文本之外的所有数据 因为富文本提供了自己的清空方法  editor.txt.clear()
                // 因为是访问子组件的data  所以直接绑定ref就可以访问了
                this.$refs.myEditor.editor.txt.clear()//出现问题 是添加成功  可是也会出现添加出错
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