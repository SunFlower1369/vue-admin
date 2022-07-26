<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="clearFrom"
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
              <img :src="info.image" style="width: 100px; height: 100px" />
              <el-button
                type="primary"
                @click="innerVisibleImage = true"
                class="catecory"
                >商品图片</el-button
              >
            </el-form-item>
            <el-form-item label="商品描述" prop="descs">
              <WangEditor
                @descs="descs"
                :src="info.descs"
                ref="myEditor"
              ></WangEditor>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <!-- <el-button @click="get">kankan info</el-button> -->
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>

      <!-- 嵌套的弹窗   类目选择 -->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <Tree @TreeData="TwoData" />
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
import Tree from '../../../../components/CategoryTree.vue';
import GoodsDialogImageUpload from './GoodsDialogImageUpload';
import WangEditor from './WangEditor';
export default {
  props:
    // "dialogVisible",
    // "title",
    {
      dialogVisible: {
        type: Boolean,
      },
      title: {
        type: String,
        default: '添加商品',
      },
      rowData: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
  components: {
    Tree,
    GoodsDialogImageUpload,
    WangEditor,
  },
  data() {
    return {
      twoData: {},
      imageData: {},
      info: {
        id: '',
        title: '',
        price: '',
        num: '',
        sellPoint: '',
        image: '',
        created: '',
        category: '',
        descs: '',
        cid: '',
      },
      rules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        num: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
      },
      innerVisible: false,
      innerVisibleImage: false,
    };
  },
  watch: {
    rowData(val) {
      // console.log("使这里");
      this.info = val; //这里是goods页面传过来的值   对应编辑操作
      // console.log(val.id);
      this.$nextTick(() => {
        this.$refs.myEditor.editor.setHtml(val.descs);
      });
    },
  },
  methods: {
    // get() {
    //   console.log(this.info);
    // },
    TwoData(data) {
      this.twoData = data;
      // console.log(this.twoData);
    },
    //接收子组件传过来的类目
    getTwoData() {
      this.innerVisible = false;
      this.info.category = this.twoData.name;
      // console.log(this.info, this.twoData);
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
    descs(val) {
      //console.log(val); //已接收到
      this.info.descs = val;
    },
    submit() {
      this.$refs.info.validate((valid) => {
        if (valid) {
          // console.log(this.info);
          let {
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            descs,
            image,
            id,
          } = this.info;
          if (this.title === '添加商品') {
            console.log('我再添加');
            this.$axios
              .InsertGoods({
                //这里是传的数据
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image,
              })
              .then((res) => {
                if (res.data.status === 200) {
                  //3   传数据给后端
                  this.$message({
                    message: '恭喜你，添加成功！',
                    type: 'success',
                  });
                  this.clearFrom(); //富文本没有清空只能用富文本自带的方法
                } else {
                  this.$message.error('报错了哦');
                }
              });
          } else {
            this.$axios
              .updateGoods({
                //这里是传的数据
                id,
                title,
                sellPoint,
                cid,
                price,
                num,
                descs,
                image,
                category,
              })
              .then((res) => {
                // console.log(res);
                // console.log(this.info);
                // console.log("我在编辑");
                if (res.data.status === 200) {
                  //3   传数据给后端
                  this.$message({
                    message: '恭喜你，编辑成功！',
                    type: 'success',
                  });
                  this.clearFrom(); //富文本没有清空只能用富文本自带的方法
                } else {
                  this.$message.error('编辑失败！');
                }
              })
              .catch((err) => {
                this.$message.error('err');
                // console.log(err);
              });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    close() {
      // this.clearFrom();
      this.$emit('changeDialog');
      // this.clearFrom();
      this.info = {
        title: '',
        price: '',
        num: '',
        sellPoint: '',
        image: '',
        created: '',
        category: '',
        descs: '',
        cid: '',
      };
      this.$refs.myEditor.editor.clear();
    },
    selectSort() {
      this.innerVisible = !this.innerVisible;
    },
    clearFrom() {
      // console.log("进来了吗1");
      this.close(); //1  关闭弹窗
      this.$parent //2  调用父组件刷新数据
        .goodsListSelect(1);
      //    添加成功后再次点击添加还会有上次数据 因此成功后必须清空
      // this.$refs.info.resetFields();   //这里会出现问题 会闪过第一条数据因此直接用赋值的方式
      // this.info = {
      //   title: "",
      //   price: "",
      //   num: "",
      //   sellPoint: "",
      //   image: "",
      //   created: "",
      //   category: "",
      //   descs: "",
      //   cid: "",
      // };
      // //上面清空只能清空除了富文本之外的所有数据 因为富文本提供了自己的清空方法  editor.txt.clear()    也可以自己手动清空赋值为空
      // // 因为是访问子组件的data  所以直接绑定ref就可以访问了
      // this.$refs.myEditor.editor.clear(); //出现问题 是添加成功  可是也会出现添加出错
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
