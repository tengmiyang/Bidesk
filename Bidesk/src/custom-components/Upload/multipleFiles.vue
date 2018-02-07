<template>
  <div>
    <el-upload
      class="upload"
      action="http://106.14.63.3/BideskNew/AnnexController/api/upload.htm"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      multiple
      :limit="20"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">单文件大小限制100M以内</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val) //这个非常重要，通过emit一个input事件来更新组件引用时v-model数据
      },
      handleSuccess(response, file, fileList) {
        this.emitInput(fileList)
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeUpload(file) {
        const isEXE = file.type === 'application/x-msdownload';
        const isLt150M = file.size / 1024 / 1024 < 150;
        if (isEXE) {
          this.$message.error('不能上传 EXE 格式!');
        }
        if (!isLt150M) {
          this.$message.error('单个文件大小不能超过 150MB!');
        }
        return !isEXE && isLt150M;
      },
    }
  }
</script>

<style scoped>

</style>
