<template>
  <div class="">
    <packChecked v-show="resData.packList.length > 1" @transferIdList="getIdList" :packList="resData.packList"
                 :current_tab="selectIndex"></packChecked>
    <el-table border :data="bidRecordList">
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
          <el-button style="margin-left: 40%" v-else @click="handleDelete(scope.$index, scope.row)" size="small">移除文件</el-button>
          <el-button v-if="bidRecordList[scope.$index].delRecord !== false"
                     @click="handleDeleteAll(scope.$index, scope.row)"
                     size="small" type="danger">移除目录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form style="text-align:right;margin-top: 1%" :inline="true" class="demo-form-inline">
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
  import {RecordProcessDel, RecordProcessNewRecord, RecordProcessDelRecord, RecordProcessSave} from '@/api/project'

  function unique(arr) {
    return Array.from(new Set(arr))
  }

  export default {
    components: {Upload, packChecked},
    props: ['selectIndex', 'resData', 'projectId'],
    mounted() {
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
    watch: {},
    methods: {
      getIdList(msg){
        this.update_info.packIdList = msg
        // console.log(this.update_info.packIdList)
      },
      UploadClick(row) {
        this.update_info.recordId = row.recordId
        this.updete_row = row
        // console.log(this.updete_row)
      },
      onUploadSuccess(msg) {
        // console.log(msg)
        this.updete_row.annexName = msg.name
        this.update_info.fileToken = msg.response.data
        RecordProcessSave(this.update_info.recordId, this.update_info.packIdList, this.update_info.fileToken).then(response => {
          // console.log(response)
        })
      },
      addTable() {
        const obj = {...this.new_obj}
        const id = this.resData.packList[this.selectIndex].packId
        RecordProcessNewRecord(obj.recordName, this.update_info.packIdList).then(response => {
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
        RecordProcessDelRecord(this.bidRecordList[index].recordId, this.update_info.packIdList).then(response => {
          this.bidRecordList.splice(index, 1)
          // console.log(response)
        })
      },
      handleDelete(index, row) {
        RecordProcessDel(this.bidRecordList[index].recordId, this.update_info.packIdList).then(response => {
          // console.log(response)
          this.update_show = true
          row.annexName = ''
          this.bidRecordList[index].name = ''
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

  .el-table__header {
    width: 100% !important;
  }

  .el-table__body {
    width: 100% !important;
  }
</style>
