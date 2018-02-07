<template>
  <div class="project-container">
    <el-row>
      <crumbs :resData="projects" v-if="projects"></crumbs>
    </el-row>
    <div v-if="!listLoading&&!hasMorePack">
      <el-tabs type="border-card" v-loading="listLoading" element-loading-text="加载中...">
        <el-tab-pane :label="'潜在响应人'+'('+packLists[0].passSupplierList.length+')'">
          <el-table :data="packLists[0].passSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
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
              <el-table-column prop="purNoticeDownMsg" label="采购公告" min-width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.purNoticeDownMsg">{{scope.row.purNoticeDownMsg}}</span>
                  <span v-else>自报名 未下载</span>
                </template>
              </el-table-column>
              <el-table-column prop="purDocDownMsg" label="采购文件" min-width="80" align="center">
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
            <el-table-column prop="packId" label="企业根据项目上传相关资料" min-width="80" align="center">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column prop="packId" label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="Revoke(scope.row, scope.$index)" type="text" size="small">退回
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'潜在供应商'+'('+packLists[0].waitSupplierList.length+')'">
          <el-table :data="packLists[0].waitSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
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
            <el-table-column prop="Package" label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="AgreePack(scope.row, scope.$index)">同意</el-button>
                <el-button @click="sendBackPack(scope.row, scope.$index)" type="text" size="small">退回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'退回供应商'+'('+packLists[0].backSupplierList.length+')'">
          <el-table :data="packLists[0].backSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
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
            <el-table-column prop="Package" label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="recoveryPack(scope.row, scope.$index)" type="text" size="small">恢复
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <select-btn :packList="packLists" @transferIndex="getBtnIndex" style="margin-bottom: 1%"></select-btn>
      </el-row>
      <!-- 全部>潜在响应人列表 -->
      <el-tabs type="border-card" v-show="handleBtnView === '全部'">
        <el-tab-pane :label="'潜在响应人'+'('+passSupplierListNum+')'">
          <el-table :data="passSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="单位名称" min-width="20%" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="supplierCompany(scope.row)">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="supplierUser(scope.row)">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="15%" align="center">
            </el-table-column>
            <el-table-column prop="packNum" label="包号" min-width="40%" align="center" class="select">
              <template slot-scope="scope">
                <el-col>
                  <!--<el-checkbox class="select" v-model="scope.row.checkAll"-->
                               <!--@change="handleCheckAllChangepass(scope.row)">全选-->
                  <!--</el-checkbox>-->
                  <el-checkbox-group v-model="scope.row.checkedPacks">
                    <el-checkbox v-for="(item, index) in scope.row.packNum" :label="item" :key="item"
                                 @change="checkPackNum(scope.row)">第{{item}}包
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-button @click="recovery(scope.row,scope.$index)" type="text" size="small">退回</el-button>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'潜在供应商'+'('+waitSupplierListNum+')'">
          <el-table :data="waitSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="20%" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="15%" align="center">
            </el-table-column>
            <!--<el-table-column prop="packNum" label="包件" min-width="80" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--第<span v-for="(item, index) in scope.row.packNum" :key="index"> <span>{{item}}</span><span-->
            <!--v-if="index!==(scope.row.packNum.length-1)">,</span></span>包-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" min-width="40%" align="center">
              <template slot-scope="scope">
                <!--<el-checkbox class="select" v-model="scope.row.checkAll" @change="handleCheckAllChangewait(scope.row)">-->
                  <!--全选-->
                <!--</el-checkbox>-->
                <el-checkbox-group v-model="scope.row.checkedPacks">
                  <el-checkbox v-for="(item, index) in scope.row.packNum" :label="item" :key="item"
                               @change="checkPackNum(scope.row)">第{{item}}包
                  </el-checkbox>
                </el-checkbox-group>
                <el-button type="text" size="small" @click="Agree(scope.row,scope.$index)">同意</el-button>
                <el-button @click="sendBack(scope.row,scope.$index)" type="text" size="small">退回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'退回供应商'+'('+backSupplierListNum+')'">
          <el-table :data="backSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="20%" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierCompany(scope.row)" type="text">{{scope.row.supplierCompanyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserName" label="联系人" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button @click="supplierUser(scope.row)" type="text">{{scope.row.supplierUserName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="supplierUserPhone" label="手机号" min-width="15%" align="center">
            </el-table-column>
            <el-table-column prop="packNum" label="操作" min-width="40%" align="center">
              <template slot-scope="scope">
                <!--<el-checkbox class="select" v-model="scope.row.checkAll" @change="handleCheckAllChangeback(scope.row)">-->
                  <!--全选-->
                <!--</el-checkbox>-->
                <el-checkbox-group v-model="scope.row.checkedPacks">
                  <el-checkbox v-for="(item, index) in scope.row.packNum" :label="item" :key="item"
                               @change="checkPackNum(scope.row)">第{{item}}包
                  </el-checkbox>
                </el-checkbox-group>
                <el-button @click="recovery(scope.row,scope.$index)" type="text" size="small">恢复</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 第N包>分标签>列表 -->
      <el-tabs type="border-card" v-for="(item, index) in packLists" :key="index"
               v-if="btn_index === ('第' + (item.packNum) + '包')" v-loading="listLoading" element-loading-text="加载中...">
        <el-tab-pane :label="'潜在响应人'+'('+item.passSupplierList.length+')'">
          <el-table :data="item.passSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
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
            <el-table-column prop="packId" label="公告及文件下载情况" min-width="80" align="center">
              <el-table-column prop="purNoticeDownMsg" label="采购公告" min-width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.purNoticeDownMsg">{{scope.row.purNoticeDownMsg}}</span>
                  <span v-else>自报名 未下载</span>
                </template>
              </el-table-column>
              <el-table-column prop="purDocDownMsg" label="采购文件" min-width="80" align="center">
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
              <el-table-column label="澄清答疑" min-width="80" align="center">
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
            <el-table-column prop="packId" label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="Revoke(scope.row, scope.$index)" type="text" size="small">退回
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'潜在供应商'+'('+item.waitSupplierList.length+')'">
          <el-table :data="item.waitSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
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
            <el-table-column prop="Package" label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="AgreePack(scope.row, scope.$index)">同意</el-button>
                <el-button @click="sendBackPack(scope.row, scope.$index)" type="text" size="small">退回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="'退回供应商'+'('+item.backSupplierList.length+')'">
          <el-table :data="item.backSupplierList" border style="width: 100%;margin-top:3%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="supplierCompanyName" label="供应商" min-width="100" align="center">
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
            <el-table-column prop="Package" label="操作" min-width="80" align="center">
              <template slot-scope="scope">
                <el-button @click="recoveryPack(scope.row, scope.$index)" type="text" size="small">恢复
                </el-button>
              </template>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
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
        <el-button @click="dialogLinkman = false">取 消</el-button>
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
    executeProjectEnterPass,
    executeProjectEnterBack,
    executeProjectEnterWait
  } from '@/api/project'
//数组简单的排序
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
    computed: {},
    mounted() {
      this.getList()
    },
    data() {
      return {
        projectId: this.$store.getters.subProjectId,
        currentProState: this.$router.routerType,
        listLoading: true,
        hasMorePack: false,
        packLists: [],
        projects: {},
        waitSupplierList: [],
        waitSupplierLists: [],
        backSupplierList: [],
        backSupplierLists: [],
        passSupplierList: [],
        passSupplierLists: [],
        supplierCompanyInfo: {},
        supplierUserInfo: {},
        waitSupplierListNum: 0,
        backSupplierListNum: 0,
        passSupplierListNum: 0,
        checkAll: false,
        checkedPacks: [],
        checkedPa: [],
        default_table: true,
        dialogVisible: false,
        dialogLinkman: false,
        form: {
          "supplierId": 0,
          "packIdList": []
        },
        pack_btn: 0,
        pack_index: 0,
        btn_index: 0,
        handleBtnView: '全部',
      };
    },
    methods: {
      getBtnIndex(index) {
        this.form.packIdList = []
        this.btn_index = index
//        alert(this.pack_index)
        if (index === '全部') {
          this.btnAll()
          this.handleBtnView = index
        } else {
          this.handleBtnView = ''
          this.pack_index = index.substring(1, index.length - 1)
          for (let i = 0; i < this.packLists.length; i++) {
            if (parseInt(this.pack_index) === parseInt(this.packLists[i].packNum)) {
              this.pack_btn = i
            }
          }
//          this.btnChange(this.pack_btn)
          this.getList()
        }
      },
      getList() {
        this.listLoading = true
        executeProjectEnter(this.projectId, this.currentProState).then(response => {
          console.log('res', response)
          this.projects = response.data
          this.packLists = response.data.packList
          this.hasMorePack = response.data.hasMorePack
          if (response.data.hasMorePack === true) {
            for (const item of this.packLists) {
              this.waitSupplierList = [...this.waitSupplierList, ...item.waitSupplierList]
              this.backSupplierList = [...this.backSupplierList, ...item.backSupplierList]
              this.passSupplierList = [...this.passSupplierList, ...item.passSupplierList]
            }
            this.passSupplierList = this.RemoveRepeat(this.passSupplierList)
            this.backSupplierList = this.RemoveRepeat(this.backSupplierList)
            this.waitSupplierList = this.RemoveRepeat(this.waitSupplierList)
            this.passSupplierListNum = this.passSupplierList.length
            this.backSupplierListNum = this.backSupplierList.length
            this.waitSupplierListNum = this.waitSupplierList.length
          }
          else {
            this.btnChange(0)
          }
        })
        this.listLoading = false
      },
      getUrl(index) {
        this.dialogVisible = true;
        this.item_url = this.imgUrl[index].url;
      },
      btnChange(index) {
        this.packLists = []
//        this.packLists=deepClone(packLists)
        executeProjectEnter(this.projectId).then(response => {
          // console.log(response)
          this.packLists = response.data.packList
        })
      },
      btnAll() {
        this.default_table = true
        this.passSupplierList = []
        this.backSupplierList = []
        this.waitSupplierList = []
        this.getList()
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
//      同意
      Agree(row, index) {
        this.form.packIdList = []
        if (row.checkedPacks.length === 1 && typeof row.packNum === 'string') {
          this.form.packIdList.push(row.packId)
        }
        else {
          for (let j = 0; j < row.checkedPacks.length; j++) {
            for (let i = 0; i < row.packNum.length; i++) {
              if (row.checkedPacks[j] === row.packNum[i]) {
                this.form.packIdList.push(row.packId[i])
              }
            }
          }
        }
        this.form.supplierId = row.supplierUserId
        console.log(this.form)
        executeProjectEnterPass(this.form).then(response => {
          if (response.state === true) {
            this.form.packIdList = []
            this.form.supplierId = 0
            this.btnAll()
//            this.getList()
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      退回
      sendBack(row, index) {
        this.form.packIdList = []
        if (row.checkedPacks.length === 1 && typeof row.packNum === 'string') {
          this.form.packIdList.push(row.packId)
        }
        else {
          for (let j = 0; j < row.checkedPacks.length; j++) {
            for (let i = 0; i < row.packNum.length; i++) {
              if (row.checkedPacks[j] === row.packNum[i]) {
                this.form.packIdList.push(row.packId[i])
              }
            }
          }
        }
        this.form.supplierId = row.supplierUserId
        console.log(this.form)
        executeProjectEnterBack(this.form).then(response => {
          if (response.state === true) {
            this.form.packIdList = []
            this.form.supplierId = 0
            this.btnAll()
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      恢复
      recovery(row, index) {
        this.form.packIdList = []
        if (row.checkedPacks.length === 1 && typeof row.packNum === 'string') {
          this.form.packIdList.push(row.packId)
        }
        else {
          for (let j = 0; j < row.checkedPacks.length; j++) {
            for (let i = 0; i < row.packNum.length; i++) {
              if (row.checkedPacks[j] === row.packNum[i]) {
                this.form.packIdList.push(row.packId[i])
              }
            }
          }
        }
        this.form.supplierId = row.supplierUserId
        console.log(this.form)
        executeProjectEnterWait(this.form).then(response => {
          if (response.state === true) {
            this.form.packIdList = []
            this.form.supplierId = 0
            this.btnAll()
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      包件同意
      AgreePack(row, index) {
        this.form.packIdList = []
        this.form.supplierId = row.supplierUserId
        this.form.packIdList.push(row.packId)
        executeProjectEnterPass(this.form).then(response => {
          // console.log(response)
          if (response.state === true) {
            this.packLists[this.pack_btn].passSupplierList.push(row)
            this.packLists[this.pack_btn].waitSupplierList.splice(index, 1)
            this.form.packIdList = []
            this.form.supplierId = 0
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      包件退回
      sendBackPack(row, index) {
//        alert("退回")
        this.form.packIdList = []
        this.form.supplierId = row.supplierUserId
        this.form.packIdList.push(row.packId)
        executeProjectEnterBack(this.form).then(response => {
          if (response.state === true) {
            this.packLists[this.pack_btn].backSupplierList.push(row)
            this.packLists[this.pack_btn].waitSupplierList.splice(index, 1)
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      包件恢复
      recoveryPack(row, index) {
//        alert("恢复")
        this.form.packIdList = []
        this.form.supplierId = row.supplierUserId
        this.form.packIdList.push(row.packId)
        console.log(this.form.packIdList)
        console.log(row.packId)
        executeProjectEnterWait(this.form).then(response => {
          if (response.state === true) {
            this.packLists[this.pack_btn].waitSupplierList.push(row)
            this.packLists[this.pack_btn].backSupplierList.splice(index, 1)
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      包件撤销潜在响应
      Revoke(row, index) {
//        alert("撤销")
        this.form.supplierId = row.supplierUserId
        this.form.packIdList.push(row.packId)
        executeProjectEnterWait(this.form).then(response => {
          if (response.state === true) {
            this.packLists[this.pack_btn].waitSupplierList.push(row)
            this.packLists[this.pack_btn].passSupplierList.splice(index, 1)
          }
          else {
            this.$message({
              message: '操作失败，请重试',
              type: 'warning'
            });
          }
        })
      },
//      全选框
      handleCheckAllChangewait(row) {
        this.form.packIdList = []
        if (row.checkAll === true) {
          if (typeof row.packNum === 'string') {
            row.checkedPacks.push(row.packNum)
            this.form.packIdList = row.packId
          } else {
            row.checkedPacks = row.packNum
            for (let j = 0; j < row.packNum.length; j++) {
              for (let i = 0; i < this.waitSupplierLists.length; i++) {
                if (row.supplierUserId === this.waitSupplierLists[i].supplierUserId && row.packNum[j] === this.waitSupplierLists[i].packNum) {
                  this.form.packIdList.push(this.waitSupplierLists[i].packId)
                }
              }
            }
          }
        }
        else {
          row.checkedPacks = []
          this.form.packIdList = []
          this.form.supplierId = 0
        }
        this.waitSupplierList = deepClone(this.waitSupplierList)
        this.backSupplierList = deepClone(this.backSupplierList)
        this.passSupplierList = deepClone(this.passSupplierList)
      },
      handleCheckAllChangepass(row) {
        this.form.packIdList = []
        if (row.checkAll === true) {
          if (typeof row.packNum === 'string') {
            row.checkedPacks.push(row.packNum)
            this.form.packIdList = row.packId
          } else {
            row.checkedPacks = row.packNum
            for (let j = 0; j < row.packNum.length; j++) {
              for (let i = 0; i < this.passSupplierList.length; i++) {
                if (row.supplierUserId === this.passSupplierList[i].supplierUserId && row.packNum[j] === this.passSupplierList[i].packNum) {
                  this.form.packIdList.push(this.passSupplierList[i].packId)
                }
              }
            }
          }
        }
        else {
          row.checkedPacks = []
          this.form.packIdList = []
          this.form.supplierId = 0
        }
        console.log(this.form.packIdList)
        this.waitSupplierList = deepClone(this.waitSupplierList)
        this.backSupplierList = deepClone(this.backSupplierList)
        this.passSupplierList = deepClone(this.passSupplierList)
      },
      handleCheckAllChangeback(row) {
        this.form.packIdList = []
        if (row.checkAll === true) {
          if (typeof row.packNum === 'string') {
            row.checkedPacks.push(row.packNum)
            this.form.packIdList = row.packId
          } else {
            row.checkedPacks = row.packNum
            for (let j = 0; j < row.packNum.length; j++) {
              for (let i = 0; i < this.backSupplierList.length; i++) {
                if (row.supplierUserId === this.backSupplierList[i].supplierUserId && row.packNum[j] === this.backSupplierList[i].packNum) {
                  this.form.packIdList.push(this.backSupplierList[i].packId)
                }
              }
            }
          }
        }
        else {
          row.checkedPacks = []
          this.form.packIdList = []
          this.form.supplierId = 0
        }
        this.waitSupplierList = deepClone(this.waitSupplierList)
        this.backSupplierList = deepClone(this.backSupplierList)
        this.passSupplierList = deepClone(this.passSupplierList)
      },
//      数组去重
      RemoveRepeat(arr) {
        this.checkedPa = []
        for (let i = 0; i < arr.length; i++) {
          arr[i].checkedPacks = []
          arr[i].checkAll = false
        }
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[j].packNum !== '0' && arr[i].supplierUserId === arr[j].supplierUserId) {
              arr[i].packNum += ',' + arr[j].packNum
              arr[i].packNum = arr[i].packNum.split(',');
              arr[j].packNum = '0'
              arr[i].packId += ',' + arr[j].packId
              arr[i].packId = arr[i].packId.split(',');
              arr[i].packNum.sort(NumAscSort)
            }
          }
          if (arr[i].packNum !== '0') {
            this.checkedPa.push(arr[i])
          }
        }
        arr = this.checkedPa.sort(compare("supplierUserId"));
        return arr
      },
//      潜在供应商选择包件
      checkPackNum(row) {
        this.form.packIdList = []
        this.form.supplierId = row.supplierUserId
        row.checkAll = row.checkedPacks.length === row.packNum.length
        this.waitSupplierList = deepClone(this.waitSupplierList)
        this.backSupplierList = deepClone(this.backSupplierList)
        this.passSupplierList = deepClone(this.passSupplierList)
      },
    }
  };
</script>

<style scoped>
  .el-table .el-table__body {
    width: 100%;
  }

  /*.select {*/
  /*position: fixed;*/
  /*right: 28%;*/
  /*}*/
</style>
