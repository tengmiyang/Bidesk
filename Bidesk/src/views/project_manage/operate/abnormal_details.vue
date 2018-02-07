<template>
  <div class="app-container">
    <el-row>
      <crumbs :resData="projects"></crumbs>
    </el-row>
    <el-row>
      <div v-show="hasMorePack">
        分包编号：
        <el-button @click="defaultBtn">全部</el-button>
        <el-button v-for="(itemb, index) in tableData" :key=index @click="handleBtn(index)">第{{itemb.packNum}}包
        </el-button>
      </div>
    </el-row>
    <div v-show="hasMorePack">
      <!--全部页面的供应商信息-->
      <el-row v-show="default_btn">
        需通知的供应商：
        <el-col style="border-top:1px solid #ce77de;text-align:right;padding:1% 2%">
          <el-button type="primary" @click="openMsgs">短信通知</el-button>
        </el-col>
        <el-table ref="multipleTable" :data="passSupplierLists" tooltip-effect="dark" style="width:100%;" border
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="80" align="center">
          </el-table-column>
          <el-table-column label="序号" type="index" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
          </el-table-column>
          <el-table-column label="包号" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-for="(abc, index) in scope.row.packNum"> <span>第{{abc}}包</span></span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <!-- 第N包渲染 -->
    <el-row v-for="(item, index) in tableData" :key="index" v-if="!hasMorePack||(btn_index === index && !default_table)">
      <p v-show="hasMorePack">包名称：{{item.packName}}</p>
       <el-col style="border:1px solid #e6ebf5;border-radius:8px;margin:2% 0;" v-if="showPackMsg"><p>是否选择与其他包件关联：</p>
        <el-checkbox v-model="checked" v-for="(items, index) in packmsg" :key=index>第{{items.packNum}}包</el-checkbox>
      </el-col>

      <el-table :data="tableDatas" border style="width: 100%">
        <el-table-column label="供应商名称" min-width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="CompanyName" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系人" min-width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="UserName" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="手机" min-width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="UserPhone" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">清除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-col style="text-align: center;margin-top: 2%">
        <el-button type="primary" @click="addRows">添加行</el-button>
        <el-button type="primary">提交</el-button>
      </el-col>

      <p style="margin-bottom: 0;">需通知的供应商：</p>
      <el-col style="border-top:1px solid #ce77de">
        <!--<template>-->
        <!--<el-checkbox v-model="checked">如供应商为及时下载项目相关文件，则每隔24小时进行短信通知</el-checkbox>-->
        <!--<p>清注意：</p>-->
        <!--<p>1.短信发送时间为周一至周六8:30~20:30；</p>-->
        <!--<p>2.其他时间段提交的短信将在下个时间段发送。</p>-->
        <!--</template>-->
        <el-button type="primary" style="margin-left: 89%;" @click="openMsg">短信通知</el-button>
      </el-col>
      <el-table ref="multipleTable" :data="tableData[index].passSupplierList" tooltip-effect="dark" style="width: 100%"
                border @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="序号" type="index" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="packNum" label="包件" min-width="80" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="短信通知" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="短信类型:">
          <el-select v-model="form.region" placeholder="请选择短信模板" style="width: 100%;">
            <el-option label="自定义" value="自定义"></el-option>
            <el-option v-for="(itema, index) in smsTemplateList" :key="index" :value="itema.templateId"
                       :label="itema.templateName" @click.native="changesas(index)"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="templateCont">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMsg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {executeSupplierMsgInit, executeSupplierMsgSend} from '@/api/project'
  import {deepClone, parseTime} from '@/utils'
   import crumbs from '@/custom-components/project_manages/crumbs'
  export default {
    components: { crumbs },
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        passSupplierLists: [],       //全部页面的供应商信息
        supplierInfo: [],           //全部页面的供应商信息
        packmsg: [],           //全部页面的供应商信息
        smsTemplateList: [],        //短信模板的信息
        multipleSelection: [],      //选择供应商信息
        datas: {},                  //替换短信模板内容
        projects: {},       //项目编号和项目名称
        dialogVisible: false,
        showPackMsg: true,
        passSupplierListNum: 0,
        default_table: true,
        default_btn: true,
        btn_index: '',
        checked: false,
        input: '',
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
        executeSupplierMsgInit(this.projectId).then(response => {
          // console.log(response)
          this.tableData = response.data.packList
          this.hasMorePack = response.data.hasMorePack
//          const info = [...this.tableData]
          this.supplierInfo = deepClone(this.tableData)
          this.datas = response.data
          this.smsTemplateList = response.data.smsTemplateList
          this.projects = response.data
          for (const item of this.supplierInfo) {
            this.passSupplierLists = [...this.passSupplierLists, ...item.passSupplierList]
          }
          this.RemoveRepeat(this.passSupplierLists, this.passSupplierListNum)
        })
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
      },
//      切换不同包件按钮
      handleBtn(index) {
        this.packmsg = deepClone(this.tableData)
        this.default_table = false
        this.default_btn = false
        this.btn_index = index
        this.packmsg.splice(index, 1)
        if (this.packmsg.length === 0) {
          this.showPackMsg = false
        }
      },
      defaultBtn() {
        this.default_table = true
        this.default_btn = true
      },
      addRows() {
        this.tableDatas.push(this.addRow)
      },
      deleteRow(index) {
        this.tableDatas.splice(index, 1)
      },
//      打开短信通知模板
      openMsg() {
        this.dialogVisible = true
        this.templateCont = ''
      },
      //      打开短信通知模板
      openMsgs() {
        this.dialogVisible = true
        this.templateCont = ''
      },
//      发送短信模板
      submitMsg() {
        this.dialogVisible = false
        executeSupplierMsgSend(this.SupplierMsg).then(response => {
          // console.log(response)
        })
      },
//      选择不同短信模板
      changesas(index) {
        this.templateContents = this.smsTemplateList[index].templateContent
        this.templateCont = this.templateContents.replace(/{项目名称}/g, this.datas.projectName).replace(/({项目编号})/g, this.datas.projectNum).replace(/{购买标书截止时间}/g, parseTime(this.datas.createTime)).replace(/{递交响应文件截止时间}/g, parseTime(this.datas.submitEndTime)).replace(/{联系人}/g, this.tableData[0].contact).replace(/{联系电话}/g, this.tableData[0].phone)
        this.SupplierMsg.msgContent = this.templateCont
        this.SupplierMsg.templateId = this.smsTemplateList[index].templateId
      },
      RemoveRepeat(arr, Num) {
        if (arr.length === 0) {
          Num = 0
        }
        else {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 1; j < arr.length; j++) {
              if (i !== j && arr[i].supplierUserId === arr[j].supplierUserId) {
                arr[i].packNum += ',' + arr[j].packNum
                arr[i].packId += ',' + arr[j].packId
                arr[i].packNum = arr[i].packNum.split(',');
                arr[i].packId = arr[i].packId.split(',');
                arr.splice(j, 1)
              }
            }
          }
          Num = arr.length
        }
        return arr
      }
    }
  }
</script>

<style scoped>

  .el-col {
    padding-bottom: 2%;
  }
</style>
