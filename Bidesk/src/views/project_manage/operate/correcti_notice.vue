<template>
  <div class="project-container">
    <el-row>
      <crumbs :resData="projects"></crumbs>
      <el-table :data="noticeLists" border style="width: 100%">
        <el-table-column label="包号" min-width="80" align="center" v-if="hasMorePack">
          <template slot-scope="scope">
            <span>
              第<span v-for="(item, index) in scope.row.packNumList" :key="index"><span>{{item}}</span><span
              v-if='index!==scope.row.packNumList.length-1'>,</span></span>包
            </span>
          </template>
        </el-table-column>
        <el-table-column label="序号" min-width="80" align="center" v-if="!hasMorePack">
          <template slot-scope="scope">
            <span>{{(scope.$index) + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="notice.submit_end_time" label="发布时间" min-width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.notice.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
          </template>
        </el-table-column>
        <el-table-column label="采购文件发售截止时间" min-width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.notice.sale_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
          </template>
        </el-table-column>
        <el-table-column label="递交响应文件截止时间" min-width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.notice.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
          </template>
        </el-table-column>
        <el-table-column prop="publishUserName" label="发布人" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="openDetails(scope.row, scope.$index)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 点击查看 -->
    <el-dialog class="dialog__coenter" v-if="dialogVisible" :title="'第'+openDetailsID+'次补充公告'"
               :visible.sync="dialogVisible" width="70%" margin-top="12vh">
      <el-tabs type="border-card">
        <el-tab-pane label="详情">
          <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
                 style="width: 100%;line-height: 30px;">
            <tbody>
            <tr>
              <th>发布媒体</th>
              <td>
                <ul>
                  <li v-for="(item, index) in detailsData[0].mediaList"
                      :key="index">
                    <el-button type="text" @click="dialogVisibles=true">
                      {{item.media.mediaName}}：{{item.media.mediaUrl}}
                    </el-button>&nbsp;&nbsp;
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>公告附件</th>
              <td>
                <el-button type="text">{{detailsData[0].notice.annex_name}}</el-button>
              </td>
            </tr>
            <tr>
              <th>采购文件发售截止时间</th>
              <td>
                <span
                  v-if="showSaleendtime">{{detailsData[0].notice.sale_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                <span v-else>另行通知</span>
              </td>
            </tr>
            <tr>
              <th>递交响应文件截止时间</th>
              <td><span
                v-if="showSubmitendtime">{{detailsData[0].notice.submit_end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                <span v-else>另行通知</span>
              </td>
            </tr>
            </tbody>
          </table>
          <el-row style="padding:2%">
            <el-col :xs="24" :sm="20" :md="24" :lg="24">
              <h3 style="text-align:center">{{detailsData[0].notice.notice_name}}</h3><br>
              <p v-html="detailsData[0].notice.notice_content"></p>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="邮件来往"></el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibles" width="80%">
      <img :src="MediaImages" style="width: 100%">
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibles = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibles = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {executeProjectAddNoticeList} from '@/api/project'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import crumbs from '@/custom-components/project_manages/crumbs'
  import MediaImages from '@/assets/MediaImages/MediaImages.png'

  export default {
    components: {
      crumbs
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        MediaImages,
        projectId: this.$store.getters.subProjectId,
//        projectId: '467',
        noticeLists: [],
        projects: {},
        dialogVisible: false,
        dialogVisibles: false,
        showSaleendtime: true,
        showSubmitendtime: true,
        hasMorePack: '',
        openDetailsID: 0,
        detailsData: [],
        tableData: [{
          date: '2016-05-03',
          document: '南京第一包.doc'
        }],
      };
    },
    methods: {
      getList() {
        // console.log(this.projectId);
        executeProjectAddNoticeList(this.projectId).then(response => {
          // console.log(response);
          this.noticeLists = response.data.noticeList
          this.projects = response.data.project
          this.hasMorePack = response.data.project.hasMorePack
        })
      },
      openDetails(row, index) {
        this.dialogVisible = true
        this.openDetailsID = index + 1
        this.detailsData = [row];
        if (this.detailsData[0].notice.sale_end_time === 0) {
          this.showSaleendtime = false
        }
        if (this.detailsData[0].notice.submit_end_time === 0) {
          this.showSubmitendtime = false
        }
      }
    }
  };
</script>

<style scoped>
  .dialog__coenter {
    margin-top: -7vh;
  }

  .dialog__coenter ul {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
  }

  .dialog__coenter ul li {
    list-style: none;
    margin-bottom: 0px;
    margin-top: 0px;
    border-top: 1px solid #e6ebf5;
  }

  .dialog__coenter ul li:first-child {
    border-top: 0 solid #e6ebf5;
  }

  /*.dialog__coenter ul li:last-child {*/
  /*border-top: 0 solid #e6ebf5;*/
  /*}*/
  .dialog__coenter ul li .el-button {
    padding: 0 0 0 1%;
  }

  .el-tabs__content th {
    text-align: right;
    padding-right: 1%;
    width: 20%;
    font-weight: 100;
  }

  .el-tabs__content th, .el-tabs__content td {
    border: 0;
    border-bottom: 1px solid #e6ebf5;
    border-right: 1px solid #e6ebf5;
  }

  .el-tabs__content td {
    text-align: left;
  }
  .el-tabs__content td span{
    padding: 0 0 0 1%;
  }

  .el-tabs__content table {
    border-right: 0;
    border-bottom: 0;
  }
</style>
