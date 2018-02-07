<template>
  <div class="project-container">
    <crumbs :resData="resData" v-show="resData.projectName"></crumbs>
    <el-row v-show="hasMorePack">
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
            <el-button @click="viewBtn(scope.row)" size="mini"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--第N包渲染-->
      <!--点击第N包渲染-->
      <el-table v-for="(item, index) in res_pack_list" v-if="handleBtnView === ('第' + (item.packNum) + '包')"
                :key="index"
                style="margin:3% 0"
                border :data="item.bidRecordList">
        <el-table-column align="center" prop="annexName" label="文件名称">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" prop="uploadUserId" label="上传人">-->
        <!--</el-table-column>-->
        <el-table-column align="center" prop="uploadTime" label="上传时间">
          <template slot-scope="scope">
            <span>{{scope.row.uploadTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-show="hasMorePack === false">
      <el-table style="margin:3% 0" border :data="noHasPack">
        <el-table-column align="center" prop="annexName" label="文件名称">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" prop="uploadUserId" label="上传人">-->
        <!--</el-table-column>-->
        <el-table-column align="center" prop="uploadTime" label="上传时间">
          <template slot-scope="scope">
            <span>{{scope.row.uploadTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {expireProjectSurveyList} from '@/api/project'
  import selectBtn from '@/custom-components/project_manages/selectBtn'

  export default {
    components: {
      crumbs,
      selectBtn
    },
//    computed: {
//      res_record_list() {
//        return this.res_pack_list[this.handleIndex].bidRecordList
//      }
//    },
    data() {
      return {
        default_tab: true,
        handleIndex: null,
        hasPackList: [],
        projectId: this.$store.getters.subProjectId,
        resData: {},
        res_pack_list: [],
        noHasPack: [],
        handleBtnView: '全部',
        hasMorePack: null
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getBtnIndex(index) {
        this.getList()
        this.handleBtnView = index
      },
      getList() {
        expireProjectSurveyList(this.projectId).then(response => {
          this.resData = response.data
          this.res_pack_list = response.data.packList
          this.hasMorePack = response.data.hasMorePack
          console.log(response)
          if (this.hasMorePack === false) {
            this.noHasPack = this.res_pack_list[0].bidRecordList
          }
          const array = [...response.data.packList]
          for (let i = 0; i < array.length; i++) {
            // // console.log(array[i].bidRecordList)
            if (array[i].bidRecordList.length === 0) {
              array.splice(i, 1)
              i = i - 1
            }
            this.hasPackList = array
          }
        })
      },
      viewBtn(row) {
        this.handleBtnView = '第' + row.packNum + '包'
      },
    }
  }
</script>

<style scoped>


</style>
