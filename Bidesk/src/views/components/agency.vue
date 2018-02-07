<template>
    <el-table :data="tableData1" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="address" label="联系人" align="center">
      </el-table-column>
    </el-table>
</template>

<script>
  export default {
    data() {
      return {
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
      }
    }
  }
</script>
