<template>
  <div class="project-container">
    <crumbs :resData="firstData"></crumbs>
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-button type="text">项目名称：</el-button>-->
    <!--{{firstData.projectName}}-->
    <!--</el-col>-->
    <!--<el-col :span="8">-->
    <!--<el-button type="text">项目编号：</el-button>-->
    <!--{{firstData.projectNum}}-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row style="font-size: 22px;text-align: center;">中止项目</el-row>-->
    <el-row>
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="stop">
        <el-tab-pane label="详情" name="first">
          <el-row style="text-align: center">
            <el-col :span="2"><span style="color: #5e5a66">中止原因:</span></el-col>
            <el-col :span="20">
              <div class="grid-content">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容"
                          v-model="form.coreProject.stopReason"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row style="text-align: center">
            <el-button type="primary" @click="open2" style="margin-top:5%">中 止</el-button>
            <!--<el-button type="primary" @click=cleanText>清空</el-button>-->
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="邮件来往" name="second">
          <associatedAll></associatedAll>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
  import associatedAll from '@/custom-components/project_manages/associatedAll';
  import {prepareProjectStop, prepareProjectSaveStop} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs'

  export default {
    components: {
      crumbs, associatedAll
    },
    created() {
      this.getList()
    },
    data() {
      return {
        form: {
          coreProject: {
            projectId: this.$store.getters.projectStatus === 'prepare' ? this.$store.getters.projectId : this.$store.getters.subProjectId,
            stopReason: ''
          }
        },
        firstData: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海市普陀区金沙江路 1517 弄'
        }],
        activeName2: 'first',
        dialogVisible1: false,
        dialogVisible2: false,
      };
    },
    methods: {
      cleanText() {
        this.form.coreProject.stopReason = ''
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      getList() {
//        this.listLoading = true
        prepareProjectStop(this.form.coreProject.projectId).then(response => {
          // console.log(response)
          this.firstData = response.data
//          this.tableData = response.data;
////          setTimeout(() => {
//            this.listLoading = false;
//          }, 1000);
//          this.listLoading = false
        })
      },
      open2() {
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          prepareProjectSaveStop(this.form).then(response => {
            if (response.state === false) {
              this.$message({type: 'error', message: response.msg});
            } else {
              this.$message({type: 'success', message: '终止成功!'});
            }
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消终止'});
        });
      }
    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    line-height: 60px;
    font-size: 2em;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
  }

  .app-container {
    padding: 2% 1%;
  }

  .el-tabs__content {
    min-height: 350px;
  }
</style>
<style>
  .el-tabs--border-card > .el-tabs__content {
    padding: 1%;
    min-height: 100%;
  }

  .stop .el-tabs__content {
    min-height: 300px;
    font-size: 14px;
  }
</style>
