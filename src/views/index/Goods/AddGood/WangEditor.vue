<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 200px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      this.editorConfig.autoFocus = false;
    },
    onChange(editor) {
      //   console.log("onChange", editor.gettext);
      const html = editor.getHtml();
      // console.log(html);
      this.$emit('descs', html);
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
