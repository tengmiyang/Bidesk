<template>
  <div class="app-container">
    <!--采购人的角色-->
    <div v-if="roleId==='purchaserAdmin'">
      <el-tabs type="border-card">
        <el-tab-pane label="委托代理项目">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-input placeholder="请输入项目名称" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-input placeholder="请输入项目编号" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="7">
              <el-input placeholder="请输入委托单位" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="前期准备项目" name="first">
              <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
                <el-table-column
                  prop="id"
                  type="index"
                  label="序号"
                  align="center"
                  width="65"
                >
                </el-table-column>
                <el-table-column align="center"
                                 prop="proname"
                                 label="立项名称">
                </el-table-column>
                <el-table-column align="center"
                                 prop="procurement"
                                 label="采购项目名称">
                </el-table-column>
                <el-table-column align="center"
                                 prop="stage"
                                 label="包件/标段">
                </el-table-column>
                <el-table-column align="center"
                                 prop="artime"
                                 label="公布(通知)时间">
                </el-table-column>
                <el-table-column align="center"
                                 prop="sabtime"
                                 label="截标时间">
                </el-table-column>
                <el-table-column align="center"
                                 prop="procurementmet"
                                 label="采购方式">
                </el-table-column>
                <el-table-column align="center"
                                 prop="agency"
                                 label="委托单位">
                </el-table-column>
                <el-table-column align="center"
                                 prop="principal"
                                 label="项目负责人">
                </el-table-column>
                <el-table-column align="center"
                                 prop="entrusttime"
                                 label="委托时间">
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
            <el-tab-pane label="正在执行项目" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="已到期项目" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="已完结项目" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="异常项目" name="five">任务补偿</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="自行采购项目">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input placeholder="请输入项目名称" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="请输入项目编号" v-model="input">
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="正在执行项目" name="first">
              <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
                <el-table-column
                  prop="id"
                  type="index"
                  label="序号"
                  align="center"
                  width="65"
                >
                </el-table-column>
                <el-table-column align="center"
                                 prop="proname"
                                 label="项目名称">
                </el-table-column>
                <el-table-column align="center"
                                 prop="number"
                                 label="项目编号">
                </el-table-column>
                <el-table-column align="center"
                                 prop="procurementmet"
                                 label="采购方式">
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
            <el-tab-pane label="已到期项目" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="已完结项目" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="异常项目" name="five">任务补偿</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入项目名称" v-model="input">
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="请输入项目编号" v-model="input">
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="请输入委托单位" v-model="input">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="前期准备项目" name="first">
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              type="index"
              label="序号"
              align="center"
              width="65"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="proname"
                             label="立项名称">
            </el-table-column>
            <el-table-column align="center"
                             prop="procurement"
                             label="采购项目名称">
            </el-table-column>
            <el-table-column align="center"
                             prop="stage"
                             label="包件/标段">
            </el-table-column>
            <el-table-column align="center"
                             prop="artime"
                             label="公布(通知)时间">
            </el-table-column>
            <el-table-column align="center"
                             prop="sabtime"
                             label="截标时间">
            </el-table-column>
            <el-table-column align="center"
                             prop="procurementmet"
                             label="采购方式">
            </el-table-column>
            <el-table-column align="center"
                             prop="agency"
                             label="委托单位">
            </el-table-column>
            <el-table-column align="center"
                             prop="principal"
                             label="项目负责人">
            </el-table-column>
            <el-table-column align="center"
                             prop="entrusttime"
                             label="委托时间">
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
        <el-tab-pane label="正在执行项目" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="已到期项目" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="已完结项目" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="异常项目" name="five">任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage1: 5,
        input: '',
        activeName2: 'first',
        activeName: 'first',
        tableData: [{
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          stage: '-',
          number: 'PRO-124568',
          artime: '2017-01-18',
          sabtime: '2017-11-18',
          procurementmet: '自行采购',
          agency: '新华国际招标有限公司',
          principal: '张东强',
          entrusttime: '2016-05-13 88.88.88',
          tel: '88888888888'
        }, {
          number: 'PRO-124568',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          stage: '-',
          artime: '2017-01-18',
          sabtime: '2017-11-18',
          procurementmet: '自行采购',
          agency: '新华国际招标有限公司',
          principal: '张东强',
          entrusttime: '2016-05-13 88.88.88',
          tel: '88888888888'
        }],
        roleId: this.$store.getters.roles[0],     //获取当前的角色
      }
    },
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
    background-color: #fff;
  }

  .el-pagination {
    text-align: right;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }
</style>
