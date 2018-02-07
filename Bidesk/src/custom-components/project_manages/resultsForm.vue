<template>
  <div style="padding: 1% 25% 0 0;">
    <el-row>
      <!--已提交过-->
      <el-row v-if="noticeVO.notice !== null && !input_form">
        <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
               style="width: 100%;line-height: 40px;">
          <tbody>
          <tr>
            <th>发布媒体</th>
            <td>
              <el-button type="text" @click="handleMedia"
                         v-for="(item, index) in noticeVO.mediaList"
                         :key="index">{{item.media.mediaName + '(' + item.media.mediaUrl + ')' + ','}}
              </el-button>
            </td>
          </tr>
          <tr>
            <th>公告附件</th>
            <td>
              <span>{{noticeVO.notice.annexName}}</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div>
          <h3 style="text-align:center">{{noticeVO.notice.noticeName}}</h3>
          <div v-html="noticeVO.notice.noticeContent"></div>
        </div>
        <el-col style="text-align:center;margin-top: 2%">
          <el-button type="primary" @click="input_form = true">重新发布采购结果公告</el-button>
        </el-col>
      </el-row>
      <!--继续发布新信息-->
      <el-form v-else class="form_style"
               label-width="160">
        <el-form-item label="公告名称：" style="margin-bottom: 20px">
          <el-input v-model="default_form.noticeName"></el-input>
        </el-form-item>
        <el-form-item label="公告内容：">
          <tinyMce v-model="default_form.noticeContent"></tinyMce>
        </el-form-item>
        <el-form-item label="公告附件：">
          <Upload :fileList="fileList" @onUploadSuccess="onUploadSuccess"></Upload>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button @click="resetObj">返 回</el-button>
          <el-button type="primary" @click="handleNotarize">发 布</el-button>
        </el-form-item>
      </el-form>

      <!--详情框-->
      <el-dialog title="详情" :visible.sync="dialogVisible" width="65%">
        <el-form class="form_style" label-width="160" style="margin-left: 5%;">
          <el-form-item label="公告名称：">
            <span>{{default_form.noticeName}}</span>
          </el-form-item>
          <el-form-item label="公告内容：">
            <div style="border: 1px solid #cacaca; padding: 2%" v-html="default_form.noticeContent"></div>
          </el-form-item>
          <el-form-item label="公告附件：">
            <el-button type="text">{{file_name}}</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-checkbox v-model="checkShow"><span style="color: #FF0000;">是否确认发布采购结果公告，发布后将不可修改！</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false, checkShow=false">关 闭</el-button>-->
          <el-button :disabled="!checkShow" type="primary" @click="submitForm">确定发布</el-button>
      </span>
      </el-dialog>

      <!--媒体弹框-->
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="80%">
        <img :src="MediaImages" style="width: 100%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import tinyMce from '@/custom-components/Tinymce'
  import Upload from '@/custom-components/Upload/singleFile'
  import MediaImages from '@/assets/MediaImages/MediaImages.png'
  import {expireResultNoticeInit, expireResultNoticeSave} from '@/api/project'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {
      ElButton,
      Upload,
      tinyMce
    },
    props: ['resData'],
    data() {
      return {
        MediaImages,
        input_form: false,
        file_name: '',
        toggle_row: false,
        fileList: [],
        checkShow: false,
        dialogVisible1: false,
        noticeVO: this.resData.packList[0].noticeVO,
        dialogVisible: false,
        packIdList: [this.resData.packList[0].packId],
        default_form: {
          fileToken: '',
          noticeContent: '',
          noticeName: this.resData.projectName + '采购结果公告',
        },
      }
    },
    mounted() {
      // console.log(this.resData)
    },
    methods: {
      resetObj(){
        this.default_form.noticeContent = ''
        this.default_form.fileToken = ''
        this.checkShow = false
        this.dialogVisible = false
        this.input_form = false
        this.file_name = ''
      },
      handleMedia(){
        this.dialogVisible1 = true
      },
      onUploadSuccess(msg) {
        this.default_form.fileToken = msg.response.data
        this.file_name = msg.name
      },
      handleNotarize(){
        this.dialogVisible1 = false
        this.dialogVisible = true
      },
      submitForm() {
        expireResultNoticeSave(this.default_form, this.packIdList).then(response => {
          if (response.state) {
            // 当前视图更新
            this.noticeVO = response.data[this.packIdList]
            this.noticeVO.notice.noticeId = response.data[this.packIdList].notice.noticeId
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: response.msg,
              type: 'error'
            });
          }
          this.resetObj()
        })
      }
    }
  }
</script>
<style scoped>
  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }

  .el-form-item__content {
    margin-left: 9%;
  }

  .el-form-item__label {
    padding: 0;
  }

  .el-form-item {
    margin-bottom: 2%;
  }

  .components-container {
    margin: 30px 0;
  }

</style>
