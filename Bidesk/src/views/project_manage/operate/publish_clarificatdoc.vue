<template>
  <div class="project-container">

    <crumbs :resData="resData" v-if="resData.projectName"></crumbs>

    <el-main style="padding: 0 0px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left"
               class="demo-ruleForm">


        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="clarificatdoc">
          <el-tab-pane label="详情" name="first">
            <el-row>
              <el-form-item v-if="resData.hasMorePack" prop="pack_id_list" label="请选择包件：">
                <packCheckedNoBtn @transferIdList="getIdList" @transferEve="getEve" @transferName="getNumList"
                                  :resPackList="resPackList" :check_list="ruleForm.pack_id_list"
                                  :pack_id_list="pack_id_list"
                                  :packNameList="packNameList"></packCheckedNoBtn>
              </el-form-item>

              <el-col v-show="resData.packList > 0" :span="24">
                <el-form-item label="关联包件：" prop="type">
                  <el-checkbox v-for="(item, index) in resData.packList" :key="index" :label="'第'+(index+1)+'包'"
                               @change="selectBox(index)"
                               name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-row class="col-upload">
                <el-form-item label="附件：" prop="fileList">
                  <Upload :fileList="ruleForm.fileList" @onUploadSuccess="onUploadSuccess"></Upload>
                </el-form-item>
              </el-row>
              <!--采购文件时间-->
              <el-col style="display: -webkit-box" :span="24">
                <el-form-item label-width="200px" label="采购文件发售截止时间：" prop="select_radio">
                  <el-radio-group @change="SpecificTime" v-model="ruleForm.select_radio">
                    <el-radio label="1">另行通知</el-radio>
                    <el-radio label="2">截止至递交响应文件的前一天</el-radio>
                    <el-radio label="3">具体时间</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label-width="20px" v-if="ruleForm.select_radio === '3'"
                              prop="saleEndTime">
                  <el-date-picker v-model="ruleForm.saleEndTime" ref="datePickers" type="datetime"
                                  placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
              <!--递交文件时间-->
              <el-col style="display: -webkit-box" :span="24">
                <el-form-item label-width="200px" label="递交响应文件截止时间：" prop="select_radio_end">
                  <el-radio-group @change="SpecificTime" v-model="ruleForm.select_radio_end">
                    <el-radio label="1">另行通知</el-radio>
                    <el-radio label="2">具体时间</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label-width="20px" v-if="ruleForm.select_radio_end === '2'" prop="submitEndTime">
                  <el-date-picker @change="selectData"
                                  ref="datePickers"
                                  v-model="ruleForm.submitEndTime"
                                  type="datetime"
                                  placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="邮件来往" name="fourth">
            <associatedAll></associatedAll>
          </el-tab-pane>
        </el-tabs>


        <el-row style="text-align: center;margin-top: 3%;">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
        </el-row>
      </el-form>
    </el-main>
    <!--弹出框-->
    <el-dialog title="详情" :visible.sync="dialogRelease" width="60%">
      <el-row class="procontent">
        <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5" style="width: 100%">
          <tbody>
          <tr v-if="resData.hasMorePack">
            <th>包号</th>
            <td v-if="packNameList.length === 1">第<span v-for="(item, index) in packNameList" :key="index">
                  {{item}}
                </span>包
            </td>
            <td v-else>第<span v-for="(item, index) in packNameList" :key="index">
              {{item}}<span v-show="index < packNameList.length - 1">,</span>
                </span>包
            </td>
          </tr>
          <!--<tr v-else>-->
          <!--<th>包号</th>-->
          <!--<td><span>无包件</span></td>-->
          <!--</tr>-->
          <tr>
            <th>回复文件</th>
            <td><span>{{ruleForm.file_name}}</span></td>
          </tr>
          <tr v-if="ruleForm.select_radio === '2'">
            <th>采购文件发售截止时间</th>
            <td style="color: #ff0000;letter-spacing: 5px;font-weight: 700"><span>{{copyYesterday | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></td>
          </tr>
          <tr v-else>
            <th>采购文件发售截止时间</th>
            <td style="color: #ff0000;letter-spacing: 5px;font-weight: 700"><span>{{ruleForm.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></td>
          </tr>
          <tr>
            <th>递交响应文件截止时间</th>
            <td style="color: #ff0000;letter-spacing: 5px;font-weight: 700"><span>{{ruleForm.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></td>
          </tr>
          </tbody>
        </table>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox class="box" v-model="default_box" label="是否上传澄清答疑回复文件,上传后将无法修改！" name="type"></el-checkbox>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogRelease = false, default_box = false">关 闭</el-button>
            <el-button :disabled="!default_box" type="primary" @click="submitForm">确定提交</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import {executeProjectQa, executeProjectSaveQa} from '@/api/project';
  import {USER_FORM, USER_RULES, DATE_OPTIONS} from '@/store/COMMON_DATA';
  import {deepClone} from '@/utils'
  import associatedAll from '@/custom-components/project_manages/associatedAll';
  import Upload from '@/custom-components/Upload/singleFile_back';
  import crumbs from '@/custom-components/project_manages/crumbs'
  import packCheckedNoBtn from '@/custom-components/project_manages/packCheckedNoBtn'

  export default {
    components: {
      Upload,
      associatedAll,
      crumbs,
      packCheckedNoBtn
    },
    data() {
      return {
        ruleForm: deepClone(USER_FORM),
        rules: USER_RULES,
        default_box: false,
        projectId: this.$store.getters.subProjectId,
        dialogVisible: false,
        dialogVisible1: false,
        dialogRelease: false,
        show_time: false,
        show_time2: false,
        select_index: '',
        resData: {},
        resPackList: [],
        value: '',
        value1: '',
        sizeForm: {
          region: ''
        },
        activeName2: 'first',
        copyYesterday: null,
        packNameList: [],
        pack_id_list: []
      }
    },
    mounted() {
      this.getList()
    },
    computed: {
      packIdList() {
        return this.resData.hasMorePack === false ? [this.resPackList[0].packId] : this.pack_id_list
      }
    },
    methods: {
      //      显示选择具体时间框
      SpecificTime() {
        if (this.ruleForm.select_radio === '3' || this.ruleForm.select_radio_end === '2') {
          this.$nextTick(() => {
            this.$refs.datePickers.focus()
          })
        }
      },
      selectData(val) {
        this.copyYesterday = new Date();
        this.copyYesterday.setTime(val.getTime());
        this.copyYesterday.setTime(this.copyYesterday.getTime() - 3600 * 1000 * 24);
//        // console.log(Date(data))
      },
//      //      上传验证
//      onUploadResule(form) {
//        this.$refs[form].validate((valid) => {
//        });
//      },
      //      上传验证
      onUploadSuccess(msg) {
        this.ruleForm.fileToken = msg.response.data
        this.ruleForm.file_name = msg.name
//        赋值必须在父组件赋值不然监听不到表单验证
        this.ruleForm.fileList = [msg]
//        this.onUploadResule('ruleForm')
      },
      getIdList(msg) {
        this.pack_id_list = msg
      },
      getEve(msg) {
        this.ruleForm.pack_id_list = msg
      },
      getNumList(msg) {
        this.packNameList = msg
      },
      submitForm() {
        this.default_box = false
        this.dialogRelease = false
        // console.log(this.packIdList)
        executeProjectSaveQa(this.ruleForm, this.packIdList).then(response => {
          if (response.state === true) {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.resetForm('ruleForm')
          } else {
            this.$message({
              message: '错误',
              type: 'error'
            });
          }
          // console.log(response.state)
        })

      },
      selectBox(index) {
        this.select_index = index
        const selectPackList = this.resData.packList[index].packId
        this.packIdList.push(selectPackList)
      },
      getList() {
        executeProjectQa(this.projectId).then(response => {
          this.resData = response.data
          this.resPackList = response.data.packList
          // console.log(response)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.pack_id_list = []
        this.packNameList = []
        // console.log(this.ruleForm)
        // console.log(this.packIdList)
      },
      onSubmit(formName) {
        // console.log(this.ruleForm)
        // console.log(this.packIdList)
        // console.log(this.packNameList)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogRelease = true
          }
        });
        if (this.ruleForm.select_radio === '2') {
          this.ruleForm.saleEndTime = this.copyYesterday
        }
      },
      handleClick(tab, event) {
      },
      handlePreview(file) {
      },
    }
  }
</script>

<style scoped>
  .col-upload .upload {

    padding-top: 0;
  }

  .el-button + .el-button {
    margin-left: 11px;
  }

  .upload .el-upload__tip {
    display: inline !important;
    margin-left: 2% !important;
  }
.procontent th {
  width: 30%;
}
  .procontent th, .procontent td {
    text-align: center;
    border: 0;
    border-bottom: 1px solid #e6ebf5;
    border-right: 1px solid #e6ebf5;
  }

  .procontent table {
    line-height: 36px;
    border-right: 0;
    border-bottom: 0;
  }
</style>
<style>
  .box {
    color: #ff0000;
  }

  /*.clarificatdoc .el-tabs__content {*/
  /*min-height: 300px;*/
  /*height: 300px;*/
  /*}*/
</style>
