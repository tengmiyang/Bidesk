<template>
  <div class="app-container">
    <div class="inboxmail">
      <div class="numbers">
        <p>
          草稿箱 <span>(共2封)</span>
        </p>
        <p>
          <el-button type="primary" plain size="small">删除草稿</el-button>
        </p>
      </div>
      <div class="contents">
        <div class="tables">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="number" label="全选" width="180">
              <template slot-scope="scope">
                <el-checkbox v-model="checked"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="发件人" width="180">
            </el-table-column>
            <el-table-column prop="theme" label="主题">
              <template slot-scope="scope">
                <el-button type="text" @click="centerDialogVisible = true">{{tableData[0].theme}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="时间">
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        checked: true,
        currentPage1: 5,
        tableData: [{
          number: '1',
          name: '王小虎',
          theme: '回复：xxxxxxxxxxxxxxx项目采购文件审核意见',
          time: '2017-8-30 11.11'
        }, {
          number: '2',
          name: '发财',
          theme: '回复：xxxxxxxxxxxxxxx项目资料补充文件',
          time: '2017-8-30 11.11'
        }]
      }
    },
    computed: {},
    methods: {
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
  .block {
    position: absolute;
    top: 90vh;
    right: 2vh;
  }
</style>


