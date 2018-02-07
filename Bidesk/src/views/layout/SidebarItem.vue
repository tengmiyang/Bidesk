<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">

      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
                   :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <span>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <span>{{item.name}}</span>
        </template>

        <template v-for="child in item.children" v-if='!child.hidden'>

          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0'
                        :routes='[child]'></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path">
            <el-badge :value="numsList[child.path]" :hidden="!numsList[child.path]" class="item">
              <el-menu-item @click="submenuClick(child.name)" :index="item.path+'/'+child.path" class="my-menu-item">
                <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
                <span>{{child.name}}</span>
              </el-menu-item>
            </el-badge>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  import {numOfMenu} from '@/api/project'

  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    data() {
      return {
        numsList: [],
      }
    },
    mounted() {
      // alert(this.$store.getters.subProjectId)
      this.getList(this.$store.getters.subProjectId)
    },
    watch: {
      routes(){
        this.getList(this.$store.getters.subProjectId)
      }
    },
    methods: {
      getList(id) {
        numOfMenu(id).then(response => {
          console.log(response)
          this.numsList = response.data
        })
      },
      submenuClick(name) {
        let status = ''
        switch (name) {
          case '前期准备项目':
            status = 'prepare'
            break;
          case '正在执行项目':
            status = 'execute'
            break;
          case '已到期项目':
            status = 'expire'
            break;
          case '已完结项目':
            status = 'end'
            break;
          case '异常项目':
            status = 'exception'
            break;
        }
        if (status.length) {
          this.$store.dispatch('SetProStatus', status)
          // this.$store.dispatch('SetStatusChange', true)
        }
        //加上下面这句话所有的子栏目可以实现多次点击了，下面2行话都可以，原理应该是，路由先实现下面一行的跳转，然后在迅速跳转到当前页，相当于软刷新
        // this.$router.push({ path: '/permission/index?' + +new Date() })
        this.$router.push({path: '/'})
      }
    }
  }

</script>
<style>
  .my-menu-item {
    border-bottom: 0.25px solid rgba(255, 255, 255, 0.6);
  }

  .el-menu-item.is-active {
    background: #345391;
    color:#edf107
}
  .el-badge__content.is-fixed {
    top: 50%;
    right: 18%;
  }
</style>
<style scoped>

</style>
