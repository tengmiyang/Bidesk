<template>
  <div>
    <packChecked v-show="resData.packList.length > 1" @transferIdList="getIdList" :packList="resData.packList"
                 :current_tab="selectIndex"></packChecked>
    <el-table class="project-table" border :data="bidRecordList">
      <el-table-column align="center" prop="recordName" label="目录"></el-table-column>
      <el-table-column align="center" prop="annexName" label="文件名称">
        <template slot-scope="scope">
          <el-button type="text" size="mini">{{scope.row.annexName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <Upload style="margin-left: 40%" v-if="!scope.row.annexName" @UploadClick="UploadClick(scope.row)"
                  @onUploadSuccess="onUploadSuccess" v-model="scope.row.annexName"></Upload>
          <el-button style="margin-left: 40%"  v-else @click="handleDelete(scope.$index, scope.row)" size="small">移除文件</el-button>
          <el-button type="danger" v-if="bidRecordList[scope.$index].delRecord !== false"
                     @click="handleDeleteAll(scope.$index, scope.row)"
                     size="small">移除目录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form style="margin: 2% 0;text-align: right;" :inline="true" class="demo-form-inline">
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
  import packChecked from '@/custom-components/project_manages/packChecked'
  import {
    expireProjectRecord,
    RecordOpeningDel,
    RecordOpeningNewRecord,
    RecordOpeningDelRecord,
    RecordOpeningSave
  } from '@/api/project'

  export default {
    components: {Upload, packChecked},
    props: ['selectIndex', 'resData'],
    mounted() {
      // console.log(this.selectIndex)
    },
    computed: {
      bidRecordList() {
        return this.resData.packList[this.selectIndex].bidRecordList
      }
    },
    data() {
      return {
        file_index: null,
        updete_row: {},
        checkedList: [],
//        bidRecordList: this.resData.packList[this.selectIndex].bidRecordList,
        update_show: false,
        update_info: {
          recordId: null,
          packIdList: [this.resData.packList[this.selectIndex].packId],
          fileToken: '',
          fileName: ''
        },
        new_obj: {
          recordName: '',
          recordId: null
        }
      }
    },
    methods: {
      getIdList(msg) {
        this.update_info.packIdList = msg
      },
      UploadClick(row) {
        this.update_info.recordId = row.recordId
        this.updete_row = row
      },
      onUploadSuccess(msg) {
        // console.log(this.selectIndex)
        this.updete_row.annexName = msg.name
        this.update_info.fileToken = msg.response.data
        RecordOpeningSave(this.update_info.recordId, this.update_info.packIdList, this.update_info.fileToken).then(response => {
//           if (this.update_info.packIdList.length > 1) {
//             window.location.reload();
// //            this.$emit('increment', this.selectIndex)
//           }
//          // console.log(response)
//          // console.log(this.update_info.packIdList)
        })
//        this.$set(this.resData, this.bidRecordList, this.updete_row.annexName, this.selectIndex);
      },
      addTable() {
        const obj = {...this.new_obj}
        const id = this.resData.packList[this.selectIndex].packId
        RecordOpeningNewRecord(obj.recordName, this.update_info.packIdList).then(response => {
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
      handleDeleteAll(index, row) {
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

  .el-table__body {
    width: 100% !important;
  }

  .el-table .is-left .cell {
    padding-left: 15%;
  }
</style>
<style>
  .el-table__header-wrapper .has-gutter .is-left .cell {
    text-align: center;
  }
</style>
