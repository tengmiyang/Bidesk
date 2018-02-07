<template>
  <div class="project-container">
    <el-row>
      <crumbs :resData="resData"></crumbs>
    </el-row>
    <!--有包显示-->
    <el-row v-if="resData.hasMorePack">
      <select-btn :packList="packList" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      <!--默认全部-->
      <el-table class="project-table" border v-show="handleBtnView === '全部'" :data="defaultTable">
        <el-table-column width="80" align="center" label="包号">
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

      <!--渲染有包-->
      <bidopeningForm style="margin:1% 0" v-for="(item, index) in resData.packList"
                      :key="index"
                      v-if="handleBtnView === ('第' + (item.packNum) + '包')" :resData="resData"
                      :selectIndex="index"></bidopeningForm>
    </el-row>

    <!--无包显示-->
    <template v-loading="listLoading" element-loading-text="加载中..." v-else>
      <bidopeningAdd :resData="resData" :projectId="projectId" v-if="resData.packList"></bidopeningAdd>
    </template>
  </div>
</template>
<script>
  import bidopeningForm from '@/custom-components/project_manages/bidopeningForm'
  import bidopeningAdd from '@/custom-components/project_manages/bidopeningAdd'
  import {expireProjectRecord} from '@/api/project'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {deepClone} from '@/utils'

  export default {
    components: {
      bidopeningForm,
      bidopeningAdd,
      crumbs,
      selectBtn
    },
    mounted() {
      this.getList()
//      this.increment()
    },
    computed: {
      packList() {
        return this.resData.packList
      }
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        listLoading: true,
        resData: {},
        handleBtnView: '全部',
        defaultTable: [],
        new_obj: {
          "recordId": null,
          "recordName": "",
          "annexId": null,
          "annexName": null
        }
      }
    },
    methods: {
      getBtnIndex(index) {
        this.listLoading = true
        if (index === '全部') {
          this.$router.push({path: '/'})
          this.$router.push({name: '上传开标记录'})
        }
        this.getList()
        this.handleBtnView = index
      },
      viewBtn(row) {
        this.handleBtnView = '第' + row.packNum + '包'
      },
      getList() {
        expireProjectRecord(this.projectId).then(response => {
          console.log(response)
            this.resData = response.data
            const Array = [...response.data.packList]
            Array.forEach((item) => {
              for (let i = 0; i < item.bidRecordList.length; i++) {
                if (item.bidRecordList[i].annexName !== null) {
                  this.defaultTable.push(item)
                  this.defaultTable = [...new Set(this.defaultTable)] // 数组去重
                }
              }
            })
          }
        )
      }
    }
  }
</script>

<style scoped>
  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }

</style>
<style>
  .el-radio-button__inner {
    border-color: #d8dce5;
  }
</style>
