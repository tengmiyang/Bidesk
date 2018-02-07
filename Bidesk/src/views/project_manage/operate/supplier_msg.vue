<template>
  <div class="project-container">
    <el-container>
      <el-main>
        <crumbs :resData="projects" v-if="projects"></crumbs>
        <div v-show="hasMorePack" style="margin-bottom: 1%">
          <select-btn :packList="tableData" @transferIndex="getBtnIndex"></select-btn>
        </div>
        <div v-show="hasMorePack">
          <!--全部页面的供应商信息-->
          <el-row v-show="handleBtnView === '全部'">
            <el-tabs type="border-card">
              <el-tab-pane label="需通知的供应商">
                <el-col style="text-align: right" v-if="passSupplierLists.length!==0">
                  <el-button type="primary" @click="openMsgs">短信通知</el-button>
                </el-col>
                <el-table ref="multipleTable" :data="passSupplierLists" tooltip-effect="dark" style="width:100%;" border
                          @selection-change="handleSelectionChange">
                  <el-table-column type="selection" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column label="序号" type="index" width="50" align="center">
                  </el-table-column>
                  <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column label="包号" min-width="80" align="center">
                    <template slot-scope="scope">
                      第<span v-for="(item, index) in scope.row.packNum" :key="index"> <span>{{item}}</span><span
                      v-if="index!==(scope.row.packNum.length-1)">,</span></span>包
                    </template>
                  </el-table-column>
                </el-table>

              </el-tab-pane>
            </el-tabs>

             <el-tabs type="border-card" style="margin-top: 2%">
            <el-tab-pane label="邀请供应商">
              <el-row v-show="hasMorePack">
                <el-col v-if="showPackMsg"><span style="font-size: 14px;color: #5a5e66">关联包件：</span>
                  <el-checkbox v-model="checked" v-for="(items, index) in packmsg" :key=index>第{{items.packNum}}包
                  </el-checkbox>
                </el-col>
              </el-row>
              <el-table :data="tableDatas" border style="width: 100%">
                <el-table-column label="供应商名称" min-width="80" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="addRow.CompanyName" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="联系人" min-width="80" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="addRow.UserName" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="手机号" min-width="80" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="addRow.UserPhone" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="80" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small"
                               v-if="!(firstLine===scope.$index)">移 除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-col style="text-align:center;">
                <el-button type="primary" style="margin-right: 2%" @click="addRows">添加行</el-button>
                <el-button type="primary">提 &nbsp 交</el-button>
              </el-col>
            </el-tab-pane>
          </el-tabs>
          </el-row>
        </div>
        <!-- 第N包渲染 -->
        <el-row v-for="(item, index) in tableData" :key="index"
                v-if="!hasMorePack||(btn_index === ('第' + (item.packNum) + '包'))">
          <!--<p v-show="hasMorePack">包名称：{{item.packName}}</p>-->

          <!--添加行-->


          <el-tabs type="border-card">
            <el-tab-pane label="需通知的供应商">
              <el-col style="padding-top: 0">
                <el-button type="primary" style="margin-left: 89%;" @click="openMsg"
                           v-if="tableData[index].passSupplierList.length!==0">短信通知
                </el-button>
              </el-col>
              <el-table ref="multipleTable" :data="tableData[index].passSupplierList" tooltip-effect="dark"
                        style="width: 100%"
                        border @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="80" align="center">
                </el-table-column>
                <el-table-column label="序号" type="index" width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="packNum" label="包件" min-width="80" align="center" v-if="hasMorePack">
                  <template slot-scope="scope">
                    <span>第{{scope.row.packNum}}包</span>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-main>
    </el-container>
    <!--短信弹框-->
    <el-dialog title="短信通知" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="短信类型:">
          <el-select v-model="form.region" placeholder="请选择短信模板" style="width: 100%;">
            <el-option label="自定义" value="自定义" @click.native="customSms"></el-option>
            <el-option v-for="(itema, index) in smsTemplateList" :key="index" :value="itema.templateId"
                       :label="itema.templateName" @click.native="changesas(index)"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 10}"
        placeholder="请输入内容"
        v-model="templateCont">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="submitMsg">发 送</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {executeSupplierMsgInit, executeSupplierMsgSend} from '@/api/project'
  import {deepClone, parseTime} from '@/utils'
  import crumbs from '@/custom-components/project_manages/crumbs'
  import selectBtn from '@/custom-components/project_manages/selectBtn'

  function NumAscSort(a, b) {
    return a - b;
  }
