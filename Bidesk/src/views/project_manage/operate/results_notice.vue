<template>
  <div class="project-container">
    <crumbs :resData="resData" v-if="resData"></crumbs>
    <!--有包显示-->
    <el-row v-if="resData.hasMorePack">
      <select-btn :packList="packList" :handleBtnView="handleBtnView" @transferIndex="getBtnIndex"></select-btn>
      <!--默认全部-->
      <el-table v-show="handleBtnView === '全部'" :data="noticeList" border>
        <el-table-column align="center" label="包号">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="packName" label="包名"></el-table-column>
        <!--<el-table-column align="center" prop="createUserId" label="发布人"></el-table-column>-->
        <el-table-column align="center" prop="noticePublishTime" label="发布时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewBtn(scope.row)" size="mini"> 查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--渲染有包-->
      <results_notice_view v-for="(item, index) in resData.packList" :key="index"
                           v-if="handleBtnView === ('第' + (item.packNum) + '包')"
                           :resNoticeVOList="item.noticeVOList"></results_notice_view>
    </el-row>
    <el-row v-else>
      <results_notice_no :resNoticeVOListNo="resNoticeVOListNo"></results_notice_no>
    </el-row>
  </div>
</template>
<script>
  import {expireResultNoticeList} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs'
  import results_notice_view from '@/custom-components/project_manages/results_notice_view'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import results_notice_no from '@/custom-components/project_manages/results_notice_no'

  export default {
    components: {
      // TinyMce,
      results_notice_view,
      crumbs,
      selectBtn,
      results_notice_no
      // Upload
    },
    mounted() {
      this.getList()
    },
    computed: {
    },
    data() {
      return {
        pack_file: {},
        noticeList: [],
        resNoticeVOListNo: [],
        packList: [],
        projectId: this.$store.getters.subProjectId,
        default_table: true,
        resData: {},
        handleBtnView: '全部'
      }
    },
    methods: {
      getList() {
        expireResultNoticeList(this.projectId).then(response => {
          this.resData = response.data
          // console.log(this.resData)
          this.packList = response.data.packList
          this.resNoticeVOListNo = response.data.packList[0].noticeVOList
//          获取有数据的包件
          const array = [...response.data.packList]
          for (let i = 0; i < array.length; i++) {
            if (array[i].noticeVOList.length === 0) {
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
