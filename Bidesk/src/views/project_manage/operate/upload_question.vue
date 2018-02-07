<template>
  <div class="project-container">
    <crumbs :resData="resData.project" v-if="resData.project"></crumbs>


    <el-tabs type="border-card">
      <el-tab-pane label="文件上传">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <!--复选框-->
          <el-form-item v-if="resHasMorePack" prop="pack_id_list" label="关联包件：">
            <packCheckedNoBtn @transferIdList="getIdList" @transferEve="getEve" :pack_id_list="pack_id_list"
                              :resPackList="resPackList" :check_list="ruleForm.pack_id_list"></packCheckedNoBtn>
          </el-form-item>

          <!--<el-form-item v-if="resHasMorePack" prop="pack_id_list" label="关联包件：">-->
          <!--<packCheckedNoBtn @transferIdList="getIdList" @transferEve="getEve" :pack_id_list="pack_id_list"-->
          <!--:resPackList="resPackList" :check_list="ruleForm.pack_id_list"></packCheckedNoBtn>-->
          <!--</el-form-item>-->
          <!--默认全部-->
          <el-table :show-header="false" style="margin-top: 2%; border-bottom-width: 0px" border :data="recordList1">
            <el-table-column align="center" prop="recordName" label="质疑目录">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-input v-model="ruleForm.annexName"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <el-table :show-header="false" border style="border-top-width: 0px" :data="resData.processList">
            <el-table-column align="center" prop="dicName" label="质疑目录">
            </el-table-column>
            <el-table-column align="center" label="上传附件">
              <template slot-scope="scope">
                <Upload :fileList="ruleForm.fileList" :arrayList="scope.row.arrayList"
                        @UploadClick="UploadClick(scope.$index, scope.row)"
                        @onUploadSuccess="onUploadSuccess"
                        @onUploadRemove="onUploadRemove(scope.row)"
                ></Upload>
              </template>
            </el-table-column>
          </el-table>

          <el-form-item style="text-align: center; margin-top: 2%">
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>

          <!--<el-button type="primary" @click="submitData">提交</el-button>-->
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="邮件来往">
        <el-row>
            <el-col style="text-align: right;margin-bottom: 1%">
              <el-button @click="dialogVisible2 = true" type="primary">关联邮件</el-button>
              <el-button @click="dialogVisible3 = true" type="primary">手动添加采购人发来的邮件</el-button>
            </el-col>
            <el-table :data="tableData" border style="width: 100%;">
              <el-table-column type="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="theme" label="主题" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="theSender" label="发件人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="addressee" label="收件人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="data" label="时间" min-width="50" align="center">
              </el-table-column>
              <el-table-column label="操作" min-width="50" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">取消关联</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-button type="primary" style="margin: 2% 47%;">提交</el-button>
      </el-tab-pane>
    </el-tabs>

     <!--关联邮件-->
      <el-dialog title="详情" :visible.sync="dialogVisible2" width="90%">
        <associatedMail></associatedMail>
      </el-dialog>
      <!--添加邮件-->
      <el-dialog title="补录" :visible.sync="dialogVisible3" width="50%">
        <addMail></addMail>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
      </span>
      </el-dialog>
  </div>
</template>
<script>
  import Upload from '@/custom-components/Upload/singleFile'
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {USER_FORM, USER_RULES} from '@/store/COMMON_DATA';
  import packCheckedNoBtn from '@/custom-components/project_manages/packCheckedNoBtn'
  // import packCheckedNoBtn from '@/custom-components/project_manages/packCheckedNoBtn'
  import {expireProjectQuestionInit, expireProjectQuestionSave} from '@/api/project'
  // import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import {deepClone} from '@/utils'
  import associatedMail from '@/custom-components/project_manages/associatedMail';
  import addMail from '@/custom-components/project_manages/addMail';
  export default {
    components: {
      // ElInput,
      Upload,
      packCheckedNoBtn,
      associatedMail,
      addMail,
      // packCheckedNoBtn,
      crumbs
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        ruleForm: USER_FORM,
        rules: USER_RULES,
        dialogVisible: false,
        projectId: this.$store.getters.subProjectId,
        resData: {},
        packList: [],
        resPackList: [],
        resHasMorePack: null,
        fileBtnShow: null,
        select_index: 0,
        pack_id_list: [],
        uploadRow: {},
        response: null,
        dialogVisible2:false,
        dialogVisible3:false,
        file_list: {
          recordName: '',
          fileToken: '',
        },
        recordList1: [{
          recordName: "质疑单位",
          annexName: "",
        }],
        recordList: [{
          recordName: "质疑单位",
          annexName: "",
        }],
      }
    },
    computed: {
      packIdList() {
        return this.resHasMorePack ? this.pack_id_list : [this.resPackList[0].packId]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.recordList[0].annexName = this.ruleForm.annexName
            this.$confirm('此操作将不可修改, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              expireProjectQuestionSave(this.packIdList, this.recordList).then(response => {
                // console.log(response)
                if (response.state === true) {
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: '提交失败'
                  });
                }
                this.resetForm('ruleForm')
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交'
              });
            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.pack_id_list = []
        this.ruleForm.fileList = []
        this.ruleForm.annexName = ''
        for (let i = 0; i < this.recordList.length; i++) {
          this.recordList[i].fileToken = ''
        }
        for (let i = 0; i < this.resData.processList.length; i++) {
          this.resData.processList[i].arrayList = []
        }
      },
      getIdList(msg) {
        this.pack_id_list = msg
      },
      // 复选框验证
      getEve(msg) {
        this.ruleForm.pack_id_list = msg
      },
      UploadClick(index, row) {
        this.select_index = index
        this.uploadRow = row
      },
      onUploadRemove(row){
        row.fileToken = ''
      },
      onUploadSuccess(msg) {
        this.recordList[this.select_index + 1].fileToken = msg.response.data
      },
      getList() {
        expireProjectQuestionInit(this.projectId).then(response => {
          this.resData = response.data
          this.resPackList = response.data.project.packList
          this.resHasMorePack = response.data.project.hasMorePack
          this.packList = this.resData.project.packList
          this.resData.processList.splice(0, 1)
          this.resData.processList.forEach((item, index) => {
            item.arrayList = []
            const obj = {'recordName': item.dicName, 'fileToken': ''}
            this.recordList.push(obj)
          })
          console.log(response)
        })
      }
    }
  }
</script>
<style>
  /*.el-form-item__content {*/
    /*margin-left: 0px !important;*/

</style>
<style scoped>

  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  /*.app-container[data-v-e572eca2] {*/

  /*padding-top: 20px;*/
  /*}*/

  /*.app-container {*/
  /*padding: 0 20px;*/
  /*}*/

  /*.el-form-item {*/
  /*margin-bottom: 0px;*/
  /*}*/

  /*.el-form-item__content {*/
  /*margin: 22px 0!important;*/
  /*}*/
</style>
<style>
</style>
