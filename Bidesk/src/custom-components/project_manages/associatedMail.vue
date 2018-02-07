<template>
  <el-row>
    <el-form ref='form' :model='form' label-width='70px' :inline='true'>
      <el-col :span="8">
        <el-form-item label='主题'>
          <el-input v-model='form.name' style="width: 160%"></el-input>
        </el-form-item>
      </el-col>
      <!--<el-form-item label='联系人'>-->
      <!--<el-input></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label='时间'>
        <el-date-picker type='date' placeholder='选择日期' v-model='value1'></el-date-picker>
        <span style='text-align: center'>-</span>
        <el-date-picker type='date' placeholder='选择日期' v-model='value2'></el-date-picker>
        <el-button type='primary' icon='el-icon-search'>搜索</el-button>
      </el-form-item>
    </el-form>

    <!--tab-->
    <el-tabs type='border-card' v-model='activeName'>
      <el-tab-pane label='发件箱' name='first'>
        <el-table v-loading="listLoading"
                  element-loading-text="加载中..." :data='outboxList' border style='width: 100%'>
          <el-table-column type='index' label='序号' width='80' align='center'>
          </el-table-column>
          <el-table-column prop='subject' label='主题' min-width='100' align='center'>
          </el-table-column>
          <el-table-column prop='receiver' label='收件人' min-width='100' align='center'>
          </el-table-column>
          <el-table-column prop='time' label='时间' min-width='60' align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
          </el-table-column>
          <el-table-column label='操作' min-width='30' align='center'>
            <template slot-scope='scope'>
              <el-button v-if="scope.row.btnShow" @click='outClick(scope.row, scope.$index)' type='text'
                         size='small'>
                关联
              </el-button>
              <el-button v-else @click='outEdit(scope.row, scope.$index)' type='text' size='small'>取消关联
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label='收件箱' name='second'>
        <el-table v-loading="listLoading" element-loading-text="加载中..." :data='inboxList' border style='width: 100%'>
          <el-table-column type='index' label='序号' width='80' align='center'>
          </el-table-column>
          <el-table-column prop='subject' label='主题' min-width='100' align='center'>
          </el-table-column>
          <el-table-column prop='sender' label='发件人' min-width='100' align='center'>
          </el-table-column>
          <el-table-column prop='time' label='时间' min-width='60' align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
          </el-table-column>
          <el-table-column label='操作' min-width='30' align='center'>
            <template slot-scope='scope'>
              <el-button v-if="scope.row.btnShow" @click='inClick(scope.row, scope.$index)' type='text'
                         size='small'>
                关联
              </el-button>
              <el-button v-else @click='inEdit(scope.row, scope.$index)' type='text' size='small'>取消关联
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


    <!--&lt;!&ndash;分页&ndash;&gt;-->
    <!--<el-pagination style='text-align: right; margin-top: 1%' @size-change='handleSizeChange'-->
    <!--@current-change='handleCurrentChange'-->
    <!--:current-page.sync='currentPage2' :page-sizes='[5, 10, 15, 20]' :page-size='5'-->
    <!--layout='sizes, prev, pager, next' :total='15'>-->
    <!--</el-pagination>-->
  </el-row>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row';
  import {getAllMail} from '@/api/project'

  export default {
    components: {ElRow},
    mounted() {
      this.getList()
      this.handleRow = false
    },
    data() {
      return {
        activeName: 'first',
        value1: '',
        value2: '',
        currentPage2: 5,
        dialogVisible: false,
        listLoading: true,
//        --------------------收件箱
        inboxList: [],
//       --------------------发件箱
        outboxList: [],
        form: {
          name: '',
          date1: '',
          date2: ''
        }
      }
    },
    computed: {},
    methods: {
      getList() {
        getAllMail().then(response => {
          if (response.state) {
            this.listLoading = false
            this.inboxList = response.data.inboxList
            this.outboxList = response.data.outboxList
            this.inboxList.forEach((item, index) => {
              item.btnShow = true
              item.inbox = true
            })
            this.outboxList.forEach((item, index) => {
              item.btnShow = true
              item.outbox = true
            })
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      outClick(row, index) {
        row.btnShow = false
//        this.$set(this.outboxList, index, Object.assign({}, {...row}))
        this.$set(this.outboxList, index, row)  //当前行强制更新
        this.$emit('onMailRow', row)
      },
      outEdit(row, index) {
        row.btnShow = true
        this.$set(this.outboxList, index, row)  //当前行强制更新
        this.$emit('onMailRowEdit', row)
      },
      inClick(row, index) {
        row.btnShow = false
//        this.$set(this.outboxList, index, Object.assign({}, {...row}))
        this.$set(this.inboxList, index, row)  //当前行强制更新
        this.$emit('onMailRow', row)
      },
      inEdit(row, index) {
        row.btnShow = true
        this.$set(this.inboxList, index, row)  //当前行强制更新
        this.$emit('onMailRowEdit', row)
      },

      // handleSizeChange(val) {
      //   // console.log(`每页 ${val} 条`);
      // },
      // handleCurrentChange(val) {
      //   // console.log(`当前页: ${val}`);
      // }
    }
  };
</script>
<style>
  /*.cell .caret-wrapper {*/
  /*display: none !important;*/
  /*}*/
</style>
<style scoped>
  .el-form-item .el-form-item__label {
    width: 60px;
  }
</style>

