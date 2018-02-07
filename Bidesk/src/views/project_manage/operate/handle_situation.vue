<template>
  <div id="app-container">

    <el-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="项目名称">
          <el-input v-model="formInline.user" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input v-model="formInline.user" placeholder="项目编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" v-loading="listLoading" element-loading-text="加载中..." width='100%'>
        <el-table-column prop="number" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column prop="proname" label="项目名称" width="260" align="center">
        </el-table-column>
        <el-table-column prop="procurement" label="项目编号" width="260" align="center">
        </el-table-column>
        <el-table-column prop="agency" label="采购单位" align="center">
        </el-table-column>
        <el-table-column prop="principal" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible = true">关注</el-button>
            <el-button type="text" @click="dialogVisible1 = true">关注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                       :total="1000">
        </el-pagination>

    </el-main>

    <!--项目负责人的弹出框-->
    <el-dialog title="关注" :visible.sync="dialogVisible" width="30%">
      <div class="attention">
        <h3>确定关注吗？</h3>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="关注" :visible.sync="dialogVisible1" width="40%">
      <el-table :data="tableData1" style="width: 100%">
        <el-table-column prop="number" label="选择" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="包号" width="180">
        </el-table-column>
        <el-table-column prop="address" label="包名">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: 'preparapro',
    data() {
      const item = {
        number: '1',
        proname: '燃气报警设备维修台PRO-124568',
        procurement: '南京建工集团燃气报警设备维修台',
        stage: '-',
        agency: '新华国际招标有限公司',
        principal: '张东强',
        entrusttime: '2016-05-13 88.88.88'
      };
      return {
        listLoading: false,
        tableData1: [{
          number: '1',
          name: '第一包',
          address: '8888888888',
        }, {
          number: '2',
          name: '第二包',
          address: '8888888888',
        }],
        tableData: Array(7).fill(item),
        dialogVisible: false,
        dialogVisible1: false,
        checked: false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        // console.log('submit!');
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>
  .attention {
    text-align: center;
  }

  .el-header {
    background-color: #608FC7;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    background-color: #608FC7;
    height: 100vh;
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

  .el-pagination {
    padding: 2% 0;
    text-align: right;
  }
</style>
