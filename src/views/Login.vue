<template>
  <div>
    <div id="login">
      <h3 class="title">登录管理系统</h3>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//解码  传过来的是token
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // ...mapMutations('这里是模块名字',['这里是方法名']),模块名在vuex modules中   方法名在相应模块名中
    ...mapMutations("Login", ["setUser"]),

    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          let { username, password } = this.loginForm;
          this.$axios.login({ username, password }).then((res) => {
            if (res.data.status === 200) {
              console.log(res.data);
              //既然成功了 下面进行的步骤  1  储存信息（持久化  vuex）   2 进行跳转  3 首页上方进行显示
              let login = {
                username: username,
                token: res.data.token,
              };
              // console.log(login);
              this.setUser(login);
              //储存到本地 就是vuex中     这里存了之后      setItem后还需要在main中读取token要不然会拦截
              localStorage.setItem("userInfo", JSON.stringify(login));
              //跳转
              this.$router.push("/home");
            } else {
              this.$message.error("账号或者密码错误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 400px;
  height: 300px;
  margin: 150px auto;
  border: 1px solid #eee;
  padding: 20px;
  .title {
    margin: 20px auto;
    text-align: center;
  }
  button {
    width: 45%;
  }
}
</style>