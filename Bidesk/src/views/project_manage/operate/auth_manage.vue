<template>
  <div class="project-container">
    <!--<el-row>-->
      <!--<crumbs :resData="resData" v-if="resData"></crumbs>-->
    <!--</el-row>-->
    <el-tabs type="border-card" style="margin: 1% 0 2%;">
      <el-tab-pane label="单位人员">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
           <el-col :span="18" style="text-align: center">
          <el-form-item label="姓名：" style="width: 100%">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
               </el-col>
           <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
               </el-col>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="province" label="部门" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="操作" min-width="80" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">授权</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                     :total="1000">
      </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" >
      <el-tab-pane label="当前项目已授权人员">
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="province" label="部门" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="操作" min-width="80" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">取消授权</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import crumbs from '@/custom-components/project_manages/crumbs'

  export default {
    components: {
      crumbs
    },
    data() {
      return {
        currentPage1: 5,
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          name: '王小虎',
          phone: '13778575935',
          province: '采购一部'
        }, {
          name: '赵清',
          phone: '18503858499',
          province: '采购二部'
        }],
        tableData1: [{
          name: '董瑞',
          phone: '18697573058',
          province: '采购一部'
        }, {
          name: '陈飞',
          phone: '13585737590',
          province: '采购三部'
        }],
      }
    },
    methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>
.el-pagination {
  margin-top: 1%;
  text-align: right;
}
.el-input {
  width: 220%;
}

</style>
