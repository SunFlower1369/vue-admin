<template>
  <div>
    <el-dialog
      title="规格参数类目选择"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <!-- 这是一个懒加载的形式    tree -->
      <Tree @TreeData="getData" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams" :disabled="isDisabled"
          >确定并添加分组</el-button
        >
      </span>

      <!-- 二级弹窗 -->
      <el-dialog
        width="50%"
        title="商品规格参数配置"
        :visible.sync="innerVisible"
        append-to-body
      >
        <span>当前选中的：</span>
        {{ treeData.name }}

        <!-- 添加规格 -->
        <AddCategory />

        <span slot="footer" class="dialog-footer"
          ><el-button type="primary" @click="addCategory" :disabled="isDisabled"
            >确定</el-button
          >
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Tree from '../../../../components/CategoryTree.vue';
import AddCategory from './AddCategory.vue';
export default {
  components: {
    Tree,
    AddCategory,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      isDisabled: true,
      treeData: {},
      categoryData: {
        name: '',
        id: '',
        cid: '',
      },
    };
  },
  methods: {
    //点击添加按钮进行添加规格与包装
    addParams() {
      this.innerVisible = true;
      this.categoryData.name = this.treeData.name;
    },
    getData(val) {
      this.isDisabled = false;
      this.treeData = val;
      //   console.log(this.treeData);
    },
    //二级弹框的添加类目
    addCategory() {},
    //这里是重置二级弹框内容
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
  },
};
</script>

<style></style>
