<template>
  <div class="app-container">
    <!--采购人的角色-->
    <div v-if="roleId==='purchaserAdmin'">
      <el-tabs type="border-card">
        <el-tab-pane label="委托代理项目">
          <ProjectSearch :tableData="tableData"></ProjectSearch>
          <el-table :span-method="objectSpanMethod" :data="tableData" border>
            <el-table-column prop="pro_name" label="立项名称" min-width="100">
              <template slot-scope="scope">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
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
            <el-table-column prop="pack_num" label="包件/标段" min-width="60" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column label="公布(通知)时间" min-width="80" align="center">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.is_upload_doc==='false'">--</span>
                <span v-else>{{scope.row.notice_publish_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="submit_end_time" label="递交响应文件截止时间" min-width="100" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.is_upload_doc==='false'">--</span>
                <span v-else>{{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dic_name" label="采购方式" min-width="80" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="com_name" label="委托单位" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="openName(scope.row)">{{scope.row.com_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="entrust_user_name" label="项目负责人" min-width="60" align="center">
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                         :total="1000">
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
        </el-tab-pane>
        <el-tab-pane label="自行采购项目">
          <ProjectSearch :tableData="tableData"></ProjectSearch>
          <el-table :span-method="objectSpanMethod" :data="tableData" border>
            <el-table-column prop="pro_name" label="立项名称" min-width="100">
              <template slot-scope="scope">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
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
            <el-table-column prop="pack_num" label="包件/标段" min-width="60" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column label="公布(通知)时间" min-width="80" align="center">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.is_upload_doc==='false'">--</span>
                <span v-else>{{scope.row.notice_publish_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="submit_end_time" label="递交响应文件截止时间" min-width="100" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.is_upload_doc==='false'">--</span>
                <span v-else>{{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dic_name" label="采购方式" min-width="80" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="com_name" label="委托单位" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="openName(scope.row)">{{scope.row.com_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="entrust_user_name" label="项目负责人" min-width="60" align="center">
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                         :total="1000">
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--代理机构的角色-->
    <div v-else>
      <ProjectSearch :tableData="tableData"></ProjectSearch>
      <el-table :span-method="objectSpanMethod" :data="tableData" border>
        <el-table-column prop="pro_name" label="立项名称" min-width="100">
          <template slot-scope="scope">
              <span v-if="scope.row.pro_name">
                <span>{{scope.row.pro_name}}</span><br>
                <span v-if="scope.row.sub_pro_num">({{scope.row.sub_pro_num}})</span>
              </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
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
        <el-table-column prop="pack_num" label="包件/标段" min-width="60" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.pack_name">第{{scope.row.pack_num}}包</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="公布(通知)时间" min-width="80" align="center">
          <template slot-scope="scope">
                <span
                  v-if="scope.row.is_upload_doc==='false'">--</span>
            <span v-else>{{scope.row.notice_publish_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="submit_end_time" label="递交响应文件截止时间" min-width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_upload_doc==='false'">--</span>
            <span v-else>{{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dic_name" label="采购方式" min-width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.dic_name">{{scope.row.dic_name}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="com_name" label="委托单位" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openName(scope.row)">{{scope.row.com_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="entrust_user_name" label="项目负责人" min-width="60" align="center">
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                     :total="1000">
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
  </div>
</template>

<script>
  import {endProject} from '@/api/project'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'
  import {mergeInit, merge} from '@/utils'

  export default {
    components: {ProjectSearch},
    mounted() {
      mergeInit(8, 15, this.mergeList)
      this.$store.dispatch('SetProStatus', 'end')
      this.getList()
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
        currentPage2: 6,
        currentPage3: 7,
        formInline: {
          user: '',
          region: ''
        },
        roleId: this.$store.getters.roles[0],       //角色相关
      }
    },
    // created() {
    //   this.getList()
    // },
    methods: {
      getList() {
        endProject().then(response => {
          console.log(response);
          if (response.state) {
            this.listLoading = false
          }
          this.tableData = response.data.list;
          merge(this.tableData, 0, 'pro_id', this.mergeList)
          merge(this.tableData, 1, 'sub_pro_id', this.mergeList)
        })
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex > 5) {
          return this.mergeList[0][rowIndex]
        } else if (columnIndex === 1 || columnIndex === 5) {
          return this.mergeList[1][rowIndex]
        }
      },
      openName(row) {
        this.dialogVisible = true;
        this.userData = [row];
        // console.log(row.submit_end_time);
        // console.log(typeof row.submit_end_time);
      },
      openNew(id) {
//        this.$router.push('/project_manage/operate/publish_notice');
//        this.$router.push({name: '发布采购公告'})
        this.$store.dispatch('SetSubProID', id).then(() => {
//          alert(this.$store.getters.subProjectId)
          this.$router.push({name: '采购公告'}) //  路由添加完后  才可跳转到新页面
          this.$router.routerType = 4
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
        // console.log(tab, event);
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
</style>

