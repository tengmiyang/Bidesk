<template>
  <div class="app-container">
    <crumbs :tableData="tableData"></crumbs>
    <el-row style="margin:3%; text-align: center;">
      <el-table :data="packList" border style="width: 100%">
        <el-table-column prop="packNum" label="包号" min-width="80" align="center"></el-table-column>
        <el-table-column prop="packName" label="包名" min-width="180" align="center"></el-table-column>
        <el-table-column prop="stateName" label="状态" min-width="80" align="center">
          <!--<template scope="scope">-->
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small" >{{scope.row.state}}</el-button>-->
          <!--</template>-->
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 5%;" @click="submit">办结项目</el-button>
    </el-row>
    <!--弹框-->
  </div>
</template>

<script>
  import crumbs from '@/custom-components/project_manages/crumbs';
  import {expireEndInit, expireEndSave} from '@/api/project'

  export default {
    components: {crumbs},
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        tableData: {},
        packList: [],
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      submit() {
        this.$confirm('是否确定办结，办结后无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          expireEndSave(this.projectId).then(response => {
            // console.log(response)
            if (response.state === true) {
              this.$message({
                type: 'success',
                message: '办结成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '部分包件处于“正在执行”和“前期准备”阶段，因此无法办结本项目！'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消办结'
          });
        });
      },
      getList() {
        expireEndInit(this.projectId).then(response => {
          // console.log(response)
          this.tableData = response.data
          this.packList = response.data.packList
        })
      },
      handleClick(row) {
        // console.log(row);
      }
    }
  }
</script>
