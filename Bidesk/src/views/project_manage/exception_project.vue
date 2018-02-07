<template>
  <div class="app-container">
    <!--采购人的角色-->
    <div v-if="roleId==='purchaserAdmin'">
      <el-tabs type="border-card">
        <el-tab-pane label="委托代理项目">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-input placeholder="请输入项目名称" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="请输入项目编号" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="2" align="center">
              <el-button type="text" disabled>异常时间:
              </el-button>
            </el-col>
            <el-col :span="7.5">
              <el-time-picker
                is-range
                v-model="value4"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择异常时间">
              </el-time-picker>
            </el-col>
            <el-col :span="2.5">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待处理" name="first">
              <el-table :data="tableData" width="100%" border>
                <el-table-column align="center" prop="number" label="序号" width="50"></el-table-column>
                <el-table-column align="center" prop="proname" label="立项名称" min-width="110"></el-table-column>
                <el-table-column align="center" prop="procurement" label="采购项目名称" min-width="110"></el-table-column>
                <el-table-column align="center" prop="stage" label="包件/标段" min-width="70"></el-table-column>
                <el-table-column align="center" prop="procurementmet" label="采购方式" min-width="70"></el-table-column>
                <el-table-column align="center" prop="agency" label="委托单位" min-width="100">
                  <template slot-scope="scope">
                    <a data-role="button" class='myButton' @click="dialogVisible1 = true">新华国际招标有限公司</a>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="abnormal" label="异常类型" min-width="80">
                </el-table-column>
                <el-table-column align="center" prop="entrusttime" label="异常发生时间" min-width="90">
                </el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination background
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="currentPage1"
                             :page-size="100"
                             layout="total, prev, pager, next"
                             :total="1000">
              </el-pagination>

            </el-tab-pane>
            <el-tab-pane label="已处理" name="second">
              <el-table :data="tableData" width="100%" border>
                <el-table-column align="center" prop="number" label="序号" width="50">
                </el-table-column>
                <el-table-column align="center" prop="proname" label="立项名称" min-width="100">
                </el-table-column>
                <el-table-column align="center" prop="procurement" label="采购项目名称" min-width="100">
                </el-table-column>
                <el-table-column align="center" prop="stage" label="包件/标段" min-width="70">
                </el-table-column>
                <el-table-column align="center" prop="procurementmet" label="异常类型" min-width="80">
                </el-table-column>
                <el-table-column align="center" prop="artime" label="异常时间" min-width="90">
                </el-table-column>
                <el-table-column align="center" prop="principal" label="异常操作人" min-width="60">
                </el-table-column>
                <el-table-column align="center" prop="agency" label="委托单位" min-width="100">
                  <template slot-scope="scope">
                    <a data-role="button" class='myButton' @click="dialogVisible1 = true">新华国际招标有限公司</a>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="principal" label="项目负责人" min-width="60">
                </el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination background
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="currentPage1"
                             :page-size="100"
                             layout="total, prev, pager, next"
                             :total="1000">
              </el-pagination>

            </el-tab-pane>
            <el-dialog title="联系人" :visible.sync="dialogVisible1" width="35%">
              <getAgency></getAgency>
              <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible1 = false">关 闭</el-button>
            </span>
            </el-dialog>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="自行采购项目">
          <el-row style="margin-bottom: 15px" :gutter="10">
            <el-col :span="6">
              <el-input placeholder="请输入项目名称" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="请输入项目编号" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="2" align="center">
              <el-button type="text" disabled>异常时间:
              </el-button>
            </el-col>
            <el-col :span="7.5">
              <el-time-picker
                is-range
                v-model="value4"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择异常时间">
              </el-time-picker>
            </el-col>
            <el-col :span="2.5">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
          </el-row>
          <el-table :data="tableData" width="100%" border>
            <el-table-column align="center" prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column align="center" prop="proname" label="立项名称" min-width="100">
            </el-table-column>
            <el-table-column align="center" prop="procurement" label="采购项目名称" min-width="100">
            </el-table-column>
            <el-table-column align="center" prop="stage" label="包件/标段" min-width="70">
            </el-table-column>
            <el-table-column align="center" prop="procurementmet" label="异常类型" min-width="80">
            </el-table-column>
            <el-table-column align="center" prop="artime" label="异常时间" min-width="90">
            </el-table-column>
            <el-table-column align="center" prop="principal" label="异常操作人" min-width="60">
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage1"
                         :page-size="100"
                         layout="total, prev, pager, next"
                         :total="1000">
          </el-pagination>

        </el-tab-pane>
      </el-tabs>
    </div>
    <!--代理机构的角色-->
    <div v-else>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入项目名称" v-model="input">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入项目编号" v-model="input">
          </el-input>
        </el-col>
        <el-col :span="2" align="center">
          <el-button type="text" disabled>异常时间:
          </el-button>
        </el-col>
        <el-col :span="7.5">
          <el-time-picker
            is-range
            v-model="value4"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择异常时间">
          </el-time-picker>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待处理" name="first">
          <el-table :data="tableData" width="100%" border>
            <el-table-column align="center" prop="number" label="序号" width="50"></el-table-column>
            <el-table-column align="center" prop="proname" label="立项名称" min-width="110"></el-table-column>
            <el-table-column align="center" prop="procurement" label="采购项目名称" min-width="110"></el-table-column>
            <el-table-column align="center" prop="stage" label="包件/标段" min-width="70"></el-table-column>
            <el-table-column align="center" prop="procurementmet" label="采购方式" min-width="70"></el-table-column>
            <el-table-column align="center" prop="agency" label="委托单位" min-width="100">
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="dialogVisible1 = true">新华国际招标有限公司</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="abnormal" label="异常类型" min-width="80">
            </el-table-column>
            <el-table-column align="center" prop="entrusttime" label="异常发生时间" min-width="90">
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage1"
                         :page-size="100"
                         layout="total, prev, pager, next"
                         :total="1000">
          </el-pagination>

        </el-tab-pane>
        <el-tab-pane label="已处理" name="second">
          <el-table :data="tableData" width="100%" border>
            <el-table-column align="center" prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column align="center" prop="proname" label="立项名称" min-width="100">
            </el-table-column>
            <el-table-column align="center" prop="procurement" label="采购项目名称" min-width="100">
            </el-table-column>
            <el-table-column align="center" prop="stage" label="包件/标段" min-width="70">
            </el-table-column>
            <el-table-column align="center" prop="procurementmet" label="异常类型" min-width="80">
            </el-table-column>
            <el-table-column align="center" prop="artime" label="异常时间" min-width="90">
            </el-table-column>
            <el-table-column align="center" prop="principal" label="异常操作人" min-width="60">
            </el-table-column>
            <el-table-column align="center" prop="agency" label="委托单位" min-width="100">
              <template slot-scope="scope">
                <a data-role="button" class='myButton' @click="dialogVisible1 = true">新华国际招标有限公司</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="principal" label="项目负责人" min-width="60">
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage1"
                         :page-size="100"
                         layout="total, prev, pager, next"
                         :total="1000">
          </el-pagination>

        </el-tab-pane>
        <el-dialog title="联系人" :visible.sync="dialogVisible1" width="35%">
          <getAgency></getAgency>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible1 = false">关 闭</el-button>
            </span>
        </el-dialog>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import getAgency from "../components/agency.vue";

  export default {
    mounted() {
      this.$store.dispatch('SetProStatus', 'exception')
      this.getList()
    },
    data() {
      return {
        currentPage1: 5,
        input: '',
        dialogVisible: false,
        dialogVisible1: false,
        activeName2: 'first',
        activeName: 'first',
        tableData: [{
          number: '1',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          stage: '-',
          artime: '2017-01-18',
          sabtime: '2017-11-18',
          procurementmet: '自行采购',
          agency: '新华国际招标有限公司',
          principal: '张东强',
          entrusttime: '2016-05-13 88.88.88',
          tel: '88888888888',
          abnormal: '拒绝接受委托'
        }, {
          number: '1',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          stage: '-',
          artime: '2017-01-18',
          sabtime: '2017-11-18',
          procurementmet: '自行采购',
          agency: '新华国际招标有限公司',
          principal: '张东强',
          entrusttime: '2016-05-13 88.88.88',
          tel: '88888888888',
          abnormal: '中止'
        }],
        value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        roleId: this.$store.getters.roles[0],     //获取当前的角色
      }
    },
    components: {getAgency},
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
    }
  };
</script>
<style scoped>
  .el-table th {
    background-color: #fff !important;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }
</style>
