<template>
  <div class="project-container">
    <crumbs :resData="resData.project" v-if="resData.project"></crumbs>
    <el-table :data="resPackList" border style="width: 100%;margin-top:1%" v-if="tableColse">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column v-if="hasMorePack" label="包号" min-width="80" align="center">
        <template slot-scope="scope">
          <span>第{{scope.row.pack_num}}包</span>
        </template>
      </el-table-column>
      <el-table-column label="澄清答疑回复文件" min-width="80" align="center">
        <template slot-scope="scope">
          <el-button type="text">{{scope.row.annex_name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="发布人" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="sale_end_time" label="发售截止时间" min-width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.sale_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </template>
      </el-table-column>
      <el-table-column prop="submit_end_time" label="递交响应文件截止时间" min-width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" min-width="80" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="viewMail" type="text" size="small">查看</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!-- 点击查看 -->
    <!-- 邮件来往>点击查看详情 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="40%">
      <el-row style="margin: 0 3%">
        <el-col>回复：xxxxxxx项目-第1次澄清答疑</el-col>
        <el-col>发件人：</el-col>
        <el-col>时间：</el-col>
        <el-col>收件人：</el-col>
        <el-col>正文：
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="textarea3"></el-input>
        </el-col>
        <el-col>相关文件:
          <el-button type="text">跑道改造项目监理采购第1次补充资料.doc</el-button>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {executeQaList} from '@/api/project'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {
      ElButton,
      crumbs
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        resData: {},
        resPackList: [],
        dialogVisible: false,
        tableColse: true,
        coenteropen: false,
        hasMorePack:null,
        textarea3: ''
      }
    },
    methods: {
      viewMail(){
        this.dialogVisible = true
      },
      getList() {
        executeQaList(this.projectId).then(response => {
          this.resData = response.data
          this.hasMorePack = response.data.project.hasMorePack
          this.resPackList = response.data.AllQaList
          // console.log(response)
        })
      }
    }
  };
</script>

<style scoped>
  .el-col {
    padding-bottom: 2%;
  }
</style>
