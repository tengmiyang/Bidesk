<template>
  <div class="app-container">
    <ProjectSearch :tableData="tableData"></ProjectSearch>
    <el-table :data="tableData" border>
      <!--<el-table-column prop="number" label="序号" width="50" align="center">-->
      <!--</el-table-column>-->
      <el-table-column prop="proname" label="项目名称" width="260" align="center">
      </el-table-column>
      <el-table-column prop="procurement" label="项目编号" width="260" align="center">
      </el-table-column>
      <el-table-column prop="agency" label="包件" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogVisible3 = true">下载文件</el-button>
          <el-button type="text" @click="dialogVisible4 = true">下载文件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100"
                   layout="total, prev, pager, next" :total="1000">
    </el-pagination>
    <!--项目负责人的弹出框-->
    <el-dialog title="下载文件" :visible.sync="dialogVisible3" width="40%">
      <div class="attention">
        <h4>已发送验证码至您的手机号 182XXXXX230,请注意查收</h4>
        <span>验证码：<input type="text" v-model="authid">
            <el-button type="success" plain size="small">再次获取</el-button></span>
        <p v-show="hintid">您输入的验证码有误，请重新核实！</p>
      </div>
      <el-dialog width="50%" :visible.sync="dialogVisible5" append-to-body>
        <div>
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="name" label="文件名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <br>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible5 = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible5 = false">确 定</el-button>
  </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">关 闭</el-button>
          <el-button type="primary" @click="authcode">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="下载文件" :visible.sync="dialogVisible4" width="40%">
      <div class="attention">
        <h4>已发送验证码至您的手机号 182XXXXX230,请注意查收</h4>
        <span>验证码：<input type="text" v-model="authid">
            <el-button type="success" plain size="small">再次获取</el-button></span>
        <p v-show="hintid">您输入的验证码有误，请重新核实！</p>
      </div>
      <el-dialog width="50%" :visible.sync="dialogVisible5" append-to-body>
        <p>包件编号：
          <el-button type="primary" plain size="small" @click="cutfirst">第一包</el-button>
          <el-button type="primary" plain size="small" @click="cutsecond">第二包</el-button>
        </p>
        <div v-show="first">
          <div>
            <div>
              <el-table :data="tableData4" style="width: 100%">
                <el-table-column prop="name" label="文件名称">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-show="second">
          <div>
            <el-table :data="tableData5" style="width: 100%">
              <el-table-column prop="name" label="文件名称">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible5 = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible5 = false">确 定</el-button>
  </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible4 = false">关 闭</el-button>
          <el-button type="primary" @click="authcodes">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>
<script>
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'

  export default {
    components: {
      ProjectSearch
    },
    name: 'preparapro',
    data() {
      return {
        authid: '',
        hintid: false,
        noticeid: false,
        first: true,
        second: false,
        tableData1: [{
          number: '1',
          name: '第一包',
          address: '8888888888',
        }, {
          number: '2',
          name: '第二包',
          address: '8888888888',
        }],
        tableData: [{
          number: '1',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: 'QAASDAS88888888',
          agency: '-',
        }, {
          number: '1',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          agency: '第2包，第5包'
        }],
        tableData2: [{
          name: '中标通知书.pdf'
        }, {
          name: '合同.doc'
        }],
        tableData3: [{
          name: '666666公告'
        }, {
          name: 'ZXNBZXMC'
        }],
        tableData4: [{
          name: '中标通知书'
        }, {
          name: '合同'
        }],
        tableData5: [{
          name: '未中标通知书'
        }, {
          name: '中标通知书'
        }],
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        checked: false,
        checked1: false,
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
      cutfirst() {
        this.first = true;
        this.second = false;
      },
      cutsecond() {
        this.first = false;
        this.second = true;
      },
      authcode() {
        if (this.authid === '1234') {
          this.hintid = false;
          this.dialogVisible5 = true;
        }
        else {
          this.hintid = true;
        }
      },
      authcodes() {
        if (this.authid === '1234') {
          this.hintid = false;
          this.dialogVisible5 = true;
        }
        else {
          this.hintid = true;
        }
      },
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

  .attention > p {
    color: red;
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

  .el-main {
    padding: 15px;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }

  .el-form-item {
    margin-bottom: 15px;
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
<!--<style>-->
<!--.el-table th.is-leaf {-->
<!--text-align: center;-->
<!--}-->
<!--</style>-->
