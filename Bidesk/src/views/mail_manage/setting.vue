<template>
  <div class="app-container">
    <div class="settingmail">
      <div class="mails">
        <div class="head">
          <h2>绑定邮箱</h2>
          <p>邮箱：<span>156156151561515154@qq.com</span>
          <p class="password">
          密码：<input type="password">
        </p>
          <div class="btns">
              <span><el-button type="primary" plain>确定</el-button></span>
              <span><el-button type="primary" plain>取消</el-button></span>
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
      }
    },
    computed: {},
    methods: {
    }
  }
</script>

<style scoped>
.settingmail{
  width: 100%;
  height: 80vh;
}
.settingmail>.mails{
  border:2px solid #3f6aa9;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  width: 50%;
  height: 55%;
  margin:0 auto;
  margin-top: 5%;
}
.settingmail>.mails>.head{
  padding: 5%;
}
.settingmail>.mails>.head>h2{
  text-align: center;
}
.settingmail>.mails>.head>p{
  font-size: 20px;
  padding-left: 10%;
  padding-top: 15px;
}
.settingmail>.mails>.head>.btns{
  padding-top: 10px;
  padding-left: 35%;
}

.settingmail>.mails>.head>.btns>div>span{
  padding-left: 20px;
}
.settingmail>.mails>.head>.password>input{
  width: 70%;
  height: 30px;
  border:1px solid #3f6aa9;
  border-radius: 3px;
}
</style>


