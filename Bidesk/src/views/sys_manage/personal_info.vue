<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="基本信息" name="first">
       <div class="jiben" v-show="amendid">
         <div class="content">
           <p class="loginname">登&nbsp;录&nbsp;名：<span>qianqianqian</span></p>
           <p>登录名称：<span>钱钱钱</span></p>
           <p>单位名称：<span>艾康（上海）信息技术有限公司</span></p>
           <p>办公电话：<span>666-88888888</span></p>
           <div class="tel">
             <p>手机号码：<span>88888888888</span></p>
           </div>
           <p>邮箱地址：<span>88888888@88.om</span></p>
           <p>部门信息：<span>采购一部</span></p>
           <p>个人名片：<span>张三名片.jpg</span></p>
           <div class="legal">
             <p>法人代表授权函：<span>法人代表授权函.jpg</span></p>
           </div>
           <div class="btn">
             <span>
               <el-button type="primary" plain size="small" @click="opens">修改</el-button></span>
           </div>
         </div>
       </div>
       <div class="changeinfo" v-show="gobackid">
          <p>温馨提示：如果您首次登陆，请尽快完善或修改个人资料，提交后以便平台审核！</p>
          <div class="info">
            <p>登&nbsp;&nbsp;录&nbsp;&nbsp;名：<input type="text" placeholder="请输入登录名"></p>
            <p class="radios">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text" placeholder="请输入姓名">
              <span>
                <el-radio v-model="radio" label="1">先生</el-radio>
              <el-radio v-model="radio" label="2">女士</el-radio>
              </span></p>
            <p>单位名称：<input type="text" placeholder="请输入单位名称"></p>
            <p>办公电话：<input type="text" placeholder="请输入办公电话"></p>
            <p>手机号码：<input type="text" placeholder="请输入手机号码"></p>
            <p>邮箱地址：<input type="text" placeholder="请输入邮箱地址"></p>
            <div class="treeinfo">
              <div>
                <p>部门信息：</p>
              </div>
              <div class="tree">
                <span>
              <el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[1, 2]"
                    :default-checked-keys="[8]" :props="defaultProps">
</el-tree>
            </span>
              </div>
            </div>
            <p>个人名片：<span>张三名片.jpg</span>
              <el-button type="primary" plain size="small">删除</el-button></p>
            <p>法人代表授权函：<span>法人代表授权函.jpg</span>
              <el-button type="primary" plain size="small">删除</el-button></p>
          </div>
          <span class="submits">
            <el-button type="primary" plain size="small" @click="innerVisible = true">提交</el-button>
            <el-button type="primary" plain size="small" @click="goback">关闭</el-button>
          </span>
        </div>
      </el-tab-pane>
      <!--提示框-->
      <el-dialog width="40%" :visible.sync="innerVisible" append-to-body>
        <div>
          <p>您的资料已提交成功，请联系该单位管理员：<span>张东强</span> 进行审批。平台管理员将尽快审核，如有疑问，请拨打客服电话：400-052-2008</p>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="申请时间段">
            </el-table-column>
            <el-table-column prop="time" label="审核时间">
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="innerVisible = false" >确定</el-button>
          </span>
      </el-dialog>
      <el-tab-pane label="重置密码" name="second">
        <div class="password">
          <div class="inputs">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="原密码" prop="age">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="平台使用协议" name="third">
        <div class="treatycont">
          <div class="content">
            <h2>Bidesk交易平台使用协议</h2>
            <p>
              母其弥雅（MIYA），1987年5月24日出生于云南省楚雄彝族自治州，中国内地瑜伽导师、平面模特、演员、主持人。2010年，母其弥雅因参加腾讯名车美人的活动，而被网友所认识。2012年4月，母其弥雅担任第三届中国千人瑜珈大会的形象大使兼领衔教练。2013年3月，母其弥雅担任全球睡眠日公益活动的宣传大使。2014年8月，担任湖南电视台《星姐选举》的决赛评委；12月，主演个人银幕处女作《密道追踪》。2015年，出演动作神话电影《西游记之三打白骨精》。2016年5月，母其弥雅担任中印瑜伽大会 ...
              母其弥雅（MIYA），1987年5月24日出生于云南省楚雄彝族自治州，中国内地瑜伽导师、平面模特、演员、主持人。2010年，母其弥雅因参加腾讯名车美人的活动，而被网友所认识。2012年4月，母其弥雅担任第三届中国千人瑜珈大会的形象大使兼领衔教练。2013年3月，母其弥雅担任全球睡眠日公益活动的宣传大使。2014年8月，担任湖南电视台《星姐选举》的决赛评委；12月，主演个人银幕处女作《密道追踪》。2015年，出演动作神话电影《西游记之三打白骨精》。2016年5月，母其弥雅担任中印瑜伽大会 ...
            </p>
            <div class="btn">
              <el-button type="primary" plain>取消</el-button>
              <el-button type="primary" plain>确定</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        amendid:true,
        gobackid:false,
        activeName: 'first',
        outerVisible: false,
        innerVisible: false,
        radio: '1',
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        data2: [{
          id: 1,
          label: '中国银行',
          children: [{
            id: 4,
            label: '集采中心',
            children: [],
          },
            {
              id: 5,
              label: '总经办',
              children: [{
                id: 9,
                label: '采购一部'
              }, {
                id: 10,
                label: '采购二部'
              }, {
                id: 11,
                label: '采购三部'
              }]
            }
          ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          date: '9：00-15：00（工作日）',
          time: '申请完成两小时后'
        }, {
          date: '15：00-24:00',
          time: '下一个工作日9:00前'
        }, {
            date: '0:00-8:30',
            time: '下一个工作日10:00前'
          }]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      goback(){
        this.amendid=true;
        this.gobackid=false;
      },
      opens(){
        this.amendid=false;
        this.gobackid=true;
      }
    }
  }
