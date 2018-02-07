<template>
  <div class="app-container" v-loading="listLoading" element-loading-text="加载中...">
    <crumbs :resData="projects"></crumbs>
    <el-main style="padding: 0">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="详情" name="first">
          <el-row>
            <el-col :span="24">
              <div v-if="showPacklist">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="关联包件：" prop="type">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox name="type" v-for="(name, index) in packLists" :key="index"
                                   @change.native="checkboxdata(name)" :label="'第'+name.packNum+'包'">
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>

            <el-col :span="24">
              <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="公告名称：" prop="noticeContent">
                  <el-input v-model="form.notice.noticeName+'延期公告'"></el-input>
                </el-form-item>
              </el-form>
            </el-col>

            <el-col :span="24">
              <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="公告内容：" prop="noticeName">
                  <TinyMce :height=250 style="margin-bottom:2%;" v-model="form.notice.noticeContent"></TinyMce>
                </el-form-item>
                <el-form-item label="公告附件：">
                  <Upload @onUploadSuccess="onUploadSuccess" :fileList="fileList"></Upload>
                </el-form-item>
              </el-form>
            </el-col>

            <el-col :span="24">
              <el-form :model="ruleFormsaleEndTime" :rules="rules" ref="ruleFormsaleEndTime" class="demo-ruleForm">
                <el-form-item label="采购文件发售截止时间：" prop="resource">
                  <el-radio-group v-model="ruleFormsaleEndTime.resource">
                    <el-radio label="另行通知" @change="FurtherNotice"></el-radio>
                    <el-radio label="截止至递交响应文件的前一天" @change="beforeEndtime"></el-radio>
                    <el-radio label="具体时间" @change="SpecificTime"></el-radio>
                    <el-date-picker v-model="form.notice.saleEndTime" type="datetime" placeholder="选择日期时间"
                                    ref="datePickers" :picker-options="DATE_OPTIONS"
                                    v-show="radiosaleEndTime"></el-date-picker>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </el-col>

            <el-col :span="24">
              <el-form :model="ruleFormsubmitEndTime" :rules="rules" ref="ruleFormsubmitEndTime"
                       class="demo-ruleForm">
                <el-form-item label="递交响应文件截止时间：" prop="resource">
                  <el-radio-group v-model="ruleFormsubmitEndTime.resource">
                    <el-radio label="另行通知" @change="FurtherNoticeSubmit"></el-radio>
                    <el-radio label="具体时间" @change="SpecificTimeSubmit"></el-radio>
                    <el-date-picker v-model="form.notice.submitEndTime" type="datetime" placeholder="选择日期时间"
                                    ref="datePicker" :picker-options="DATE_OPTIONS"
                                    @change="changeTime" v-show="radiosubmitEndTime"></el-date-picker>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </el-col>

            <el-col :span="24">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item style="text-align: center;">
                  <el-button type="primary" @click.native="Release">发 &nbsp&nbsp&nbsp 布</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="邮件来往" name="fourth">
          <associatedAll></associatedAll>
        </el-tab-pane>
      </el-tabs>
    </el-main>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-row style="border: 1px solid #e6ebf5; padding:2%">
        <el-col align="center" :xs="24" :sm="20" :md="24" :lg="24"><h3>{{form.notice.noticeName}}&nbsp;&nbsp;第{{addNoticeNum}}次补充公告</h3>
        </el-col>
        <el-col align="center" :xs="24" :sm="20" :md="24" :lg="24"></el-col>
        <el-col style="padding-right: 5%" align="right" :xs="24" :sm="20" :md="24" :lg="24">
          <span></span></el-col>
        <el-col :xs="24" :sm="20" :md="24" :lg="24">
          <div v-html="form.notice.noticeContent"></div>
        </el-col>
      </el-row>
      <el-row style="border: 1px solid #e6ebf5; padding:2%; margin-top:1% ">
        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>公告附件</span></el-col>
          <el-col :xs="24" :sm="20" :md="18" :lg="18">
            <span>{{EnclosureName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>采购文件发售截止时间</span></el-col>
          <el-col style="font-size:14px; padding:12px 0;color: #ff0000;letter-spacing: 5px;font-weight: 700" :xs="24" :sm="20" :md="18" :lg="18">
            <span v-if="showSaleEndTime">{{form.notice.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            <span v-else>另行通知</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>递交响应文件截止时间</span></el-col>
          <el-col style="font-size:14px; padding:12px 0;color: #ff0000;letter-spacing: 5px;font-weight: 700" :xs="24" :sm="20" :md="18" :lg="18">
            <span v-if="showSubmitEndTime">{{form.notice.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            <span v-else>另行通知</span>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-checkbox name="type" v-model="submitchecked"><span :disabled="!submitchecked" style="color: #FF0000">是否确认发布延期公告,发布后将不可修改！</span>
        </el-checkbox>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关 闭</el-button>
    <el-button type="primary" @click="AddNotice" :disabled="!submitchecked">确定发布</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import TinyMce from '@/custom-components/Tinymce'
  import Upload from '@/custom-components/Upload/singleFile'
  import associatedAll from '@/custom-components/project_manages/associatedAll';
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {expireAddNotice, executeProjectSaveAddNotice} from '@/api/project'
  import {DATE_OPTIONS} from '@/store/COMMON_DATA'

  export default {
    components: {TinyMce, Upload, associatedAll, crumbs},
    mounted() {
      this.getList();
    },
    data() {
      return {
        DATE_OPTIONS,
        projectId: this.$store.getters.subProjectId,
        showPacklist: true,
        listLoading: false,
        packLists: [],
        addNoticeNum: 0,
        projects: {},
        form: {
          notice: {
            fileToken: '',
            noticeContent: '',
            noticeName: '',
            saleEndTime: '',
            submitEndTime: '',
          },
          packIdList: [],
        },
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        submitchecked: false,
        showSaleEndTime: true,
        showSubmitEndTime: true,
        checkList: [],
        radiosaleEndTime: false,
        radiosubmitEndTime: false,
        EnclosureName: '',
        defaults: `<p>123123213</p>`,
        value1: '',
        value2: '',
        ruleForm: {
          name: ""
        },
        ruleFormsaleEndTime: {
          resource: '',
        },
        ruleFormsubmitEndTime: {
          resource: '',
        },
        tableData3: [{
          date: '2016-05-02',
        }],
        activeName2: 'first',
        formInline: {
          user: '',
          region: ''
        },
        rules: {
          type: [
            {type: 'array', required: true, message: '请至少选择一个包件', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
          noticeName: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          noticeContent: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 3, max: 1000, message: '长度在 3 到 1000 个字符', trigger: 'blur'}
          ]
        },
        fileList: []
      }
    },
    methods: {
      getList() {
        // console.log(this.projectId);
        this.listLoading = true;
        expireAddNotice(this.projectId).then(response => {
          // console.log(response);
          if (response.state === true) {
            this.projects = response.data.project;
            this.showPacklist = response.data.project.hasMorePack;
            this.addNoticeNum = response.data.addNoticeNum + 1;
            if (this.showPacklist === false) {
              this.packLists = response.data.pack;
            }
            else {
              this.packLists = response.data.project.packList;
            }
            this.ruleForm.name = this.projects.projectName;
            this.form.notice.noticeName = this.ruleForm.name
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 2000);
          this.listLoading = false
        })
      },
//      上传页面
      AddNotice() {
        if (this.submitchecked === true) {
          this.dialogVisible = false
          executeProjectSaveAddNotice(this.form).then(response => {
            if (response.state === true) {
              this.$message({
                message: '延期成功',
                type: 'success'
              });
              this.fileList = []
              this.$router.push({path: '/'})
              this.$router.push({name: '延期'})
            }
            else {
              this.$message.error('延期失败，请重试');
            }
          })
        }
        else {
          this.$message({
            message: '请先勾选是否发布复选框',
            type: 'warning'
          });
        }
      },
//      前一天
      beforeEndtime() {
        if (this.form.notice.submitEndTime.length === 0) {
          this.$message({
            message: '请先选择具体的递交截止时间',
            type: 'warning'
          })
          this.radiosaleEndTime = false;
          this.ruleFormsaleEndTime.resource = ""
        }
        else {
          this.radiosaleEndTime = false;      //控制时间选择框的弹出
          this.showSaleEndTime = true         //控制在提示详情页面中时间信息的显示（另行通知）
          this.form.notice.saleEndTime = this.form.notice.submitEndTime - 86400000;
        }
      },
//      显示选择具体时间框
      SpecificTime() {
        this.radiosaleEndTime = true;
        this.showSaleEndTime = true
        this.$nextTick(() => {
          this.$refs.datePickers.focus()
        })
      },
//      另行通知
      FurtherNotice() {
        this.radiosaleEndTime = false;
        this.form.notice.saleEndTime = ''
        this.showSaleEndTime = false
        this.ruleFormsubmitEndTime.resource = "另行通知"
        this.FurtherNoticeSubmit()
      },
//      递交响应文件截止时间
      FurtherNoticeSubmit() {
        this.radiosubmitEndTime = false;
        this.form.notice.submitEndTime = ''
        this.showSubmitEndTime = false
      },
      SpecificTimeSubmit() {
        this.radiosubmitEndTime = true;
        this.showSubmitEndTime = true
        this.$nextTick(() => {
          this.$refs.datePicker.focus()
        })
      },
//      提交跳转页面
      Release() {
        if (this.showPacklist === false && this.form.packIdList.length === 0) {
          this.form.packIdList.push(this.packLists.packId)
        }
        else {
          for (let i = 0; i < this.form.packIdList.length; i++) {
            for (let j = 0; j < this.packLists.length; j++) {
              if (parseInt(this.form.packIdList[i]) === parseInt(this.packLists[j].packNum)) {
                this.form.packIdList.splice(i, 1, this.packLists[j].packId)
              }
            }
          }
        }
        if (this.form.notice.submitEndTime === '' && this.ruleFormsubmitEndTime.resource === "") {
          this.dialogVisible = false
          this.$message({
            message: '请选择采购文件发售截止时间',
            type: 'warning'
          });
        }
        else if (this.form.notice.saleEndTime === '' && this.ruleFormsubmitEndTime.resource === "") {
          this.dialogVisible = false
          this.$message({
            message: '请选择递交响应文件截止时间',
            type: 'warning'
          });
        }
        else if ((this.form.notice.submitEndTime < this.form.notice.saleEndTime) && this.ruleFormsubmitEndTime.resource !== "另行通知") {
          this.dialogVisible = false
          this.$message({
            message: '采购文件发售截止时间不得晚于递交响应文件截止时间，请重新选择',
            type: 'warning'
          });
        }
        else {
          if (this.form.notice.noticeContent.length === 0) {
            this.$message({
              message: '请编辑补充公告内容',
              type: 'warning'
            });
          }
          else if (this.form.packIdList.length === 0) {
            this.$message({
              message: '请选择包件',
              type: 'warning'
            });
          }
          else {
            this.dialogVisible = true
          }
        }
      },
      cancelRelease() {
        // console.log(this.form.notice.submitEndTime)
        // console.log(this.form.notice.saleEndTime)
      },
      checkboxdata(checked) {
        this.form.packIdList = []
        for (let i = 0; i < this.checkList.length; i++) {
          const arr = [...this.checkList]
          this.form.packIdList.push(arr[i].substring(1, arr[i].length - 1))
        }
      },
      focuss() {
        alert("1")
//        this.radiosubmitEndTime=true
      },
      onUploadSuccess(msg) {
        // console.log(msg)
        this.EnclosureName = msg.name
        this.form.notice.annexToken = msg.response.data
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      changeTime() {
//        if (this.form.notice.saleEndTime !== null) {
//          this.form.notice.saleEndTime = this.form.notice.submitEndTime - 86400000;
//        }
      },
    }
  }
</script>

<style scoped>
  span[disabled] {
    color: #c0c4cc;
    opacity: 1
  }

  .el-form-item {
    margin-bottom: 2%;
  }

  /*.el-form-item__content {*/
  /*margin-left: 100px!important;*/
  /*}*/
  .el-form-item[data-v-0e34736b] {
    margin-bottom: 0%;
  }

  .notice {
    margin-bottom: 1%;
  }
</style>

<style>
  #mceu_23 {
    float: left;
  }
</style>
