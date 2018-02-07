<template>
  <div>
    <el-row style="padding-bottom: 1%;">
      <el-col :class="{styleObject : styleObject}" :span="12">
        <el-button size="small" type="primary" icon="el-icon-d-arrow-left" @click="handleBack">返回</el-button>
      </el-col>
      <el-col style="text-align: right" :span="12">
        <el-button :class="{styleObject : styleObject}" size="small" type="primary" @click="openPublish">
          发布公告
        </el-button>
        <el-button size="small" type="primary" @click="dialogVisible = true">关联邮件</el-button>
        <el-button size="small" type="primary" @click="dialogVisible2 = true">手动添加采购人发来的文件</el-button>
      </el-col>
      <el-col class="project-table" :span="24">
        <el-table v-loading="listLoading" element-loading-text="加载中..." :data='mail_array' border
                  style='width: 100%; margin-top: 1%'>
          <el-table-column type='index' label='序号' width='60' align='center'>
          </el-table-column>
          <el-table-column prop='subject' label='主题' min-width='80' align='center'>
          </el-table-column>
          <el-table-column prop='receiver' label='收件人' min-width='80' align='center'>
            <template slot-scope='scope'>
              <span v-if="scope.row.receiver === null">—</span>
              <span v-else>{{scope.row.receiver}}</span>
            </template>
          </el-table-column>
          <el-table-column prop='sender' label='发件人' min-width='80' align='center'>
            <template slot-scope='scope'>
              <span v-if="scope.row.sender === null">—</span>
              <span v-else>{{scope.row.sender}}</span>
            </template>
          </el-table-column>

          <el-table-column prop='time' label='时间' min-width='60' align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
          </el-table-column>
          <el-table-column label='操作' min-width='50' align='center'>
            <template slot-scope='scope'>
              <el-button @click='handleClick(scope.row)' type='text' size='small'>取消关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 关联邮件 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="90%">
      <associatedMail @onMailRow="onMailRow" @onMailRowEdit="onMailRowEdit" ref="childMethod"></associatedMail>
    </el-dialog>
    <!-- 手动添加采购人发来的邮件    -->
    <el-dialog title="补录" :visible.sync="dialogVisible2" width="45%">
      <addMail></addMail>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible1"
      width="50%">
      <el-form style="padding-right: 10%;" label-width="160px">
        <el-form-item label="采购项目名称：">
          <el-input v-model="edit_row.sub_pro_name"></el-input>
        </el-form-item>
        <el-form-item label="采购项目编号：">
          <el-input v-model="edit_row.sub_pro_num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">关 闭</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import associatedMail from '@/custom-components/project_manages/associatedMail';
  import addMail from '@/custom-components/project_manages/addMail';

  export default {
    mounted() {
      if (this.$router.currentRoute.name === '项目操作') {
        this.styleObject = false
      } else {
        this.styleObject = true
      }
    },
    components: {
      associatedMail,
      addMail

    },
    data() {
      return {
        styleObject: null,
        dialogVisible: false,
        dialogVisible2: false,
        listLoading: false,
        dialogVisible1: false,
        publishProjectId: 0,
        edit_row: {},
        mail_array: [],
      }
    },
    methods: {
      handleSubmit() {
        this.listLoading = true
        newProjectUpdate(this.edit_row.sub_pro_id, this.edit_row.sub_pro_name, this.edit_row.sub_pro_num).then(() => {
          this.resProjectDetail.splice(this.add_index, 1, this.edit_row)
          this.listLoading = false;
          this.dialogVisible1 = false
        })
      },
      onMailRow(row) {
        this.mail_array.push(row)
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
          this.$router.push({name: '项目发布'})
      }
    }
  }
</script>

<style scoped>
  .styleObject {
    visibility: hidden;
  }

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
