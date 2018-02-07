<template>
  <div class="app-container">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="货物类" name="first">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="请输入供应商名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" @click="centerDialogVisible = true">添加供应商</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-table :data="tableData">
            <el-table-column prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="proname" label="供应商名称">
            </el-table-column>
            <el-table-column prop="procurement" label="联系人">
            </el-table-column>
            <el-table-column prop="telnum" label="手机号">
            </el-table-column>
            <el-table-column prop="procurementmet" label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="centerDialogVisible1 = true">管理联系人</el-button>
                <el-button type="text">移除供应商</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--添加供应商弹出框-->
      <el-dialog title="添加供应商" width="30%" :visible.sync="centerDialogVisible" center>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="供应商名称">
            <el-input placeholder="输入供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
      <!--管理联系人弹出框-->
      <el-dialog title="添加联系人" :visible.sync="centerDialogVisible1" width="60%" center>
        <manageContacts></manageContacts>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="centerDialogVisible1 = false">确 定</el-button>
                </span>
      </el-dialog>


      <el-tab-pane label="服务类" name="second">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="请输入供应商名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" @click="centerDialogVisible3 = true">添加供应商</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-table :data="tableData1">
            <el-table-column prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="proname" label="供应商名称">
            </el-table-column>
            <el-table-column prop="procurement" label="联系人">
            </el-table-column>
            <el-table-column prop="telnum" label="手机号">
            </el-table-column>
            <el-table-column prop="procurementmet" label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="centerDialogVisible4 = true">管理联系人</el-button>
                <el-button type="text">移除供应商</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--添加供应商弹出框-->
      <el-dialog title="添加供应商" width="30%" :visible.sync="centerDialogVisible3" center>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="供应商名称">
            <el-input placeholder="输入供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible3 = false">确 定</el-button>
          </span>
      </el-dialog>
      <!--管理联系人弹出框-->
      <el-dialog title="添加联系人" :visible.sync="centerDialogVisible4" width="60%" center>
        <manageContacts></manageContacts>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible4 = false">取 消</el-button>
                  <el-button type="primary" @click="centerDialogVisible4 = false">确 定</el-button>
                </span>
      </el-dialog>


      <el-tab-pane label="工程类" name="three">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="请输入供应商名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" @click="centerDialogVisible6 = true">添加供应商</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-table :data="tableData2">
            <el-table-column prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="proname" label="供应商名称">
            </el-table-column>
            <el-table-column prop="procurement" label="联系人">
            </el-table-column>
            <el-table-column prop="telnum" label="手机号">
            </el-table-column>
            <el-table-column prop="procurementmet" label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="centerDialogVisible7 = true">管理联系人</el-button>
                <el-button type="text">移除供应商</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!--添加供应商弹出框-->
      <el-dialog title="添加供应商" width="30%" :visible.sync="centerDialogVisible6" center>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="供应商名称">
            <el-input placeholder="输入供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible6 = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible6 = false">确 定</el-button>
          </span>
      </el-dialog>
      <!--管理联系人弹出框-->
      <el-dialog title="添加联系人" :visible.sync="centerDialogVisible7" width="60%" center>
        <manageContacts></manageContacts>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible7 = false">取 消</el-button>
                  <el-button type="primary" @click="centerDialogVisible7 = false">确 定</el-button>
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
        tableData1: [{
          number: '88',
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
          number: '66',
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
        }],
        gridData: [{
          date: '66',
          name: 'avsd',
          name1: '南京国际投标有限公司',
          address: '88888888888',
          addres: '正常'
        }, {
            date: '1',
            name: 'wewqew',
            name1: '南京国际投标有限公司',
            address: '88888888888',
            addres: '正常'
        }],
        gridData1: [{
          date: '88',
          name: '王小虎',
          name1: '南京国际投标有限公司',
          address: '88888888888',
          addres: '正常'
        }, {
            date: '88',
            name: '王小虎',
            name1: '南京国际投标有限公司',
            address: '88888888888',
            addres: '正常'
        }],
        tableData2: [{
          number: '55',
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
          number: '789',
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
        gridData2: [{
          date: '66',
          name: 'aaaa',
          name1: '南京国际投标有限公司',
          address: '88888888888',
          addres: '正常'
        }, {
          date: '22',
          name: 'bbbb',
          name1: '南京国际投标有限公司',
          address: '88888888888',
          addres: '正常'
        }],
        dialogVisible1: false,
        centerDialogVisible: false,
        centerDialogVisible1: false,
        centerDialogVisible2: false,
        centerDialogVisible3: false,
        centerDialogVisible4: false,
        centerDialogVisible5: false,
        centerDialogVisible6: false,
        centerDialogVisible7: false,
        centerDialogVisible8: false,
        checked1: true,
        checked2: true,
        currentPage1: 1,
        currentPage2: 2,
        currentPage3: 3,
        activeName2: 'first',
      }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
