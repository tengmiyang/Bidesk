<template>
  <div>
    <el-table class="project-table" border :data="bidRecordList">
      <el-table-column align="center" prop="recordName" label="目录"></el-table-column>
      <el-table-column align="center" prop="annexName" label="文件名称">
        <template slot-scope="scope">
          <el-button type="text" size="mini">{{scope.row.annexName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作">
        <template slot-scope="scope">
          <Upload v-if="!scope.row.annexName" @UploadClick="UploadClick(scope.row)"
                  @onUploadSuccess="onUploadSuccess"
                  v-model="scope.row.annexName" style="margin-left: 40%"></Upload>
          <el-button style="margin-left: 40%"  v-else @click="handleDelete(scope.$index, scope.row)" size="small">移除文件</el-button>
          <el-button v-if="scope.row.delRecord !== false" @click="handleDeleteAll(scope.$index)"
                     size="small" type="danger">移除目录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form style="text-align: right;margin: 2% 0" :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="new_obj.recordName" placeholder="请添加目录"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="addTable">添加目录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import Upload from '@/custom-components/Upload/singleFile'
  import PackUnchecked from '@/custom-components/project_manages/PackUnchecked'
  import {
    RecordOpeningSave,
    expireProjectRecord,
    RecordOpeningDel,
    RecordOpeningNewRecord,
    RecordOpeningDelRecord
  } from '@/api/project'
  export default {
    components: {Upload, PackUnchecked},
    props: ['resData', 'projectId'],
    mounted() {
      // this.getList()
    },
    data() {
      return {
        new_obj: {
          recordName: '',
          recordId: null
        },
        file_index: null,
        updete_row: {},
        file_info: {},
        all_checked: [],
        bidRecordList: this.resData.packList[0].bidRecordList,
        update_show: false,
        update_info: {
          recordId: null,
          packIdList: [this.resData.packList[0].packId],
          fileToken: ''
        },
      }
    },
    methods: {
      UploadClick(row) {
        this.update_info.recordId = row.recordId
        this.updete_row = row
        // console.log(this.updete_row)
      },
      onUploadSuccess(msg) {
        this.updete_row.annexName = msg.name
        this.update_info.fileToken = msg.response.data
        RecordOpeningSave(this.update_info.recordId, this.update_info.packIdList, this.update_info.fileToken).then(response => {
          // console.log(response)
        })
      },
      getList() {
        expireProjectRecord(this.projectId).then(response => {
          // console.log(response)
          this.bidRecordList = response.data.packList.bidRecordList
          this.update_info.packIdList = [response.data.packList.packId]
//          // console.log(this.update_info.packIdList)
        })
      },
      addTable() {
        const obj = {...this.new_obj}
        const id = this.update_info.packIdList
        RecordOpeningNewRecord(obj.recordName, id).then(response => {
          // console.log(response)
          if (response.state) {
            obj.recordId = response.data[id]
            this.bidRecordList.push(obj)
          } else {
            this.$message.error(response.msg);
          }
        })
        this.new_obj.recordName = ''
      },
      handleDeleteAll(index) {
        RecordOpeningDelRecord(this.bidRecordList[index].recordId, this.update_info.packIdList).then(response => {
          this.bidRecordList.splice(index, 1)
          // console.log(response)
        })
      },
      handleDelete(index, row) {
        RecordOpeningDel(this.bidRecordList[index].recordId, this.update_info.packIdList).then(response => {
          // console.log(response)
          this.update_show = true
          row.annexName = ''
          this.bidRecordList[index].name = ''
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

  .el-table__header {
    width: 100% !important;
  }
.el-table .is-left {
        padding-left: 15%;
}
  .el-table__body {
    width: 100% !important;
  }
</style>
