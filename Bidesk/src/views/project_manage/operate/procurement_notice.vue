<template>
  <div class="project-container">
    <el-row>
      <crumbs :resData="resData"></crumbs>
    </el-row>
    <div v-if="!hasMorePack">
      <el-tabs class="tbody_open" type="border-card">
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
            <tr>
              <th>公告内容</th>
              <td>
                <div class="header" v-if="resNoticeVO.notice">
                  <h3 style="text-align: center">{{resNoticeVO.notice.noticeName}}</h3>
                  <div class="Procurement">
                    <p v-html="resNoticeVO.notice.noticeContent"></p>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </el-row>
      </el-tabs>
    </div>
    <div v-else>
      <el-row>
        <select-btn :packList="packList" @transferIndex="getBtnIndex"></select-btn>
      </el-row>
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
        </el-table-column>
        <el-table-column prop="noticePublishTime" label="发布时间" min-width="80" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.noticeVO.notice">{{scope.row.noticeVO.notice.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--第N包按钮页-->
      <el-tabs class="tbody_open" type=" border-card
              " v-for="(item, index) in packList" :key="index"
               v-if="btn_index === ('第' + (item.packNum) + '包')">
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
            <!--<h3 style="text-align: center">{{item.noticeVO.notice.noticeName}}</h3>-->
            <!--<div class="Procurement">-->
            <!--<p v-html="item.noticeVO.notice.noticeContent"></p>-->
            <!--</div>-->
            <!--</div>-->
            <!--</td>-->
            <!--</tr>-->
            </tbody>
          </table>
          <div class="header" v-if="item.noticeVO.notice">
            <h3 style="text-align: center">{{item.noticeVO.notice.noticeName}}</h3>
            <div class="Procurement">
              <p v-html="item.noticeVO.notice.noticeContent"></p>
            </div>
          </div>
        </el-row>
      </el-tabs>
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
  import crumbs from '@/custom-components/project_manages/crumbs'
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
        projectId: this.$store.getters.subProjectId,
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
        MediaImages,
        pack_index: 0,
        pack_btn: 0,
        btn_index: 0,
        handleBtnView: '全部',
      }
    },
    methods: {
      getList() {
        executeProjectNotice(this.projectId).then(response => {
          this.resData = response.data
          this.tableData = response.data;
          this.hasMorePack = response.data.hasMorePack;
          this.packList = response.data.packList;
          this.resNoticeVO = response.data.packList[0].noticeVO;
          this.packLists = deepClone(this.packList)
          for (let i = this.packLists.length - 1; i > 0; i--) {
            if (this.packLists[i].noticeVO.notice === null) {
              this.packLists.splice(i, 1)
            }
          }
        })
      },
      getBtnIndex(index) {
        this.getList()
        this.btn_index = index
        if (index === '全部') {
          this.handleBtnView = index
        } else {
          this.handleBtnView = ''
          this.pack_index = index.substring(1, index.length - 1)
          for (let i = 0; i < this.packLists.length; i++) {
            if (parseInt(this.pack_index) === parseInt(this.packLists[i].packNum)) {
              this.pack_btn = i
            }
          }
          this.buttonClick(this.pack_btn)
        }
      },
      buttonClick(index) {
        this.bidDetailList = []
        this.noBidDetailList = []
        this.handleIndex = index
        this.purResultList = this.packList[index].purResultList
        this.default_tab = false
        if (this.purResultList !== null) {
          for (const item of this.purResultList) {
            this.bidDetailList = [...this.bidDetailList, ...item.bidDetailList]
            this.noBidDetailList = [...this.noBidDetailList, ...item.noBidDetailList]
          }
        }
      },
    }
  }
</script>
<style scoped>
  .content {
    margin: 0;
    padding: 0;
  }
</style>
