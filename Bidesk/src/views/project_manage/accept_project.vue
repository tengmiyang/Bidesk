<template>
  <div class="app-container">
    <ProjectSearch :type="type" @onSubmit="ProjectSearchs"></ProjectSearch>

    <el-table :data="tableData" border v-loading="listLoading" element-loading-text="加载中..." width='100%'>
      <!--<el-table-column prop="pro_id" label="序号" width="50" align="center">-->
      <!--</el-table-column>-->
      <el-table-column prop="pro_name" label="项目名称" min-width="110">
        <template slot-scope="scope">
          <a data-role="button" class='myButton' @click="openNew(scope.row)">{{scope.row.pro_name}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="pro_num" label="项目编号" min-width="80">
      </el-table-column>
      <el-table-column prop="dic_name" label="采购方式" min-width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="com_name" label="委托单位" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="user_name" label="委托人" min-width="50" align="center">
      </el-table-column>
      <el-table-column prop="create_time" label="委托时间" min-width="70" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time">{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="entrust_user_name" label="被委托人" min-width="50" align="center">
      </el-table-column>
    </el-table>

    <!--分页-->
    <div>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="paginations.pageNum" :page-size="paginations.pageSize"
                   layout="total, prev, pager, next"
                   :total="paginations.totalCount">
    </el-pagination>
    </div>
    <!--弹出框-->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="60%">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="委托函" name="first">
          <div class="documentem" v-show='entrustmentdoc'>
            <div class="content" v-for="items in userData">
              <div class="textdoc" v-html="items.pro_letter">
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目信息" name="fourth">
          <div class="procontent">
            <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5" style="width: 100%">
              <tbody v-for="item in userData">
              <tr>
                <th>项目名称</th>
                <td>{{item.pro_name}}</td>
              </tr>
              <tr>
                <th>项目编号</th>
                <td>{{item.pro_num}}</td>
              </tr>
              <tr>
                <th>采购方式</th>
                <td>{{item.dic_name}}</td>
              </tr>
              <tr>
                <th>委托单位</th>
                <td>{{item.com_name}}</td>
              </tr>
              <tr>
                <th>委托人</th>
                <td>{{item.user_name}}</td>
              </tr>
              <tr>
                <th>委托人手机号</th>
                <td>{{item.user_phone}}</td>
              </tr>
              <tr>
                <th>委托时间</th>
                <td>{{item.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
              </tr>
              <tr>
                <th>被委托人</th>
                <td>{{item.entrust_user_name}}</td>
              </tr>
              <tr>
                <th>被委托人电话</th>
                <td>{{item.entrust_user_name}}</td>
              </tr>
              <tr>
                <th>被委托人时间</th>
                <td>{{item.entrust_user_name}}</td>
              </tr>
              <tr>
                <th>被委托人单位</th>
                <td>{{item.entrust_user_name}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog width="30%" title="不接受操作" :visible.sync="notaccept" append-to-body>
        <el-input type="textarea" :rows="2" placeholder="请输入不接受的原因" v-model="noAcceptReason">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="notaccept = false">关 闭</el-button>
    <el-button type="primary" @click="noaccept">确 定</el-button>
  </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button @click="notaccept=true">不接受</el-button>
        <el-button type="primary" @click="yetaccept">接 受</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {acceptProject, acceptProjectYes, acceptProjectNo} from '@/api/project'
  import TinyMce from '@/custom-components/Tinymce'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'

  export default {
    components: {TinyMce, ProjectSearch},
    mounted() {
      this.getList()
    },
    data() {
      return {
        activeName2: 'first',
        entrustmentdoc: true,
        projectmsg: false,
        listLoading: false,
        tableData: [{
          number: '1',
          pro_id: '',
          pro_name: '',
          pro_num: '',
          dic_name: '',
          com_name: '',
          user_name: '',
          create_time: '',
          entrust_user_name: ''
        }],
        userData: [],
        dialogVisible: false,
        notaccept: false,
        currentPage1: 5,
        noAcceptReason: '',
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
        type: 'accept'
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        acceptProject(this.form).then(response => {
          // console.log(response);
          this.tableData = response.data.list
          this.paginations = response.data.pagination;
          setTimeout(() => {
            this.listLoading = false;
          }, 1000);
        })
      },
      openNew(row) {
        this.dialogVisible = true;
        this.userData = [row];
        this.projectmsg = false;
      },
      noaccept() {
        this.notaccept = false;
        acceptProjectNo(this.userData[0].pro_id, this.noAcceptReason).then(response => {
          // console.log(response);
          this.$router.push('/project_manage/exception_project');
          setTimeout(() => {
            this.listLoading = false;
          }, 1000);
        })
        this.dialogVisible = false;
        this.getList();
      },
      yetaccept() {
        this.dialogVisible = false;
        acceptProjectYes(this.userData[0].pro_id).then(response => {
          // console.log(response);
          this.$router.push('/project_manage/prepare_project');
          setTimeout(() => {
            this.listLoading = false;
          }, 1000);
        });
        this.dialogVisible = false;
        this.getList();
      },
      onSubmit() {
        // console.log('submit!');
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
        this.form.pageNum = val
        if (this.tableData.length !== 0 && this.form.projectName !== '') {
          this.form.projectName = this.tableData[0].sub_pro_name
          this.form.projectNum = this.tableData[0].sub_pro_num
        }
        else {
          this.form.projectName = ''
          this.form.projectNum = ''
        }
        acceptProject(this.form).then(response => {
          console.log(response);
          this.tableData = response.data.list;
          this.paginations = response.data.pagination;
        })
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      ProjectSearchs(arr) {
        console.log(arr)
        this.tableData = arr.list
        this.paginations = arr.pagination
      }
    }
  }
</script>

<style scoped>

  .entrust {
    margin-left: 70%;
  }

  .procontent th {
    text-align: center;
    line-height: 30px;
  }

  .procontent td {
    padding-left: 1%;
  }

  .procontent th, .procontent td {
    border: 0;
    border-bottom: 1px solid #e6ebf5;
    border-right: 1px solid #e6ebf5;
  }

  .procontent table {
    border-right: 0;
    border-bottom: 0;
  }

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
