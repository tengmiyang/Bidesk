<template>
  <div class="project-container">
    <crumbs :resData="resData" v-if="resData"></crumbs>
    <!--有包显示-->
    <el-row v-loading="listLoading" element-loading-text="加载中..."   v-if="resData.hasMorePack === true">
      <select-btn :packList="resData.packList" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      <!--默认全部-->
      <el-table v-show="handleBtnView === '全部'" :data="noticeList" border>
        <el-table-column width="80" align="center" label="包号">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="packName" label="包名"></el-table-column>
        <el-table-column align="center" prop="noticeVO.notice.noticeName" label="公告名称"></el-table-column>
        <!--<el-table-column align="center" prop="createUserId" label="发布人"></el-table-column>-->
        <el-table-column align="center" prop="createTime" label="发布时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="viewBtn(scope.row)" size="mini"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--渲染有包-->
      <resultsAdd v-for="(item, index) in resData.packList" :key="index"
                  v-if="handleBtnView === ('第' + (item.packNum) + '包')"
                  :selectIndex="index" :packList="packList" :resData="resData"
                  style="padding: 0 4% 0 2%;"></resultsAdd>
    </el-row>

    <!--无包显示-->
    <el-row v-loading="listLoading" element-loading-text="加载中..."  v-else>
      <resultsForm :resData="resData" v-if="resData.packList" style="padding: 0 4% 0 2%;"></resultsForm>
    </el-row>
  </div>
</template>
<script>
  import resultsForm from '@/custom-components/project_manages/resultsForm'
  import resultsAdd from '@/custom-components/project_manages/resultsAdd'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import {expireResultNoticeInit, expireResultNoticeSave} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs'

  export default {
    components: {
      resultsForm,
      selectBtn,
      resultsAdd,
      crumbs
      // Upload
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        listLoading: true,
        handleBtnView: '全部',
        pack_file: {},
        noticeList: [],
        packList: [],
        projectId: this.$store.getters.subProjectId,
        default_table: true,
        resData: {},
        btn_index: '',
      }
    },
    methods: {
      getList() {
        expireResultNoticeInit(this.projectId).then(response => {
          if (response.state) {
            setTimeout(() => {
              this.listLoading = false
            }, 300)
          }
          this.resData = response.data
          this.packList = response.data.packList
//          获取有数据的包件
          const array = [...response.data.packList]
          for (let i = 0; i < array.length; i++) {
            if (array[i].noticeVO.notice === null) {
              array.splice(i, 1)
              i = i - 1
            }
            this.noticeList = array
          }
        })
      },
      getBtnIndex(index) {
        this.listLoading = true
        this.getList()
        this.handleBtnView = index
      },
      viewBtn(row) {
        this.handleBtnView = '第' + row.packNum + '包'
      },
    }
  }
</script>

<style scoped>
  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }
</style>
