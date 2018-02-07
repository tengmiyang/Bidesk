<template>
  <div class="createPost-container">
    <el-form class="form-container" ref="postForm">
        <div style="margin-bottom: 20px;">
          <Upload v-model="file"></Upload>
        </div>
    </el-form>
 <el-button @click="hi" type="primary" plain>主要按钮</el-button>
  </div>
</template>

<script>
import Upload from '@/custom-components/Upload/singleFile'
export default {
  name: 'articleDetail',
  components: {Upload},
  data() {
    return {
      file: {},
    };
  },
  methods: {
    hi() {
        // console.log(this.file)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

