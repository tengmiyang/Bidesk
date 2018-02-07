<template>
  <el-row class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <h3 class="title">Bidesk</h3>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="user"/>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" @keyup.enter.native="handleLogin" autoComplete="on"
               placeholder="请输入用户名"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password"/>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="请输入密码"/>
        <!--<span class='show-pwd' @click='showPwd'>-->
          <!--&lt;!&ndash;<icon-svg icon-class="eye"/>&ndash;&gt;-->
        <!--</span>-->
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
                 @click.native.prevent="handleLogin">登录
      </el-button>
      <el-row>
        <el-col :span="12"><span style="color: #fff;text-align: left">咨询电话：400-052-2008</span></el-col>
        <el-col :span="12" style="text-align: right">
          <router-link target="_blank" to="/register" style="font-size: 14px">用户注册　</router-link>
        </el-col>
        <!--<router-link to="/fixed_sidebar">|　忘记密码？</router-link>-->
      </el-row>
      <div class="sign_in">
        <el-button type="primary" :loading="loading" style="top:74%;"
                   @click.native.prevent="handleLogin2(0)">采购人登录
        </el-button>
        <el-button type="primary" :loading="loading" style="top:82%;"
                   @click.native.prevent="handleLogin2(1)">代理机构登录
        </el-button>
        <el-button type="primary" :loading="loading" style="top:90%"
                   @click.native.prevent="handleLogin2(2)">供应商登录
        </el-button>
      </div>
    </el-form>

  </el-row>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'

  export default {
    components: {},
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        pwdType: 'password',
        loading: false,
        showDialog: false,
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: '/'})
              // this.showDialog = true
            }).catch(() => {
              this.loading = false
            })
          } else {
            // console.log('error submit!!')
            return false
          }
        })
      },
      handleLogin2(type, value) {
        const loginTest = ['cgr', 'dljg', 'gys']
        this.loginForm.username = loginTest[type]
        this.loginForm.password = '111111'
        this.handleLogin()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .sign {
      font-size: 14px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 475px;
      padding: 35px 35px 15px 35px;
      margin: 50px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
  }
</style>
<style scoped>
  .sign_in .el-button {
    position: fixed;
    right: 1%;
    width: 126px;
  }
  .el-row span {
    font-size: 14px;
  }
</style>
