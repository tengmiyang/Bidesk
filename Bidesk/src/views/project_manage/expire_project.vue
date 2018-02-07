<template>
  <div class="app-container">
    <!--采购人的角色-->
    <div v-if="roleId==='purchaserAdmin'">
      <el-tabs type="border-card">
        <el-tab-pane label="委托代理项目">
          <ProjectSearch :type="type" @onSubmit="ProjectSearchs"></ProjectSearch>
          <el-table width="100%" border :span-method="objectSpanMethod" :data="resList">
            <el-table-column v-if="proNameShow" prop="pro_name" label="立项名称" min-width="100">
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="openProName(scope.row.pro_id)">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
                  <span v-else>--</span>
                </a>
              </template>
              <el-button icon="el-icon-caret-right" @click="hiddenProName" type="text"></el-button>
            </el-table-column>
            <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
              <el-button v-show="proNameShow === false" icon="el-icon-caret-left" @click="showProName"
                         type="text"></el-button>
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="openNew(scope.row.sub_pro_id)">
              <span v-if="scope.row.sub_pro_name">
                <span>{{scope.row.sub_pro_name}}</span><br>
                <span>({{scope.row.sub_pro_num}})</span>
              </span>
                  <span v-else>--</span>
                </a>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="pack_num" label="包件/标段" min-width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="notice_publish_time" label="公布(通知)时间" min-width="80">
              <template slot-scope="scope">
            <span
              v-if="scope.row.notice_publish_time">{{scope.row.notice_publish_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="submit_end_time" label="递交响应文件截止时间" min-width="100">
              <template slot-scope="scope">
            <span
              v-if="scope.row.submit_end_time">{{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dic_name" label="采购方式" min-width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dic_name" label="委托单位" min-width="60">
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="showUserInfo(scope.row)">{{scope.row.com_name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="entrust_user_name" label="被委托人" min-width="60">
            </el-table-column>
          </el-table>
          <el-pagination background v-show="!listLoading" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
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
        </el-tab-pane>
        <el-tab-pane label="自行采购项目">
          <ProjectSearch :type="type" @onSubmit="ProjectSearchs"></ProjectSearch>
          <el-table width="100%" border :span-method="objectSpanMethod" :data="resList">
            <el-table-column v-if="proNameShow" prop="pro_name" label="立项名称" min-width="100">
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="openProName(scope.row.pro_id)">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
                  <span v-else>--</span>
                </a>
              </template>
              <el-button icon="el-icon-caret-right" @click="hiddenProName" type="text"></el-button>
            </el-table-column>
            <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
              <el-button v-show="proNameShow === false" icon="el-icon-caret-left" @click="showProName"
                         type="text"></el-button>
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="openNew(scope.row.sub_pro_id)">
              <span v-if="scope.row.sub_pro_name">
                <span>{{scope.row.sub_pro_name}}</span><br>
                <span>({{scope.row.sub_pro_num}})</span>
              </span>
                  <span v-else>--</span>
                </a>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="pack_num" label="包件/标段" min-width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="notice_publish_time" label="公布(通知)时间" min-width="80">
              <template slot-scope="scope">
            <span
              v-if="scope.row.notice_publish_time">{{scope.row.notice_publish_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="submit_end_time" label="递交响应文件截止时间" min-width="100">
              <template slot-scope="scope">
            <span
              v-if="scope.row.submit_end_time">{{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dic_name" label="采购方式" min-width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dic_name" label="委托单位" min-width="60">
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="showUserInfo(scope.row)">{{scope.row.com_name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="entrust_user_name" label="被委托人" min-width="60">
            </el-table-column>
          </el-table>
          <el-pagination background v-show="!listLoading" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--代理人的角色-->
    <div v-else>
      <ProjectSearch :type="type" @onSubmit="ProjectSearchs"></ProjectSearch>
      <el-table width="100%" border :span-method="objectSpanMethod" :data="resList">
        <el-table-column v-if="proNameShow" prop="pro_name" label="立项名称" min-width="100">
          <template slot-scope="scope">
            <a data-role="button" class='myButton' @click="openProName(scope.row.pro_id)">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
              <span v-else>--</span>
            </a>
          </template>
          <el-button icon="el-icon-caret-right" @click="hiddenProName" type="text"></el-button>
        </el-table-column>
        <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
          <el-button v-show="proNameShow === false" icon="el-icon-caret-left" @click="showProName"
                     type="text"></el-button>
          <template slot-scope="scope">
            <a data-role="button" class='myButton' @click="openNew(scope.row.sub_pro_id)">
              <span v-if="scope.row.sub_pro_name">
                <span>{{scope.row.sub_pro_name}}</span><br>
                <span>({{scope.row.sub_pro_num}})</span>
              </span>
              <span v-else>--</span>
            </a>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="pack_num" label="包件/标段" min-width="60">
          <template slot-scope="scope">
            <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="notice_publish_time" label="公布(通知)时间" min-width="80">
          <template slot-scope="scope">
            <span
              v-if="scope.row.notice_publish_time">{{scope.row.notice_publish_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="submit_end_time" label="递交响应文件截止时间" min-width="100">
          <template slot-scope="scope">
            <span
              v-if="scope.row.submit_end_time">{{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="dic_name" label="采购方式" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="dic_name" label="委托单位" min-width="60">
          <template slot-scope="scope">
            <a data-role="button" class='myButton' @click="showUserInfo(scope.row)">{{scope.row.com_name}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="entrust_user_name" label="被委托人" min-width="60">
        </el-table-column>
      </el-table>
      <el-pagination background v-show="!listLoading" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
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
    </div>
  </div>
</template>

<script>
  import {expireProject} from '@/api/project'
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'
  import {mergeInit, merge} from '@/utils'

  export default {
    components: {
      ProjectSearch,
    },
    computed: {},
    created() {
      mergeInit(8, 15, this.mergeList)
      this.$store.dispatch('SetProStatus', 'expire')
      this.getList()
    },
    data() {
      return {
        listLoading: false,
        proNameShow: false,
        userData: [],
        resList: [],
        dialogVisible: false,
        formInline: {
          user: '',
          region: ''
        },
        mergeList: [],
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
        type: 'expire',
        roleId: this.$store.getters.roles[0],     //获取当前的角色
      }
    },
    methods: {
      // renderHeader(h) {
      //   return '<div>\n' + '<button >Show Message</button>\n' + '</div>'
      // },
      showProName() {
        this.proNameShow = true
      },
      hiddenProName() {
        this.proNameShow = false
      },
      openProName(id) {
        console.log(id)
        this.$store.dispatch('SetSubProID', id).then(() => {
          this.$router.push('/project_manage/prepare_project');
          // this.$router.push({name: '项目操作'}) //  路由添加完后  才可跳转到新页面
          this.$router.proId = id
          console.log(this.$router)
        })
      },
      showUserInfo(row) {
        this.dialogVisible = true
        this.userData = [row]
      },
      getList() {
        console.log(this.roleId)
        this.listLoading = true
        expireProject(this.form).then(response => {
//          console.log(response)
//          this.resList = response.data.list.slice(0, 23)
          this.resList = response.data.list
          this.paginations = response.data.pagination;
          console.log(this.resList)
          this.listLoading = false
          merge(this.resList, 0, 'pro_id', this.mergeList)
          merge(this.resList, 1, 'sub_pro_id', this.mergeList)
        })
      },
      openNew(id) {
        this.$store.dispatch('SetSubProID', id).then(() => {
          this.$router.push({name: '上传开标记录'}) //  路由添加完后  才可跳转到新页面
          this.$router.routerType = 3
        })
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (this.proNameShow === true) {
          if (columnIndex === 0 || columnIndex > 5) {
            return this.mergeList[0][rowIndex]
          } else if (columnIndex === 1 || columnIndex === 5) {
            return this.mergeList[1][rowIndex]
          }
        } else {
          if (columnIndex > 4) {
            return this.mergeList[0][rowIndex]
          } else if (columnIndex === 0 || columnIndex === 4) {
            return this.mergeList[1][rowIndex]
          }
        }
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.pageNum = val
        if (this.resList.length !== 0 && this.form.projectName !== '') {
          this.form.projectName = this.resList[0].sub_pro_name
          this.form.projectNum = this.resList[0].sub_pro_num
        }
        else {
          this.form.projectName = ''
          this.form.projectNum = ''
        }
        this.getList()
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      ProjectSearchs(arr) {
        console.log(arr)
        this.resList = arr.list
        this.paginations = arr.pagination
        merge(this.resList, 0, 'pro_id', this.mergeList)
        merge(this.resList, 1, 'sub_pro_id', this.mergeList)
      }
    }
  }
</script>

<style scoped>
  .exeparepro {
    margin-left: 20px;
    margin-top: 10px;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .el-table .cell {
    text-align: center;
  }

  .block {
    padding-left: 55%;
    padding-top: 2%;
  }
</style>
<style>
  .el-table .hidden-columns {
    z-index: 1;
    visibility: visible;
    line-height: 48px;
  }

  .el-table th.is-leaf {
    text-align: center;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #fff;
  }
</style>

