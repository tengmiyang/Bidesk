<template>
  <el-tabs type="border-card" @tab-click="getPackInfo">
    <el-tab-pane>
      <span slot="label">全部</span>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="packNum" label="包号" align="center">
          <template slot-scope="scope">
            第{{scope.row.packNum}}包
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包件名称" align="center">
        </el-table-column>
        <el-table-column prop="createUserId" label="发布人" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane v-for="(item, index) in packList" :key='index'>
      <span slot="label"> 第<span>{{item.packNum}}</span>包</span>
      <div>
        <div class="content">
          <div class="header">
            <h2>{{notices.noticeName}}</h2>
            <div class="Procurement">
              <p>{{notices.noticeContent}}</p>
              <p>标段编号: PROJ140232-02FG</p>
            </div>
          </div>
          <div class="noticeinfo">
            <!--<p> </p>-->
            <div class="Survey">
              <p>一、江苏省国际招标公司负责本工程的招标事宜。</p>
              <p>二、本招标工程概况：</p>
            </div>
          </div>
        </div>
        <div class="additional">
          <div class="additionalinfo">
            <div>
              <span>公告附件：</span><span></span>
            </div>
            <div>
              <span>发布媒体：</span>
              <span v-for="(media, index) in mediaLists"
                    :key="index">{{media.media.mediaName}} {{media.media.mediaUrl}}</span>
            </div>
            <div>
              <span>发 布 人：</span><span></span>
            </div>
            <div>
              <span>发布时间：</span><span>{{notices.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {getNotice} from '@/api/project'

  export default {
    props: ['packList'],
    mounted() {
      this.getList();
    },
    data() {
      return {
        tableData: [],
        mediaLists: [],
        notices: {}
      }
    },
    methods: {
      getList() {
        // console.log(this.packList);
        this.tableData = this.packList;
      },
//      获取包件的详细信息
      getPackInfo(tab) {
        // console.log(tab);
        getNotice(this.tableData[tab.index - 1].packId).then(response => {
          // console.log(response);
          this.notices = response.data.notice;
//          alert(this.notices.noticeId);
          this.mediaLists = response.data.mediaList;
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .content {
    margin: 0;
    padding: 0;
  }
</style>
