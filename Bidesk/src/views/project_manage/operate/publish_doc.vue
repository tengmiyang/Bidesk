<template>
  <div class="project-container">
    <el-main >
      <crumbs :resData="resData" v-if="resData"></crumbs>
      <!--有包显示-->
      <el-row v-loading="listLoading" element-loading-text="加载中..." v-if="resData.hasMorePack === true">
        <select-btn :packList="packList" :handleBtnView="handleBtnView" @transferIndex="getBtnString"></select-btn>
        <!--全部表格-->
        <el-table v-show="handleBtnView === '全部'" :data="noticeList" border>
          <el-table-column align="center" label="包号" min-width="80">
            <template slot-scope="scope">
              第{{scope.row.packNum}}包
            </template>
          </el-table-column>
          <el-table-column align="center" prop="packName" label="包件名称" min-width="180">
          </el-table-column>
          <el-table-column align="center" prop="purchaseDoc.annexName" label="采购附件" min-width="180">
            <template slot-scope="scope">
              <el-button @click="downLoad(scope.row)" type="text">{{scope.row.purchaseDoc.annexName}}</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="createTime" label="起始发售时间" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.purchaseDoc.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="saleEndTime" label="采购文件发售截止时间" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.purchaseDoc.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="submitEndTime" label="递交响应文件截止时间" min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.purchaseDoc.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column align="center" prop="purchaseDoc.contact" label="联系人" min-width="80">-->
          <!--</el-table-column>-->
        </el-table>

        <!--渲染有包-->
        <publishAdd v-for="(item, index) in packList" :key="index"
                    v-if="handleBtnView === ('第' + (item.packNum) + '包')" ref="childMethod"
                    :selectIndex="index" :packList="packList"></publishAdd>
      </el-row>
      <!--无包显示-->
      <el-row v-loading="listLoading" element-loading-text="加载中..." v-else>
        <publishForm style="padding: 0 1%;" :packList="packList" v-if="resData.packList"></publishForm>
      </el-row>
    </el-main>
  </div>
</template>
<script>
  import publishForm from '@/custom-components/project_manages/publishForm'
  import publishAdd from '@/custom-components/project_manages/publishAdd'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import {executeProjectDoc, download} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {
      ElButton,
      publishForm,
      // TinyMce,
      publishAdd,
      selectBtn,
      crumbs
      // Upload
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        noticeList: [],
        packList: [],
        projectId: this.$store.getters.subProjectId,
        handleBtnView: '全部',
        listLoading: true,
        resData: {},
      }
    },
    computed: {},
    methods: {
      getBtnString(msg) {
        this.listLoading = true
        this.getList()
        this.handleBtnView = msg
      },
      downLoad(row) {
        // console.log(row)
      },
      getList() {
        executeProjectDoc(this.projectId).then(response => {
          if (response.state) {
            setTimeout(() => {
              this.listLoading = false
            }, 300)
          }
          this.resData = response.data
          // console.log(response)
          this.packList = response.data.packList
//          获取有数据的包件
          const array = [...response.data.packList]
          for (let i = 0; i < array.length; i++) {
            if (array[i].purchaseDoc === null) {
              array.splice(i, 1)
              i = i - 1
            }
            this.noticeList = array
          }
        })
      },
    }
  }
</script>

<style scoped>
  .form_style .el-textarea {
    display: inline-flex;
    width: 80%;
  }

  /*.el-row th[data-v-3baa8696]*/
  /*.el-row td {*/
    /*font-size: 14px;*/
    /*color: #5a5e66;*/
    /*font-weight: 700;*/
  /*}*/
  .el-main {
    padding: 0;
  }
</style>
