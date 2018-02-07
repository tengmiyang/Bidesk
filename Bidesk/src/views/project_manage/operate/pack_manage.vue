<template>
  <div class="project-container">
    <el-row>
      <crumbs :resData="projects"></crumbs>
    </el-row>
    <el-row>
      <el-form ref="inputform" :model="inputform" label-width="80px">
        <el-form-item label="包件名称" style="margin-left: 10%;">
          <el-col :span="14">
            <el-input v-model.trim="inputform.name"></el-input>
          </el-col>
          <el-col :span="7" style="padding-left: 1%;">
            <el-button type="primary" plain @click="addPack">添加包件</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <el-table :data="packLists" style="width: 100%" border v-loading="listLoading" element-loading-text="加载中...">
        <el-table-column prop="packNum" label="包号" min-width="180" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.packNum}}包</span>
          </template>
        </el-table-column>
        <el-table-column prop="packName" label="包名" min-width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope" v-if="scope.row.showOperation">
            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, packLists)">移除
            </el-button>
            <el-button type="text" size="small" @click="MoveUpwards(scope.$index, packLists)">上移</el-button>
            <el-button type="text" size="small" @click="MoveDown(scope.$index, packLists)">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--添加包件的弹出框-->
    <el-dialog title="添加包件" :visible.sync="dialogVisible" width="45%">
      <el-row>
        <el-col :span="24"><h3>请先添加第一包的包名</h3></el-col>
        <el-form ref="inputform" :model="inputform" label-width="150px">
          <el-form-item label="第一包包名：" v-if="showPackname">
            <el-input v-model.trim="inputform.name1"></el-input>
            <span>说明:当前项目的信息(如:采购公告,采购文件等)将默认关联到第一包</span>
          </el-form-item>
          <el-form-item label="第二包包名：">
            <el-input v-model.trim="inputform.name2"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPackList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提交按钮 -->
    <el-row :gutter="20">
      <el-col :span="2" :offset="11" style="padding-top:2%;">
        <el-button type="primary" @click="judgePack" v-show="this.submitbtn">提 交</el-button>
      </el-col>
      <el-dialog title="提示" :visible.sync="dialogSubmit" width="30%">
        <h3>是否确认提交添加的包件？</h3>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSubmit = false">关 闭</el-button>
          <el-button type="primary" @click="addPackSubmit">确定提交</el-button>
        </span>
      </el-dialog>
    </el-row>
    <!-- 关联邮件并发布公告按钮 -->
    <el-row style="text-align: center" v-show="this.associatedmail">
      <el-button type="primary" @click="AssociateMail">关联邮件并发布公告</el-button>
    </el-row>
  </div>
</template>

