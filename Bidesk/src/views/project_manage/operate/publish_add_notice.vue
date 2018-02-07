<template>
  <div class="app-container">
    <crumbs :resData="resData" v-if="resData.projectName"></crumbs>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="120px"
             class="demo-ruleForm">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="project-table">
        <el-tab-pane label="详情" name="first">
          <el-row>
            <el-form-item v-if="resData.hasMorePack" prop="pack_id_list" label="请选择包件：">
              <packCheckedNoBtn @transferIdList="getIdList" @transferEve="getEve" @transferName="getNumList"
                                :resPackList="resPackList" :check_list="ruleForm.pack_id_list"
                                :pack_id_list="pack_id_list"
                                :packNameList="packNameList"></packCheckedNoBtn>
            </el-form-item>

            <el-form-item label="公告名称：" prop="noticeName">
              <el-input style="width: 100%" v-model="ruleForm.noticeName"></el-input>
            </el-form-item>
            <el-form-item label="公告内容：" prop="noticeContent">
              <TinyMce v-model="ruleForm.noticeContent"></TinyMce>
            </el-form-item>
            <el-row class="col-upload">
              <el-form-item label="附件：">
                <Upload :fileList="ruleForm.fileList" @onUploadSuccess="onUploadSuccess"></Upload>
              </el-form-item>
            </el-row>
            <el-form-item label="发布媒体">
              <el-button size="small" type='primary' @click="addMedia">添加媒体</el-button>
              <el-checkbox-group v-model="defaultMediaCheckList" @change="mediaListChange">
                <el-checkbox disabled v-for="(media, index) in ruleForm.defaultMediaList" :label="media.mediaId"
                             style="display: block; margin-left: 0" :key="index">
                  {{media.mediaName + ':' + media.mediaUrl}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              v-for="(media, index) in ruleForm.customMediaList"
              :key="index"
              v-show="plus"
              :prop="'customMediaList.'+index+'.mediaUrl'"
              :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
              <el-row>
                <el-col :span="7">
                  <el-input v-model="media.mediaName" placeholder="请输入媒体名称"></el-input>
                </el-col>
                <el-col style="display: list-item;" :span="1"></el-col>
                <el-col :span="7">
                  <el-input v-model="media.mediaUrl" placeholder="请输入媒体地址"></el-input>
                </el-col>
                <el-col style="display: list-item;" :span="1"></el-col>
                <el-col :span="2">
                  <el-button @click.prevent="removeMedia(index)">删除</el-button>
                </el-col>
              </el-row>
            </el-form-item>
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
    <!--弹出框-->
    <el-dialog title="详情" :visible.sync="dialogRelease" width="60%">
      <el-form class="form_style" label-width="100px" label-position="left">
        <el-form-item label="公告名称：">
          <span>{{ruleForm.noticeName}}</span>
        </el-form-item>
        <el-form-item label="公告内容：">
          <div style="border: 1px solid #cacaca; padding: 2%" v-html="ruleForm.noticeContent"></div>
        </el-form-item>
        <el-form-item label="公告附件：">
          <el-button type="text">{{ruleForm.file_name}}</el-button>
        </el-form-item>
        <el-form-item label="采购文件发售截止时间：" label-width="200px">
          <span type="text" style="color: #ff0000;letter-spacing: 5px;font-weight: 700">{{ruleForm.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </el-form-item>
        <el-form-item label="递交响应文件截止时间：" label-width="200px">
          <span type="text" style="color: #ff0000;letter-spacing: 5px;font-weight: 700">{{ruleForm.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <el-checkbox class="box" v-model="default_box" label="是否确定发布补充公告，发布后将无法修改！" name="type"></el-checkbox>
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
  import {executeProjectAddNotice, executeProjectSaveAddNotice} from '@/api/project'
  import {USER_FORM, USER_RULES, DATE_OPTIONS} from '@/store/COMMON_DATA';
  import {deepClone} from '@/utils'
  import associatedAll from '@/custom-components/project_manages/associatedAll';
  import Upload from '@/custom-components/Upload/singleFile_back';
  import crumbs from '@/custom-components/project_manages/crumbs'
  import packCheckedNoBtn from '@/custom-components/project_manages/packCheckedNoBtn'
  import TinyMce from '@/custom-components/Tinymce'

  export default {
    components: {
      TinyMce,
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
        plus: false,
        projectId: this.$store.getters.subProjectId,
        dialogVisible: false,
        dialogVisible1: false,
        dialogRelease: false,
        show_time: false,
        show_time2: false,
        select_index: '',
        resData: {},
        resPackList: [],
        mediaList: [{
          mediaName: "中国采购与招标网",
          mediaUrl: "www.chinabidding.cn",
          mediaId: 1
        }, {
          mediaName: "中国招投标网",
          mediaUrl: "www.infobidding.cn",
          mediaId: 2
        }],
        value: '',
        value1: '',
        sizeForm: {
          region: ''
        },
        activeName2: 'first',
        copyYesterday: null,
        packNameList: [],
        pack_id_list: [],
        defaultMediaCheckList: [1, 2],
        resPackId: 0,
      }
    },
    mounted() {
      this.getList()
      this.ruleForm.defaultMediaList = this.mediaList
    },
    computed: {
      packIdList() {
        return this.resData.hasMorePack === false ? [this.resPackList[0].packId] : this.pack_id_list
      }
    },
    methods: {
      mediaListChange() {
        // this.ruleForm.defaultMediaList = this.defaultMediaCheckList
      },
      removeMedia(index) {
        this.ruleForm.customMediaList.splice(index, 1)
      },
      addMedia() {
        this.ruleForm.customMediaList.push({
          mediaName: '',
          mediaUrl: ''
        })
        this.plus = true
      },
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
        executeProjectSaveAddNotice(this.ruleForm, this.packIdList).then(response => {
          if (response.state === true) {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.resetForm('ruleForm')
            this.$router.push({path: '/'})
            this.$router.push({name: '发布补充公告'})
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
        executeProjectAddNotice(this.projectId).then(response => {
          this.resData = response.data.project
          this.resPackList = response.data.project.packList
          console.log(response)
          if (response.data.pack) {
            this.resPackId = response.data.pack.packId
            console.log(this.resPackId)
          }
          this.ruleForm.noticeName = response.data.project.projectName + '第' + (response.data.addNoticeNum + 1) + '次补充公告'
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.pack_id_list = []
        this.packNameList = []
        this.$set(this.ruleForm, 'noticeContent', '')
        this.ruleForm.fileList = []
        console.log(this.ruleForm)
        // console.log(this.ruleForm)
        // console.log(this.packIdList)
      },
      onSubmit(formName) {
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
  .el-tabs__content {
    padding: 16px;
  }

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

  .procontent th, .procontent td {
    text-align: center;
    border: 0;
    border-bottom: 1px solid #e6ebf5;
    border-right: 1px solid #e6ebf5;
  }

  .procontent table {
    border-right: 0;
    border-bottom: 0;
  }
</style>
<style>
  .box {
    color: #ff0000;
  }
</style>
