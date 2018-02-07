<template>
  <div class="app-container">
    <ProjectSearch :tableData="tableData"></ProjectSearch>
    <el-table :data="tableData" border>
      <!--<el-table-column type="index" label="序号" width="50" align="center">-->
      <!--</el-table-column>-->
      <el-table-column prop="projectName" label="供应商"  align="center">
      </el-table-column>
      <el-table-column prop="projectNum" label="待付款项目"  align="center">
      </el-table-column>
      <el-table-column label="新增待付款项目" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.hasMorePack">--</span>
          <span v-else>
                  第<span v-for="(item, index) in scope.row.packList" :key="index"><span>{{item.packNum}}</span><span
            v-if='index!==scope.row.packList.length-1'>,</span></span>包
                </span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                   :total="1000">
    </el-pagination>

    <!--相关资料的弹出框-->
    <el-dialog title="相关资料" :visible.sync="dialogVisible" width="50%">
      <el-row class="attention">
        <el-col v-if="!hasMorePacks">
          <p>上传说明：多文件时请用压缩包。提交后将无法修改和删除，请确保资料的准确性。</p>
        </el-col>
        <el-col v-else>包件编号：
          <span v-for="(packs, index) in packData" :key="index">
            <el-button type="primary" plain size="small" @click="clickPackBtn(index)">第{{packs.packNum}}包</el-button>&nbsp;&nbsp;
          </span>
          <span v-if="morepack">
            <!--<span v-for="(pack, index) in packData" :key="index">-->
            <!--<el-checkbox v-model="checked1">第{{pack.packNum}}包</el-checkbox>&nbsp;&nbsp;-->
            <!--</span>-->
            <span v-for="(packs, index) in packData" :key="index" v-if="selectIndex === index">
              <packNumCheck :packList="packData" :current_tab="selectIndex"></packNumCheck>
                </span>
          </span>
          <p>上传说明：多文件时请用压缩包。提交后将无法修改和删除，请确保资料的准确性。</p>
          <p>相关资料：
            <Upload></Upload>
          </p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible = false">提 交</el-button>
  </span>
    </el-dialog>
    <el-dialog title="取消关注" :visible.sync="dialogVisible3" width="40%">
      <div class="attention" v-if="!cancelpacks">
        <h2>确定取消关注吗？</h2>
      </div>
      <div v-else>
        <el-table :data="cancelPackDatas" style="width: 100%" ref="multipleTable" tooltip-effect="dark"
                  @selection-change="cancelSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="packNum" label="包号" width="180" align="center">
            <template slot-scope="scope">
              第{{scope.row.packNum}}包
            </template>
          </el-table-column>
          <el-table-column prop="packName" label="包名" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">关 闭</el-button>
          <el-button type="primary" @click="cancelFollowPack">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="添加关注" :visible.sync="dialogVisible4" width="40%">
      <div v-if="addPackage">
        <h3>包件已全部添加，如需要添加包件请到包件管理中先添加相应包件</h3>
      </div>
      <div v-else>
        <el-table :data="canEnterPackLists" style="width: 100%" ref="multipleTable" tooltip-effect="dark"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="packNum" label="包号" width="180" align="center">
            <template slot-scope="scope">
              第{{scope.row.packNum}}包
            </template>
          </el-table-column>
          <el-table-column prop="packName" label="包名" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4 = false">关 闭</el-button>
    <el-button type="primary" @click="Determine">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import {supplierAlreadyEnter, supplierAlreadyEnterAdd, supplierAlreadyEnterCancel} from '@/api/project'
  import packNumCheck from '@/custom-components/project_manages/packNumCheck'
  import Upload from '@/custom-components/Upload/singleFile'
  import ProjectSearch from '@/custom-components/project_manages/ProjectSearch'

  export default {
    components: {
      packNumCheck, Upload, ProjectSearch
    },
    mounted() {
      this.getList()
    },
    data() {
      return {
        packData: [],
        packDatas: [],
        cancelPackDatas: [],
        canEnterPackLists: [],
        multipleSelection: [],
        cancelSelection: [],
        packIdList: [],
        tableData: [],
        hasMorePacks: null,
        morepack: true,
        addPackage: null,
        cancelpacks: null,
        showAddPack: false,
        dialogVisible: false,
        dialogVisible3: false,
        dialogVisible4: false,
        checked: false,
        checked1: false,
        flag: false,
        currentPage1: 5,
        selectIndex: 0,
        formSearch: {
          projectname: '',
          projectnum: ''
        }
      }
    },
    methods: {
      getList() {
        supplierAlreadyEnter().then(response => {
          // console.log(response);
          this.tableData = response.data;
        })
      },
//      相关资料按钮
      RelevantInfo(row) {
        this.dialogVisible = true
        this.packData = row.packList
        this.packDatas = this.packData
        this.canEnterPackLists = row.canEnterPackList
        this.hasMorePacks = row.hasMorePack
        if (this.packData.length <= 1) {
          this.morepack = false
        }
        else {
          this.morepack = true
        }
        // console.log(this.packData.length)
      },
//      取消关注按钮
      cancelFollow(row) {
        this.cancelPackDatas = row.packList
        this.cancelpacks = row.hasMorePack
        this.dialogVisible3 = true
        if (this.cancelpacks === false) {
          this.packIdList.push(this.cancelPackDatas[0].packId)
        }
      },
//      添加关注按钮
      addPack(row) {
        this.canEnterPackLists = row.canEnterPackList
        this.dialogVisible4 = true
        if (this.canEnterPackLists.length === 0) {
          this.addPackage = true
        }
        else {
          this.addPackage = false
        }
      },
//      选择包件
      handleSelectionChange(val) {
        this.multipleSelection = val;
        var arr = []
        for (let i = 0; i < val.length; i++) {
          var packId = val[i].packId;
          arr.push(packId)
          this.packIdList = [...new Set(arr)]
        }
        if (val.length === 0) {
          this.packIdList = []
        }
        // console.log(this.packIdList)
      },
//      取消关注选择包件
      cancelSelectionChange(val) {
        this.cancelSelection = val;
        var arr = []
        for (let i = 0; i < val.length; i++) {
          var packId = val[i].packId;
          arr.push(packId)
          this.packIdList = [...new Set(arr)]
        }
        if (val.length === 0) {
          this.packIdList = []
        }
//         // console.log(this.packIdList)
      },
//      提交添加关注
      Determine() {
        this.dialogVisible4 = false
        supplierAlreadyEnterAdd(this.packIdList).then(response => {
          // console.log(response);
          if (response.state === true) {
            this.getList()
            this.packIdList = []
          }
        })
      },
//      提交取消关注
      cancelFollowPack() {
        this.dialogVisible3 = false
        // console.log(this.packIdList)
        supplierAlreadyEnterCancel(this.packIdList).then(response => {
          // console.log(response);
          if (response.state === true) {
            this.getList()
            this.packIdList = []
          }
        })
      },
//      搜索项目
      searchproject() {
      },
      clickPackBtn(index) {
        this.selectIndex = index
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>
  /*.attention {*/
  /*text-align: left;*/
  /*}*/

  .el-main {
    padding: 15px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .el-pagination {
    padding: 1% 0;
    text-align: right;
  }
</style>