<script>
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {executeProjectPackList, executeProjectSaveNewPack, executeSupplierMsgSend} from '@/api/project'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  export default {
    components: {crumbs},
    mounted() {
      this.getList()
    },
    data() {
      return {
        form: {
          projectId: 0,
          packNameList: [],
        },
        inputform: {
          name: '',
          name1: '',
          name2: '',
        },
        projectId: this.$store.getters.subProjectId,
        input: '',
        dialogVisible: false,
        listLoading: false,
        dialogSubmit: false,
        associatedmail: false,
        packListsLength: 0,
        submitbtn: true,
        showPackname: true,
        flag: false,
        packLists: [],
        projects: {},
        addpackShow: null,
        addpacks: {
          packNum: null,
          packName: "",
          showOperation: false,
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        executeProjectPackList(this.projectId).then(response => {
          this.addpackShow = response.data.hasMorePack
          this.projects = response.data
          if (this.addpackShow === true) {
            this.packLists = response.data.packList
            this.packListsLength = this.packLists.length
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 2000);
          this.listLoading = false
        })
      },
//      添加包件按钮
      addPack() {
        this.inputform.name1 = this.inputform.name
        if (this.addpackShow === false && this.flag === false) {
          this.dialogVisible = true
          return
        }
        else if (this.inputform.name.length === 0) {
          this.$message({
            message: '包件名称不能为空',
            type: 'warning'
          });
        }
        else {
          this.dialogVisible = false
          this.flag = true
          this.addpacks.packNum = this.packLists.length + 1
          this.addpacks.packName = this.inputform.name
          this.addpacks.showOperation = true
          const data = {...this.addpacks}
          this.packLists.push(data)
          this.form.packNameList.push(this.addpacks.packName)
          this.inputform.name = ""
          this.submitbtn = true
          this.associatedmail = false
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
        this.form.packNameList.splice(index - this.packListsLength, 1)
        for (let i = index; i < this.packLists.length; i++) {
          this.packLists[i].packNum = this.packLists[i].packNum - 1;
        }
      },
      MoveUpwards(index, rows) {
        var arrRow = []
        if (index < rows.length && index > 0) {
          arrRow = rows[index]
          this.packLists.splice(index, 1)
          this.packLists.splice(index - 1, 0, arrRow)
        }
        const packNum = this.packLists[index].packNum
        this.packLists[index].packNum = this.packLists[index - 1].packNum
        this.packLists[index - 1].packNum = packNum
      },
      MoveDown(index, rows) {
        var arrRows = []
        arrRows = rows[index]
        this.packLists.splice(index, 1)
        this.packLists.splice(index + 1, 0, arrRows)
        const packNub = this.packLists[index + 1].packNum
        this.packLists[index + 1].packNum = this.packLists[index].packNum
        this.packLists[index].packNum = packNub
      },
      judgePack() {
        if (this.form.packNameList.length === 0) {
          this.$message.error('请先添加包件再提交');
        }
        else {
          this.dialogSubmit = true
        }
      },
      addPackSubmit() {
        this.dialogSubmit = false
        this.form.projectId = this.projectId
        executeProjectSaveNewPack(this.form).then(response => {
          // console.log(response)
          if (response.state === true) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.getList()
            this.form.projectId = 0
            this.form.packNameList = []
            this.submitbtn = false
            this.associatedmail = true
          }
          else {
            this.$message({
              message: '添加失败',
              type: 'warning'
            });
          }
        })
      },
//      确定添加包件按钮
      addPackList() {
        this.dialogVisible = false
        this.flag = true
        if (this.inputform.name1.length === 0 || this.inputform.name2.length === 0) {
          this.$message({
            message: '包件名称不能为空',
            type: 'warning'
          });
          return
        }
        else if (this.packLists.length < 1) {
          this.addpacks.packName = this.inputform.name1
          this.addpacks.packNum = this.packLists.length + 1
          this.addpacks.showOperation = true
          const datab = {...this.addpacks}
          this.packLists.push(datab)
          this.form.packNameList.push(this.addpacks.packName)
          this.addpacks.packName = this.inputform.name2
          this.addpacks.packNum = this.packLists.length + 1
          this.addpacks.showOperation = true
          const datac = {...this.addpacks}
          this.packLists.push(datac)
          this.form.packNameList.push(this.addpacks.packName)
          this.showPackname = false
          this.inputform.name = ""
          this.inputform.name2 = ""
          this.submitbtn = true
          this.associatedmail = false
          return
        }
        else {
          this.addpacks.packName = this.inputform.name2
          this.addpacks.packNum = this.packLists.length + 1
          this.addpacks.showOperation = true
          const dataa = {...this.addpacks}
          this.packLists.push(dataa)
          this.form.packNameList.push(this.addpacks.packName)
        }
        this.inputform.name = ""
        this.inputform.name2 = ""
        this.submitbtn = true
        this.associatedmail = false
      },
      AssociateMail() {
        this.$store.dispatch('SetProStatus', 'prepare')
        this.$store.dispatch('SetSubProID').then(() => {
//          this.$store.dispatch('SetProStatus', 'prepare')
          this.$router.push({name: '前期准备项目'}) //  路由添加完后  才可跳转到新页面
        })
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    padding-bottom: 1%;
    margin: 0;
  }
</style>


