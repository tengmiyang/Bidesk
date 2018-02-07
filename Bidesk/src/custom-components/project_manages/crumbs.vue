<template>
  <div style="margin:1% 0">
    <el-row v-if="resData.projectDetail">
      <el-col :span="15" :md="13" :lg="14" :xl="15" style="border:1px solid #e6ebf5;">
        <el-col :span="3" style="background-color: #f5f7fa;text-align: center">
          <span>项目名称</span>
        </el-col>
        <el-col :span="20" style="border-left:1px solid #e6ebf5; ">
          <p style="margin: 0;margin-left:1%;line-height: 40px;color: #5a5e66;font-size: 0.87em">
            {{resData.projectDetail[0].pro_name}}
          </p>
        </el-col>
      </el-col>
      <el-col :span="8" :md="7" :lg="7" :xl="8" style="border:1px solid #e6ebf5;margin-left: 42px">
        <el-col :span="6" style="background-color: #f5f7fa;text-align: center">
          <span>项目编号</span>
        </el-col>
        <el-col :span="18" style="border-left:1px solid #e6ebf5; ">
          <p style="margin: 0;margin-left:1%;line-height: 40px;color: #5a5e66;font-size: 0.87em">
            {{resData.projectDetail[0].pro_num}}
          </p>
        </el-col>
      </el-col>
    </el-row>

    <el-row v-else>
      <el-col :span="15" :md="13" :lg="14" :xl="15" style="border:1px solid #e6ebf5;">
        <el-col :span="3" style="background-color: #f5f7fa;text-align: center">
          <span>项目名称</span>
        </el-col>
        <el-col :span="20" style="border-left:1px solid #e6ebf5; ">
          <p style="margin: 0;margin-left:1%;line-height: 40px;color: #5a5e66;font-size: 0.87em">
            {{resData.projectName}}
          </p>
        </el-col>
      </el-col>
      <el-col :span="8" :md="7" :lg="7" :xl="8" style="border:1px solid #e6ebf5;margin-left: 42px">
        <el-col :span="6" style="background-color: #f5f7fa;text-align: center">
          <span>项目编号</span>
        </el-col>
        <el-col :span="18" style="border-left:1px solid #e6ebf5; ">
          <p style="margin: 0;margin-left:1%;line-height: 40px;color: #5a5e66;font-size: 0.87em">
            {{resData.projectNum}}
          </p>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: ['resData'],
    mounted(){
      // console.log(this.resData)
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="css">
  .el-input.is-disabled .el-input__inner {
    padding: 0px;
    text-align: center;
  }

</style>
<style scoped>
  .el-row span {
    text-align: center;
    font-size: 14px;
    color: #5a5e66;
    font-weight: 700;
    line-height: 40px;
  }
</style>
