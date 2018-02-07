<template>
  <el-menu mode="vertical"
           text-color="#fff" :default-openeds="opened"
           active-text-color="#edf107" unique-opened :default-active="$route.path" :collapse="isCollapse">
    <sidebar-item :routes='top_routers'></sidebar-item>
  </el-menu>
</template>


<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {SidebarItem},
    data() {
      return {
        opened: ['项目管理', '文件汇总']
      }
    },
    computed: {
      ...mapGetters([
        'top_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
    }
  }
</script>
<style>
  .menu-wrapper ul {
    background-color: #3f6aa9;
  }
  .el-submenu__title:hover {
    background-color:#325587;
  }
</style>
