<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="全部" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="formInline.user" placeholder="项目编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="proname" label="立项名称">
          </el-table-column>
          <el-table-column prop="procurement" label="采购项目名称">
          </el-table-column>
          <el-table-column prop="stage" label="包件/标段" width="80">
          </el-table-column>
          <el-table-column prop="procurementmet" label="采购方式">
          </el-table-column>
          <el-table-column prop="agency" label="代理机构" width="170">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">新华国际招标有限公司</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="principal" label="项目负责人">
          </el-table-column>
          <el-table-column prop="entrusttime" label="办结时间">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--代理机构的弹出框-->
      <el-dialog title="代理机构联系人" :visible.sync="dialogVisible" width="50%">
        <getAgency></getAgency>
      </el-dialog>
      <el-tab-pane label="委托代理项目" name="second">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="formInline.user" placeholder="项目编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="proname" label="立项名称">
          </el-table-column>
          <el-table-column prop="procurement" label="采购项目名称">
          </el-table-column>
          <el-table-column prop="stage" label="包件/标段" width="80">
          </el-table-column>
          <el-table-column prop="procurementmet" label="采购方式">
          </el-table-column>
          <el-table-column prop="agency" label="代理机构" width="170">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">新华国际招标有限公司</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="principal" label="项目负责人">
          </el-table-column>
          <el-table-column prop="entrusttime" label="办结时间">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--代理机构的弹出框-->
      <el-dialog title="代理机构联系人" :visible.sync="dialogVisible" width="50%">
        <getAgency></getAgency>
      </el-dialog>
      <el-tab-pane label="自行采购项目" name="third">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="formInline.user" placeholder="项目编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="proname" label="立项名称">
          </el-table-column>
          <el-table-column prop="procurement" label="立项编号">
          </el-table-column>
          <el-table-column prop="stage" label="包件/标段" width="100">
          </el-table-column>
          <el-table-column prop="artime" label="公布(通知)时间">
          </el-table-column>
          <el-table-column prop="sabtime" label="截标时间">
          </el-table-column>
          <el-table-column prop="procurementmet" label="采购方式">
          </el-table-column>
          <el-table-column prop="principal" label="项目负责人">
          </el-table-column>
          <el-table-column prop="entrusttime" label="办结时间">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="total, prev, pager, next" :total="1000">
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
          tel: '88888888888'
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
          tel: '88888888888'
        }],
        tableData1: [{
          number: '1',
          name: '王小虎',
          address: '8888888888',
          addre: '注册中'
        }, {
          number: '1',
          name: '王小虎',
          address: '8888888888',
          addre: '注册中'
        }],
        activeName: 'first',
        dialogVisible: false,
        currentPage1: 6,
        currentPage2: 7,
        currentPage3: 8,
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    components: {getAgency},
    methods: {
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

  .el-table .cell {
    text-align: center;
  }
  .block {
    padding-left: 55%;
    padding-top:2%;
   }
</style>


