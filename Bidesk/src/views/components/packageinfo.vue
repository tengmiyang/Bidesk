<template>
  <el-tabs type="border-card" @tab-click="getPackInfo">
      <el-tab-pane>
    <span slot="label">全部</span>
       <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="packNum" label="包号">
      </el-table-column>
      <el-table-column prop="packName" label="包件名称">
      </el-table-column>
      <el-table-column prop="createUserId" label="发布人">
      </el-table-column>
         <el-table-column prop="createTime" label="发布时间">
      </el-table-column>
    </el-table>
  </el-tab-pane>
      <el-tab-pane v-for="(item, index) in packList" :key='index'>
    <span slot="label"> 第<span ref="pa">{{item.packNum}}</span>包</span>
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
          <p> 南大科学技术馆建设项目江苏科技馆场馆改造项目已经立项部门批准建设（立项批文号：苏发改投资发[2013]78））。工程所需资金来源财政资金和自筹资金，现已落实。本工程对投标人的资格审查，采用资格后审方法选择合格的投标申请人参加投标。</p>
        <div class="Survey">
            <p>一、江苏省国际招标公司负责本工程的招标事宜。</p>
            <p>二、本招标工程概况：</p>
              <p>1、标段名称：南大科技馆场馆改造项目监理</p>
              <p>2、工程地点：南京市石头城118号</p>
              <p>3、工程类型：小型工程</p>
              <p>4、建设内容：南大科技馆场馆改造项目监理</p>
              <p>5、结构类型：框架</p>
              <p>6、工期要求：120日历天</p>
              <p>7、工程合同估算价：15万元 </p>
              <p>8、招标内容：南大科技馆场馆改造项目监理 </p>
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
            <span v-for="(media, index) in mediaLists" :key="index">{{media.media.mediaName}} {{media.media.mediaUrl}}</span>
          </div>
           <div>
            <span>发 布 人：</span><span></span>
          </div>
           <div>
            <span>发布时间：</span><span>{{notices.createTime}}</span>
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
    mounted(){
      this.getList();
    },
    data() {
      return {
        tableData: [],
        mediaLists:[],
        notices:{}
      }
    },
    methods: {
      getList() {
        // console.log(this.packList);
          this.tableData = this.packList;
      },
//      获取包件的详细信息
      getPackInfo(){
          getNotice(this.tableData[0].packId).then(response => {
          // console.log(response);
          // console.log(this.$refs.pa);
          // console.log(this.$refs.pa[1].innerText);
          this.notices = response.data.notice;
          this.mediaLists = response.data.mediaList;
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
.content{
  margin:0;
  padding:0;
}
</style>
