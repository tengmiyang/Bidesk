<template>
  <div class="project-container">
    <crumbs :resData="resData" v-if="resData"></crumbs>
    <div v-if="first_page">
      <el-table :span-method="objectSpanMethod" v-loading="listLoading" element-loading-text="加载中..."
                :data="resProjectDetail" border>
        <el-table-column prop="pro_name" label="立项名称" min-width="100">
        </el-table-column>
        <el-table-column prop="sub_pro_name" label="采购项目名称" min-width="100">
        </el-table-column>
        <el-table-column prop="sub_pro_num" label="采购项目编号" min-width="80" align="center">
        </el-table-column>
        <template v-if="resData.hasShowPack !== false">
          <el-table-column prop="pack_num" label="包号" min-width="40" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.pack_num === null">—</span>
              <span v-else>第{{scope.row.pack_num}}包</span>
            </template>
          </el-table-column>
          <!--<el-table-column prop="pack_name" label="包件名称" min-width="80" align="center">-->
          <!--</el-table-column>-->
        </template>
        <el-table-column prop="" label="操作" min-width="140" align="left">
          <template slot-scope="scope">
            <el-button @click="nextPart(scope.row.sub_pro_id)" type="primary" size="small">关联邮件并发布公告</el-button>
            <el-button v-show="scope.row.sub_pro_name" size="small" type="primary"
                       @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button v-show="scope.$index !== 0" size="small" type="danger" plain
                       @click="handleDelete(scope.$index, scope.row)">移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="grid-content">
            <el-form :model="add_row" :rules="rules" ref="add_row" :inline="true" class="demo-form-inline">
              <el-form-item label="采购项目名称：" prop="sub_pro_name">
                <el-input v-model="add_row.sub_pro_name"></el-input>
              </el-form-item>
              <el-form-item label="采购项目编号：">
                <el-input v-model="add_row.sub_pro_num"></el-input>
              </el-form-item>
              <el-form-item>
                <!--<el-button type="primary" @click.once="onceAdd">添加</el-button>-->
                <el-button type="primary" @click="handleAdd('add_row')">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else>
      <associatedAll></associatedAll>
    </div>
  </div>
</template>
<script>
  import {
    newProjectSave, prepareProjectEmail, prepareProjectOperate, newProjectDelete, newProjectUpdate
  } from '@/api/project'
  import waves from '@/directive/waves/index.js'; // 水波纹指令
  import associatedAll from '@/custom-components/project_manages/associatedAll';
  import crumbs from '@/custom-components/project_manages/crumbs'
  import {deepClone, mergeInit, merge} from '@/utils'

  export default {
    mounted() {
      mergeInit(8, 15, this.mergeList)
      this.getList()
      console.log(this.projectId)
    },
    components: {
      associatedAll,
      crumbs
    },
    computed: {
      projectId() {
        return this.$router.proId ? this.$router.proId : this.$store.getters.projectId
      }
    },
    data() {
      return {
        mergeList: [],
        rules: {
          sub_pro_name: [
            {required: true, message: '采购项目名称不能为空', trigger: 'blur'}
          ]
        },
        // projectId: this.$store.getters.projectId,
        publishProjectId: 0,
        listLoading: true,
        clear_row: false,
        first_page: true,
        public_type: false,
        add_index: '',
        add_row: {
          pro_name: '',
          sub_pro_name: '',
          sub_pro_id: null,
          sub_pro_num: ''
        },
        resProjectDetail: [],
        resData: [],
//        resProjectDetail: Array(4).fill(item),
//         dialogVisible: false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      getList() {
        prepareProjectOperate(this.projectId).then(response => {
//          原始数据全以res开头
          this.resData = response.data
          this.resProjectDetail = response.data.projectDetail
          if (response.state) {
            this.listLoading = false
          }
          merge(this.resProjectDetail, 0, 'pro_id', this.mergeList)
          merge(this.resProjectDetail, 1, 'sub_pro_id', this.mergeList)
          console.log(response)
        })
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          return this.mergeList[0][rowIndex]
        } else if (columnIndex === 1 || columnIndex === 2) {
          return this.mergeList[1][rowIndex]
        }
      },
      onMailRow(row) {
//        const obj = deepClone(row)
        this.mail_array.push(row)
//          console.log(row)
      },
      onMailRowEdit(row) {
        this.mail_array.forEach((item, index) => {
          if (item === row) {
            this.mail_array.splice(index, 1)
          }
        })
      },
      handleClick(row) {
        console.log(row)
        this.onMailRowEdit(row)
        if (row.inbox) {
          this.$refs.childMethod.inEdit(row)
        } else {
          this.$refs.childMethod.outEdit(row)
        }
      },
      handleBack() {
        this.first_page = true
        this.$router.push({path: '/'}) //跳转到新页面
        this.$router.push({name: '项目操作'}) //跳转到新页面
      },
      openPublish() {
        this.$store.dispatch('SetPubProID', this.publishProjectId).then(() => {
          this.$router.push({name: '项目发布'}) //跳转到新页面
        })
      },
      handleAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.add_row.pro_name = this.resProjectDetail[0].pro_name
            const data = {...this.add_row} //对象深拷贝，否则push后互相关联
            newProjectSave(this.projectId, this.add_row.sub_pro_name, this.add_row.sub_pro_num).then(response => {
              this.listLoading = true
              setTimeout(() => {
                if (response.state || this.resProjectDetail[0].sub_pro_id === response.data) {
                  this.getList()
                }
                data.sub_pro_id = response.data
                this.resProjectDetail.push(data)
                // console.log(this.resProjectDetail)
                this.add_row.sub_pro_num = ''
                this.add_row.sub_pro_name = ''
                this.listLoading = false
              }, 300)
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      handleEdit(index, row) {
        this.add_index = index
        this.dialogVisible1 = true
        this.edit_row = row
        this.edit_row.sub_pro_name = row.sub_pro_name
        this.edit_row.sub_pro_num = row.sub_pro_num
//        this.resProjectDetail[index].sub_pro_name = row.sub_pro_name
//        this.resProjectDetail[index].sub_pro_num = row.sub_pro_num
      },
      handleDelete(index, row) {
        this.listLoading = true
        newProjectDelete(row.sub_pro_id).then(response => {
          this.resProjectDetail.splice(index, 1)
          this.listLoading = false
          // console.log(response)
        })
      },
      nextPart(sub_pro_id) {
        prepareProjectEmail(sub_pro_id).then(res => {
          this.resData = res.data
          this.first_page = false
          this.publishProjectId = res.data.projectId
          this.$store.dispatch('SetPubProID', this.publishProjectId)
        })

      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }
</script>

<style scoped>
  .grid-content {
    margin-top: 1%;
    text-align: right;
    min-height: 36px;
  }

  .el-main {
    padding: 0;
  }

  .components-container {
    margin: 0;
  }

  .el-table td.is-left {
    text-align: right;
  }
</style>
<style>
  .el-table th.is-leaf {
    text-align: center;
  }
</style>
