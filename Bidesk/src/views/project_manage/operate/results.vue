<template>
  <div class="project-container">
    <crumbs :resData="resData" v-if="resData.projectName"></crumbs>
    <div v-if="!hasMorePack">
      <div v-if="packDetailsList.length!==0">
        <div v-for="(item, index) in packDetailsList" :key="index">
          <el-tabs type="border-card">
            <el-tab-pane label="详情">
              <div>
                <el-table :data="item.resultDetailList" border style="width: 100%">
                  <el-table-column type="index" label="序号" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                  </el-table-column>
                  <el-table-column prop="bid" label="中标情况" min-width="50" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.bid | isBid}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="中标金额" min-width="140" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.bidMoney}}</span><span>{{scope.row.bidState | isUnit}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="最终报价" min-width="140" align="center">
                    <template slot-scope="scope">
                      <span key="b">{{scope.row.offerMoney}}</span><span>{{scope.row.offerState | isUnit}}</span>
                    </template>
                  </el-table-column>
                  <!--影藏录入人-->
                  <div>
                    <!--<el-table-column label="录入人" min-width="50" align="center">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button type="text">代理</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="录入时间" min-width="50" align="center">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button type="text">2017-07-01</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="提醒" min-width="50" align="center">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button type="text">未关联邮件</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column label="操作" min-width="50" align="center">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button type="text">关联邮件</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                  </div>
                </el-table>
              </div>
            </el-tab-pane>

            <el-tab-pane label="邮件来往">
              <el-row>
                <el-col>
                  <el-button @click="dialogVisible = true" type="primary">关联邮件</el-button>
                  <el-button @click="dialogVisible1 = true" type="primary">手动添加采购人发来的邮件</el-button>
                </el-col>
                <el-table :data="tableData" border style="width: 100%;margin-top:6%;">
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
                      <el-button @click="seePack(scope.row)" type="text" size="small">查看</el-button>
                      <el-button type="text" size="small">取消关联</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-button type="primary" style="margin: 2% 47%;">提交</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div v-else>
        <el-alert title="暂无数据" type="info"></el-alert>
      </div>
    </div>
    <div v-else>
      <el-row>
        <select-btn :packList="packLists" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      </el-row>
      <!-- 默认全部 -->
      <el-table :data="packList" border style="width: 100%" v-show="handleBtnView === '全部'">
        <el-table-column label="包号" min-width="80" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包件名称" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="seePack(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 第N包渲染页 -->
      <div v-for="(item, index) in packLists" :key="index" v-if="btn_index === ('第' + (item.packNum) + '包')">
        <div v-if="item.purResultList.length!==0">
          <el-tabs type="border-card" v-for="(items, index) in item.purResultList" :key="index">
            <el-tab-pane label="详情">
              <el-table :data="items.resultDetailList" border style="width: 100%">
                <el-table-column type="index" label="序号" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="bid" label="中标情况" min-width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.bid | isBid}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="中标金额" min-width="140" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.bidMoney}}</span><span>{{scope.row.bidState | isUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="最终报价" min-width="140" align="center">
                  <template slot-scope="scope">
                    <span key="b">{{scope.row.offerMoney}}</span><span>{{scope.row.offerState | isUnit}}</span>
                  </template>
                </el-table-column>
                <!--隐藏录入人-->
                <div>
                  <!--<el-table-column label="录入人" min-width="50" align="center">-->
                  <!--<template slot-scope="scope">-->
                  <!--<el-button type="text">代理</el-button>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column label="录入时间" min-width="50" align="center">-->
                  <!--<template slot-scope="scope">-->
                  <!--<el-button type="text">2017-07-01</el-button>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column label="提醒" min-width="50" align="center">-->
                  <!--<template slot-scope="scope">-->
                  <!--<el-button type="text">未关联邮件</el-button>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column label="操作" min-width="50" align="center">-->
                  <!--<template slot-scope="scope">-->
                  <!--<el-button type="text">关联邮件</el-button>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                </div>

              </el-table>
            </el-tab-pane>
            <el-tab-pane label="邮件来往">
              <el-row>
                <el-col>
                  <el-button @click="dialogVisible = true" type="primary">关联邮件</el-button>
                  <el-button @click="dialogVisible1 = true" type="primary">手动添加采购人发来的邮件</el-button>
                </el-col>
                <el-table :data="tableData" border style="width: 100%;margin-top:6%;">
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
                      <el-button @click="seePack(scope.row)" type="text" size="small">查看</el-button>
                      <el-button type="text" size="small">取消关联</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-button type="primary" style="margin: 2% 47%;">提交</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else>
          <el-alert title="暂无数据" type="info"></el-alert>
        </div>
      </div>
    </div>
    <!--关联邮件-->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="90%">
      <associatedMail></associatedMail>
    </el-dialog>
    <!--添加邮件-->
    <el-dialog title="补录" :visible.sync="dialogVisible1" width="45%">
      <addMail></addMail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import ElDialog from "element-ui/packages/dialog/src/component";
  import associatedMail from '@/custom-components/project_manages/associatedMail';
  import addMail from '@/custom-components/project_manages/addMail';
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {expirePurchaseResultList} from '@/api/project'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import {deepClone, parseTime} from '@/utils'

  export default {
    components: {
      ElDialog,
      associatedMail,
      addMail,
      crumbs,
      selectBtn
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        packList: [],
        packLists: [],
        packDetailsList: [],
        packDetailsLists: [],     //提交成功后的数据
        packDetails: [],
        tableData: [],
        submitDatas: [],
        form: {
          "packId": 0,
          "resultState": 0,
          "resultDetailList": []
        },
        dialogVisible1: false,
        dialogVisible: false,
        checked: false,
        input: '',
        radio2: '',
        packageForm: '',
        radio_label: true,
        generalForm: true,
        hasMorePack: false,
        resData: {},
        pack_btn: 0,
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
      }
    },
    methods: {
      getList() {
        expirePurchaseResultList(this.projectId).then(response => {
          if (response.state === true) {
            this.resData = response.data
            this.packLists = response.data.packList
            this.hasMorePack = response.data.hasMorePack
            this.packList = deepClone(this.packLists)
            for (let i = this.packList.length - 1; i >= 0; i--) {
              if (this.packList[i].purResultList.length===0) {
                this.packList.splice(i, 1)
              }
            }
            if (this.hasMorePack === false) {
              this.buttonClick(0)
            }
          }
        })
      },
      getBtnIndex(index) {
        this.btn_index = index
        if (index === '全部') {
          this.getList()
          this.handleBtnView = index
        } else {
          this.handleBtnView = index
          this.pack_index = index.substring(1, index.length - 1)
          for (let i = 0; i < this.packLists.length; i++) {
            if (parseInt(this.pack_index) === parseInt(this.packLists[i].packNum)) {
              this.pack_btn = i
            }
          }
          this.buttonClick(this.pack_btn)
        }
      },
      seePack(row) {
        this.handleBtnView = '第' + row.packNum + '包'
        this.pack_index = '第' + row.packNum + '包'
        this.getBtnIndex(this.pack_index)
      },
      buttonClick(index) {
        this.packageForm = index
        this.form.packId = this.packLists[index].packId
        if (this.packageForm >= 0) {
          this.generalForm = false
        }
        if (this.packLists[index].purResultList !== null) {
          this.packDetailsList = []
          this.submitDatas = []
          this.submitDatas = this.packLists[index].purResultList
          this.packDetailsList = this.submitDatas
        }
        else {
          this.packDetailsList = []
          this.packDetailsList = this.packLists[index].passSupplierList
        }
        console.log(this.packDetailsList)
        this.DigitalConversionText()
      },
      totalButton() {
        this.packageForm = -1
        this.generalForm = true
      },
      deleteAttribute(arr, index) {
        delete arr[index].detailId
        delete arr[index].resultId
        delete arr[index].supplierCompanyId
        delete arr[index].supplierCompanyName
        delete arr[index].supplierUserId
        delete arr[index].newUserId
        delete arr[index].newUserTime
        delete arr[index].annexId
        delete arr[index].annexName
        delete arr[index].fileToken
        delete arr[index].annexUrl
      },
      DigitalConversionText() {
        for (let i = 0; i < this.packDetailsList.length; i++) {
          if (this.packDetailsList[i].bidState === "1") {
            this.packDetailsList[i].bidState = "文字"
            this.packDetailsList[i].offerState = "文字"
          }
          else if (this.packDetailsList[i].bidState === "2") {
            this.packDetailsList[i].bidState = "元"
            this.packDetailsList[i].offerState = "元"
          }
          else if (this.packDetailsList[i].bidState === "3") {
            this.packDetailsList[i].bidState = "元/个"
            this.packDetailsList[i].offerState = "元/个"
          }
          if (this.packDetailsList[i].bid === '0') {
            this.packDetailsList[i].bid = "未中标"
          }
          else {
            this.packDetailsList[i].bid = "中标"
          }
        }
      },
    }
  }
</script>

<style scoped>
  .el-tabs--border-card {
    margin-top: 2%;
  }
</style>
