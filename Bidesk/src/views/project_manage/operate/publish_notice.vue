<template>
  <div class="project-container">
    <!--<packageinfo v-if="hasMorePack" :packList="packList"></packageinfo>-->
    <el-row>
      <crumbs :resData="resData"></crumbs>
    </el-row>

    <div v-if="!hasMorePack">
      <el-row>
        <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
               style="width: 100%;line-height: 40px;">
          <tbody class="dialog__coenter">
          <tr>
            <th>发布媒体</th>
            <td>
              <ul>
                <li v-for="(item, index) in resNoticeVO.mediaList"
                    :key="index">
                  <el-button type="text" @click="dialogVisible=true">
                    {{item.media.mediaName}}：{{item.media.mediaUrl}}
                  </el-button>&nbsp;&nbsp;
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>公告附件</th>
            <td>
                  <span v-if="resNoticeVO.notice">
                    <el-button type="text">{{resNoticeVO.notice.annexName}}</el-button>
                  </span>
            </td>
          </tr>
          <tr>
            <th>发布人</th>
            <td>
              <span v-if="resNoticeVO.notice">{{resNoticeVO.notice.createUserName}}</span>
            </td>
          </tr>
          <tr>
            <th>发布时间</th>
            <td>
              <span
                v-if="resNoticeVO.notice">{{resNoticeVO.notice.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="header" v-if="resNoticeVO.notice">
          <h3 style="text-align: center">{{resNoticeVO.notice.noticeName}}</h3>
          <div class="Procurement">
            <p v-html="resNoticeVO.notice.noticeContent"></p>
          </div>
        </div>
      </el-row>
    </div>
    <div v-else>
      <select-btn :packList="packList" @transferIndex="getBtnIndex" :handleBtnView="handleBtnView"
                  style="margin-bottom: 1%"></select-btn>
      <!--全部-->
      <el-table :data="packLists" border style="width: 100%" v-show="handleBtnView === '全部'">
        <el-table-column prop="packNum" label="包号" width="80" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包件名称" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="contact" label="发布人" min-width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.noticeVO.notice">{{scope.row.noticeVO.notice.createUserName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.noticeVO.notice.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="buttonClick(scope.row)">查 看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--第N包按钮页-->
      <div v-for="(item, index) in packList" :key="index" v-if="btn_index === ('第' + (item.packNum) + '包')">
        <el-row>
          <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
                 style="width: 100%;line-height: 40px;">
            <tbody class="dialog__coenter">
            <tr>
              <th>发布媒体</th>
              <td>
                <ul>
                  <li v-for="(item, index) in item.noticeVO.mediaList"
                      :key="index">
                    <el-button type="text" @click="dialogVisible=true">
                      {{item.media.mediaName}}：{{item.media.mediaUrl}}
                    </el-button>&nbsp;&nbsp;
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>公告附件</th>
              <td>
                  <span v-if="item.noticeVO.notice">
                    <el-button type="text">{{item.noticeVO.notice.annexName}}</el-button>
                  </span>
              </td>
            </tr>
            <tr>
              <th>发布人</th>
              <td>
                <span>{{item.contact}}</span>
              </td>
            </tr>
            <tr>
              <th>发布时间</th>
              <td>
                <span
                  v-if="item.noticeVO.notice">{{item.noticeVO.notice.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </td>
            </tr>
            <!--<tr>-->
            <!--<th>公告内容</th>-->
            <!--<td>-->
            <!--<div class="header" v-if="item.noticeVO.notice">-->
            <!--<h3>{{item.noticeVO.notice.noticeName}}</h3>-->
            <!--<div class="Procurement" v-html="item.noticeVO.notice.noticeContent">-->
            <!--&lt;!&ndash;<p>{{item.noticeVO.notice.noticeContent}}</p>&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->
            <!--</td>-->
            <!--</tr>-->
            </tbody>
          </table>
        </el-row>

        <el-row style="margin-top: 1%">
          <el-col v-if="item.noticeVO.notice">
            <h3 style="text-align: center">{{item.noticeVO.notice.noticeName}}</h3>
            <div v-html="item.noticeVO.notice.noticeContent">
              <p>{{item.noticeVO.notice.noticeContent}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <img :src="MediaImages" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {executeProjectNotice} from '@/api/project'
  import crumbs from '@/custom-components/project_manages/crumbs';
  import MediaImages from '@/assets/MediaImages/MediaImages.png'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import {deepClone, parseTime} from '@/utils'

  export default {
    components: {crumbs, selectBtn},
    mounted() {
      this.getList()
    },
    data() {
      return {
        MediaImages,
        projectId: this.$store.getters.subProjectId,
        Idtype: this.$router.routerType,
        hasMorePack: null,
        tableData: {},
        resData: {},
        packLists: [],
        packList: [],
        notices: {},
        mediaLists: [],
        PublisherName: "",
        default_tab: true,
        handleIndex: null,
        uploadClivk: true,
        dialogVisible: false,
        resNoticeVO: {},
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
      }
    },
    methods: {
      getBtnIndex(index) {
        this.btn_index = index
        if (index === '全部') {
          this.handleBtnView = index
          this.getList()
        } else {
          this.handleBtnView = index
        }
      },
      getList() {
        executeProjectNotice(this.projectId).then(response => {
          this.resData = response.data
          this.tableData = response.data;
          this.hasMorePack = response.data.hasMorePack;
          this.packList = response.data.packList;
          if(this.hasMorePack===false){
            this.resNoticeVO = response.data.packList[0].noticeVO;
          }
          this.packLists = deepClone(this.packList)
          for (let i = this.packLists.length - 1; i >= 0; i--) {
            if (this.packLists[i].noticeVO.notice === null) {
              this.packLists.splice(i, 1)
            }
          }
        })
      },
      buttonClick(row) {
        this.handleBtnView = '第' + row.packNum + '包'
        this.pack_index = '第' + row.packNum + '包'
//        this.handleBtnView = this.pack_index
//        console.log(this.pack_index)
        this.getBtnIndex(this.pack_index)
      },
    }
  }
</script>
<style scoped>
  .content {
    margin: 0;
    padding: 0;
  }

  .el-dialog .el-dialog__title {
    font-size: 14px;
    color: #5a5e66;
  }

  .el-tabs__content .el-row th {
    width: 8%;
  }

  .el-tabs__content .el-row th,
  .el-tabs__content .el-row td {
    border-left-width: 0;
    border-top-width: 0;
    font-weight: normal;
    font-size: 14px;
    color: #5a5e66;
  }

  .el-tabs__content .el-row td {
    border-right-width: 0;
  }

  .el-tabs__content .el-row table {
    border-bottom-width: 0;
    border-right: 1px solid #e6ebf5;
  }

  .el-tabs__content .el-row td .header h3 {
    text-align: center;
  }

  .el-tabs--border-card {
    border: 0
  }
</style>
<style>
  .el-col ul > li {
    list-style: none;
    font-size: 14px;
    color: #5a5e66;
  }
</style>
