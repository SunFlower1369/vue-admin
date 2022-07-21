<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadImage"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="successImage"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <!-- <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div> -->
    </el-upload>
  </div>
</template>

<script>
import base from "../../../../api/base";
export default {
  data() {
    return {
      uploadImage: base.uploadImage,
      fileList: [],
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    successImage(response, file, fileList) {
      // console.log(response, file);
      let image = base.host + "/" + response.url.slice(7);
      this.$emit("uploadImage", image);
      //   console.log(response.url);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>