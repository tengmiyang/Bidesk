<template>
  <div class="app-container">
    <el-row>
      <crumbs :resData="projects" v-if="projects"></crumbs>
    </el-row>
    <div v-if="!hasMorePack">
      <el-tabs type="border-card">
        <el-tab-pane :label="'潜在响应人'+'('+packLists[0].passSupplierList.length+')'">
          <el-table :data="packLists[0].passSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
            <el-table-column label="公告及文件下载情况" min-width="80" align="center">
              <el-table-column label="采购公告" min-width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.purNoticeDownMsg">{{scope.row.purNoticeDownMsg}}</span>
                  <span v-else>自报名 未下载</span>
                </template>
              </el-table-column>
              <el-table-column label="采购文件" min-width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.purDocDownMsg">{{scope.row.purDocDownMsg}}</span>
                  <span v-else>自报名 未下载</span>
                </template>
              </el-table-column>
              <el-table-column label="补充公告" min-width="80" align="center">
                <template
                  v-if="packLists[0].passSupplierList[0]&&packLists[0].passSupplierList[0].addNoticeDownMsgList">
                  <el-table-column v-for="(item,index) in packLists[0].passSupplierList[0].addNoticeDownMsgList.length"
                                   :prop="'addNoticeDownMsgList.'+index"
                                   :label="index+1+'次'" min-width="80"
                                   align="center" :key="index">
                  </el-table-column>
                </template>
              </el-table-column>
              <el-table-column label="澄清答疑" min-width="80" align="center">
                <template v-if="packLists[0].passSupplierList[0]&&packLists[0].passSupplierList[0].qaDownMsgList">
                  <el-table-column v-for="(item,index) in packLists[0].passSupplierList[0].qaDownMsgList.length"
                                   :prop="'qaDownMsgList.'+index"
                                   :label="index+1+'次'" min-width="80"
                                   align="center" :key="index">
                  </el-table-column>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="企业根据项目上传相关资料" min-width="80" align="center">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'潜在供应商'+'('+packLists[0].waitSupplierList.length+')'">
          <el-table :data="packLists[0].waitSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'退回供应商'+'('+packLists[0].backSupplierList.length+')'">
          <el-table :data="packLists[0].backSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <!--包件编号-->
      <el-row>
        <select-btn :packList="packLists" @transferIndex="getBtnIndex"
                    style="margin-bottom: 1%"></select-btn>
      </el-row>
      <!-- 全部>潜在响应人列表 -->
      <el-tabs type="border-card" v-show="handleBtnView === '全部'">
        <el-tab-pane :label="'潜在响应人'+'('+passSupplierListNum+')'">
          <el-table :data="passSupplierList" border style="width: 100%;margin-top:3%" v-loading="listLoading"
                    element-loading-text="加载中...">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="supplierCompany(scope.row)">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="supplierUser(scope.row)">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="packNum" label="包号" min-width="80" align="center">
              <template slot-scope="scope">
                <span>
              第<span v-for="(item, index) in scope.row.packNum" :key="index"><span>{{item}}</span><span
                  v-if='index!==scope.row.packNum.length-1'>,</span></span>包
            </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'潜在供应商'+'('+waitSupplierListNum+')'">
          <el-table :data="waitSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="packNum" label="包号" min-width="80" align="center">
              <template slot-scope="scope">
                <span>
              第<span v-for="(item, index) in scope.row.packNum" :key="index"><span>{{item}}</span><span
                  v-if='index!==scope.row.packNum.length-1'>,</span></span>包
            </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'退回供应商'+'('+backSupplierListNum+')'">
          <el-table :data="backSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="packId" label="包号" min-width="80" align="center">
              <template slot-scope="scope">
                <span>
              第<span v-for="(item, index) in scope.row.packNum" :key="index"><span>{{item}}</span><span
                  v-if='index!==scope.row.packNum.length-1'>,</span></span>包
            </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 第N包>分标签>列表 -->
      <el-tabs type="border-card" v-for="(item, index) in packLists" :key="index"
               v-if="btn_index === ('第' + (item.packNum) + '包')">
        <el-tab-pane :label="'潜在响应人'+'('+packLists[index].passSupplierList.length+')'">
          <el-table :data="packLists[index].passSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
            <el-table-column label="公告及文件下载情况" min-width="80" align="center">
              <el-table-column label="采购公告" min-width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.purNoticeDownMsg">{{scope.row.purNoticeDownMsg}}</span>
                  <span v-else>自报名 未下载</span>
                </template>
              </el-table-column>
              <el-table-column label="采购文件" min-width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.purDocDownMsg">{{scope.row.purDocDownMsg}}</span>
                  <span v-else>自报名 未下载</span>
                </template>
              </el-table-column>
              <el-table-column label="补充公告" min-width="80" align="center">
                <template v-if="item.passSupplierList[0]&&item.passSupplierList[0].addNoticeDownMsgList">
                  <el-table-column v-for="(item,index) in item.passSupplierList[0].addNoticeDownMsgList.length"
                                   :prop="'addNoticeDownMsgList.'+index"
                                   :label="index+1+'次'" min-width="80"
                                   align="center" :key="index">
                  </el-table-column>
                </template>
              </el-table-column>
              <el-table-column label="澄清答疑回复" min-width="80" align="center">
                <template v-if="item.passSupplierList[0]&&item.passSupplierList[0].qaDownMsgList">
                  <el-table-column v-for="(item,index) in item.passSupplierList[0].qaDownMsgList.length"
                                   :prop="'qaDownMsgList.'+index"
                                   :label="index+1+'次'" min-width="80"
                                   align="center" :key="index">
                  </el-table-column>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="企业根据项目上传相关资料" min-width="80" align="center">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'潜在供应商'+'('+packLists[index].waitSupplierList.length+')'">
          <el-table :data="packLists[index].waitSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'退回供应商'+'('+packLists[index].backSupplierList.length+')'">
          <el-table :data="packLists[index].backSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="80" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 点击供应商弹框内容 -->
    <el-dialog title="供应商详情" :visible.sync="dialogVisible" width="50%">
      <el-row style="border: 1px solid #e6ebf5; padding:2%; margin-top:1% ">

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>公司名称：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.supplierCompanyName}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>营业执照注册号：</span></el-col>
          <el-col :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.enterTime}}
            <el-button type="text" @click="getUrl(index)">查看图片</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>营业执照注册号：</span></el-col>
          <el-col :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.enterTime}}
            <el-button type="text" @click="getUrl(index)">查看图片</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>注册资金：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.supplierUserPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>企业类型：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.supplierUserPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>主营产品类目：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.supplierUserPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>公司所在地：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.supplierUserPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>主营业务：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierCompanyInfo.supplierUserPhone}}3
          </el-col>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击联系人弹框内容 -->
    <el-dialog title="联系人详情" :visible.sync="dialogLinkman" width="50%">
      <el-row style="border: 1px solid #e6ebf5; padding:2%; margin-top:1% ">

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>用户名：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserName}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>姓名：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserName}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>公司名称：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierCompanyName}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>办公电话：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>手机：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserPhone}}
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>电子信箱：</span></el-col>
          <el-col style="font-size:14px; padding:12px 0" :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserPhone}}
          </el-col>
        </el-row>


        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>联系人名片：</span></el-col>
          <el-col :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserName}}
            <el-button type="text" @click="getUrl(index)">查看图片</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col style="line-height:38px" :xs="24" :sm="20" :md="6" :lg="6"><span>法人代表授权函：</span></el-col>
          <el-col :xs="24" :sm="20" :md="18" :lg="18">
            {{supplierUserInfo.supplierUserName}}
            <el-button type="text" @click="getUrl(index)">查看图片</el-button>
          </el-col>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLinkman = false">关 闭</el-button>
        <el-button type="primary" @click="dialogLinkman = false">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
  import crumbs from '@/custom-components/project_manages/crumbs'
  import selectBtn from '@/custom-components/project_manages/selectBtn'
  import {deepClone, parseTime} from '@/utils'
  import {
    executeProjectEnter,
  } from '@/api/project'

  function NumAscSort(a, b) {
    return a - b;
  }
