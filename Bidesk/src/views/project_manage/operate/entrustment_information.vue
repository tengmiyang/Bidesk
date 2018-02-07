<template>
  <div class="project-container">
    <!--<crumbs :resData="tableData"></crumbs>-->
    <el-row style="padding-top: 1%">
      <el-tabs type="border-card">
        <el-tab-pane label="委托函">
          <el-row>
            <el-col>
              <p v-html="tableData.project_letter">&nbsp&nbsp{{tableData.project_letter}}</p>
            </el-col>
            <el-col style="text-align: left;margin-left: 75%;margin-top: 1%">
              <p>委托单位：{{tableData.entrust_operate_name}}</p>
              <p>委托人：{{tableData.user_name}}</p>
              <p>委托时间：{{tableData.entrust_operate_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="项目信息">
          <el-row>
            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>项目名称：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.project_name}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>项目编号：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.project_num}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>采购方式：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.project_method}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>委托单位：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.company_name}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>委托人：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.user_name}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>委托人手机号：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">{{tableData.phone}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>委托时间：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
              </el-col>
            </el-row>

            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>被委托人：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.entrust_operate_name}}
              </el-col>
            </el-row>
            <el-row>
              <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>接受委托时间：</span></el-col>
              <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
                {{tableData.entrust_operate_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
              </el-col>
            </el-row>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
  // import crumbs from '@/custom-components/project_manages/crumbs'
  import {deepClone, parseTime} from '@/utils'
  import {getProjectEntrustInfo} from '@/api/project'

  export default {
    // components: {
    //   crumbs
    // },
    created() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.projectStatus === 'prepare' ? this.$store.getters.projectId : this.$store.getters.subProjectId,
        tableData: {},
        userData: []
      }
    },
    methods: {
      getList() {
        getProjectEntrustInfo(this.projectId).then(response => {
          // console.log(response)
          this.tableData = response.data
        })
      },

    }
  }
</script>

<style scoped>

  .el-row {
    border-bottom: 1px solid #e6ebf5
  }

  .el-row {
  &:last-child {
    margin-bottom: 0;
  }
  }
  .el-col {
    border-radius: 4px;
    font-size: 14px;
    color: #5a5e66;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .el-container {
    font-size: 14px;
    color: #5a5e66;
  }
</style>
