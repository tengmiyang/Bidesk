<template>
  <div class="app-container">
    <ProjectSearch :type="type" @onSubmit="ProjectSearchs"></ProjectSearch>
    <el-table :data="tableData" border style="    padding-top: 2px;">
      <el-table-column prop="projectName" label="项目名称" min-width="220" align="left">
      </el-table-column>
      <el-table-column prop="projectNum" label="项目编号" min-width="200" align="left">
      </el-table-column>
      <el-table-column prop="companyName" label="采购单位" min-width="220" align="center">
      </el-table-column>
      <el-table-column prop="principal" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="followPack(scope.row)">关注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="paginations.pageNum" :page-size="paginations.pageSize"
                   layout="total, prev, pager, next"
                   :total="paginations.totalCount">
    </el-pagination>
    <!--项目负责人的弹出框-->
    <el-dialog title="关注" :visible.sync="dialogVisible1" width="40%">
      <div class="attention" v-if="!hasMorePacks">
        <h3>确定关注吗？</h3>
      </div>
      <el-table :data="packData" style="width: 100%" v-if="hasMorePacks" ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="packNum" label="包号" width="180" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包名" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">关 闭</el-button>
    <el-button type="primary" @click="DetermineFollow">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog width="30%" title="确定关注" :visible.sync="innerVisible">
      <div v-if="falseState">
        <h3>关注成功，项目负责人开通权限后才能下载文件，请耐心等待！</h3>
      </div>
      <div v-else>{{falseMsg}}</div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="Determine">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="关注验证" :visible.sync="dialogVisible2" width="40%">
      <div class="attention">
        <h4>已发送验证码至您的手机号 182XXXXX230,请注意查收</h4>
        <span>验证码：<input type="text" v-model="authid">
            <el-button type="success" plain size="small">再次获取</el-button></span>
        <p v-show="hintid" style="color:red">您输入的验证码有误，请重新核实！</p>
      </div>
      <!--采购公告和采购文件-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2=false">关 闭</el-button>
          <el-button type="primary" @click="DownloadFileSubmit">确 定</el-button>

        </span>
    </el-dialog>
  </div>
</template>
<script>
  import {supplierSearchProject, supplierSearchProjectEnter} from '@/api/project'
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'

  export default {
    components: {ProjectSearch},
    data() {
      return {
        packData: [],
        tableData: [],
        hasMorePacks: null,
        multipleSelection: [],
        innerVisible: false,
        packIdList: [],
        falseMsg: '',
        falseState: true,
        dialogVisible: false,
        dialogVisible1: false,
        authid: '',
        hintid: false,
        dialogVisible2: false,
        checked: false,
        form: {
          pageNum: 1,
          projectName: '',
          projectNum: '',
        },
        paginations: {
          totalPage: 1,
          pageSize: 1,
          totalCount: 0,
          pageNum: 1
        },      //分页相关
        type: 'supplier_search',
      }
    },
    methods: {
      getData(tableDatas) {
        this.tableData = tableDatas
      },
//      判断有没有选择包件
      DetermineFollow() {
        if (this.multipleSelection.length === 0 && this.hasMorePacks === true) {
          this.$message({
            message: '未选择包件，请选择包件！',
            type: 'warning'
          });
          return
        }
        supplierSearchProjectEnter(this.packIdList).then(response => {
          // console.log(response);
          // console.log("关注成功");
          if (response.state === false) {
            this.$message({
              message: response.msg,
              type: 'warning'
            });
            this.falseState = false
            this.falseMsg = response.msg
          }
          else {
            this.dialogVisible1 = false
            this.falseState = true
            this.innerVisible = true
          }
        })
      },
//      提交确定关注的包件
      Determine() {
        this.innerVisible = false
        this.dialogVisible1 = false
        this.$router.push('/project_manage/supplier_enter_project')
      },
//      点击关注按钮
      followPack(row) {
        this.hasMorePacks = row.hasMorePack;
        this.dialogVisible2 = true
        this.authid = ''
        this.hintid = false
        this.packData = row.packList
        if (this.hasMorePacks === false) {
          this.packIdList.push(this.packData[0].packId)
          // console.log(this.packIdList)
        }
      },
//      选择关注包件
      handleSelectionChange(val) {
        this.multipleSelection = val;
        var arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          var packId = this.multipleSelection[i].packId;
          arr.push(packId)
          this.packIdList = [...new Set(arr)]
        }
        if (val.length === 0) {
          this.packIdList = []
        }
        // console.log(this.packIdList)
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.pageNum = val
        if (this.tableData.length !== 0 && this.form.projectName !== '') {
          this.form.projectName = this.tableData[0].sub_pro_name
          this.form.projectNum = this.tableData[0].sub_pro_num
        }
        else {
          this.form.projectName = ''
          this.form.projectNum = ''
        }
        supplierSearchProject(this.form).then(response => {
          console.log(response);
          this.resList = response.data.list;
          this.paginations = response.data.pagination;
        })
      },
      ProjectSearchs(arr) {
        console.log(arr)
//        this.tableData = arr.list
//        this.paginations = arr.pagination
        this.tableData = arr
      },
//      关注的时候验证
      DownloadFileSubmit() {
        if (this.authid === '123') {
          this.hintid = false
          this.dialogVisible2 = false
          this.dialogVisible1 = true
        }
        else {
          this.hintid = true;
        }
      },
    }
  }
</script>

<style scoped>
  .attention {
    text-align: center;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .el-aside {
    color: #333;
    background-color: #608FC7;
    height: 100vh;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }

  .el-submenu {
    background-color: #608FC7;
    font-size: 20px;
    color: #fff;
  }

  .el-menu-item {
    background-color: rgb(96, 143, 199);
    color: #fff;
  }

  .block {
    position: absolute;
    top: 90vh;
    right: 2vh;
  }
</style>
<style>
  .el-table th.is-leaf {
    text-align: center;
  }
</style>