//对象数组按照某一对象的值来排序
  function compare(property) {
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2;     // 升序
    }
  }
  export default {
    components: {
      crumbs, selectBtn
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        currentProState: this.$router.routerType,
        passSupplierLists: [],       //全部页面的供应商信息
        supplierInfo: [],           //全部页面的供应商信息
        packmsg: [],           //全部页面的供应商信息
        checkedPa: [],
        smsTemplateList: [],        //短信模板的信息
        multipleSelection: [],      //选择供应商信息
        datas: {},                  //替换短信模板内容
        projects: {},       //项目编号和项目名称
        dialogVisible: false,
        showPackMsg: true,
        passSupplierListNum: 0,
        firstLine: 0,
        default_table: '',
        default_btn: true,
        checked: false,
        input: '',
        pack_btn: 0,
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
        templateContents: '',
        templateCont: '',
        addRow: {
          CompanyName: '',
          UserName: '',
          UserPhone: '',
        },
        form: {
          region: '',
        },
        SupplierMsg: {          //提交短信模板参数
          "templateId": 0,
          "msgContent": "",
          "supplierIdMap": {}
        },
        tableData: [],
        tableDatas: [{
          CompanyName: '',
          UserName: '',
          UserPhone: '',
        }],
        packData: [],
        flag: false,
        hasMorePack: false,
      }
    },
    methods: {
      getList() {
        executeSupplierMsgInit(this.projectId, this.currentProState).then(response => {
          // console.log(this.$router.routerType)
          this.tableData = response.data.packList
          this.datas = this.tableData[0]
          this.hasMorePack = response.data.hasMorePack
          this.supplierInfo = deepClone(this.tableData)
          this.smsTemplateList = response.data.smsTemplateList
          this.projects = response.data
          for (const item of this.supplierInfo) {
            this.passSupplierLists = [...this.passSupplierLists, ...item.passSupplierList]
          }
          this.RemoveRepeat(this.passSupplierLists)
          if (this.hasMorePack === false) {
            this.handleBtn(0)
          }
        })
      },
      getBtnIndex(index) {
        this.passSupplierLists = []
        this.getList()
        this.btn_index = index
        if (index === '全部') {
          this.handleBtnView = index
          this.datas = this.tableData[0]
          this.passSupplierLists = deepClone(this.passSupplierLists)
        } else {
          this.handleBtnView = ''
          this.pack_index = index.substring(1, index.length - 1)
          for (let i = 0; i < this.tableData.length; i++) {
            if (parseInt(this.pack_index) === parseInt(this.tableData[i].packNum)) {
              this.pack_btn = i
            }
          }
          this.handleBtn(this.pack_btn)
        }
      },
//      选择供应商
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if (this.SupplierMsg.supplierIdMap === null) {
          for (let i = 0; i < val.length; i++) {
            this.SupplierMsg.supplierIdMap[this.multipleSelection[i].supplierUserId] = []
            if (typeof this.multipleSelection[i].packId === 'object') {
              for (let j = 0; j < this.multipleSelection[i].packId.length; j++) {
                this.SupplierMsg.supplierIdMap[this.multipleSelection[i].supplierUserId].push(this.multipleSelection[i].packId[j])
              }
            }
            else {
              this.SupplierMsg.supplierIdMap[this.multipleSelection[i].supplierUserId].push(this.multipleSelection[i].packId)
            }
          }
        }
        else {
          this.SupplierMsg.supplierIdMap = {}
          for (let i = 0; i < val.length; i++) {
            this.SupplierMsg.supplierIdMap[this.multipleSelection[i].supplierUserId] = []
            if (typeof this.multipleSelection[i].packId === 'object') {
              for (let j = 0; j < this.multipleSelection[i].packId.length; j++) {
                this.SupplierMsg.supplierIdMap[this.multipleSelection[i].supplierUserId].push(this.multipleSelection[i].packId[j])
              }
            }
            else {
              this.SupplierMsg.supplierIdMap[this.multipleSelection[i].supplierUserId].push(this.multipleSelection[i].packId)
            }
          }
        }
        if (val.length !== 0) {
          this.flag = true
        }
        else {
          this.flag = false
        }
      },
