<template>
  <div class="project-container">
    <crumbs :resData="projectInfo" v-if="projectInfo.projectName"></crumbs>
    <div v-if="!hasMorePack">
      <el-row>
        <div v-if="packLists[0].purResultList.length!==0">
          <div v-for="(items, index) in packLists[0].purResultList" :key="index">
            <el-col>
              <el-button type="primary" @click="uploadClivk = true">中标通知书</el-button>
              <el-button type="primary" @click="uploadClivk = false">未中标通知书</el-button>
            </el-col>
            <!--中标通知书-->
            <el-table v-show="uploadClivk" :data="items.bidDetailList" border
                      style="width: 100%">
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="offerMoney" label="中标金额" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="中标通知书" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="inputPerson" label="录入人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="remind" label="录入时间" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="操作" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">关联邮件</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--未中标通知书-->
            <el-table :data="items.noBidDetailList" border style="width: 100%;margin:5% 0 3%;;" v-show="!uploadClivk">
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="未中标通知书" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="inputPerson" label="上传人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="remind" label="上传时间" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="操作" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-else>
          <el-alert title="暂无数据" type="info"></el-alert>
        </div>
      </el-row>
    </div>
    <div v-else>
      <el-row>
        <select-btn :packList="packLists" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      </el-row>
      <!-- 默认全部 -->
      <el-table :data="packList" border v-show="handleBtnView === '全部'">
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
        <div v-if="packLists[index].purResultList.length!==0">
          <div v-for="(items, index) in packLists[index].purResultList" :key="index">
            <el-col style="margin: 2% 0">
              <el-button type="primary" @click="uploadClivk = true">中标通知书</el-button>
              <el-button type="primary" @click="uploadClivk = false">未中标通知书</el-button>
            </el-col>
            <!--中标通知书-->
            <el-table v-show="uploadClivk" :data="items.bidDetailList" border
                      style="width: 100%;margin:5% 0 3%;">
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="offerMoney" label="中标金额" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="中标通知书" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="inputPerson" label="录入人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="remind" label="录入时间" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="操作" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">关联邮件</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--未中标通知书-->
            <el-table :data="items.noBidDetailList" border style="width: 100%;margin:5% 0 3%;;" v-show="!uploadClivk">
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="unsuccessfulBid" label="未中标通知书" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="inputPerson" label="上传人" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="remind" label="上传时间" min-width="80" align="center">
              </el-table-column>
              <el-table-column label="操作" min-width="80" align="center">
                <template slot-scope="scope">
                  <el-button type="text"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-else>
          <el-alert title="暂无数据" type="info"></el-alert>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {expireResultAdviceNoteList} from '@/api/project'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import {deepClone, parseTime} from '@/utils'

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
        default_tab: true,
        uploadClivk: true,
        hasMorePack: false,
        handleIndex: null,
        projectInfo: {},
        packLists: [],
        packList: [],
        bidDetailList: [],
        noBidDetailList: [],
        purResultLists: [],
        pack_btn: 0,
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
      }
    },
    methods: {
      getList() {
        expireResultAdviceNoteList(this.projectId).then(response => {
          this.projectInfo = response.data
          this.packLists = response.data.packList
          this.hasMorePack = response.data.hasMorePack
          this.packList = deepClone(this.packLists)
          for (let i = this.packList.length - 1; i >= 0; i--) {
            if (this.packList[i].purResultList.length === 0) {
              this.packList.splice(i, 1)
            }
          }
          if (this.hasMorePack === false) {
            this.buttonClick(0)
          }
        })
      },
      buttonClick(index) {
        this.bidDetailList = []
        this.noBidDetailList = []
        this.purResultLists = this.packLists[index].purResultList
        if (this.purResultLists.length !== 0) {
          for (const itema of this.purResultLists) {
            this.bidDetailList = [...this.bidDetailList, ...itema.bidDetailList]
            this.noBidDetailList = [...this.noBidDetailList, ...itema.noBidDetailList]
          }
        }
        console.log(this.purResultLists)
      },
      getBtnIndex(index) {
        this.getList()
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
      seePack(row) {
        this.handleBtnView = '第' + row.packNum + '包'
        this.pack_index = '第' + row.packNum + '包'
        this.getBtnIndex(this.pack_index)
      },
    }
  }
</script>

<style scoped>
  .el-tabs--border-card {
    margin-top: 2%;
  }
</style>
