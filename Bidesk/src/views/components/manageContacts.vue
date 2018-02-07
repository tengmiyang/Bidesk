<template>
    <div class="addcontact">
      <div class="btn">
        <el-button type="primary" size="small" @click="centerDialogVisible2 = true">添加联系人</el-button>
      </div>
      <div class="datatable">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="联系人" width="100">
          </el-table-column>
          <el-table-column prop="address" label="手机号码"></el-table-column>
          <el-table-column prop="address" label="邮箱"></el-table-column>
          <el-table-column prop="address" label="状态"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-checkbox>添加</el-checkbox>
              <el-checkbox disabled>已添加</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加联系人的弹出框-->
      <el-dialog width="50%" title="添加联系人" :visible.sync="centerDialogVisible2" append-to-body>
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
          <el-button @click="centerDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible2 = false">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '1',
          name: '王小虎',
          address: 88888888888
        }, {
          date: '1',
          name: '王小虎',
          address: 88888888888
        }, {
          date: '1',
          name: '王小虎',
          address: 88888888888
        }, {
          date: '1',
          name: '王小虎',
          address: 88888888888
        }],
        centerDialogVisible2: false,
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
      }
    }
  }
</script>
<style scoped>
  .addcontact{
    width:100%;
  }
  .addcontact>.btn{
    width:100%;
    padding-left:70%;
  }
</style>
