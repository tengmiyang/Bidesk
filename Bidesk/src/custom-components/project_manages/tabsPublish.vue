<template>
  <div>
    <el-form-item label="包件情况">
      <!--<el-radio :disabled="all_packs.length > 0" v-model="radio" :label="1">无包-->
      <el-radio v-model="radio" @click.native="clickNoPack" :label="1">无包
      </el-radio>
      <el-radio @change="dialogVisible = true" v-model="radio" :label="2">有包</el-radio>
      <el-button v-show="all_packs.length > 0" style="padding-left: 2%" @click="dialogVisible = true">修改包件
      </el-button>
    </el-form-item>

    <el-tabs v-if="all_packs.length" @tab-click="tabChange" type="card">
      <el-tab-pane v-for="(item, index) in all_packs"
                   :disabled="item.tabDisabled"
                   :key="index" :label="'第' + (index+1) + '包'">
        <el-row>
          <el-col :span="24">
            <el-form-item v-if="all_packs.length" label="同时作为以下包件采购公告" label-width="200px" class="long-label">
              <PacksGroup :all_packs="all_packs" :current_tab="activeTab"></PacksGroup>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告名称">
              <el-input v-model="item.notice.noticeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告内容">
              <tinyMce v-model="item.notice.noticeContent"></tinyMce>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告附件">
              <Upload v-model="item.notice.fileToken"></Upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :before-close="packListClose" title="添加包件" :visible.sync="dialogVisible" width="80%">
      <el-form-item label="包件名称：">
        <el-row>
          <el-col :span="20">
            <el-input v-model="new_pack_name"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="packListAdd">添加</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-table border :data="temp_packs">
        <el-table-column label="包号" min-width="50" align="center">
          <span slot-scope="scope">第{{(scope.$index + 1)}}包</span>
        </el-table-column>
        <el-table-column prop="packName" label="包名" min-width="300" align="center">
        </el-table-column>
        <el-table-column prop="" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="moveUp(scope.$index)"
                       :disabled="scope.$index === 0">上移
            </el-button>
            <el-button size="small" @click="moveDown(scope.$index)"
                       :disabled="scope.$index === temp_packs.length-1">下移
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index)"
                       :disabled="scope.$index<all_packs.length">移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-show="temp_packs[0]" style="margin-top: 22px; margin-left: 10%;">
        <el-col align="center" :span="24">
          <el-button @click="packListReset">重 置</el-button>
          <el-button type="primary" @click="packListConfirm">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import tinyMce from '@/custom-components/Tinymce'
  import Upload from '@/custom-components/Upload/singleFile'
  import PacksGroup from '@/custom-components/project_manages/PacksGroup';

  export default {
    props: ['resProject'],
    components: {
      PacksGroup,
      tinyMce,
      Upload
    },
    data() {
      return {
        all_packs: [],
        temp_packs: [],
        radio: 1,
        new_pack_name: '',
        dialogVisible: false,
        activeTab: 0
      };
    },
    watch: {
      all_packs: {
        handler(val) {
//          // console.log(val)
          this.$emit('input', val)
        },
        deep: true
      },
    },
    methods: {
      packListAdd() {
        const data = {
          packName: this.new_pack_name,
          checked: false,
          disabled: false,
          tabDisabled: false,
          show: true,
          relatedList: ['第' + (this.temp_packs.length + 1) + '包'],
          notice: {
            noticeContent: '',
            noticeName: '',
            fileToken: ''
          },
          packNameList: [this.new_pack_name]
        }
        if (this.new_pack_name === '') {
          this.$message({
            message: '包名为空，请检查',
            type: 'warning'
          });
        }else if (this.temp_packs.some(item => item.packName === this.new_pack_name)) {
          this.$message({
            message: '该包名已经存在，请检查',
            type: 'warning'
          });
        } else {
          this.temp_packs.push(data)
          this.new_pack_name = ''
        }
      },
      handleDelete(index) {
        this.temp_packs.splice(index, 1)
      },
      packListClose() {
        this.radio = 1
        this.dialogVisible = false
      },
      clickNoPack() {
        // this.temp_packs = []
        this.all_packs = []
      },
      swapItems(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      },
      moveUp(index) {
        if (index === 0) {
          return;
        }
        //在上一项插入该项
        this.temp_packs.splice(index - 1, 0, (this.temp_packs[index]));
        //删除后一项
        this.temp_packs.splice(index + 1, 1);
      },
      moveDown(index) {
        if (index === this.temp_packs.length - 1) {
          return;
        }
        //在下一项插入该项
        this.temp_packs.splice(index + 2, 0, (this.temp_packs[index]));
        // 删除前一项
        this.temp_packs.splice(index, 1);
      },
      packListReset() {
        this.temp_packs = []
        this.all_packs = []
      },
      packListConfirm() {
        this.dialogVisible = false
        // 顺序改变后要把relatedList修改下
        this.temp_packs.forEach((item, index) => {
          item.relatedList = ['第' + (index + 1) + '包']
          item.notice.noticeName = this.resProject.projectName + '采购公告'
        })
        this.all_packs = [...this.temp_packs]
      },
      tabChange(tab) {
        this.activeTab = tab.index
      }
    }
  }
</script>

<!--<style scoped>-->
<!--.long-label .el-form-item__label{-->
<!--line-height: 18px;-->
<!--}-->
<!--</style>-->

<style scoped>
  .el-tabs__header {
    margin-left: 100px;
  }

  .long-label .el-form-item__label {
    line-height: 20px;
  }
</style>
