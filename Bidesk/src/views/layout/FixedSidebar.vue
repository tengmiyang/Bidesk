<template>
  <el-menu mode="vertical"
           text-color="#fff" :default-openeds="opened"
           active-text-color="#edf107" unique-opened :default-active="$route.path" :collapse="isCollapse">
    <el-radio-group v-if="status !== 'end'" id="radio_type" class="radio_type" v-model="radio"
                    style="margin-left: 2px;">
      <el-radio-button style="width: 50%;    background-color: #5395c6;" :label="0">操作功能</el-radio-button>
      <el-radio-button style="width: 50%" :label="1">文件汇总</el-radio-button>
    </el-radio-group>
    <sidebar-item :routes='fixedRouters'></sidebar-item>
  </el-menu>
</template>


<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import {deepClone} from '@/utils'

  export default {
    name: "FixedSidebar",
    components: {SidebarItem},
    mounted() {
      // this.supplierInfo = deepClone(this.tableData)
      // this.filterRouters()
      if (this.status === 'end') {
        //已完结的项目只显示文件汇总
        this.radio = 1
      } else {
        this.$nextTick(() => {
          const ele = document.getElementsByClassName("el-submenu__title")
          // // console.log(ele)
          ele[0].className += ' hidden-it'
        })
      }

    },
    data() {
      return {
        radio: 0, //默认按钮
        roles: this.$store.getters.roles,
        status: this.$store.getters.projectStatus,
        fixed_routers: deepClone(this.$store.getters.fixed_routers), //必须先深拷贝因为下面数组改变了自己
        filter_routers: [],
        opened: ['操作功能', '文件汇总']
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      // fixedRouters() {
      //   return this.fixed_routers.filter((item, index) => index === this.radio)
      // },
      fixedRouters() {
        return this.fixed_routers.filter((item, index) => {
          item.children = item.children.filter(child => {
            //对子进行遍历 下列条件分别对应: 1，有meta属性 2，括号中间的一项：如果有meta.role属性，需要权限数组中包含当前菜单的权限，如果没有该属性则放开权限 3，可用状态数组中包含当前状态
            return child.meta && (child.meta.role && this.roles.some(role => child.meta.role.indexOf(role) >= 0) || !child.meta.role) && child.meta[this.roles[0]].indexOf(this.status) >= 0
          })
          //筛选跟按钮对应的路由
          return index === this.radio
        })
      },
    },
  }
</script>

<style>
  /*.textColor {*/
  /*color: #edf107;*/
  /*}*/

  .hidden-it {
    display: none;
  }

  .menu-wrapper ul {
    background-color: #3f6aa9;
  }

  #radio_type .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0px solid #fff;
  }
  #radio_type .el-radio-button__inner {
    background-color: #dfe4ed;
  }
  #radio_type .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #edf107;
    background-color: #345391;
    border-color: #fff;
    border-left: 1px solid #fff;
    box-shadow: -1px 0 0 0 #345391;
  }
</style>
<style scoped>
  .el-radio-button__inner {
    background-color: #fff;
  }
</style>
