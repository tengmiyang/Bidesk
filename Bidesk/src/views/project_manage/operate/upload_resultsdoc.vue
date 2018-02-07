<template>
  <div class="project-container">
    <crumbs :resData="resData"></crumbs>
    <div v-if="!hasMorePack">
      <el-tabs type="border-card">
        <el-tab-pane label="详情">
          <el-row>
            <el-col>
              <span v-if="hasUploadNotice">
                <el-button type="primary" @click="uploadClivk = true">上传中标通知书</el-button>
                <el-button type="primary" @click="UploadUnbidNotice">上传未中标通知书</el-button>
              </span>
              <span v-else>
                <span v-if="noShow">
                  <el-button type="primary" @click="uploadClivk = true">中标通知书</el-button>
                  <el-button type="primary" @click="uploadClivk = false">未中标通知书</el-button>
                </span>
              </span>
            </el-col>
            <!--上传中标通知书-->
            <el-table v-show="uploadClivk" :data="bidDetailList" border style="width: 100%;margin:5% 0 3%;" v-if="noShow">
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="bidMoney" label="中标金额" min-width="80" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.bidMoney}}{{scope.row.offerState}}</span>
                </template>
              </el-table-column>
              <el-table-column label="上传中标通知书" min-width="80" align="center">
                <template slot-scope="scope">
                <span v-if="hasUploadNotice">
                    <Upload :file-list="fileList" @onUploadSuccess="onUploadSuccess"
                            @onUploadRemove="onUploadRemove(scope.row)" @UploadClick="UploadClick(scope.row)"></Upload>
                </span>
                  <span v-else>
                  <el-button @click="downloadannexName(scope.row)" type="text">{{scope.row.annexName}}</el-button>
                </span>
                </template>
              </el-table-column>
            </el-table>
            <!--上传未中标通知书-->
            <el-col style="margin: 1% 0;" v-show="!uploadClivk">未中标通知书：
              <span v-if="hasUploadNotice">
              <Upload @onUploadSuccess="onUploadSuccessnoBid" @UploadClick="UploadClicknoBid"
                      @onUploadRemove="onUploadRemoveBid"></Upload>
            </span>
              <span v-else> <span v-if="noBidDetailList.length!==0">
              <el-button @click="downloadannexNamenoBid" type="text">{{noBidDetailList[0].annexName}}</el-button>
            </span></span>
              <el-table :data="noBidDetailList" border style="width: 100%;margin-bottom: 3%;">
                <el-table-column type="index" label="序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24" style="text-align: center">
          <span v-if="hasUploadNotice">
            <el-button type="primary" @click="submitInfo">提交</el-button>
          </span>
          <span v-else>
            <span v-if="noShow">
              <el-button type="primary" @click="againSubmitInfo">重新上传采购结果通知书</el-button>
            </span>
          </span>
            </el-col>
          </el-row>
          <!--</div>-->
        </el-tab-pane>
        <el-tab-pane label="邮件来往">
          <el-row>
            <el-col style="margin-bottom: 1%;">
              <el-button @click="dialogVisible = true" type="primary">关联邮件</el-button>
              <el-button @click="dialogVisible1 = true" type="primary">手动添加采购人发来的邮件</el-button>
            </el-col>
            <el-table :data="tableMail" border style="width: 100%">
              <el-table-column type="index" label="序号" width="80" align="center">
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
                  <el-button @click="buttonClick(index)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">取消关联</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <el-row>
        <select-btn :packList="packList" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      </el-row>
      <!--默认全部-->
      <el-table :data="packLists" border style="width: 100%" v-show="handleBtnView === '全部'" v-loading="listLoading"
                element-loading-text="加载中...">
        <el-table-column prop="packNum" label="包号" width="80" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包件名称" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button @click="SeePack(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--第N包按钮页-->
      <el-tabs type="border-card" v-for="(item, index) in packList" :key="index"
               v-if="btn_index === ('第' + (item.packNum) + '包')">
        <el-tab-pane label="详情">
          <el-row>
            <el-col>
            <span v-if="hasUploadNotice" v-cloak>
            <el-button type="primary" @click="uploadClivk = true">上传中标通知书</el-button>
              <el-button type="primary" @click="UploadUnbidNotice">上传未中标通知书</el-button>
              </span>
              <span v-else>
               <el-button type="primary" @click="uploadClivk = true">中标通知书</el-button>
                <el-button type="primary" @click="uploadClivk = false">未中标通知书</el-button>
            </span>
            </el-col>
            <!--上传中标通知书-->
            <el-table v-show="uploadClivk" :data="bidDetailList" border
                      style="width: 100%;margin:5% 0 3%;">
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="bidMoney" label="中标金额" min-width="80" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.bidMoney}}{{scope.row.offerState}}</span>
                </template>
              </el-table-column>
              <el-table-column label="上传中标通知书" min-width="80" align="center">
                <template slot-scope="scope">
                <span v-if="hasUploadNotice">
                    <Upload :file-list="fileList" @onUploadSuccess="onUploadSuccess"
                            @onUploadRemove="onUploadRemove(scope.row)" @UploadClick="UploadClick(scope.row)"></Upload>
                </span>
                  <span v-else>
                  <el-button @click="downloadannexName(scope.row)" type="text">{{scope.row.annexName}}</el-button>
                </span>
                </template>
              </el-table-column>
            </el-table>
            <!--上传未中标通知书-->
            <el-col style="margin: 1% 0;" v-show="!uploadClivk">未中标通知书：
              <span v-if="hasUploadNotice">
              <Upload @onUploadSuccess="onUploadSuccessnoBid" @UploadClick="UploadClicknoBid"
                      @onUploadRemove="onUploadRemoveBid"></Upload>
            </span>
              <span v-else> <span v-if="noBidDetailList.length!==0">
              <el-button @click="downloadannexNamenoBid" type="text">{{noBidDetailList[0].annexName}}</el-button>
            </span></span>
              <el-table :data="noBidDetailList" border style="width: 100%;margin-bottom: 3%;">
                <el-table-column type="index" label="序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col style="text-align: center">
          <span v-if="hasUploadNotice">
            <el-button type="primary" @click="submitInfo">提交</el-button>
          </span>
              <span v-else>
              <el-button type="primary" @click="againSubmitInfo">重新上传采购结果通知书</el-button>
          </span>
            </el-col>
          </el-row>
          <!--</div>-->
        </el-tab-pane>
        <el-tab-pane label="邮件来往">
          <el-row>
            <el-col style="margin-bottom: 1%;">
              <el-button @click="dialogVisible = true" type="primary">关联邮件</el-button>
              <el-button @click="dialogVisible1 = true" type="primary">手动添加采购人发来的邮件</el-button>
            </el-col>
            <el-table :data="tableMail" border style="width: 100%">
              <el-table-column type="index" label="序号" width="80" align="center">
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
                  <el-button @click="buttonClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">取消关联</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--关联邮件-->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="65%">
      <associatedMail></associatedMail>
    </el-dialog>
    <!--添加邮件-->
    <el-dialog title="补录" :visible.sync="dialogVisible1" width="50%">
      <addMail></addMail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import associatedMail from '@/custom-components/project_manages/associatedMail'
  import TinyMce from '@/custom-components/Tinymce';
  import Upload from '@/custom-components/Upload/singleFile';
  import addMail from '@/custom-components/project_manages/addMail';
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {expireResultAdviceNoteInit, expireResultAdviceNoteSave, downloadFile} from '@/api/project'
  import {deepClone, parseTime} from '@/utils'
  import selectBtn from '@/custom-components/project_manages/selectBtn'

  export default {
    components: {
      TinyMce, Upload, associatedMail, addMail, selectBtn, crumbs
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        tableMail: [],
        purResultList: [],
        fileList: [],
        packLists: [],
        packList: [],
        projectId: this.$store.getters.subProjectId,
        resData: {},
        default_tab: true,
        listLoading: false,
        hasMorePack: false,
        checkList: '',
        defaultMediaCheckList: '',
        annexId: 0,
        dialogVisible: false,
        packIdIndex: 0,
        dialogVisible1: false,
        dialogVisible2: false,
        hasUploadNotice: false,
        handleIndex: null,
        generalForm: true,
        uploadClivk: true,
        noShow: false,
        msg: {},
        bidDetailList: [],
        noBidDetailList: [],
        noBidDetailListdoc: [],
        detailIds: [],
        form: {
          "packId": 0,
          "resultDetailList": []
        },
        submitFileToken: {
          "detailId": 0,
          "fileToken": "",
        },
        see_btn: 0,
        pack_btn: 0,
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
      }
    },
    methods: {
      SeePack(row) {
        this.see_btn = '第' + row.packNum + '包'
        this.handleBtnView = '第' + row.packNum + '包'
        this.getBtnIndex(this.see_btn)
      },
      getBtnIndex(index) {
        this.noShow=true
        this.getList()
        this.btn_index = index
        if (index === '全部') {
          this.handleBtnView = index
        } else {
          this.handleBtnView = index
          this.pack_index = index.substring(1, index.length - 1)
          for (let i = 0; i < this.packList.length; i++) {
            if (parseInt(this.pack_index) === parseInt(this.packList[i].packNum)) {
              this.pack_btn = i
            }
          }
          this.buttonClick(this.pack_btn)
        }
      },
      getList() {
        this.listLoading = true
        expireResultAdviceNoteInit(this.projectId).then(response => {
          // console.log(response)
          if (response.state === true) {
            this.resData = response.data
            this.packList = response.data.packList
            this.hasMorePack = response.data.hasMorePack
            this.packLists = deepClone(this.packList)
            for (let i = this.packLists.length - 1; i >= 0; i--) {
              if (this.packLists[i].purResultList === null) {
                this.packLists.splice(i, 1)
              }
            }
            if (this.hasMorePack === false) {
              this.buttonClick(0)
            }
            setTimeout(() => {
              this.listLoading = false;
            }, 2000);
            this.listLoading = false
          }
          else {
            this.$message({
              message: '加载数据失败，请重试',
              type: 'warning'
            });
          }
        })
      },
      mediaListChange() {
        this.form.defaultMediaList = this.defaultMediaCheckList
      },
      removeMedia(index) {
        this.form.customMediaList.splice(index, 1)
      },
      dialogVisible3() {
        this.form.customMediaList.push({
          mediaName: '',
          mediaUrl: ''
        });
        this.dialogVisible2 = false
      },
      submitForm() {
        this.form.noticeList = this.allPacks
        this.form.packList = this.allPacks
        prepareProjectSaveNotice(this.form).then(response => {
        })
      },
//      切换包件按钮
      buttonClick(index) {
        this.bidDetailList = []
        this.noBidDetailList = []
        this.handleIndex = index
        if (this.packList[index].purResultList !== null) {
          this.purResultList = this.packList[index].purResultList
          for (const item of this.purResultList) {
            this.bidDetailList = [...this.bidDetailList, ...item.bidDetailList]
            this.noBidDetailList = [...this.noBidDetailList, ...item.noBidDetailList]
          }
          for (let i = 0; i < this.bidDetailList.length; i++) {
            if (this.bidDetailList[i].offerState === "1") {
              this.bidDetailList[i].offerState = "文字"
            }
            else if (this.bidDetailList[i].offerState === "2") {
              this.bidDetailList[i].offerState = "元"
            }
            else {
              this.bidDetailList[i].offerState = "元/个"
            }
          }
          for (let i = 0; i < this.noBidDetailList.length; i++) {
            if (this.noBidDetailList[i].offerState === "1") {
              this.noBidDetailList[i].offerState = "文字"
            }
            else if (this.noBidDetailList[i].offerState === "2") {
              this.noBidDetailList[i].offerState = "元"
            }
            else {
              this.noBidDetailList[i].offerState = "元/个"
            }
          }
          this.hasUploadNotice = !this.purResultList[0].hasUploadNotice
        }
        else {
          this.hasUploadNotice = true
        }
      },
      totalButton() {
        this.handleIndex = -1
        this.generalForm = true
      },
      submitInfo() {
        this.form.packId = this.packList[this.handleIndex].packId
        for(let i=0; i<this.noBidDetailListdoc.length; i++){
          this.form.resultDetailList.push(this.noBidDetailListdoc[i])
        }
        if (this.form.resultDetailList.length === 0) {
          this.$message({
            message: '请先上传文件再提交',
            type: 'warning'
          });
        }
        else {
          expireResultAdviceNoteSave(this.form).then(response => {
            // console.log(response)
            if (response.state === false) {
              this.$message({
                message: response.msg,
                type: 'warning'
              });
            }
            else {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.bidDetailList = response.data.bidDetailList
              this.noBidDetailList = response.data.noBidDetailList
              if (response.data.noBidDetailList.length !== 0) {
                this.annexId = this.noBidDetailList[0].annexId
              }
              this.hasUploadNotice = false
              this.form.packId = 0
              this.form.resultDetailList = []
              for (let i = 0; i < this.bidDetailList.length; i++) {
                if (this.bidDetailList[i].offerState === "1") {
                  this.bidDetailList[i].offerState = "文字"
                }
                else if (this.bidDetailList[i].offerState === "2") {
                  this.bidDetailList[i].offerState = "元"
                }
                else {
                  this.bidDetailList[i].offerState = "元/个"
                }
              }
              for (let i = 0; i < this.noBidDetailList.length; i++) {
                if (this.noBidDetailList[i].offerState === "1") {
                  this.noBidDetailList[i].offerState = "文字"
                }
                else if (this.noBidDetailList[i].offerState === "2") {
                  this.noBidDetailList[i].offerState = "元"
                }
                else {
                  this.noBidDetailList[i].offerState = "元/个"
                }
              }
            }
          })
        }
      },
      againSubmitInfo() {
        this.hasUploadNotice = !this.hasUploadNotice
      },
//      中标通知书上传成功事件
      onUploadSuccess(msg) {
        if (msg.response.state === true) {
          if (this.submitFileToken.fileToken !== msg.response.data) {
            this.submitFileToken.fileToken = ""
            this.submitFileToken.fileToken = msg.response.data
            const fileToken = {...this.submitFileToken}
            this.form.resultDetailList.push(fileToken)
          }
        }
        else {
          this.$message({
            message: '上传失败，请重试',
            type: 'warning'
          });
        }
      },
//      上传中标通知书的点击事件
      UploadClick(row) {
        this.submitFileToken.detailId = 0
        this.submitFileToken.detailId = row.detailId
      },
//      未中标上传成功事件
      onUploadSuccessnoBid(msg) {
        this.msg = msg
        if (msg.response.state === true) {
          for (let i = 0; i < this.noBidDetailListdoc.length; i++) {
            this.noBidDetailListdoc[i].fileToken = msg.response.data
          }
        }
        else {
          this.$message({
            message: '上传失败，请重试',
            type: 'warning'
          });
        }
      },
//      未中标点击事件
      UploadClicknoBid() {
        for (let i = 0; i < this.noBidDetailList.length; i++) {
          this.submitFileToken.fileToken = ''
          this.submitFileToken.detailId = 0
          this.submitFileToken.detailId = this.noBidDetailList[i].detailId
          const fileToken = {...this.submitFileToken}
          this.noBidDetailListdoc.push(fileToken)
        }
      },
//      中标通知书的删除上传文件
      onUploadRemove(row) {
        for (let i = 0; i < this.form.resultDetailList.length; i++) {
          if (row.detailId === this.form.resultDetailList[i].detailId) {
            this.form.resultDetailList.splice(i, 1)
          }
        }
      },
//      未中标通知书的删除上传文件
      onUploadRemoveBid() {
        this.noBidDetailListdoc = []
      },
//      附件下载
      downloadannexName(row) {
        this.annexId = row.annexId
//        download(this.annexId).then(response => {
//        })
      },
      downloadannexNamenoBid() {
//        downloadFile(this.annexId).then(response => {
//        })
      },
      UploadUnbidNotice() {
        this.uploadClivk = false
      }
    }
  }
</script>
<style scoped>
  [v-clock] {
    display: none;
  }
</style>
