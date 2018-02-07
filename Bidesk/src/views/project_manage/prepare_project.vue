<template>
  <div class="app-container">
    <ProjectSearch :type="type" @onSubmit="ProjectSearchs"></ProjectSearch>
    <el-table :span-method="objectSpanMethod" :data="tableData" border class="project-table" width="100%">
      <el-table-column prop="pro_name" label="立项名称">
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
      <el-table-column prop="sub_pro_name" label="采购项目名称">
        <template slot-scope="scope">
              <span v-if="scope.row.sub_pro_name">
                <span>{{scope.row.sub_pro_name}}</span><br>
                <span>({{scope.row.sub_pro_num}})</span>
              </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pack_num" label="包件/标段">
        <template slot-scope="scope">
          <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="com_name" label="委托单位">
        <template slot-scope="scope">
          <a data-role="button" class='myButton' @click="showUserInfo(scope.row)">{{scope.row.com_name}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="com_name" label="代理机构" v-if="roleId==='purchaserAdmin'">
        <template slot-scope="scope">
          <a data-role="button" class='myButton' @click="showUserInfo(scope.row)">{{scope.row.com_name}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="entrust_user_name" label="项目负责人" min-width="100">
      </el-table-column>
      <el-table-column align="center" label="委托时间">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time">{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="paginations.pageNum" :page-size="paginations.pageSize"
                   layout="total, prev, pager, next"
                   :total="paginations.totalCount">
    </el-pagination>
    <!--代理机构的弹出框-->
    <el-dialog title="联系人" :visible.sync="dialogVisible" width="35%">
      <el-table :data="userData" border style="width: 100%">
        <el-table-column prop="user_name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="user_phone" label="联系方式" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        </span>
    </el-dialog>
    <!--代理机构的弹出框-->
    <el-dialog title="联系人" :visible.sync="dialogVisible1" width="50%">
      <el-table :data="tableData" style="width: 100%">
        <!--<el-table-column type="index" label="序号" width="80">-->
        <!--</el-table-column>-->
        <el-table-column prop="user_name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="user_phone" label="联系人" align="center">
        </el-table-column>
        <!--<el-table-column prop="explain" label="说明">-->
        <!--</el-table-column>-->
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
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
    mounted() {
      this.getList()
      if (this.$router.proId) {
        this.openNew(this.$router.proId)
        setTimeout(() => {
          this.$router.proId = 0
        }, 500)
      }
      // 列数  行数
      mergeInit(6, 15, this.mergeList)
      this.$store.dispatch('SetProStatus', 'prepare')
    },
    data() {
      return {
        mergeList: [],
        tableData: [],
        userData: [],
        activeName: 'first',
        listLoading: true,
        dialogVisible: false,
        dialogVisible1: false,
        currentPage1: 5,
        formInline: {
          user: '',
          region: ''
        },
        form: {
          pageNum: 1,
          projectName: '',
          projectNum: '',
        },
        paginations: {
          totalPage: 1,
          pageSize: 1,
          totalCount: 1,
          pageNum: 1
        },      //分页相关
        type: 'prepare',
        roleId: this.$store.getters.roles[0],     //获取当前的角色
      }
    },
    methods: {
      getList() {
//        console.log(this.roleId);
        prepareProject(this.form).then(response => {
//          console.log(response);
          if (response.state) {
            this.listLoading = false
          }
          this.tableData = response.data.list;
          this.paginations = response.data.pagination;
          merge(this.tableData, 0, 'pro_id', this.mergeList)
          merge(this.tableData, 1, 'sub_pro_id', this.mergeList)
        })
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex > 2) {
          return this.mergeList[0][rowIndex]
        } else if (columnIndex === 1) {
          return this.mergeList[1][rowIndex]
        }
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
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        if (this.tableData.length !== 0 && this.form.projectName !== '') {
          this.form.projectName = this.tableData[0].sub_pro_name
          this.form.projectNum = this.tableData[0].sub_pro_num
        }
        else {
          this.form.projectName = ''
          this.form.projectNum = ''
        }
        this.getList()
        // prepareProject(this.form).then(response => {
        //   console.log(response);
        //   this.tableData = response.data.list;
        //   this.paginations = response.data.pagination;
        // })
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      ProjectSearchs(arr) {
        console.log(arr)
        this.tableData = arr.list
        this.paginations = arr.pagination
        merge(this.tableData, 0, 'pro_id', this.mergeList)
        merge(this.tableData, 1, 'sub_pro_id', this.mergeList)
      }
    }
  }
</script>

<style scoped>
  .exeparepro {
    margin-left: 20px;
    margin-top: 10px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .el-button--text {
    padding: 0;
  }

  .el-table .cell {
    text-align: center;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }

  .el-pagination.is-background .el-pager li.active {
    background-color: #409EFF;
    color: #fff;
  }

  .block {
    padding-left: 55%;
    padding-top: 2%;
  }
</style>
<style>
  .el-table th.is-leaf {
    text-align: center;
  }

  .el-table__body-wrapper {
    overflow: hidden !important;
  }
</style>

