<template>
  <div class="app-container">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="我的采购代理" name="first">
        <!--管理我的采购代理按钮的dome-->
        <div class="manageage">
          <el-button type="primary" plain size="small" @click="centerDialogVisible5 = true">
            添加我的采购代理
          </el-button>
          <el-dialog title="添加我的采购代理" :visible.sync="centerDialogVisible5" width="40%" :before-close="handleClose">

            <el-table :data="gridData">
              <el-table-column width="50" property="date" label="序号"></el-table-column>
              <el-table-column width="200" property="name1" label="单位名称"></el-table-column>
              <el-table-column width="70" property="addres" label="状态"></el-table-column>
              <el-table-column width="200" property="address" label="操作">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked3">添加</el-checkbox>
                  <el-checkbox v-model="checked4" disabled>已添加</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible5 = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible5 = false">确 定</el-button>
          </span>
          </el-dialog>
        </div>
        <!--我的采购代理的表格数据-->
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="proname" label="单位名称">
          </el-table-column>
          <el-table-column prop="name" label="联系人">
          </el-table-column>
          <el-table-column prop="telnum" label="手机号">
          </el-table-column>
          <el-table-column prop="procurementmet" label="状态">
          </el-table-column>
          <el-table-column label="操作">
            <!--操作中的管理联系人的弹出框dome-->
            <template slot-scope="scope">
              <el-dialog title="添加联系人" :visible.sync="centerDialogVisible4" width="60%" center>
                <manageContacts></manageContacts>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible4 = false">取 消</el-button>
                  <el-button type="primary" @click="centerDialogVisible4 = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button type="text" @click="centerDialogVisible4 = true">管理联系人</el-button>
              <el-button type="text">移除单位</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="采购代理库管理" name="second">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="添加采购代理">
            <el-input placeholder="添加采购代理"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible3 = true">添加</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="添加联系人" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <div class="demo-input-suffix">
            单位名称：
            <el-input placeholder="请输入单位名称" v-model="input2"></el-input>
          </div>
          <div class="demo-input-suffix">
            联系人：
            <el-input placeholder="请输入联系人名称" v-model="input23"></el-input>
          </div>
          <div class="demo-input-suffix">
            手机号：
            <el-input placeholder="请输入手机号码" v-model="input23"></el-input>
          </div>

          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="proname" label="单位名称">
          </el-table-column>
          <el-table-column prop="procurement" label="管理员">
          </el-table-column>
          <el-table-column prop="stage" label="手机号">
          </el-table-column>
          <el-table-column prop="procurementmet" label="状态">
          </el-table-column>
          <el-table-column prop="agency" label="添加人">
          </el-table-column>
          <el-table-column prop="principal" label="添加时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="centerDialogVisible1 = true">停用</el-button>
              <el-button type="text" @click="centerDialogVisible2 = true">移除</el-button>
              <el-button type="text" @click="centerDialogVisible3 = true">重新邀请</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--采购代理库管理的弹出框dome-->
      <el-dialog title="停用" :visible.sync="centerDialogVisible1" width="30%" center>
        <span>确定该单位需要停用</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible1 = false">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="移除" :visible.sync="centerDialogVisible2" width="30%" center>
        <span>该单位有业务不能移除</span>
        <span slot="footer" class="dialog-footer">
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="centerDialogVisible2 = false">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="重新邀请" :visible.sync="centerDialogVisible3" width="30%" center>
        <span>确定该单位需要重新邀请</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible3 = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible3 = false">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="添加采购代理" width="30%" :visible.sync="dialogVisible3" center>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="单位名称">
            <el-input placeholder="输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog width="50%" title="添加联系人" :visible.sync="dialogVisible1" append-to-body>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="输入联系人">
            <el-input placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="gridData">
          <el-table-column width="50" property="date" label="序号"></el-table-column>
          <el-table-column width="200" property="name" label="姓名"></el-table-column>
          <el-table-column width="170" property="addres" label="电话"></el-table-column>
          <el-table-column width="200" property="address" label="操作">
            <template slot-scope="scope">
              <el-checkbox v-model="checked">添加</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
      </el-dialog>
    </el-tabs>

  </div>
</template>

<script>
  import manageContacts from '../components/manageContacts.vue'
  export default{
    components: {manageContacts},
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
          name: '张东强',
          telnum: '88888888888'
        }, {
          number: '1',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          stage: '-',
          artime: '2017-01-18',
          sabtime: '2017-11-18',
          procurementmet: '自行采购',
          agency: '新华国际招标有限公司',
          name: '张东强',
          telnum: '88888888888'
        }, {
          number: '1',
          proname: '燃气报警设备维修台PRO-124568',
          procurement: '南京建工集团燃气报警设备维修台',
          stage: '-',
          artime: '2017-01-18',
          sabtime: '2017-11-18',
          procurementmet: '自行采购',
          agency: '新华国际招标有限公司',
          name: '张东强',
          telnum: '88888888888'
        }],
        input2: '',
        input21: '',
        input22: '',
        input23: '',
        checked:'false',
        checked1: true,
        checked2: true,
        checked3: true,
        checked4: true,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible3: false,
        centerDialogVisible1: false,
        centerDialogVisible2: false,
        centerDialogVisible3: false,
        centerDialogVisible4: false,
        centerDialogVisible5: false,
        activeName: 'first',
        activeName2: 'first',
        currentPage1: 1,
        currentPage2: 2,
        gridData: [{
          date: '1',
          name: '王小虎',
          name1: '南京国际投标有限公司',
          address: '88888888888',
          addres: '正常'
        },
          {
            date: '1',
            name: '王小虎',
            name1: '南京国际投标有限公司',
            address: '88888888888',
            addres: '正常'
        }],
        gridData1: [{
          date: '1',
          name: '王小虎',
          address: '88888888888',
          addres: '正常'
        }, {
          date: '1',
          name: '王小虎',
          address: '88888888888',
          addres: '正常'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      }
    }
  };
</script>
<style scoped>
  .manageage {
    margin-top: 10px;
    padding-left: 85%;
  }

  .tianjiaman {
    padding-left: 80%;
  }
  .block {
    padding-left:55%;
    padding-top:2%;
  }
</style>
