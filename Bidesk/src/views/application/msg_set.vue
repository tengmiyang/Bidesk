<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">

      <el-tab-pane label="短信发送设置" name="first">
        <el-table :data="tableData">
          <el-table-column prop="number" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="proname" label="事项">
          </el-table-column>
          <el-table-column prop="value" label="是否系统自动发送短信">
            <template slot-scope="scope">
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="agency" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--编辑弹出框-->
      <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <textarea name="" id="" cols="50" rows="10">{项目名称}项目，已发布补充公告，请您到Bidesk在线采购平台（www.bidesk.cn）查看，技术支持电话：4000522008
        </textarea>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [{
          number: '1',
          proname: '供应商上传电汇底单',
          value: true,
        }, {
          number: '2',
          proname: '澄清答疑',
          value: true,
        }, {
          number: '3',
          proname: '退还保证金',
          value: true,
        }, {
          number: '4',
          proname: '供应商上传保证金底单',
          value: true,
        }],
        radio: '1',
        value: true,
        activeName: 'first',
        dialogVisible: false,
//        tableData: Array(4).fill(item),
        tableData2: Array(4).fill(item1),
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    computed: {},
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .el-table .cell{
    text-align: center;
  }
  .sharename{
    padding-left: 980px;
  }
</style>


