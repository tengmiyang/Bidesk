<template>
  <div class="project-container">
    <el-table :data="tableData" border style="">
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="theme" label="主题" min-width="50" align="center">
      </el-table-column>
      <el-table-column prop="addresser" label="发件人" min-width="50" align="center">
      </el-table-column>
      <el-table-column prop="recipients" label="收件人" min-width="50" align="center">
      </el-table-column>
      <el-table-column prop="date" label="时间" min-width="50" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="50" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage2" :page-size="100" layout="total, prev, pager, next"
                   :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage2: 5,
        tableData: [{
          theme: '银行后台',
          addresser: '刘朴浩',
          recipients: '李静',
          date: '2016-05-03',
        }, {
          theme: '银行后台',
          addresser: '李静',
          recipients: '刘朴浩',
          date: '2016-05-05',
        }, {
          theme: '银行后台',
          addresser: '刘朴浩',
          recipients: '李静',
          date: '2016-05-07',
        }, {
          theme: '风格螺蛳粉',
          addresser: '刘朴浩',
          recipients: '张海亮',
          date: '2016-06-04',
        }, {
          theme: '风格螺蛳粉',
          addresser: '张海亮',
          recipients: '刘朴浩',
          date: '2016-06-05',
        }, {
          theme: '技术开发',
          addresser: '刘朴浩',
          recipients: '陈松',
          date: '2016-8-12',
        }, {
          theme: '技术开发',
          addresser: '陈松',
          recipients: '刘朴浩',
          date: '2016-08-12',
        }, {
          theme: '技术开发',
          addresser: '刘朴浩',
          recipients: '陈松',
          date: '2016-08-15',
        }, {
          theme: '技术开发',
          addresser: '陈松',
          recipients: '刘朴浩',
          date: '2016-08-16',
        }]
      }
    },
    methods: {
      handleClick(row) {
        // console.log(row);
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
/*.el-table__body-wrapper {*/
   /*overflow: hidden;*/
/*}*/
  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }
</style>