</script>

<style scoped>
  /*修改弹出框的样式*/
  .changeinfo{
  }
  .changeinfo>p{
    text-align: center;
    color: red;
  }
  .changeinfo>.info{
    padding-left: 60px;
  }
  .changeinfo>.info>p{
    padding-left: 30px;
  }
  .changeinfo>.info>.radios>span{
    padding-left: 20px;
  }
  .changeinfo>.info>p>input{
    margin-left: 30px;
    width: 250px;
    height: 30px;
    border:1px solid #3a8ee6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .changeinfo>.info>p>span{
    padding-right: 30px;
  }
  .changeinfo>.info>.treeinfo{
    width: 502px;
    height: 180px;
    padding-left: 30px;
  }
  .changeinfo>.info>.treeinfo>div{
    float: left;
  }
  .changeinfo>.info>.treeinfo>.tree{
    padding-top: 15px;
  }
  .changeinfo>span{
    padding-left: 450px;
  }
  /*平台使用协议的样式*/
  .treatycont{
    padding: 20px;
  }
  .treatycont>.content{
    width: 800px;
    height: 500px;
    margin:0 auto;
    border:3px dashed #3a8ee6;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    position: relative;
  }
  .treatycont>.content>h2{
   text-align: center;
    padding-top: 50px;
  }
  .treatycont>.content>p{
    text-indent: 2em;
    padding: 20px;
  }
  .treatycont>.content>.btn{
    position: absolute;
    bottom: 5px;
    left: 330px;
  }
  /*重置密码的样式*/
  .password{
    padding: 20px;
  }
  .password>.inputs{
    width: 500px;
  }
  /*基本信息的样式*/
  .jiben{
    padding: 15px;
  }
  .loginname{
    text-indent: 1em;
  }
  .jiben>.content{
    padding-left: 100px;
  }
  .jiben>.content>p>span{
    padding-left: 30px;
  }
  .jiben>.content>.tel>p>span{
    padding-right: 30px;
    padding-left: 50px;
  }
  .jiben>.content>.legal{
    position: relative;
  }
  .jiben>.content>.legal>p{
    position: absolute;
    top: -20px;
    left: -48px;
  }
  .jiben>.content>.btn{
    padding-top:35px;
  }
  .jiben>.content>.btn>span{
    padding-left: 50px;
  }
  .exeparepro {
    margin-left: 20px;
    margin-top: 10px;
  }

  .el-table .cell {
    text-align: center;
  }
</style>


