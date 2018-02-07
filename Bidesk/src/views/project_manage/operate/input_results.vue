<template>
  <div class="project-container">
    <crumbs :resData="resData" v-if="resData.projectName"></crumbs>
    <div v-if="!hasMorePack">
      <el-tabs type="border-card" style="min-height: 300px;height: 300px;">
        <el-tab-pane label="详情">
          <template>
            <span v-if="HaveRadios">是否有中标人：
              <el-radio-group v-model="HaveRadio" @change="noChange">
              <el-radio :label="1">有中标人</el-radio>
              <el-radio :label="0">无中标人</el-radio>
            </el-radio-group>
            </span>
            <span v-else>
              <span v-if="HaveRadioed">有中标人</span>
              <span v-else>无中标人</span>
            </span>
          </template>
          <!-- 有中标人 -->
          <div v-show="ShowWinBidder">
            <el-table :data="packDetailsList" border style="width: 100%">
              <el-table-column type="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="120" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.supplierCompanyName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.supplierUserName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.supplierUserPhone"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="中标情况" min-width="50" align="center">
                <template slot-scope="scope">
                  <el-checkbox :checked='scope.row.bid' v-model="scope.row.bid"
                               @change="checkBoxs(scope.row, scope.$index)" :disabled="disabledcheckbox">中标人
                  </el-checkbox>
                </template>
              </el-table-column>
              <!--有包切換-->
              <el-table-column label="中标金额" min-width="120" align="center">
                <template slot-scope="scope">
                <span v-if="scope.row.bid">
                  <el-radio-group @change="radio_select(scope.row)" v-model="scope.row.bidState">
                  <el-radio :label="1">文字</el-radio>
                  <el-radio :label="2">元</el-radio>
                  <el-radio :label="3">元/件</el-radio>
                </el-radio-group>
                <el-input v-model="scope.row.bidMoney"></el-input>
                </span>
                </template>
              </el-table-column>
              <el-table-column label="最终报价" min-width="120" align="center">
                <template slot-scope="scope">
                <span v-if="scope.row.bid">
                  <el-radio-group @change="radio_select(scope.row)" v-model="scope.row.bidState">
                  <el-radio :label="1">文字</el-radio>
                  <el-radio :label="2">元</el-radio>
                  <el-radio :label="3">元/件</el-radio>
                </el-radio-group>
                <el-input v-model="scope.row.offerMoney"></el-input>
                </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="50" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteRow(scope.$index)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="submitInfo" style="margin: 2% 47%;">提交</el-button>
          </div>
          <div v-if="Showbid">
            <el-table :data="packDetailsLists" border style="width: 100%">
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
                 <span v-if="scope.row.bidMoney">
                    <span>{{scope.row.bidMoney}}</span><span>{{scope.row.bidState | isUnit}}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="最终报价" min-width="140" align="center">
                <template slot-scope="scope">
                 <span v-if="scope.row.offerMoney">
                    <span key="b">{{scope.row.offerMoney}}</span><span>{{scope.row.offerState | isUnit}}</span>
                  </span>
                </template>
              </el-table-column>
              <div>
                <!--<el-table-column label="录入人" min-width="50" align="center">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button type="text">代理</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="路人时间" min-width="50" align="center">-->
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
            <el-col style="text-align: center;margin-top: 2%">
              <el-button type="primary" @click="Reentry">重新录入采购结果</el-button>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮件来往">
          <el-row>
            <el-col style="text-align: right;margin-bottom: 1%">
              <el-button @click="dialogVisible = true" type="primary">关联邮件</el-button>
              <el-button @click="dialogVisible1 = true" type="primary">手动添加采购人发来的邮件</el-button>
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
    </div>
    <div v-else>
      <el-row>
        <select-btn :packList="packLists" @transferIndex="getBtnIndex" :handleBtnView="handleBtnView"
                    style="margin-bottom: 1%"></select-btn>
      </el-row>
      <!-- 默认全部 -->
      <el-table :data="packList" border style="width: 100%" v-show="handleBtnView === '全部'">
        <el-table-column label="包号" min-width="80" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包件名称" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.packName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="SeePack(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 第N包渲染页 -->
      <el-tabs style="min-height: 300px;" type="border-card" v-for="(item, index) in packLists"
               :key="index"
               v-if="btn_index === ('第' + (item.packNum) + '包')">
        <el-tab-pane label="详情">
          <template>
            <span v-if="HaveRadios" style="font-size: 0.87em">是否有中标人：
              <el-radio-group v-model="HaveRadio" @change="noChange">
              <el-radio :label="1">有中标人</el-radio>
              <el-radio :label="0">无中标人</el-radio>
            </el-radio-group>
            </span>
            <span v-else>
              <span v-show="ShowBidInfo" style="font-size: 0.87em">是否有中标人：
                <span v-if="HaveRadioed">有中标人</span>
              <span v-else>无中标人</span>
              </span>
            </span>
          </template>
          <!-- 输入中标信息 -->
          <div v-show="ShowWinBidder">
            <el-table :data="packDetailsList" border style="width: 100%">
              <el-table-column type="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.supplierCompanyName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="70" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.supplierUserName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="70" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.supplierUserPhone"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="中标情况" min-width="50" align="center">
                <template slot-scope="scope">
                  <el-checkbox :checked='scope.row.bid' v-model="scope.row.bid"
                               @change="checkBoxs(scope.row, scope.$index)" :disabled="disabledcheckbox">中标人
                  </el-checkbox>
                </template>
              </el-table-column>
              <!--有包切換-->
              <el-table-column label="中标金额" min-width="160" align="center">
                <template slot-scope="scope">
                <span v-if="scope.row.bid">
                  <el-radio-group @change="radio_select(scope.row)" v-model="scope.row.bidState">
                  <el-radio :label="1">文字</el-radio>
                  <el-radio :label="2">元</el-radio>
                  <el-radio :label="3">元/件</el-radio>
                </el-radio-group>
                <el-input v-model="scope.row.bidMoney"></el-input>
                </span>
                </template>
              </el-table-column>
              <el-table-column label="最终报价" min-width="160" align="center">
                <template slot-scope="scope">
                <span v-if="scope.row.bid">
                  <el-radio-group @change="radio_select(scope.row)" v-model="scope.row.bidState">
                  <el-radio :label="1">文字</el-radio>
                  <el-radio :label="2">元</el-radio>
                  <el-radio :label="3">元/件</el-radio>
                </el-radio-group>
                <el-input v-model="scope.row.offerMoney"></el-input>
                </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteRow(scope.$index)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <span>
              <el-button type="primary" @click="submitInfo" style="margin: 2% 47%;">提交</el-button>
           </span>
          </div>
          <!--显示中标信息-->
          <div v-if="Showbid">
            <el-table :data="packDetailsLists" border style="width: 100%">
              <el-table-column type="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商名称" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="70" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="70" align="center">
              </el-table-column>
              <el-table-column prop="bid" label="中标情况" min-width="50" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.bid | isBid}}</span>
                </template>
              </el-table-column>
              <el-table-column label="中标金额" min-width="160" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.bidMoney&&(scope.row.bid-1===0)">
                    <span>{{scope.row.bidMoney}}</span><span>{{scope.row.bidState | isUnit}}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="最终报价" min-width="160" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.offerMoney&&(scope.row.bid-1===0)">
                    <span key="b">{{scope.row.offerMoney}}</span><span>{{scope.row.offerState | isUnit}}</span>
                  </span>
                </template>
              </el-table-column>
              <div>
                <!--<el-table-column label="录入人" min-width="50" align="center">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button type="text">代理</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="路人时间" min-width="50" align="center">-->
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
            <el-col style="text-align: center;margin-top: 2%">
              <el-button type="primary" @click="Reentry">重新录入采购结果</el-button>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮件来往">
          <el-row>
            <el-col style="text-align: right;margin-bottom: 1%">
              <el-button @click="dialogVisible = true" type="primary">关联邮件</el-button>
              <el-button @click="dialogVisible1 = true" type="primary">手动添加采购人发来的邮件</el-button>
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
          <el-button type="primary" style="margin: 2% 47%;">提 交</el-button>
        </el-tab-pane>
      </el-tabs>
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
  import {expirePurchaseResultInit, expirePurchaseResultSave} from '@/api/project'
  import {deepClone, parseTime} from '@/utils'
  import selectBtn from '@/custom-components/project_manages/selectBtn'

  export default {
    components: {
      ElDialog, associatedMail, addMail, crumbs, selectBtn
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        packLists: [],
        packList: [],
        packDetailsList: [],
        packDetailsLists: [],     //提交成功后的数据
        packDetails: [],
        tableData: [],
        submitDatas: [],
        inputShow: false,
        disabledcheckbox: false,
        hasMorePack: false,
        ShowWinBidder: false,
        ShowBidInfo: false,
        Showbid: true,
        ShowInput: false,
        form: {
          "packId": 0,
          "resultState": 0,
          "resultDetailList": []
        },
        dialogVisible1: false,
        dialogVisible: false,
        checked: false,
        HaveRadio: 1,
        HaveRadios: true,
        HaveRadioed: true,
        radio_label: true,
        resData: {},
        bidInfo: 0,
        pack_btn: 0,
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
      }
    },
    computed: {},
    methods: {
      getBtnIndex(index) {
        this.btn_index = index
        if (index === '全部') {
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
      SeePack(row) {
        this.btn_index = '第' + row.packNum + '包'
        this.handleBtnView = '第' + row.packNum + '包'
        this.getBtnIndex(this.btn_index)
      },
      getList() {
        expirePurchaseResultInit(this.projectId).then(response => {
          // console.log(response)
          this.resData = response.data
          this.packLists = response.data.packList
          this.hasMorePack = response.data.hasMorePack
          if (this.hasMorePack === true) {
            this.packList = deepClone(this.packLists)
            for (let i = this.packList.length - 1; i >= 0; i--) {
              if (this.packList[i].purResultList === null) {
                this.packList.splice(i, 1)
              }
            }
          }
          else {
            this.buttonClick(0)
          }
        })
      },
//      选择中标情况
      radio_select(row) {
        if (this.HaveRadio === 1) {
          this.radio_label = true
        } else {
          this.radio_label = false
        }
        row.offerState = row.bidState
      },
      handleClick(row) {
        // console.log(row);
      },
      deleteRow(index) {
        this.packDetails.splice(index, 1);
      },
//      包件按钮
      buttonClick(index) {
        this.packDetailsList = []
        this.packDetailsLists = []
        this.packDetails = []
        this.pack_btn = index
        this.form.packId = this.packLists[index].packId
        if (this.packLists[index].purResultList !== null) {
          this.submitDatas = []
          this.submitDatas = this.packLists[index].purResultList
          for (const item of this.submitDatas) {
            this.packDetailsList = [...this.packDetailsList, ...item.resultDetailList]
          }
          for (let i = 0; i < this.packDetailsList.length; i++) {
//            this.packDetailsList[i].bid=0
            if (this.packDetailsList[i].bid === '1' || (this.packDetailsList[i].bid - 1 === 0)) {
              this.bidInfo = 1
              break
            }
            else {
              this.bidInfo = 2
            }
          }
          if (parseInt(this.submitDatas[0].resultState) === 1 || this.bidInfo === 1) {
            this.inputShow = false
            this.HaveRadio = 1
            this.HaveRadioed = true
          }
          else {
            this.inputShow = true
            this.HaveRadio = 2
            this.HaveRadioed = false
          }
          this.ShowBidInfo = true
          this.ShowWinBidder = false
          this.Showbid = true
          this.HaveRadios = true
          if (this.ShowWinBidder === true && this.Showbid === false) {
            this.HaveRadios = true
            for (let i = 0; i < this.packDetailsList.length; i++) {
              if (this.packDetailsList[i].bidState === "1") {
                this.packDetailsList[i].bidState = 1
              }
              else if (this.packDetailsList[i].bidState === "2") {
                this.packDetailsList[i].bidState = 2
              }
              else {
                this.packDetailsList[i].bidState = 3
              }
            }
          }
          else {
            this.HaveRadios = false
          }
        }
        else {
          this.ShowWinBidder = true
          this.Showbid = false
          this.ShowBidInfo = false
          this.HaveRadios = true
          this.packDetailsList = this.packLists[index].passSupplierList
          for (let i = 0; i < this.packDetailsList.length; i++) {
//            this.packDetailsList[i].bid=0
          }
        }
        this.packDetails = deepClone(this.packDetailsList)
        this.packDetailsLists = deepClone(this.packDetailsList)
      },
//      有无中标人
      noChange() {
        if (this.HaveRadio === 1) {
          this.checked = false
          this.HaveRadioed = true
          this.disabledcheckbox = false
        }
        else {
          this.checked = true
          this.disabledcheckbox = true
          this.HaveRadioed = false
          this.packDetailsList = deepClone(this.packDetailsList)
          for (let i = 0; i < this.packDetailsList.length; i++) {
            this.packDetailsList[i].bid = false
          }
        }
//        alert(typeof this.HaveRadio)
      },
      checkBoxs(row, index) {
        if (row.bid === true) {
          this.ShowInput = true
        }
        else {
          this.ShowInput = false
        }
      },
//      提交按钮
      submitInfo() {
        this.form.resultDetailList = []
        this.packDetailsLists = deepClone(this.packDetailsList)
        this.TransformationSubmit(this.packDetailsLists)
        this.form.resultDetailList = deepClone(this.packDetailsLists)
        this.form.resultState = this.HaveRadio
        for (let i = 0; i < this.form.resultDetailList.length; i++) {
          this.deleteAttribute(this.form.resultDetailList, i)
          if (this.form.resultDetailList[i].bid === '1') {
            this.HaveRadios = false
            this.HaveRadioed = true
          }
          else {
            this.HaveRadioed = false
            this.form.resultDetailList[i].bidState = ''
            this.form.resultDetailList[i].bidMoney = ''
            this.form.resultDetailList[i].offerState = ''
            this.form.resultDetailList[i].offerMoney = ''
          }
          if (this.form.resultState === 0) {
            this.form.resultDetailList[i].bid = '0'
            this.form.resultDetailList[i].bidState = ''
            this.form.resultDetailList[i].bidMoney = ''
            this.form.resultDetailList[i].offerState = ''
            this.form.resultDetailList[i].offerMoney = ''
          }
        }
        expirePurchaseResultSave(this.form).then(response => {
          // console.log(response)
          if (response.state === true) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getList()
            this.packDetailsLists = response.data.resultDetailList
            this.packDetailsList = this.packDetailsLists
            this.HaveRadios = false
            this.ShowWinBidder = false
            this.ShowBidInfo = true
            this.Showbid = true
            if (this.HaveRadio === 1) {
              this.HaveRadioed = true
            }
            else {
              this.HaveRadioed = false
            }
          }
          else {
            this.$message({
              message: '操作失败',
              type: 'warning'
            });
          }
        })
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
//      重新录入按钮
      Reentry() {
        this.ShowWinBidder = true
        this.Showbid = false
        this.HaveRadios = true
        for (let i = 0; i < this.packDetailsList.length; i++) {
          this.packDetailsList[i].bid = false
        }
      },
//      数字转为文字
      TransformationSubmit(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].bidState === 1 || arr[i].bidState === "文字") {
            arr[i].bidState = "1"
            arr[i].offerState = "1"
          }
          else if (arr[i].bidState === 2 || arr[i].bidState === "元") {
            arr[i].bidState = "2"
            arr[i].offerState = "2"
          }
          else if (arr[i].bidState === 3 || arr[i].bidState === "元/个") {
            arr[i].bidState = "3"
            arr[i].offerState = "3"
          }
          if (arr[i].bid === false||arr[i].bid===undefined) {
            arr[i].bid = "0"
          }
          else {
            arr[i].bid = "1"
          }
          if (this.HaveRadio === 2) {
            this.HaveRadioed = false
          }
          else {
            this.HaveRadioed = true
          }
        }
      },
    }
  }
</script>

<style scoped>
  .el-tabs--border-card {
    margin-top: 1%;
  }

  .el-table__body-wrapper .el-input .el-input__inner {
    width: 70%;
  }

  /*.input .el-tabs__content {*/
  /*min-height: 300px;*/
  /*height: 300px;*/
  /*}*/
</style>
<style>


</style>
