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
        <div>
          <el-button @click="addDomain" class="add">新增域名</el-button>
          <hr />
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(item, index) in dynamicValidateForm.addCategory"
              :label="item.title"
              :key="index"
              :prop="item.value"
              :rules="{
                required: true,
                message: '不能为空',
                trigger: 'blur',
              }"
            >
              <div class="form detail">
                <el-input v-model="item.title"></el-input>
                <el-button @click.prevent="addDetail(index)"
                  >增加详情</el-button
                >
                <el-button @click.prevent="removeDomain(item)">删除</el-button>
              </div>

              <!-- 这里是详情的form -->
              <div>
                <el-form-item
                  v-for="(child, i) in item.children"
                  :label="child.title"
                  :key="i"
                  :prop="child.title"
                  :rules="{
                    required: true,
                    message: '不能为空',
                    trigger: 'blur',
                  }"
                  class="demo-dynamic"
                  label-width="120px"
                >
                  <div class="form">
                    <el-input v-model="child.title"></el-input>
                    <el-button @click.prevent="removeChildDomain(index, i)"
                      >删除</el-button
                    >
                  </div>
                </el-form-item>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer"
          ><el-button
            type="primary"
            @click="submitCategory('dynamicValidateForm', 'treeData')"
            :disabled="isDisabled"
            >提交</el-button
          >
          <el-button @click="cancel">取消</el-button>
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
      dynamicValidateForm: {
        addCategory: [],
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
      console.log(this.treeData);
    },
    //增加参数配置
    addDomain() {
      this.dynamicValidateForm.addCategory.push({
        value: '',
        title: '',
        children: [],
      });
    },
    //增加详情按钮
    addDetail(index) {
      this.dynamicValidateForm.addCategory[index].children.push({
        title: '',
        value: '',
      });
    },
    //删除详情
    removeChildDomain(index, i) {
      // console.log(i, index);
      let one = this.dynamicValidateForm.addCategory[index].children.indexOf[i];
      // console.log('one');
      if (one !== -1) {
        this.dynamicValidateForm.addCategory[index].children.splice(i, 1);
      }
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.addCategory.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.addCategory.splice(index, 1);
      }
    },
    //提交
    submitCategory(dynamicValidateForm) {
      this.$refs[dynamicValidateForm].validate((valid) => {
        if (valid) {
          // console.log(this.dynamicValidateForm.addCategory);   itemCatId, paramData, paramName
          this.$axios
            .insertParams({
              itemCatId: this.treeData.cid,
              paramName: this.treeData.name,
              paramData: JSON.stringify(this.dynamicValidateForm.addCategory),
            })
            .then((res) => {
              // console.log(dynamicValidateForm);
              // console.log(res);
              if (res.data.status === 200) {
                this.$message({
                  message: '恭喜你，添加成功',
                  type: 'success',
                });
                (this.dialogVisible = false), (this.innerVisible = false);
                this.dynamicValidateForm.addCategory = [];
                this.$parent.getParamsInfo(1);
                // this.resetForm();
              } else {
                this.$message({
                  message: '添加出错',
                  type: 'error',
                });
              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancel() {
      this.innerVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  display: flex;
  button {
    margin-left: 0.5rem;
  }
}
.add {
  margin: 0.5rem 0;
}
.demo-dynamic {
  margin: 0.5rem 0;
}
</style>
