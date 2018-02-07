<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <div v-if="roleId==='supplierAdmin'">
        <el-col :span="7" style="" :sm="3" :md="4" :lg="7">
          <el-form-item label="项目名称:">
            <el-input v-model="form.projectName" placeholder="项目名称" style="width: 110%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" style="" :sm="3" :md="4" :lg="7">
          <el-form-item label="项目编号:">
            <el-input v-model="form.projectNum" placeholder="项目编号" style="width: 110%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" style="" :sm="2" :md="4" :lg="7">
          <el-form-item label="采购单位:">
            <el-input v-model="Purchasing" placeholder="项目编号" style="width: 110%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </div>
      <div v-else>
        <el-col :span="11" style="" :sm="4" :md="6" :lg="11">
          <el-form-item label="项目名称:">
            <el-input v-model="form.projectName" placeholder="项目名称" style="width: 200%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" style="" :sm="4" :md="6" :lg="11">
          <el-form-item label="项目编号:">
            <el-input v-model="form.projectNum" placeholder="项目编号" style="width: 200%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </div>

    </el-form>
  </div>
</template>
<script>
  import {
    supplierSearchProject,
    executeProject,
    acceptProject,
    prepareProject,
    expireProject,
    supplierAlreadyEnter,
    supplierPassProject
  } from '@/api/project'

  export default {
    props: ['type'],
    data() {
      return {
        tableDatas: [],
        form: {
          projectName: '',
          projectNum: '',
          pageNum: 1,
        },
        paginations: {
          totalPage: 1,
          pageSize: 1,
          totalCount: 1,
          pageNum: 1
        },
        roleId: this.$store.getters.roles[0],
      }
    },
    methods: {
      //     点击搜索按钮---提交项目搜索字段，获取搜索的项目数据
      onSubmit() {
        supplierSearchProject(this.form).then(response => {
          console.log(response);
          this.tableDatas = response.data;
          this.$emit('onSubmit', this.tableDatas)
        })
        console.log(this.type)
        switch (this.type) {
          case 'accept':      //代受理页面
            acceptProject(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
          case 'prepare':     //前期准备页面
            prepareProject(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
          case 'execute':       //正在执行页面
            executeProject(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
          case 'expire':       //已到期页面
            expireProject(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
          case 'supplier_search':       //供应商-项目搜索页面
            supplierSearchProject(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
          case 'supplier_enter':       //供应商-已关注页面
            supplierAlreadyEnter(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
          case 'supplier_execute':       //供应商-正在执行页面
            supplierPassProject(this.form).then(response => {
              console.log(response);
              this.tableDatas = response.data;
              this.$emit('onSubmit', this.tableDatas)
            })
            break
        }
      },
    }
  }
</script>

<style>
  .el-form-item {
    margin-bottom: 2%;
  }
</style>
