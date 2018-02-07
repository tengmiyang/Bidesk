<template>
  <!--立项的详情页面-->
  <div class="app-container">
    <el-row :gutter="20">
      <!--输入框内容信息-->
      <el-form ref="coreProject" :model="coreProject" :rules="rules" label-width="140px" class="demo-ruleForm">
        <!--需要验证-->
        <el-col v-if="coreProject.isAgent === '2'" :span="16" :offset="4">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="coreProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="projectNum">
            <el-input v-model="coreProject.projectNum"></el-input>
          </el-form-item>
          <el-form-item label="采购方式" prop="projectMethodDicId">
            <el-select v-model="coreProject.projectMethodDicId" @change="msgModel" placeholder="请选择采购方式">
              <el-option v-for="items in tableData" :key="items.dicId" :value="items.dicId" :label="items.dicName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--不需要验证-->
        <el-col v-show="coreProject.isAgent !== '2'" :span="16" :offset="4">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="coreProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="coreProject.projectNum"></el-input>
          </el-form-item>
          <el-form-item label="采购方式">
            <el-select v-model="coreProject.projectMethodDicId" @change="msgModel" placeholder="请选择采购方式">
              <el-option v-for="items in tableData" :key="items.dicId" :value="items.dicId" :label="items.dicName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="16" :offset="4">
          <!--单选按钮-->
          <el-form-item label="请选择" prop="isAgent">
            <el-radio-group v-model="coreProject.isAgent" @change="changeRadio">
              <el-radio @change="dialogVisible = true" label="1">委托代理机构</el-radio>
              <el-radio @change="dialogVisible = false" label="2">自行采购</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <!--代理机构的名称和表格信息-->
      <div v-show="coreProject.isAgent === '1'&&showagency === true">
        <el-col style="text-align: center;" :span="24">
          <el-button @click="reselection" type="text" style="margin-left: 55%;">重新选择代理机构</el-button>
        </el-col>
        <el-col :span="24">
          <el-table :data="agenttables" border
                    style="width: 61%; margin: 0 23%;">
            <el-table-column prop="agent_mech" label="单位名称" align="center">
            </el-table-column>
            <el-table-column prop="agent_name" label="联系人" align="center">
            </el-table-column>
            <el-table-column prop="agent_num" label="手机号" align="center">
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <!--提交钮-->
      <el-col style="text-align: center;margin-top: 1%" :span="24">
        <el-button type="primary" @click="submitProject('coreProject')">
          提 &nbsp&nbsp&nbsp 交
        </el-button>
      </el-col>
    </el-row>
    <!--弹框-->
    <el-dialog title="选择代理机构" :visible.sync="dialogVisible" width="60%">
      <div class='weituo'>
        <div class="patenthead">
          <div class="serach">
            <input type="text" placeholder="请输入单位名称">
            <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
          </div>
        </div>
        <div class="patentcontent">
          <template>
            <el-table :data="agenttable" border style="width: 100%">
              <el-table-column type="index" label="序号" width="60" align="center">
              </el-table-column>
              <el-table-column prop="agent_mech" label="单位名称" min-width="200" align="center">
              </el-table-column>
              <el-table-column prop="agent_name" label="联系人" align="center">
              </el-table-column>
              <el-table-column prop="agent_num" label="手机号" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!--<span>(用户ID: {{scope.row.agent_entrust}}) </span>-->
                  <el-button type="text" @click="entrustdata(scope.row)">委托</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
              <el-button plain @click="dialogVisible = false">关 闭</el-button>
        <!--<el-button type="primary" @click="entrustdata">确 定</el-button>-->
            </span>
    </el-dialog>
    <el-dialog title="项目委托函" :visible.sync="entrustmentLetter" width="900px">
      <TinyMce v-model="projectLetters"></TinyMce>
      <span slot="footer" class="dialog-footer">
              <el-button @click="entrustmentLetter = false">关 闭</el-button>
              <el-button type="primary" @click="setlist">确定提交</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
  import {newProject, newSetProject} from '@/api/project'
  import TinyMce from '@/custom-components/Tinymce'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    components: {TinyMce},
    mounted() {
      this.getList()
    },
    data() {
      return {
        //代理机构
        dialogVisible: false,
        entrustmentLetter: false,
        showagency: false,
//        采购方式
        radio: '1',
        agenttable: [{
          agent_mech: '江苏省国际投标公司',
          agent_name: '刘朴浩',
          agent_num: '15850734684',
          agent_entrust: 260,
        },
          {
            agent_mech: '上海宝华国际投标公司',
            agent_name: '滕友亮',
            agent_num: '18068815990',
            agent_entrust: 271,
          }],
        agenttables: [{
          agent_mech: '',
          agent_name: '',
          agent_num: '',
          agent_entrust: 0,
        }],
        tableData: [],
        coreProject: {
          projectName: '',
          projectNum: '',
          projectMethodDicId: '',
          isAgent: '',
          projectLetter: ''
        },
        coreProjectEntrust: {
          entrustUserId: 0
        },
        projectLetters: "",
        // 验证
        rules: {
          projectName: [
            {required: true, message: '请输入项目名称', trigger: 'change'}
          ],
          projectNum: [
            {required: true, message: '请输入项目编号', trigger: 'change'}
          ],
          projectMethodDicId: [
            {required: true, message: '请选择采购方式', trigger: 'change'}
          ],
          isAgent: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        noRules: true,
        haveRules: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
//      获取数据
      getList() {
        this.listLoading = true
        newProject().then(response => {
          // console.log(response)
          this.tableData = response.data;
          setTimeout(() => {
            this.listLoading = false;
          }, 1000);
          this.listLoading = false
        })
      },
//      提交数据
      setlist() {
        this.entrustmentLetter = false;
        this.coreProject.projectLetter = this.projectLetters
        newSetProject(this.coreProject, this.coreProjectEntrust).then(response => {
          console.log(response);
          if (response.state === true) {
            this.$message({
              message: '立项成功',
              type: 'success'
            });
            this.resetForm('coreProject')
            this.$router.push({path: '/'})
            this.$router.push({name: '前期准备项目'})
          }
          else {
            this.$message({
              message: '立项失败，请重试',
              type: 'warning'
            });
          }
        })
      },
      submitProject(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.entrustmentLetter = true
            if (this.coreProject.isAgent === "2") {
              this.agenttables[0].agent_mech=''
              this.entrustmentLetter = true
              if (this.agenttables[0].agent_mech === '') {
                this.agenttables[0].agent_mech = '自行采购'
              }
              this.projectLetters =
                `<p style="text-align: center;"><strong>` + this.coreProject.projectName + `委托函</strong></p>
              <p>` + this.agenttables[0].agent_mech + `：</p>
              <p>&nbsp; &nbsp; &nbsp; 采购项目：` + this.coreProject.projectName + `的作为自行采购项目。</p>`
            }
            else {
              this.projectLetters =
                `<p style="text-align: center;"><strong>` + this.coreProject.projectName + `委托函</strong></p>
              <p>` + this.agenttables[0].agent_mech + `：</p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp;现委托贵单位作为采购项目：` + this.coreProject.projectName + `的招标代理负责相关事宜。</p>`
//              this.projectLetters = this.coreProject.projectName + this.agenttables[0].agent_mech + '(根据《中华人民共和国采购法》，现委托贵单位作为采购项目：' + this.coreProject.projectName + ' 的招标代理负责相关事宜。)'
//                <p>委托时间：``</p>
//                <p>委托单位:``</p>
            }
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.coreProject.projectName = ''
        this.coreProject.projectNum = ''
        this.coreProject.projectMethodDicId = ''
      },
//      显示委托联系人
      entrustdata(row) {
        this.coreProjectEntrust.entrustUserId=0
        this.showagency = true;
        this.dialogVisible = false;
        this.agenttables = [row]
        console.log(row)
        this.coreProjectEntrust.entrustUserId=row.agent_entrust
      },
//      重新选择委托联系人
      reselection() {
        this.dialogVisible = true;
        this.showagency = false
      },
      onSubmit() {
        // console.log('submit!');
      },
      msgModel() {
      },
      // 验证
      changeRadio() {
//        this.resetForm('coreProject')
        if (this.coreProject.isAgent === '1') {
          this.dialogVisible = true
        }
        this.showagency = false
        console.log(this.coreProject.isAgent)
        console.log(this.dialogVisible)
      }
    }
  }
</script>

<style scoped>
  #project {
    position: relative;
  }

  /*.el-form-item {*/
  /*margin-bottom: 3%;*/
  /*}*/

  .newpro {
    width: 800px;
    position: absolute;
    top: 10px;
    left: 170px;
  }
  .but {
    text-align: center;
  }

  .newpro > .content > .proname {
    margin-top: 30px;
  }

  /*委托信息的样式*/
  .weituo > .patenthead > .serach {
    text-align: center;
  }

  .weituo > .patenthead > .serach > input {
    margin-left: 10px;
    width: 500px;
    height: 34px;
    border: 1px solid #608FC7;
    border-radius: 5px;
  }

  .weituo > .patentcontent {
    padding-top: 20px;
  }

  /*选择委托信息后的页面*/

  .el-header {
    background-color: #608FC7;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    background-color: #608FC7;
    height: 100vh;
  }

  .el-dialog__body {
    padding: 30px 40px;
  }

  .el-submenu {
    background-color: #608FC7;
    font-size: 20px;
    color: #fff;
  }

  .el-menu-item {
    background-color: rgb(96, 143, 199);
    color: #fff;
  }

  .block {
    position: absolute;
    top: 85vh;
    right: 0;
  }


</style>
