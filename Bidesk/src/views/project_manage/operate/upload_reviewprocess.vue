<template>
  <div class="project-container">
    <el-row>
      <crumbs :resData="resData"></crumbs>
    </el-row>
    <!--有包显示-->
    <el-row v-if="resData.hasMorePack">
      <select-btn :packList="resData.packList" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      <!--默认全部-->
      <el-table class="project-table" border v-show="handleBtnView === '全部'" :data="defaultTable">
        <el-table-column width="80" align="center" label="包号">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="packName" label="包名"></el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="viewBtn(scope.row)" size="mini"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--渲染有包-->
      <reviewprocessForm style="margin:1% 0" v-for="(item, index) in resData.packList" :key="index"
                         v-if="handleBtnView === ('第' + (item.packNum) + '包')" :resData="resData" :projectId="projectId"
                         :selectIndex="index"></reviewprocessForm>
    </el-row>

    <!--无包显示-->
    <template v-loading="listLoading" element-loading-text="加载中..." v-else>
      <reviewprocessAdd :resData="resData" :projectId="projectId" v-if="resData.packList"></reviewprocessAdd>
    </template>
  </div>
</template>
<script>
  import reviewprocessForm from '@/custom-components/project_manages/reviewprocessForm'
  import reviewprocessAdd from '@/custom-components/project_manages/reviewprocessAdd'
  import {ProjectRecordProcess} from '@/api/project'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import crumbs from '@/custom-components/project_manages/crumbs'

  export default {
    components: {
      reviewprocessForm,
      reviewprocessAdd,
      crumbs,
      selectBtn
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
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
        this.getList()
        this.handleBtnView = index
        if (index === '全部') {
          this.$router.push({path: '/'})
          this.$router.push({name: '上传评审过程文件'})
        }
      },
      viewBtn(row) {
        this.handleBtnView = '第' + row.packNum + '包'
      },
      getList() {
        ProjectRecordProcess(this.projectId).then(response => {
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
        })
      }
    }
  }
</script>

<style scoped>
  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }

  .el-radio-button:first-child .el-radio-button__inner {
    /*border-left: 1px;*/
  }

  .el-checkbox {
    color: #000000;
  }
</style>
