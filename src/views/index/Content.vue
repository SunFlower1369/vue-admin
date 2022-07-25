<template>
  <div class="content">
    <div id="header">
      <div style="float: left" @close="handleClose">
        <i
          class="icon el-icon-s-fold"
          @click="change"
          v-if="isCollapse === true"
        ></i>
        <i
          class="icon el-icon-s-unfold"
          @click="change"
          :isCollapse="isCollapse"
          v-else
        ></i>
      </div>

      <div class="gongneng">
        <el-dropdown @command="changeLang">
          <span class="el-dropdown-link lang">
            语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="logout">
          {{ userInfo.username }}
          <i
            class="el-icon-switch-button"
            @click="logout"
            style="margin: 0 10px"
          ></i>
        </div>
      </div>
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["isCollapse"],
  //在首页顶部读取登录的用户名
  computed: {
    ...mapState("Login", ["userInfo"]),
  },
  methods: {
    ...mapMutations("Login", ["clearUser"]),
    change() {
      //修改父组件的数据    注意 父组件中的名字必须和changeCollapse 相同  例如  @changeCollapse = '方法名'
      this.$emit("changeCollapse");
    },
    changeLang(command) {
      this.$i18n.locale = command;
    },
    //退出登录
    logout() {
      console.log("1111");
      //清空vuex
      this.clearUser();
      //清空本地
      localStorage.removeItem("userInfo");
      //返回登陆界面
      this.$router.push("/login");
    },
    handleClose() {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  // background-color: #eee;
  .gongneng {
    display: flex;
    float: right;
    color: #fff;
    .lang {
      color: #fff;
    }
    .logout {
      margin: 0 20px;
    }
  }
}
#header {
  height: 2rem;
  background-color: blue;
  line-height: 2rem;
}
.icon {
  font-size: 24px;
}
</style>