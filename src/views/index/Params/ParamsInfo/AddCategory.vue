<template>
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
          <el-button @click.prevent="addDetail(index)">增加详情</el-button>
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
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        addCategory: [],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