//对象数组按照某一对象的值来排序
  function compare(property) {
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2;     // 升序
    }
  }

  export default {
    components: {
      crumbs, selectBtn
    },
    created() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        currentProState: this.$router.routerType,
        listLoading: false,
        packLists: [],
        projects: {},
        waitSupplierList: [],
        waitSupplierLists: [],
        backSupplierList: [],
        passSupplierList: [],
        supplierCompanyInfo: {},
        supplierUserInfo: {},
        waitSupplierListNum: 0,
        backSupplierListNum: 0,
        passSupplierListNum: 0,
        checkAll: false,
        checkedCities: [],
        checkedPa: [],
        select_btn: '',
        dialogVisible: false,
        hasMorePack: false,
        dialogLinkman: false,
        form: {
          "supplierId": 0,
          "packIdList": []
        },
        btn_index: 0,
        handleBtnView: '全部',
      };
    },
    methods: {
      getList() {
//        alert(this.currentProState)
        this.listLoading = true
        executeProjectEnter(this.projectId, this.currentProState).then(response => {
          // console.log(response)
          this.packLists = response.data.packList
          this.hasMorePack = response.data.hasMorePack
          this.projects = response.data
          for (const item of this.packLists) {
            this.waitSupplierList = [...this.waitSupplierList, ...item.waitSupplierList]
            this.backSupplierList = [...this.backSupplierList, ...item.backSupplierList]
            this.passSupplierList = [...this.passSupplierList, ...item.passSupplierList]
          }
          this.waitSupplierLists = deepClone(this.waitSupplierList)
          this.passSupplierList=this.RemoveRepeat(this.passSupplierList)
          this.backSupplierList=this.RemoveRepeat(this.backSupplierList)
          this.waitSupplierList=this.RemoveRepeat(this.waitSupplierList)
          for (let i = 0; i < this.waitSupplierList.length; i++) {
            this.waitSupplierList[i].checkedCities = []
            this.waitSupplierList[i].checkAll = false
          }
          this.passSupplierListNum = this.passSupplierList.length
          this.backSupplierListNum = this.backSupplierList.length
          this.waitSupplierListNum = this.waitSupplierList.length
          if (this.hasMorePack === false) {
//            this.btnChange(0)
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 2000);
          this.listLoading = false
        })
      },
      getBtnIndex(index) {
        this.btn_index = index
        if (index === '全部') {
          this.waitSupplierList = []
          this.backSupplierList = []
          this.passSupplierList = []
          this.getList()
          this.handleBtnView = index
        } else {
          this.handleBtnView = ''
        }
      },
      getUrl(index) {
        this.dialogVisible = true;
        this.item_url = this.imgUrl[index].url;
      },
//代理商详情页面
      supplierCompany(row) {
        this.dialogVisible = true
        this.supplierCompanyInfo = row
      },
      //    联系人详情页面
      supplierUser(row) {
        this.dialogLinkman = true
        this.supplierUserInfo = row
      },
//      数组去重
      RemoveRepeat(arr) {
        this.checkedPa = []
        for (let i = 0; i < arr.length; i++) {
          for (let j = i+1; j < arr.length; j++) {
              if (arr[j].packNum!=='0' && arr[i].supplierUserId === arr[j].supplierUserId) {
                arr[i].packNum += ',' + arr[j].packNum
                arr[i].packNum = arr[i].packNum.split(',');
                arr[j].packNum='0'
                arr[i].packNum.sort(NumAscSort)
            }
          }
          if(arr[i].packNum!=='0'){
            this.checkedPa.push(arr[i])
          }
        }
        arr = this.checkedPa.sort(compare("supplierUserId"));
        return arr
      },
//      潜在供应商选择包件
      checkPackNum(row, item) {
//        // console.log(row.packId)
//        // console.log(item)
      }
    }
  };
</script>

<style scoped>

</style>
