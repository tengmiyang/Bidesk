<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">

    <el-row style="line-height:40px;color:#fff;background-color:#3f6aa9;
position: fixed;z-index: 100;width: 100%;top:0;left: 0;">
      <el-col :span="14"><h3 style="margin:0 0 0 2%;">{{company}} Bidesk平台</h3></el-col>
      <el-col :span="6" style="text-align: right;font-size: 0.86em;"><span>客服电话：400-052-2008</span></el-col>
      <el-col :span="2" style="text-align: center;font-size: 0.86em;"><span>{{name}}</span></el-col>
      <el-col :span="2">
        <el-button type="text" @click="logout" style="color:#fff;font-size: 0.86em;">退出</el-button>
      </el-col>
      <el-col>
        <navbar></navbar>
      </el-col>
    </el-row>

    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <app-main class="app_min"></app-main>
    </div>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Navbar, Sidebar, AppMain} from 'views/layout'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      ...mapGetters([
        'name',
        'company',
        'avatar',
        'roles'
      ])
    },
    methods: {
      // toggleSideBar() {
      //   this.$store.dispatch('ToggleSideBar')
      // },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar-container {
        width: 36px;
        overflow: inherit;
      }
      .main-container {
        margin-left: 36px;
      }
    }
    .sidebar-container {
      transition: width 0.28s ease-out;
      background-color:#3f6aa9;
      width: 181px;
      height: 100%;
      position: fixed;
      top: 40px;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none
      }
    }
    .main-container {
      min-height: 100%;
      transition: margin-left 0.28s ease-out;
      margin-left: 180px;
    }
  }
</style>
