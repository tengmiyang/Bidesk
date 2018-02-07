<template>
  <div style="padding: 1% 25% 0 0;">
    <div class="tbody_open">
      <el-tabs type="border-card">
        <el-tab-pane label="详情">
          <!--复选框-->
          <packChecked v-show="notice === null || input_form" @transferIdList="getIdList" :packList="packList"
                       :current_tab="selectIndex"></packChecked>
          <!--发布新信息-->
          <el-form v-if="notice === null || input_form" class="form_style"
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
              <el-button v-show="notice !== null" @click="resetObj">返 回</el-button>
              <el-button type="primary" @click="handleNotarize">发 布</el-button>
            </el-form-item>
          </el-form>
          <!--已提交过-->
          <el-row v-else class="form_style">
            <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
                   style="width: 100%;line-height: 40px;">
              <tbody class="dialog__coenter">
              <tr>
                <th>发布媒体</th>
                <td>
                  <ul>
                    <li v-for="(item, index) in mediaList"
                        :key="index">
                      <el-button type="text" @click="handleMedia">
                        {{item.media.mediaName}}：{{item.media.mediaUrl}}
                      </el-button>&nbsp;&nbsp;
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>公告附件</th>
                <td>
                  <span>{{notice.annexName}}</span>
                </td>
              </tr>
              </tbody>
            </table>
            <div>
              <h3 style="text-align:center">{{notice.noticeName}}</h3>
              <div v-html="notice.noticeContent"></div>
            </div>
            <el-col style="text-align:center;margin-top: 2%">
              <el-button type="primary" @click="input_form = true">重新发布采购结果公告</el-button>
            </el-col>
          </el-row>

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
      <!--详情框-->
      <el-dialog title="详情" :visible.sync="dialogVisible" width="65%">
        <el-form class="form_style" label-width="100px">
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
          <el-checkbox v-model="handle_check"><span style="color: #FF0000;">是否确认发布采购结果公告，发布后将不可修改！</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false, handle_check=false">关 闭</el-button>-->
          <el-button :disabled="!handle_check" type="primary" @click="submitForm">确定发布</el-button>
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
      <!--关联邮件-->
      <el-dialog title="详情" :visible.sync="dialogVisible2" width="90%">
        <associatedMail></associatedMail>
      </el-dialog>
      <!--添加邮件-->
      <el-dialog title="补录" :visible.sync="dialogVisible3" width="45%">
        <addMail></addMail>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import tinyMce from '@/custom-components/Tinymce'
  import Upload from '@/custom-components/Upload/singleFile'
  import packChecked from '@/custom-components/project_manages/packCheckedLoop'
  import {expireResultNoticeInit, expireResultNoticeSave} from '@/api/project'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import MediaImages from '@/assets/MediaImages/MediaImages.png'
  import associatedMail from '@/custom-components/project_manages/associatedMail';
  import addMail from '@/custom-components/project_manages/addMail';

  export default {
    components: {
      ElButton,
      Upload,
      packChecked,
      tinyMce,
      associatedMail,
      addMail
    },
    props: ['selectIndex', 'packList', 'resData'],
    computed: {
      notice() {
        return this.packList[this.selectIndex].noticeVO.notice
      },
      mediaList() {
        return this.packList[this.selectIndex].noticeVO.mediaList
      }
    },
    data() {
      return {
        MediaImages,
        fileList: [],
        file_name: '',
        input_form: false,
        dialogVisible1: false,
        dialogVisible2:false,
        dialogVisible3:false,
        handle_check: false,
        dialogVisible: false,
        text_area: '',
        default_form: {
          fileToken: '',
          noticeContent: '',
          noticeName: this.resData.projectName + '采购结果公告',
        },
        packIdList: [this.packList[this.selectIndex].packId]
      }
    },
    methods: {
      resetObj() {
        this.default_form.noticeContent = ''
        this.default_form.fileToken = ''
        this.handle_check = false
        this.dialogVisible = false
        this.input_form = false
        this.file_name = ''
      },
      handleMedia() {
        this.dialogVisible1 = true
      },
      onUploadSuccess(msg) {
        // console.log(msg)
        this.default_form.fileToken = msg.response.data
        this.file_name = msg.name
      },
      handleNotarize() {
        this.dialogVisible1 = false
        this.dialogVisible = true
      },
      getIdList(msg) {
        this.packIdList = msg
        console.log(this.packIdList)
      },
      submitForm() {
        expireResultNoticeSave(this.default_form, this.packIdList).then(response => {
          console.log(response)
          if (response.state) {
            // 当前视图更新
            this.packList[this.selectIndex].noticeVO.notice = response.data[this.packList[this.selectIndex].packId].notice
            this.packList[this.selectIndex].noticeVO.mediaList = response.data[this.packList[this.selectIndex].packId].mediaList
//            this.notice.noticeId = response.data[this.packIdList].notice.noticeId
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
<style>
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

  .components-container {
    margin: 30px 0;
  }
</style>
