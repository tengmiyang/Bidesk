<template>
  <!--第N包列表-->
  <div>
    <el-table border :data="resNoticeVOListNo">
      <el-table-column align="center" prop="notice.noticeName" label="公告名称"></el-table-column>
      <!--<el-table-column align="center" prop="notice.createUserId" label="发布人"></el-table-column>-->
      <el-table-column align="center" prop="notice.createTime" label="发布时间">
        <template slot-scope="scope">
          <span>{{scope.row.notice.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="viewRow(scope.row)" size="mini"> 查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框-->
    <!--弹框-->
    <el-dialog class="dialog__coenter" title="详情" :visible.sync="dialogVisible" width="60%" :before-close="beforeClose">
      <el-row v-if="dialogVisible1 === false">

         <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5"
                 style="width: 100%;line-height: 30px;">
            <tbody>
            <tr>
              <th>发布媒体</th>
              <td>
                <ul>
                  <li v-for="(item, index) in selectRow.mediaList"
                     :key="index">
                    <el-button @click="handleMedia" type="text">
                      {{item.media.mediaName + '(' + item.media.mediaUrl + ')'}}
                    </el-button>&nbsp;&nbsp;
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>公告附件</th>
              <td>
                <el-button type="text">{{selectRow.notice.annexName}}</el-button>
              </td>
            </tr>
            <tr>
              <th>公告名称</th>
              <td>
                <span>{{selectRow.notice.noticeName}}</span>
              </td>
            </tr>
            <tr>
              <th>公告内容</th>
              <td><p v-html="selectRow.notice.noticeContent"></p>
              </td>
            </tr>
            </tbody>
          </table>

        <!--<el-col>公告名称：{{selectRow.notice.noticeName}}</el-col>-->
        <!--<el-col>公告附件:-->
          <!--<el-button type="text">{{selectRow.notice.annexName}}</el-button>-->
        <!--</el-col>-->
        <!--<el-col :span="24" v-show="selectRow.mediaList">发布媒体:-->
          <!--<el-button @click="handleMedia" type="text" v-for="(item, index) in selectRow.mediaList"-->
                     <!--:key="index">{{item.media.mediaName + '(' + item.media.mediaUrl + ')'}}-->
          <!--</el-button>-->
        <!--</el-col>-->
        <!--<el-col style="margin-top: 1%;">公告内容：-->
          <!--<p v-html="selectRow.notice.noticeContent"></p>-->
        <!--</el-col>-->

      </el-row>
      <el-row v-else>
        <img :src="MediaImages" style="width: 100%">
      </el-row>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" v-show="dialogVisible1" @click="dialogVisible1 = false">返 回</el-button>
      <el-button type="primary" @click="beforeClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import MediaImages from '@/assets/MediaImages/MediaImages.png'
  export default {
    components: {},
    props: ['resNoticeVOListNo'],
    data() {
      return {
        MediaImages,
        dialogVisible: false,
        dialogVisible1: false,
        selectRow: {
          mediaList: [],
          notice: {}
        },
      }
    },
    mounted() {
    },
    methods: {
      beforeClose(){
        this.dialogVisible = false
        this.dialogVisible1 = false
      },
      handleMedia(){
        this.dialogVisible1 = true
      },
      viewRow(row){
        this.selectRow.notice = row.notice
        this.selectRow.mediaList = row.mediaList
        this.dialogVisible = true
        // console.log(this.selectRow.mediaList)
      }
    }
  }
</script>
<style scoped>
   .dialog__coenter ul {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
  }
.el-row th {
  width: 12%;
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
</style>
