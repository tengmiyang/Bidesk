<template>
  <div class="project-container">
    <crumbs :resData="resData"></crumbs>
    <el-row v-if="resData.hasMorePack">
      <select-btn :packList="res_pack_list" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      <!--默认全部-->
      <el-table :data="hasPackList" border style="width: 100%" v-show="handleBtnView === '全部'">
        <el-table-column align="center" label="包号" width="100">
          <template slot-scope="scope">
            第{{scope.row.packNum}}包
          </template>
        </el-table-column>
        <el-table-column align="center" prop="packName" label="包名"></el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click=" viewBtn(scope.row)" size="mini"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--点击第N包渲染-->
      <template v-for="(item, index) in res_pack_list" v-if="handleBtnView === ('第' + (item.packNum) + '包')">
        <el-table v-show="item.processList.length === 0" :data="[]"></el-table>
        <el-table v-for="(tab, index) in item.processList" :key="index" :show-header="tab_header" style="margin:1% 0"
                  border :data="tab.bidRecordList">
          <el-table-column align="center" prop="recordName">
          </el-table-column>
          <el-table-column align="center" prop="annexName" :label="item.annexName">
            <template slot-scope="scope">
              <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>
    <el-row v-else>
      <el-table v-show="noHasPackList.length === 0" :data="[]"></el-table>
      <!--<el-col style="text-align: center" v-show="noHasPackList.length === 0" :span="24">还未提交数据</el-col>-->
      <el-table v-for="(tab, index) in noHasPackList" :key="index" :show-header="tab_header" style="margin:3% 0"
                border :data="noHasPackList[index].bidRecordList">
        <el-table-column align="center" prop="recordName">
        </el-table-column>
        <el-table-column align="center" prop="annexName" :label="tab.annexName">
          <template slot-scope="scope">
            <el-button @click="downloadFlie(scope.row)" type="text" size="small">{{scope.row.annexName}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
  import {expireQuestionList, downloadFile} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs'
  import selectBtn from '@/custom-components/project_manages/selectBtn'

  export default {
    components: {
      crumbs,
      selectBtn
    },
    data() {
      return {
        handleBtnView: '全部',
        tab_header: false,
        default_tab: true,
        handleIndex: 0,
        projectId: this.$store.getters.subProjectId,
        resData: {},
        res_pack_list: [],
        hasPackList: [],
        noHasPackList: [],
        noHasPackList1: []
      }
    },
    mounted() {
      this.getList()
    },
//    computed: {
//      res_process_list() {
//        return this.res_pack_list[this.handleIndex].processList
//      }
//    },
    methods: {
      downloadFlie(row) {
        downloadFile(row.annexId).then(response => {
          // console.log(response)
        })
      },
      getBtnIndex(index) {
        this.getList()
        this.handleBtnView = index
      },
      viewBtn(row) {
        this.handleBtnView = '第' + row.packNum + '包'
      },
      getList() {
        expireQuestionList(this.projectId).then(response => {
          this.resData = response.data
           console.log(response)
          this.res_pack_list = response.data.packList
          // // console.log(this.res_pack_list[0].processList)
          const array = [...this.res_pack_list]
          for (let i = 0; i < array.length; i++) {
            if (array[i].processList.length === 0) {
              array.splice(i, 1)
              i = i - 1
            }
            this.hasPackList = array
          }
          if (response.data.hasMorePack === false) {
            this.noHasPackList = response.data.packList[0].processList
            // console.log(this.noHasPackList)
          }
        })
      },
      buttonClick(index) {
        this.handleIndex = index
        this.default_tab = false
      },
    }
  }
</script>

<style scoped>

</style>
