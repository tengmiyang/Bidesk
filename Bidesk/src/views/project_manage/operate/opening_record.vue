<template>
  <div class="app-container">
    <crumbs :resData="resData" v-if="resData.projectName"></crumbs>
    <el-row v-show="resData.hasMorePack">
      <el-col>包件编号：
        <el-button @click="default_tab = true">全部</el-button>
        <el-button v-for="(item, index) in res_pack_list" :key="index" @click="buttonClick(index)">{{'第'+ (item.packNum)+
          '包'}}
        </el-button>
      </el-col>
      <!--默认全部-->
      <el-table :data="res_pack_list" border style="width: 100%;margin:3% 0" v-if="default_tab">
        <el-table-column width="80" align="center" label="包号">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="packName" label="包名"></el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click=" buttonClick(scope.$index)" size="mini"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--点击第N包渲染-->
      <el-table v-for="(itme,index) in res_pack_list" v-if="handleIndex === index && !default_tab" :key="index"
                :show-header="tab_header" style="margin:3% 0"
                border :data="res_pack_list[index].bidRecordList">
        <el-table-column align="center" prop="recordName">
        </el-table-column>
        <el-table-column align="center" prop="annexName" :label="itme.annexName">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-show="!resData.hasMorePack">
      <!--点击第N包渲染-->
      <el-table :show-header="tab_header" style="margin:3% 0" border :data="res_bidRecordList">
        <el-table-column align="center" prop="recordName">
        </el-table-column>
        <el-table-column align="center" prop="annexName">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.annexName}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
  import {expireProjectRecord} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs'

  export default {
    components: {
      crumbs
    },
    data() {
      return {
        tab_header: false,
        default_tab: true,
        handleIndex: 0,
        projectId: this.$store.getters.subProjectId,
        resData: {},
        res_pack_list: [],
        res_bidRecordList: [],
        hasPackList: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        expireProjectRecord(this.projectId).then(response => {
          this.resData = response.data
          this.res_pack_list = response.data.packList
          // console.log(response)
          this.res_bidRecordList = response.data.packList[0].bidRecordList
        })
      },
      buttonClick(index) {
        this.handleIndex = index
        // alfter(index)
        // this.purResultList = this.packList[index].purResultList
        this.default_tab = false
      },
    }
  }
</script>

<style scoped>


</style>
