<template>
  <div class="project-container">
    <crumbs :resData="resData" v-if="resData" style="padding: 10px;"></crumbs>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
             class="demo-ruleForm">
      <!--有包显示-->
      <el-form-item v-if="resData.hasMorePack" prop="pack_id_list" label="关联包件：">
        <packCheckedNoBtn @transferIdList="getIdList" @transferEve="getEve" :pack_id_list="pack_id_list"
                          :resPackList="resPackList" :check_list="ruleForm.pack_id_list"></packCheckedNoBtn>
      </el-form-item>
      <el-table :show-header="false" style="margin:2% 0" border :data="tab_data">
        <el-table-column align="center" prop="fristName" label="质疑目录">
        </el-table-column>
        <el-table-column align="center" label="上传附件">
          <template slot-scope="scope">
            <el-form-item prop="fileList">
              <Upload :fileList="ruleForm.fileList" @onUploadSuccess="onUploadSuccess"></Upload>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <el-button type="primary" @click="submitData('ruleForm')">提 交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import Upload from '@/custom-components/Upload/singleFile_back'
  import {USER_FORM, USER_RULES} from '@/store/COMMON_DATA';
  import {expireProjectSurveyInit, expireProjectSurveySave} from '@/api/project'
  import packCheckedNoBtn from '@/custom-components/project_manages/packCheckedNoBtn'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {deepClone} from '@/utils'

  export default {
    components: {
      ElInput,
      Upload,
      crumbs,
      packCheckedNoBtn
    },
    mounted() {
      this.getList()
    },
    computed: {
      packIdList() {
        return this.resData.hasMorePack === false ? [this.resData.packList[0].packId] : this.pack_id_list
      }
    },
    data() {
      return {
        ruleForm: deepClone(USER_FORM),
        rules: USER_RULES,
        promptText: true,
        projectId: this.$store.getters.subProjectId,
        tab_data: [{
          fristName: '上传踏勘澄清文件',
          arrayList: []
        }],
        resData: {},
        resPackList: [],
        hasMorePack: null,
        file_list: {
          recordName: '',
          fileToken: '',
        },
        pack_id_list: []
      }
    },
    methods: {
      getIdList(msg) {
        this.pack_id_list = msg
      },
      // 复选框验证
      getEve(msg) {
        this.ruleForm.pack_id_list = msg
      },
      onUploadSuccess(msg) {
        this.ruleForm.fileList = [msg]
        this.onUploadResule('ruleForm')
        this.file_list.fileToken = msg.response.data
      },
      //      上传验证
      onUploadResule(form) {
        this.$refs[form].validate((valid) => {
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.file_list.fileToken = ''
        this.pack_id_list = []
        this.tab_data[0].arrayList = []
      },
      submitData(ruleForm) {
        if (this.resData.hasMorePack === false) {
          this.ruleForm.pack_id_list = [this.resPackList[0].packId]
        }
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$confirm('提交后不可修改文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              expireProjectSurveySave(this.packIdList, this.file_list.fileToken).then(response => {
                // console.log(response)
                if (response.state === true) {
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  });
                  this.resetForm('ruleForm')
                } else {
                  this.$message({
                    type: 'error',
                    message: '信息提交不完整,提交失败!'
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      getList() {
        expireProjectSurveyInit(this.projectId).then(response => {
          this.resData = response.data
          this.resPackList = this.resData.packList
          // console.log(response)
          this.hasMorePack = this.resData.hasMorePack
          if (this.hasMorePack === false) {
            this.pack_id_list = [this.resPackList[0].packId]
          }
          // console.log(this.packIdList)
        })
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0;
}

  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }

  .el-textarea__inner {
    min-height: 40px;
    height: 40px;
  }

  .el-input__inner {
    border-radius: 0px !important;
  }
.el-form-item__content {
  margin-left: 0;
}
</style>
