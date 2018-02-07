<template>
  <div class="app-container">

    <el-row style="border: 1px solid #e6ebf5; padding:2%">
      <el-col align="center" :xs="24" :sm="20" :md="24" :lg="24"><h1>南大科技馆场馆改造项目监理公告</h1></el-col>
      <el-col align="center" :xs="24" :sm="20" :md="24" :lg="24"><span>招 标 公 告(资格后审)</span></el-col>
      <el-col style="padding-right: 5%" align="right" :xs="24" :sm="20" :md="24" :lg="24">
        <span>标段编号: PROJ140232-02FG</span></el-col>
      <el-col :xs="24" :sm="20" :md="24" :lg="24">
        <p style="text-indent: 2em; line-height: 2em;">
          南大科学技术馆建设项目江苏科技馆场馆改造项目已经立项部门批准建设（立项批文号：苏发改投资发[2013]78））。工程所需资金来源财政资金和自筹资金，现已落实。本工程对投标人的资格审查，采用资格后审方法选择合格的投标申请人参加投标。</p>
        <p>一、江苏省国际招标公司负责本工程的招标事宜。</p>
        <p>二、本招标工程概况：</p>
        <p>1、标段名称：南大科技馆场馆改造项目监理</p>
        <p>2、工程地点：南京市石头城118号 </p>
        <p>3、工程类型：小型工程 </p>
        <p>4、建设内容：南大科技馆场馆改造项目监理 </p>
        <p>5、结构类型：框架  </p>
        <p>6、工期要求：120日历天  </p>
        <p>7、工程合同估算价：15万元  </p>
        <p>8、招标内容：南大科技馆场馆改造项目监理 </p>
      </el-col>
    </el-row>

    <el-row style="border: 1px solid #e6ebf5; padding:2%; margin-top:1% ">

      <el-row>
        <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>公告附件</span></el-col>
        <el-col :xs="24" :sm="20" :md="18" :lg="18">
          <el-button type="text">南大科技馆场馆改造项目监理采购公告.doc</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>发布媒体</span></el-col>
        <el-col :xs="24" :sm="20" :md="18" :lg="18">
          <el-button v-for="(item, index) in imgUrl" :key="index" type="text" @click="getUrl(index)">{{item.name}}</el-button>
        </el-col>
      </el-row>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <img style="width: 100%" :src="item_url" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>

      <el-row>
        <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>发布时间</span></el-col>
        <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">2016年7月14日  13:53</el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item_url: '',
        dialogVisible: false,
        imgUrl: [{
          name: '中国招投标网',
          url: 'http://ozp3cmjs3.bkt.clouddn.com/cgs.jpg'
        }, {
          name: '中国政府采购网',
          url: 'http://ozp3cmjs3.bkt.clouddn.com/dljg.jpg'
        }, {
          name: '江苏政府采购网',
          url: 'http://ozp3cmjs3.bkt.clouddn.com/gys.jpg'
        }, {
          name: '省公共资源交易中心',
          url: 'http://ozp3cmjs3.bkt.clouddn.com/cgs.jpg'
        }]
      };
    },
    methods: {
      getUrl(index){
        this.dialogVisible = true
        this.item_url = this.imgUrl[index].url
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      }
    }
  };
</script>
