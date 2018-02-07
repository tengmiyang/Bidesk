<template>
  <div class="project-container">
    <crumbs :resData="resData"></crumbs>
    <el-row v-if="resData.hasMorePack">
      <select-btn :packList="res_pack_list" :handleBtnView="handleBtnView" @transferIndex="getBtnString"></select-btn>
      <!--默认全部-->
      <el-table border v-show="handleBtnView === '全部'" :data="self_pack_list">
        <el-table-column align="center" label="包号" type="index" width="100">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="purchaseDoc.packName" label="包件名称" min-width="180">
        </el-table-column>
        <el-table-column align="center" prop="purchaseDoc.annexName" label="采购附件" min-width="180">
          <template slot-scope="scope">
            <el-button type="text">{{scope.row.purchaseDoc.annexName}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="purchaseDoc.createTime" label="起始发售时间" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.purchaseDoc.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="purchaseDoc.saleEndTime" label="发售截止时间" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.purchaseDoc.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="submitEndTime" label="递交响应文件截止时间" min-width="180">
          <template slot-scope="scope">
            <span>{{scope.row.purchaseDoc.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--渲染-->
      <template v-for="(item, index) in res_pack_list" v-if="handleBtnView === ('第' + (item.packNum) + '包')">
        <el-table v-if="item.purchaseDoc === null" :data="[]" style="width: 100%"></el-table>
        <table v-else border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
               style="width: 100%;line-height: 40px;">
          <tbody>
          <tr>
            <th>采购文件</th>
            <td>
              <el-button type="text">{{item.purchaseDoc.annexName}}</el-button>
            </td>
          </tr>
          <tr>
            <th>采购文件发售截止时间</th>
            <td>{{item.purchaseDoc.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
          </tr>
          <tr>
            <th>递交响应文件截止时间</th>
            <td>{{item.purchaseDoc.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
          </tr>
          <tr>
            <th>联系人</th>
            <td>{{item.purchaseDoc.contact}}</td>
          </tr>
          <tr>
            <th>手机号</th>
            <td>{{item.purchaseDoc.phone}}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </el-row>
    <el-row v-else>
      <el-table v-if="res_purchase_doc === null" :data="[]" style="width: 100%"></el-table>
      <table v-else border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
             style="width: 100%;line-height: 40px;">
        <tbody>
        <tr>
          <th>采购文件</th>
          <td>
            <el-button type="text">{{res_purchase_doc.annexName}}</el-button>
          </td>
        </tr>
        <tr>
          <th>采购文件发售截止时间</th>
          <td>{{res_purchase_doc.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
        </tr>
        <tr>
          <th>递交响应文件截止时间</th>
          <td>{{res_purchase_doc.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
        </tr>
        <tr>
          <th>联系人</th>
          <td>{{res_purchase_doc.contact}}</td>
        </tr>
        <tr>
          <th>手机号</th>
          <td>{{res_purchase_doc.phone}}</td>
        </tr>
        </tbody>
      </table>
    </el-row>
  </div>
</template>

<script>
  import publishForm from '@/custom-components/project_manages/publishForm'
  import publishAdd from '@/custom-components/project_manages/publishAdd'
  import {executeProjectDoc, downloadFile} from '@/api/project'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import crumbs from '@/custom-components/project_manages/crumbs'

  export default {
    components: {
      publishForm,
      publishAdd,
      crumbs,
      selectBtn
    },
    data() {
      return {
        default_click: '0',
        visible_type: false,
        projectId: this.$store.getters.subProjectId,
        resData: {},
        handleBtnView: '全部',
        res_pack_list: [],
        res_purchase_doc: [],
        self_pack_list: []
      }
    },
    mounted() {
      this.getList()
    },
//    computed: {
//
//    },
    methods: {
      getBtnString(msg) {
        this.handleBtnView = msg
      },
      downloadFileFire() {
//        const form = {annexId: this.res_purchase_doc.annexId}
//        downloadFile(form.annexId).then(response => {
//        })
      },
      getList() {
        executeProjectDoc(this.projectId).then(response => {
          this.resData = response.data
          console.log(response)
          this.res_pack_list = response.data.packList
          this.res_purchase_doc = this.res_pack_list[0].purchaseDoc
          const array = [...this.res_pack_list]
          for (let i = 0; i < array.length; i++) {
            if (array[i].purchaseDoc === null) {
              array.splice(i, 1)
              i = i - 1
            }
            this.self_pack_list = array
          }
          // console.log(response)
        })
      }
    }
  }
</script>

<style scoped>

</style>
