<template>
  <div class="app-container">
    <div class="content">
      <span>项目名称： <span>{{tableData.projectName}}</span></span>&gt;&gt;
      <span>项目编号： <span>{{tableData.projectNum}}</span></span>
    </div>
  </div>
</template>
<script>
//  import {executeProjectNotice} from '@/api/project'
export default {
    props: ['tableData'],
    mounted(){
//      this.getList()
    },
    data() {
      return {
      }
    },
    methods: {
//      getList() {
//        executeProjectNotice(this.id).then(response => {
//          // console.log(response);
//          this.tableData = response.data.project;
//        })
//      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
