<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <div v-show="fristpage">
        <!--单位基本信息-->
        <div class="sharedate">
          <div class="btn">
            <h3>单位基本信息</h3>
          </div>
          <div class="sharename">
            <p class="btns">
              单位名称：<span>艾康（上海）信息技术有限公司</span>
            </p>
            <p>注册地址：<span>上海市普陀区</span></p>
            <p>法人代表：<span>钱钱钱</span></p>
            <p>注册资金：<span>人民币 500万元</span></p>
            <p>主营产品：<span>服务器，pc机</span></p>
            <p>证&nbsp;&nbsp;件：<span>
            <el-radio v-model="radio" label="1">非三证合一</el-radio>
            <el-radio v-model="radio" label="2">三证合一</el-radio>
          </span></p>
            <div class="yingye">
              <div class="zhengjian">
                <p>营业制造证件号：<span>3220215625</span></p>
                <p>组织机构证件号：<span>3220215625</span></p>
                <p>税务登记证件号：<span>3220215625</span></p>
              </div>
              <div class="time">
                <p>证件期日期：<span>长期</span></p>
                <p>证件到期日期：<span>2018-01-01</span></p>
                <p>证件到期日期：<span>2018-01-01</span></p>
              </div>
              <div class="image">
                <p>营业执照.jpg</p>
                <p>组织机构代码.jpg</p>
                <p>税务登记证.jpg</p>
              </div>
            </div>
          </div>
        </div>
        <!--单位信息概况-->
        <div class="sharepro">
          <div class="btn">
            <h3>单位信息概况</h3>
          </div>
          <div class="sharename">
            <p>单位性质：</p>
            <p>成立时间：</p>
            <p>固定电话：</p>
            <p>企业网站：</p>
            <p>开户银行名称：</p>
            <p>开户银行账号：</p>
            <p>企业人数：</p>
            <p>企业简介：</p>
            <div class="buttons">
              <el-button type="primary" plain @click="opennew">修改</el-button>
            </div>
          </div>
        </div>
      </div>

      <!--修改页面的信息-->
     <div v-show="amendid">
       <!--单位基本信息-->
       <div class="sharedate">
         <div class="btn">
           <h3>单位基本信息</h3>
         </div>
         <div class="amendinfo">
           <div>
             <span><span>*</span> 单位名称：</span>
             <input type="text" placeholder="请输入单位名称">
           </div>
           <div>
             <span> <span>*</span> 注册地址：</span>
             <select>
               <option value="shanghai1">上海</option>
               <option value="shanghai2">北京</option>
               <option value="shanghai3">江苏</option>
               <option value="shanghai4">安徽</option>
               <option value="shanghai5">湖北</option>
             </select><span>省(直辖市)</span>
             <select>
               <option value="shanghai1">宿州</option>
               <option value="shanghai2">宿州</option>
               <option value="shanghai3">宿州</option>
               <option value="shanghai4">苏州</option>
               <option value="shanghai5">苏州</option>
             </select>
             <input type="text" placeholder="请输入街道地址">

           </div>
           <div>
             <span> <span>*</span> 法人代表：</span>
             <input type="text" placeholder="请输入法人代表名称">
           </div>
           <div>
             <span> <span>*</span> 注册资金：</span>
             <input type="text" placeholder="请输入金额">
             <select>
               <option>人民币</option>
               <option>美金</option>
             </select>
           </div>
           <div>
             <span> <span>*</span>主营产品：</span>
             <input type="text" placeholder="请选择主营产品">
             <el-button type="primary" plain size="small">请选择</el-button>
           </div>
           <div>
             <span> <span>*</span>营业执照：</span>
             <span>
              <el-radio v-model="radio" label="1">非三证合一</el-radio>
              <el-radio v-model="radio" label="2">三证合一</el-radio></span>
           </div>
           <div class="yingye">
             <div class="zhengjian">
               <span>营业制造证件号：<input type="text" placeholder="请输入营业制造证件号"></span>
               <span>组织机构证件号：<input type="text" placeholder="请输入组织机构证件号"></span>
               <span>税务登记证件号：<input type="text" placeholder="请输入税务登记证件号"></span>
             </div>
             <div class="time">
               <span>证件到期日期：<input type="text" placeholder="请输入日期"></span>
               <span>证件到期日期：<input type="text" placeholder="请输入日期"></span>
               <span>证件到期日期：<input type="text" placeholder="请输入日期"></span>
             </div>
             <div class="image">
               <span>营业执照.jpg</span><el-button type="text">删除</el-button><br>
               <span>组织机构代码.jpg</span><el-button type="text">删除</el-button><br>
               <span>税务登记证.jpg</span><el-button type="text">删除</el-button><br>
             </div>
           </div>
         </div>
       </div>
       <!--单位信息概况-->
       <div class="sharepro">
         <div class="btn">
           <h3>单位信息概况</h3>
         </div>
         <div class="amendsumm">
           <p>单位性质：
             <select>
               <option>国有企业</option>
               <option>集体企业</option>
               <option>联营企业</option>
               <option>股份合作制企业</option>
               <option>私营企业</option>
               <option>合伙企业</option>
               <option>个体户</option>
               <option>有限责任公司</option>
             </select>
           </p>
           <p>成立时间：<input type="text" placeholder="请输入成立时间"></p>
           <p>固定电话：<input type="text" placeholder="请输入固定电话"></p>
           <p>企业网站：<input type="text" placeholder="请输入企业网站"></p>
           <p>开户银行名称：<input type="text" placeholder="请输入开户银行名称"></p>
           <p>开户银行账号：<input type="text" placeholder="请输入开户银行账号"></p>
           <p>企业人数：<input type="text" placeholder="请输入企业人数"></p>
           <p>企业简介：<input type="text" placeholder="请输入企业简介"></p>
           <div class="buttons">
             <el-button type="primary" plain @click="open">提交</el-button>
             <el-button type="primary" plain @click="goback">关闭</el-button>
           </div>
         </div>
       </div>
     </div>

    </el-tabs>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        fristpage:true,
        amendid:false,
        radio: '1',
        input: '',
        activeName: 'first',
        dialogVisible: false,
        formInline: {
          user: '',
          region: ''
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    computed: {},
    methods: {
      goback() {
        this.fristpage=true;
        this.amendid=false;
      },
      opennew() {
        this.fristpage=false;
        this.amendid=true;
      },
      open() {
        this.$alert('平台将尽快审核，具体时间请咨询电话:400-052-2008', {
          confirmButtonText: '确定',
        });
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  /*修改弹出框的样式*/
  .amendinfo{
    width: 100%;
    height:100%;
  }
  .amendinfo>div{
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .amendinfo>div>span{
    position: relative;
    padding-left: 20px;
  }
  .amendinfo>div>span>span{
    position: absolute;
    top: -4px;
    left: 5px;
    color: red;
    font-size: 40px;
  }
  .amendinfo>div>input{
    width: 250px;
    height: 30px;
    border:1px solid #3a8ee6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  /*三证合一样式*/
  .amendinfo>.yingye{
    width:100%;
    height: 140px;
    padding-left: 20px;
  }
  .amendinfo>.yingye>div{
    display: inline-block;
    width: 30%;
    height: 180px;
  }
  .amendinfo>.yingye>.zhengjian>span>input{
    border:1px solid #3a8ee6;
    height: 30px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .amendinfo>.yingye>.time>span{
    padding-left: 20px;
  }
  .amendinfo>.yingye>.time>span>input{
    border:1px solid #3a8ee6;
    height: 30px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .amendinfo>.yingye>.image>span{
    padding:0 20px;

  }
  /*修改单位信息样式*/
  .amendsumm{
    width:100%;
    height:100%;
  }
  .amendsumm>p{
    height: 40px;
    padding-left: 20px;
  }
  .amendsumm>p>input{
    width: 300px;
    border:1px solid #3a8ee6;
    height: 30px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .amendsumm>p>select{
    width: 200px;
    border:1px solid #3a8ee6;
    height: 30px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .amendsumm>.buttons{
    padding-left: 450px;
  }

  .sharetimes{
    margin-top: 15px;
  }
  .sharedate{
    padding: 20px;
    margin-top: 20px;
    border:1px dashed #3a8ee6;
    position: relative;
  }
  .sharedate>.btn{
    background-color: #fff;
    position: absolute;
    top: -35px;
    left: 30px;
    color: #3a8ee6;
  }
  .sharepro{
    padding: 20px;
    margin-top: 40px;
    border:1px dashed #3a8ee6;
    position: relative;
  }
  .sharepro>.btn{
    background-color: #fff;
    position: absolute;
    top: -35px;
    left: 30px;
    color: #3a8ee6;
  }
  .el-table .cell{
    text-align: center;
  }
  .sharename{
    padding-left: 20px;
  }
  .sharename>.btns>button{
    margin-left: 50px;
    color: #409EFF;
    background: #ecf5ff;
    padding:3px 10px;
    border:1px solid #b3d8ff;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .sharename>.yingye{
    padding-left: 70px;
  }
  .sharename>.yingye>div{
    display: inline-block;
    padding-left: 50px;
  }
  .sharename>.buttons{
    padding-left: 400px;
  }
</style>


