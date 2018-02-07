<template>
  <div class="app-container">
    <div class="inboxmail">
      <div v-show="homepage">
        <div class="numbers">
          <p>
            发件箱 <span>(共2封)</span>
          </p>
        </div>
        <div class="contents">
          <div class="tables">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="number" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="name" label="发件人" width="180">
              </el-table-column>
              <el-table-column prop="theme" label="主题">
                <template slot-scope="scope">
                  <el-button type="text" @click="openpage">{{tableData[0].theme}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="时间">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="themeinfo" v-show="gaobackid">
        <div class="contents">
          <div class="btns">
            <span><el-button type="primary" plain size="small" @click="goback">&lt;&lt;返回</el-button></span>
            <span><el-button type="primary" plain size="small">回复</el-button></span>
            <span><el-button type="primary" plain size="small">转发</el-button></span>
          </div>
          <div class="infos">
            <div class="heads">
              <h3>xxxxxxxxxxxxxxxxxxx项目相关资料</h3>
              <p>发件人：<span>赵强<4389292823@qq.com></span></p>
              <p>时&nbsp;&nbsp;&nbsp;&nbsp;间：<span>2016年8月30日（周二） 15:34</span></p>
              <p>收件人：<span>王凯凯<4389292823@qq.com></span></p>
              <p>附&nbsp;&nbsp;&nbsp;&nbsp;件：<span>xxxxxxxxxxxxxx项目清单.xls</span></p>
            </div>
            <div class="describe">
              <p>昆明红塔木业有限公司位于昆明市经济技术开发区牛庄街的土地使用权、地上房屋、构筑物、其他附属设施及相关机器设备竞价公告标的系昆明红塔木业有限公司位于昆明市经济技术开发区牛庄街的土地使用权、地上房屋、构筑物、附属设施及相关机器设备。标的无租赁、无占用、抵押、无担保及其他他项权或共有权利情况。评估值：10374.43万元，拟按现状以不低于11411.873万元整体公开竞价转让，保证金3000万元。 本项目挂牌期自 2016 年8月31日起至2016年9月28日17时止，挂牌期满,如未征集到意向受让方，则变更挂牌条件,重新挂牌。交易相关其他事项及特别告知详见重庆联合产权交易所网站（www.cquae.com）。 联系电话：（010）51085023转8009 联系人：鹤先生 报名地址：北京市朝阳区北三环东路8号静安中心2012室。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        homepage:true,
        gaobackid:false,
        centerDialogVisible: false,
        currentPage1: 5,
        tableData: [{
          number: '1',
          name: '王小虎',
          theme: '回复：xxxxxxxxxxxxxxx项目采购文件审核意见',
          time: '2017-8-30 11.11'
        }, {
          number: '2',
          name: '发财',
          theme: '回复：xxxxxxxxxxxxxxx项目资料补充文件',
          time: '2017-8-30 11.11'
        }]
      }
    },
    computed: {},
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      openpage(){
        this.homepage=false;
        this.gaobackid=true;
      },
      goback(){
        this.homepage=true;
        this.gaobackid=false;
      }
    }
  }
</script>

<style scoped>
  /*关于邮件详情的样式*/
  .themeinfo{
    width: 100%;
    height: 90vh;
  }
  .themeinfo>.contents{
    width: 90%;
    height: 100%;
  }
  .themeinfo>.contents>.btns{
    padding-left: 30px;
  }
  .themeinfo>.contents>.btns>span{
    padding-left: 30px;
  }
  .themeinfo>.contents>.infos{
    width: 100%;
    height: 80%;
    margin-top: 20px;
    border:1px solid #b2c3dd;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .themeinfo>.contents>.infos>.heads{
    width: 100%;
    height: 40%;
    border:1px solid #b2c3dd;
    background-color: #ecf0f6;
    padding-left: 20px;
  }
  .themeinfo>.contents>.infos>.describe{
    width: 100%;
    height: 60%;
    border:1px solid #b2c3dd;
    padding: 20px;
  }
  .themeinfo>.contents>.infos>.describe>p{
    text-indent: 2em;
  }
  .block {
    position: absolute;
    top: 90vh;
    right: 2vh;
  }
</style>


