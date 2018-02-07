<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="审核管理" name="first">
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="tel" label="手机号">
          </el-table-column>
          <el-table-column prop="meils" label="邮箱地址" width="150">
          </el-table-column>
          <el-table-column prop="time" label="时间">
          </el-table-column>
          <el-table-column prop="corporate" label="法人代表授权函" width="150">
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="card" label="名片">
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="audit" label="审核状态" width="100">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">-->
            </el-pagination>
          </div>
      </el-tab-pane>
      <!--代理机构的弹出框-->
      <el-dialog title="审核" :visible.sync="dialogVisible" width="40%">
        <h3>是否同意该用户加入本单位</h3>
        <div v-show="dialogVisible2">
          <el-input type="textarea" autosize placeholder="请输入不同意的原因">
        </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = true">不同意</el-button>
    <el-button type="primary" @click="dialogyes">同意</el-button>
  </span>
      </el-dialog>
      <el-tab-pane label="人员管理" name="second">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="请输入姓名" size="small"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formInline.user" placeholder="请输入手机号" size="small"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="formInline.region" placeholder="所属部门" size="small">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="采购一部" value="采购一部"></el-option>
              <el-option label="采购二部" value="采购二部"></el-option>
              <el-option label="采购三部" value="采购三部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="状态" size="small">
              <el-option label="正常" value="shanghai"></el-option>
              <el-option label="停用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData2">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="loginname" label="登录名" width="80">
          </el-table-column>
          <el-table-column prop="tel" label="手机号" width="150">
          </el-table-column>
          <el-table-column prop="worktel" label="办公电话" width="150">
          </el-table-column>
          <el-table-column prop="meils" label="邮箱地址" width="150">
          </el-table-column>
          <el-table-column prop="department" label="所属部门" width="80">
          </el-table-column>
          <el-table-column prop="role" label="角色" width="80">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="time" label="加入时间">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible1 = true">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">-->
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--代理机构的弹出框-->
      <el-dialog title="代理机构联系人" :visible.sync="dialogVisible1" width="30%">
        <div class="eldeglog">
          <p>姓&nbsp;&nbsp;&nbsp;&nbsp;名： <span>王伟</span></p>
          <p>登&nbsp;录&nbsp;名： <span>ww</span></p>
          <p>手&nbsp;机&nbsp;号： <span>88888888888</span></p>
          <p>办公电话： <span>88888888888</span></p>
          <p>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱： <span>888888@qq.com</span></p>
          <p>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门： <span>采购部 采购一部</span></p>
          <p>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色： <span>管理员</span></p>
          状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<select>
          <option>正常</option>
          <option>停用</option>
        </select>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
      </el-dialog>
      <el-tab-pane label="部门管理" name="third">
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
          <el-table-column prop="artime" label="公布(通知)时间" width="120">
          </el-table-column>
          <el-table-column prop="sabtime" label="截标时间" width="100">
          </el-table-column>
          <el-table-column prop="procurementmet" label="采购方式" width="80">
          </el-table-column>
          <el-table-column prop="principal" label="项目负责人" width="100">
          </el-table-column>
          <el-table-column prop="entrusttime" label="委托(立项)时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [{
          number: '1',
          name: '钱钱钱',
          meils: 'facai@888.com',
          time: '2017-11-21',
          corporate: '',
          card: '',
          department: '商务部',
          audit: '申请加入',
          operation: '',
          tel: '88888888888'
        }, {
          number: '1',
          name: '钱钱钱',
          meils: 'facai@888.com',
          time: '2017-11-21',
          corporate: '',
          card: '',
          department: '商务部',
          audit: '申请解除',
          operation: '',
          tel: '88888888888'
        }],
        tableData2: [{
          number: '1',
          name: '钱钱钱',
          loginname: '钱钱钱',
          meils: 'facai@888.com',
          time: '2017-11-21',
          role: '管理员',
          status: '正常',
          department: '商务部',
          audit: '申请加入',
          operation: '',
          tel: '88888888888',
          worktel: '666-88888'
        }, {
          number: '1',
          name: '钱钱钱',
          loginname: '钱钱钱',
          meils: 'facai@888.com',
          time: '2017-11-21',
          role: '管理员',
          status: '正常',
          department: '商务部',
          audit: '申请加入',
          operation: '',
          tel: '88888888888',
          worktel: '666-88888'
        }],
        activeName: 'first',
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
//        tableData: Array(3).fill(item),
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    computed: {},
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      dialogyes(){
        this.dialogVisible=false;
        this.dialogVisible2=false;
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .eldeglog{
    padding-left: 70px;
  }
  .exeparepro {
    margin-left: 20px;
    margin-top: 10px;
  }

  .el-table .cell {
    text-align: center;
  }
  .block {
    padding-left:55%;
    padding-top:5%;
  }
</style>


