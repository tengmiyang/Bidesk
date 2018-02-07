<template>
  <div class="app-container">
    <div v-if="noHasMorePack" class="packInfo">
      <!--<el-button type="primary" plain @click="goBack">返回</el-button>-->
      <div>
        <h3>采购公告</h3>
        <el-table :data="purchaseNotices" style="width: 100%">
          <el-table-column prop="noticeName" label="公告名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.hasDownload" @click="purchaseNoticesDown(scope.row, index)">未下载
              </el-button>
              <el-button type="text" v-else @click="purchaseNoticesDown(scope.row, index)">已下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br>
      <div>
        <h3>采购文件</h3>
        <el-table :data="purchaseNotices" style="width: 100%">
          <el-table-column prop="noticeName" label="文件名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.hasDownload">未下载</el-button>
              <el-button type="text" v-else>已下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br>
      <div>
        <h3>补充公告</h3>
        <el-table :data="purchaseNotices" style="width: 100%">
          <el-table-column prop="noticeName" label="补充公告名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.hasDownload" @click="addNoticeDown(scope.row, index)">未下载
              </el-button>
              <el-button type="text" v-else @click="addNoticeDown(scope.row, index)">已下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br>
      <div>
        <h3>澄清答疑</h3>
        <el-table :data="purchaseNotices" style="width: 100%">
          <el-table-column prop="noticeName" label="澄清答疑名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.hasDownload">未下载</el-button>
              <el-button type="text" v-else>已下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="yesHasMorePack">
      <select-btns :packList="DownloadFiles" @transferIndex="getBtnIndex"
                   style="margin-bottom: 1%"></select-btns>
      <div v-for="(item, index) in DownloadFiles" :key="index" v-if="btn_index === ('第' + (item.packNum) + '包')"
           class="packInfo">
        <div>
          <h3>采购公告</h3>
          <el-table :data="purchaseNotices" style="width: 100%">
            <el-table-column prop="noticeName" label="公告名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="purchaseNoticesDown(scope.row, index)" v-if="!scope.row.hasDownload">
                  未下载
                </el-button>
                <el-button type="text" @click="purchaseNoticesDown(scope.row, index)" v-else>已下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <br>
        <div>
          <h3>采购文件</h3>
          <el-table :data="purchaseDocs" style="width: 100%">
            <el-table-column prop="annexName" label="文件名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="purchaseDocsDown(scope.row, index)" v-if="!scope.row.hasDownload">未下载
                </el-button>
                <el-button type="text" @click="purchaseDocsDown(scope.row, index)" v-else>已下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <br>
        <div>
          <h3>补充公告</h3>
          <el-table :data="DownloadFiles[index].addNoticeList" style="width: 100%">
            <el-table-column prop="noticeName" label="补充公告名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="addNoticeDown(scope.row, index)" v-if="!scope.row.hasDownload">未下载
                </el-button>
                <el-button type="text" @click="addNoticeDown(scope.row, index)" v-else>已下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <br>
        <div>
          <h3>澄清答疑</h3>
          <el-table :data="DownloadFiles[index].qaList" style="width: 100%">
            <el-table-column prop="annexName" label="澄清答疑名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="qaListDown(scope.row, index)" v-if="!scope.row.hasDownload">未下载
                </el-button>
                <el-button type="text" @click="qaListDown(scope.row, index)" v-else>已下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--表格信息-->
    <div style="width: 100%;" v-show="showTable">
      <ProjectSearch :tableData="tableData"></ProjectSearch>
      <el-table :data="tableData" border>
        <!--<el-table-column type="index" label="序号" width="50" align="center">-->
        <!--</el-table-column>-->
        <el-table-column prop="projectName" label="项目名称" min-width="160" align="center">
        </el-table-column>
        <el-table-column prop="projectNum" label="项目编号" min-width="160" align="center">
        </el-table-column>
        <el-table-column prop="agency" label="包件" min-width="160" align="center">
          <template slot-scope="scope">
            <div v-if="!scope.row.hasMorePack">
              <span>--</span>
            </div>
            <div v-else>
              <!--<span v-for="(item, index) in scope.row.packList"><span>第{{item.packNum}}包</span></span>-->
              第<span v-for="(item, index) in scope.row.packList" :key="index"><span>{{item.packNum}}</span>
              <span
                v-if='index!==scope.row.packList.length-1'>,</span></span>包
            </div>
          </template>
        </el-table-column>
        <el-table-column label="上传资料" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="RelevantInformation(scope.row)">相关资料</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="DownloadFile(scope.row)">下载文件</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="paginations.pageNum" :page-size="paginations.pageSize"
                     layout="total, prev, pager, next"
                     :total="paginations.totalCount">
      </el-pagination>
    </div>
    <!--分页-->
    <!--项目负责人的弹出框-->
    <el-dialog title="相关资料" :visible.sync="dialogVisible1" width="30%">
      <div class="attention" v-if="!hasMorePackRow">
        <p>上传说明：多文件时请用压缩包。提交后将无法修改和删除，请确保资料的准确性。</p>
      </div>
      <div class="attention" v-else>
        <span v-for="(packs, index) in packData" :key="index">
            <el-button type="primary" plain size="small" @click="clickPackBtn(index)">第{{packs.packNum}}包</el-button>&nbsp;&nbsp;
          </span>
        <p v-if="hasMorePackRow">
            <span v-for="(packs, index) in packData" :key="index" v-if="selectIndex === index">
              <packNumCheck :packList="packData" :current_tab="selectIndex"></packNumCheck>
                </span>
        </p>
        <p>上传说明：多文件时请用压缩包。提交后将无法修改和删除，请确保资料的准确性。</p>
        <p>相关资料：
          <Upload></Upload>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">提 交</el-button>
  </span>
    </el-dialog>
    <el-dialog title="下载文件" :visible.sync="dialogVisible4" width="40%">
      <div class="attention">
        <h4>已发送验证码至您的手机号 182XXXXX230,请注意查收</h4>
        <span>验证码：<input type="text" v-model="authid">
            <el-button type="success" plain size="small">再次获取</el-button></span>
        <p v-show="hintid">您输入的验证码有误，请重新核实！</p>
      </div>
      <!--采购公告和采购文件-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible4=false">关 闭</el-button>
          <el-button type="primary" @click="DownloadFileSubmit">确 定</el-button>

        </span>
    </el-dialog>
    <el-dialog title="公告详情" :visible.sync="dialogVisible2" width="40%">
      <div class="attention" v-html="DetailsPages.noticeContent">
        <!--<p>{{DetailsPages.noticeContent}}</p>-->
      </div>
      <!--采购公告和采购文件-->
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2=false">关 闭</el-button>
          <el-button type="primary" @click="dialogVisible2=false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    supplierPassProject,
    supplierPassProjectDownloadPage,
    supplierDownloadPurchaseNotice,
    supplierDownloadPurchaseDoc,
    supplierDownloadAddNotice,
    supplierDownloadQa,
    downloadFile
  } from '@/api/project'
  import packNumCheck from '@/custom-components/project_manages/packNumCheck'
  import Upload from '@/custom-components/Upload/singleFile'
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'
  import selectBtns from '@/custom-components/project_manages/selectBtns'

  export default {
    components: {
      packNumCheck, Upload, ProjectSearch, selectBtns
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        hasMorePackRow: null,
        yesHasMorePack: false,
        noHasMorePack: false,
        morepack: true,
        showTable: true,
        selectIndex: 0,
        annexId: 0,
        default_table: true,
        authid: '',
        hintid: false,
        noticeid: false,
        first: true,
        second: false,
        tableData: [],
        packData: [],
        packIdList: [],
        DownloadFiles: [],
        purchaseNotices: [],
        purchaseDocs: [],
        DetailsPages: {},
        form: {
          packId: null,
          moduleId: null,
        },
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        checked: false,
        checked1: false,
        formInline: {
          user: '',
          region: ''
        },
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '第1包',
        forms: {
          pageNum: 1,
          projectName: '',
          projectNum: '',
        },
        paginations: {
          totalPage: 1,
          pageSize: 1,
          totalCount: 1,
          pageNum: 1
        },      //分页相关
        type: 'supplier_execute'
      }
    },
    methods: {
      getList() {
        supplierPassProject(this.forms).then(response => {
          // console.log(response);
          this.tableData = response.data
//          this.paginations = response.data.paginations
          this.hasMorePack = this.tableData[0].hasMorePack
          // console.log(this.hasMorePack);
        })
      },
//      相关资料
      RelevantInformation(row) {
        this.dialogVisible1 = true
        this.hasMorePackRow = row.hasMorePack
        this.packData = row.packList
      },
//      下载文件
      DownloadFile(row) {
        this.packIdList = []
        this.dialogVisible4 = true      //公告详情弹框
        this.hasMorePackRow = row.hasMorePack
        this.packData = row.packList
        for (let i = 0; i < this.packData.length; i++) {
          this.packIdList.push(this.packData[i].packId)
        }
      },
//      包件按钮组件
      getBtnIndex(index) {
        this.btn_index = index
        this.pack_index = (index.substring(1, index.length - 1) - 1)
        this.handleBtnView = index
        this.btnChange(this.pack_index)
      },
      cutfirst() {
        this.first = true;
        this.second = false;
      },
      cutsecond() {
        this.first = false;
        this.second = true;
      },
      authcode() {
        if (this.authid === '1234') {
          this.hintid = false;
          this.dialogVisible5 = true;
        }
        else {
          this.hintid = true;
        }
      },
//      输入验证码过后确定下载文件妞妞
      DownloadFileSubmit() {
        if (this.authid === '123') {
          this.hintid = false;
          this.dialogVisible4 = false
          supplierPassProjectDownloadPage(this.packIdList).then(response => {
            // console.log(response);
            if (response.state === true) {
              this.DownloadFiles = response.data
              if (this.purchaseNotices.length === 0) {
                this.purchaseNotices.push(this.DownloadFiles[0].purchaseNotice)
              }
              if (this.purchaseDocs.length === 0) {
                this.purchaseDocs.push(this.DownloadFiles[0].purchaseDoc)
              }
              this.getBtnIndex(this.handleBtnView)
            }
            else {
              this.$message({
                message: '加载数据失败，请重试',
                type: 'warning'
              });
              this.$router.push({path: '/'})
              this.$router.push({name: '正在执行项目'})
            }
          })
          if (this.hasMorePackRow === true) {
            this.yesHasMorePack = true
            this.noHasMorePack = false
            this.showTable = false
          }
          else {
            this.yesHasMorePack = false
            this.noHasMorePack = true
            this.showTable = false
          }
        }
        else {
          this.hintid = true;
        }
      },
      btnChange(index) {
        if (this.purchaseNotices.length !== 0) {
          this.purchaseNotices.splice(0, 1)
        }
        this.purchaseNotices.push(this.DownloadFiles[index].purchaseNotice)
        if (this.purchaseDocs.length !== 0) {
          this.purchaseDocs.splice(0, 1)
        }
        this.purchaseDocs.push(this.DownloadFiles[index].purchaseDoc)
      },
      goBack() {
        this.yesHasMorePack = false
        this.noHasMorePack = false
        this.showTable = true
      },
      purchaseNoticesDown(row, index) {
        this.DetailsPages = row
        this.dialogVisible2 = true
        this.form.packId = this.DownloadFiles[index].packId
        this.form.moduleId = row.noticeId
        supplierDownloadPurchaseNotice(this.form).then(response => {
          // console.log(response)
        })
      },
      purchaseDocsDown(row, index) {
        this.form.packId = this.DownloadFiles[index].packId
        this.form.moduleId = row.docId
        // console.log(row.annexId)
        // console.log(row)
        supplierDownloadPurchaseDoc(this.form).then(response => {
          // console.log(response)
        })
        download(this.annexId).then(response => {
          // console.log(response)
        })
      },      //采购公告的详情信息
      addNoticeDown(row, index) {
        this.DetailsPages = row
        this.dialogVisible2 = true
        this.form.packId = this.DownloadFiles[index].packId
        this.form.moduleId = row.noticeId
        supplierDownloadAddNotice(this.form).then(response => {
          // console.log(response)
        })
      },        //补充公告的详细信息
      qaListDown(row, index) {
        // console.log(index)
        this.form.packId = this.DownloadFiles[index].packId
        this.form.moduleId = row.qaId
        supplierDownloadQa(this.form).then(response => {
          // console.log(response)
        })
      },
      clickPackBtn(index) {
        this.selectIndex = index
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.pageNum = val
        if (this.tableData.length !== 0 && this.form.projectName !== '') {
          this.form.projectName = this.tableData[0].sub_pro_name
          this.form.projectNum = this.tableData[0].sub_pro_num
        }
        else {
          this.form.projectName = ''
          this.form.projectNum = ''
        }
        supplierPassProject(this.form).then(response => {
          console.log(response);
          this.resList = response.data.list;
          this.paginations = response.data.pagination;
        })
      },
      ProjectSearchs(arr) {
        console.log(arr)
//        this.tableData = arr.list
//        this.paginations = arr.pagination
        this.tableData = arr
      },
      downloadFile(row) {
        // console.log(row.annexId)
      }
    }
  }
</script>

<style scoped>
  .attention {
    text-align: center;
  }

  .el-pagination {
    text-align: right;
    margin-top: 1%;
  }

  .packInfo {
    width: 60%;
    border: 2px solid rgb(63, 106, 169);
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
  }
</style>

