<template>
  <div id="app-container">

    <el-main style="padding: 2% 1%">
      <ProjectSearch :tableData="tableData"></ProjectSearch>
      <el-table :data="tableData" border v-loading="listLoading"
                :span-method="objectSpanMethod"
                element-loading-text="加载中..." width='100%'>
        <el-table-column prop="pro_name" label="立项名称" min-width="250">
          <template slot-scope="scope">
            <a data-role="button" class='myButton' @click="openNew(scope.row.pro_id)">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
              <span v-else>--</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="250">
          <template slot-scope="scope">
              <span v-if="scope.row.sub_pro_name">
                <span>{{scope.row.sub_pro_name}}</span><br>
                <span>({{scope.row.sub_pro_num}})</span>
              </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pack_num" label="包件/标段" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="com_name" label="委托单位" min-width="160">
          <template slot-scope="scope">
            <a data-role="button" class='myButton' @click="showUserInfo(scope.row)">{{scope.row.com_name}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="entrust_user_name" label="项目负责人" min-width="90">
        </el-table-column>
        <el-table-column align="center" label="委托时间" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.create_time">{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination background @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-main>
    <!--项目负责人的弹出框-->
    <el-dialog title="联系人" :visible.sync="dialogVisible" width="35%">
      <el-table :data="userData" border style="width: 100%;">
        <el-table-column prop="user_name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="user_phone" label="手机号" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
                      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {prepareProject} from '@/api/project'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'
  import {mergeInit, merge} from '@/utils'

  export default {
    components: {ProjectSearch},
    name: 'preparapro',
    mounted() {
      mergeInit(6, 23, this.mergeList)
      this.$store.dispatch('SetProStatus', 'prepare')
      this.getList()
    },
    data() {
      return {
        mergeList: [],
        tableData: [],
        listLoading: true,
        userData: [],
        dialogVisible: false,
        currentPage1: 1,
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    // created() {
    //   this.getList()
    // },
    methods: {
      getList() {
        prepareProject().then(response => {
          if (response.state) {
            this.listLoading = false
          }
          this.tableData = response.data.list.slice(0, 23)

          console.log(this.tableData)
        })
        merge(this.tableData, 0, 'pro_id', this.mergeList)
        merge(this.tableData, 1, 'sub_pro_id', this.mergeList)
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex > 5) {
          return this.mergeList[0][rowIndex]
        } else if (columnIndex === 1 || columnIndex === 5) {
          return this.mergeList[1][rowIndex]
        }
      },
      onSubmit() {
        // console.log('submit!');
      },
      openNew(id) {
        this.$store.dispatch('SetProID', id).then(() => {
          this.$router.push({name: '项目操作'}) //  路由添加完后  才可跳转到新页面
        })
      },
      showUserInfo(row) {
        this.dialogVisible = true
        this.userData = [row]
      },
      handleClose() {
        // console.log('handleClose!');
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }
</style>
<style>
  .el-table th.is-leaf {
    text-align: center;
  }
</style>
