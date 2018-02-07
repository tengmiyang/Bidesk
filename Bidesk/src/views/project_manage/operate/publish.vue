<template>
  <div class="app-container">
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="采购项目名称">
      <el-input v-model="form.coreProject.projectName"></el-input>
    </el-form-item>
    <el-form-item label="采购项目编号">
      <el-input v-model="form.coreProject.projectNum"></el-input>
    </el-form-item>
    <el-form-item label="采购方式">
      <el-select v-model="form.coreProject.projectMethodDicId" placeholder="请选择">
        <el-option v-for="(item,index) in dicList" :label="item.dicName" :value="item.dicId" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="招标类型" style="margin-bottom: 0">
      <el-radio-group v-model="form.coreProject.bidTypeDicId">
        <el-radio v-for="(item,index) in bidTypeList" :label="item.dicId" :key="index">{{item.dicName}}</el-radio>
      </el-radio-group>
    </el-form-item>

    <tabsPublish :resProject="form.coreProject" v-model="allPacks"></tabsPublish>

    <!--无包默认公告组件-->
    <el-row v-if="!allPacks.length">
      <el-col :span="24">
        <el-form-item label="公告名称">
          <el-input v-model="noPackNotice.notice.noticeName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="公告内容">
          <TinyMce v-model="noPackNotice.notice.noticeContent"></TinyMce>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="公告附件">
          <Upload v-model="noPackNotice.notice.fileToken"></Upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="发布媒体">
      <el-button size="small" type='primary' @click="addMedia">添加媒体</el-button>
      <el-checkbox-group v-model="defaultMediaCheckList" @change="mediaListChange">
        <el-checkbox v-for="(media, index) in defaultMediaList" :key="index" :label="media.mediaId"
                     style="margin-left: 0; display: table">
          {{media.mediaName + ':' + media.mediaUrl}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      v-for="(media, index) in form.customMediaList"
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
    <el-row class="pro_submit" style="margin: 1% 0;">
      <el-col align="center" :span="24">
        <el-button @click="back">取 消</el-button>
        <el-button type="primary" @click="submitForm">发 布</el-button>
      </el-col>
    </el-row>
  </el-form>
</div>
  <!--<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">-->
  <!--<span>这是一段信息</span>-->
  <!--<span slot="footer" class="dialog-footer">-->
  <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
  <!--<el-button type="primary" @click="submitForm">确 定</el-button>-->
  <!--</span>-->
  <!--</el-dialog>-->
</template>
<script>
  import {prepareProjectInitPublish, prepareProjectSaveNotice} from '@/api/project'
  import tabsPublish from '@/custom-components/project_manages/tabsPublish'
  import TinyMce from '@/custom-components/Tinymce'
  import Upload from '@/custom-components/Upload/singleFile'

  export default {
    components: {
      tabsPublish,
      Upload,
      TinyMce
    },
    mounted() {
      this.getInitInfo(this.$store.getters.publishProjectId)
    },
    data() {
      return {
        form: {
          coreProject: {
            bidTypeDicId: 0,
            projectId: 0,
            projectMethodDicId: 0,
            projectName: '',
            projectNum: '',
            parentId: 0
          },
          plus: 'false',
          defaultMediaList: [1, 2],
          customMediaList: [],
          noticeList: [],
          packList: []
        },
        allPacks: [],
        noPackNotice: {
          notice: {
            noticeName: '',
            noticeContent: "",
            fileToken: ''
          }
        },
        defaultMediaList: [],
        defaultMediaCheckList: [],
        bidTypeList: [],
        dicList: [],
      };
    },
    methods: {
      back() {
        this.$router.push({name: '项目操作'})
      },
      getInitInfo(id) {
        prepareProjectInitPublish(id).then(response => {
          console.log(response);
          this.form.coreProject = response.data.project
          this.defaultMediaList = response.data.mediaList
          this.bidTypeList = response.data.bidTypeList
          this.dicList = response.data.dicList
          this.noPackNotice.notice.noticeName = this.form.coreProject.projectName + '采购公告'
        })
      },
      mediaListChange() {
        this.form.defaultMediaList = this.defaultMediaCheckList
      },
      removeMedia(index) {
        this.form.customMediaList.splice(index, 1)
      },
      addMedia() {
        this.form.customMediaList.push({
          mediaName: '',
          mediaUrl: ''
        })
        this.plus = true
      },
      submitForm() {
        if (!this.allPacks.length) {
          this.form.noticeList.push(this.noPackNotice)
        } else {
          this.form.noticeList = this.allPacks
          this.form.packList = this.allPacks
        }
        console.log('提交表单内容：', this.form)
        this.$confirm('是否确定发布公告', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          prepareProjectSaveNotice(this.form).then(response => {
            if (response.state) {
              this.$message({
                message: '发布成功！',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/project_manage/execute_project')
              }, 2000)
            } else {
              this.$message({
                message: '提交出错，请检查！',
                type: 'error'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
    }
  };
</script>
<style scoped>
  .handleNonePack .components-container {
    margin: 0;
  }

  .el-row .el-form-item__label {
    padding-right: 1%;
  }

  .el-form-item {
    margin-bottom: 1%;
  }
</style>
