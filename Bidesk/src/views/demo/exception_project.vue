<template>
  <div class="app-container">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="全部" name="first">
        <el-row style="margin-bottom: 10px" :gutter="10">
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
          <el-col :span="8">
            <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择异常时间">
            </el-time-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待处理" name="first">
            <el-table :data="tableData">
              <el-table-column align="center" prop="number" label="序号" width="50"></el-table-column>
              <el-table-column align="center" prop="proname" label="立项名称"></el-table-column>
              <el-table-column align="center" prop="procurement" label="采购项目名称"></el-table-column>
              <el-table-column align="center" prop="stage" label="包件/标段" width="80"></el-table-column>
              <el-table-column align="center" prop="procurementmet" label="采购方式"></el-table-column>
              <el-table-column align="center" prop="agency" label="代理机构" width="170">
                <template slot-scope="scope">
                  <el-button type="text" @click="dialogVisible = true">新华国际招标有限公司</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="abnormal" label="异常类型">
              </el-table-column>
              <el-table-column align="center" prop="entrusttime" label="异常发生时间">
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 10px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已处理" name="second">
            <el-table :data="tableData">
              <el-table-column align="center" prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column align="center" prop="proname" label="立项名称">
              </el-table-column>
              <el-table-column align="center" prop="procurement" label="采购项目名称">
              </el-table-column>
              <el-table-column align="center" prop="stage" label="包件/标段" width="80">
              </el-table-column>
              <el-table-column align="center" prop="procurementmet" label="异常类型">
              </el-table-column>
              <el-table-column align="center" prop="artime" label="异常时间">
              </el-table-column>
              <el-table-column align="center" prop="principal" label="异常操作人">
              </el-table-column>
              <el-table-column align="center" prop="agency" label="代理机构" width="170">
                <template slot-scope="scope">
                  <el-button type="text" @click="dialogVisible = true">新华国际招标有限公司</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="principal" label="项目负责人">
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 10px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-dialog title="代理机构联系人" :visible.sync="dialogVisible" width="50%">
            <getAgency></getAgency>
          </el-dialog>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="委托代理项目" name="second">
        <el-row style="margin-bottom: 10px" :gutter="10">
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
          <el-col :span="8">
            <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择异常时间">
            </el-time-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待处理" name="first">
            <el-table :data="tableData">
              <el-table-column align="center" prop="number" label="序号" width="50"></el-table-column>
              <el-table-column align="center" prop="proname" label="立项名称"></el-table-column>
              <el-table-column align="center" prop="procurement" label="采购项目名称"></el-table-column>
              <el-table-column align="center" prop="stage" label="包件/标段" width="80"></el-table-column>
              <el-table-column align="center" prop="procurementmet" label="采购方式"></el-table-column>
              <el-table-column align="center" prop="agency" label="代理机构" width="170">
                <template slot-scope="scope">
                  <el-button type="text" @click="dialogVisible1 = true">新华国际招标有限公司</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="abnormal" label="异常类型">
              </el-table-column>
              <el-table-column align="center" prop="entrusttime" label="异常发生时间">
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 10px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已处理" name="second">
            <el-table :data="tableData">
              <el-table-column align="center" prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column align="center" prop="proname" label="立项名称">
              </el-table-column>
              <el-table-column align="center" prop="procurement" label="采购项目名称">
              </el-table-column>
              <el-table-column align="center" prop="stage" label="包件/标段" width="80">
              </el-table-column>
              <el-table-column align="center" prop="procurementmet" label="异常类型">
              </el-table-column>
              <el-table-column align="center" prop="artime" label="异常时间">
              </el-table-column>
              <el-table-column align="center" prop="principal" label="异常操作人">
              </el-table-column>
              <el-table-column align="center" prop="agency" label="代理机构" width="170">
                <template slot-scope="scope">
                  <el-button type="text" @click="dialogVisible1 = true">新华国际招标有限公司</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="principal" label="项目负责人">
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 10px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-dialog title="代理机构联系人" :visible.sync="dialogVisible1" width="50%">
            <getAgency></getAgency>
          </el-dialog>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="自行采购项目" name="third">
        <el-row style="margin-bottom: 10px" :gutter="10">
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
          <el-col :span="8">
            <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择异常时间">
            </el-time-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData">
              <el-table-column align="center" prop="number" label="序号" width="50">
              </el-table-column>
              <el-table-column align="center" prop="proname" label="立项名称">
              </el-table-column>
              <el-table-column align="center" prop="procurement" label="采购项目名称">
              </el-table-column>
              <el-table-column align="center" prop="stage" label="包件/标段" width="80">
              </el-table-column>
              <el-table-column align="center" prop="procurementmet" label="异常类型">
              </el-table-column>
              <el-table-column align="center" prop="artime" label="异常时间">
              </el-table-column>
              <el-table-column align="center" prop="principal" label="异常操作人">
              </el-table-column>
            </el-table>
        <div class="block" style="margin-top: 10px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import getAgency from "../components/agency.vue";
  export default {
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