//      切换不同包件按钮
      handleBtn(index) {
        this.packmsg = deepClone(this.tableData)
        this.packmsg.splice(index, 1)       //关联包件
        if (this.packmsg.length === 0) {
          this.showPackMsg = false
        }
        this.datas = this.tableData[index]
      },
      addRows() {
        this.tableDatas.push(this.addRow)
      },
      deleteRow(index) {
        // console.log(index)
        this.tableDatas.splice(index, 1)
      },
//      打开短信通知模板
      openMsg() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请选择供应商',
            type: 'warning'
          });
        }
        else {
          this.dialogVisible = true
          this.templateCont = ''
          this.form.region = ''
        }
      },
      //      打开短信通知模板
      openMsgs() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请先选择供应商',
            type: 'warning'
          });
        }
        else {
          this.dialogVisible = true
          this.templateCont = ''
        }
      },
//      发送短信
      submitMsg() {
        this.dialogVisible = false
        this.SupplierMsg.msgContent = this.templateCont
        executeSupplierMsgSend(this.SupplierMsg).then(response => {
          if (response.state === true) {
            this.$message({
              message: '发送成功',
              type: 'success'
            });
            this.flag = false
            this.customSms()
            this.SupplierMsg.supplierIdMap = {}
            this.SupplierMsg.msgContent = {}
            this.templateContents = ''
            this.templateCont = ''
            if (this.handleBtnView === '全部') {
              this.passSupplierLists = deepClone(this.passSupplierLists)
            }
            else {
              this.getBtnIndex(this.btn_index)
            }
          }
          else {
            this.$message({
              message: '提交失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      选择不同短信模板
      changesas(index) {
        this.templateContents = this.smsTemplateList[index].templateContent
        if (this.datas.contact === null) {
          this.datas.contact = '无'
        }
        if (this.datas.phone === null) {
          this.datas.phone = '无'
        }
        this.templateCont = this.templateContents.replace(/{项目名称}/g, this.projects.projectName).replace(/({项目编号})/g, this.projects.projectNum).replace(/{购买标书截止时间}/g, parseTime(this.datas.saleEndTime)).replace(/{递交响应文件截止时间}/g, parseTime(this.datas.submitEndTime)).replace(/{联系人}/g, this.datas.contact).replace(/{联系电话}/g, this.datas.phone)
        this.SupplierMsg.msgContent = this.templateCont
        this.SupplierMsg.templateId = this.smsTemplateList[index].templateId
      },
      customSms() {
        this.templateCont = ''
        this.SupplierMsg.templateId = ''
      },
      RemoveRepeat(arr) {
         this.checkedPa = []
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[j].packNum !== '0' && arr[i].supplierUserId === arr[j].supplierUserId) {
              arr[i].packNum += ',' + arr[j].packNum
              arr[i].packNum = arr[i].packNum.split(',');
              arr[j].packNum = '0'
              arr[i].packId += ',' + arr[j].packId
              arr[i].packId = arr[i].packId.split(',');
              arr[i].packNum.sort(NumAscSort)
            }
          }
          if (arr[i].packNum !== '0') {
            this.checkedPa.push(arr[i])
          }
        }
        arr = this.checkedPa.sort(compare("supplierUserId"));
        return arr

      },
    }
  }
</script>

<style scoped>
  .el-row {
    margin: 0 0 1%;
  }

  .el-main {
    padding: 0;
  }

  .el-col {
    padding: 1% 0;
  }

</style>
