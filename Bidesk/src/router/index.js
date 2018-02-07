import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'
import FixedLayout from '../views/layout/FixedLayout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/register', component: _import('login/register'), hidden: true},
  {path: '/password', component: _import('login/password'), hidden: true},
  {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  {path: '/404', component: _import('errorPage/404'), hidden: true},
  {path: '/401', component: _import('errorPage/401'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{path: 'dashboard', component: _import('dashboard/index')}]
  },
  // {
  //   path: '/introduction',
  //   component: Layout,
  //   redirect: '/introduction/index',
  //   icon: 'people',
  //   noDropdown: true,
  //   children: [{path: 'index', component: _import('introduction/index'), name: '简述'}]
  // },
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
// 用户所有角色列表
const ROLES = ['purchaser', 'purchaserAdmin', 'agency', 'agencyAdmin', 'supplier', 'supplierAdmin', 'normalUser']
// 项目所有状态值列表
const STATUS = ['prepare', 'execute', 'expire', 'end', 'exception']
//方便处理权限，为数组对象增加removeByValue的方法
Array.prototype.removeByValue = function(...theArgs) {//esLint推荐用 ...theArgs(剩余参数)取代arguments(所有参数)
  const roles = [...this] //splice()会改变原数组，这里首先进行深拷
  for (let i = 0; i < theArgs.length; i++) {
    for (let j = 0; j < roles.length; j++) {
      if (roles[j] === theArgs[i]) {
        roles.splice(j, 1)
        break
      }
    }
  }
  return roles
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 返回符合用户角色权限的二级固定路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 二级固定路由控制
export const FIXED_ROUTERS = [
  {
    path: '/project_manage/operate',
    component: FixedLayout,
    redirect: '/project_manage/operate/project_oper',
    name: '操作功能',
    icon: 'component',
    children: [
      {path: 'project_oper', component: _import('project_manage/operate/project_oper'), name: '项目操作', meta: {role: ['agency'], agency: ['prepare']}},
      {path: 'publish', component: _import('project_manage/operate/publish'), name: '项目发布', hidden:true, },
      // {path: 'publish/:publishProjectId', component: _import('project_manage/operate/publish'), name: '项目发布', props: true, hidden:true, },
      {path: 'publish_notice', component: _import('project_manage/operate/publish_notice'), name: '发布采购公告', meta: {role: ['agency'], agency: ['execute']}},
      {path: 'publish_doc', component: _import('project_manage/operate/publish_doc'), name: '上传采购文件', meta: {role: ['agency'], agency: ['execute']}},
      {path: 'publish_add_notice', component: _import('project_manage/operate/publish_add_notice'), name: '发布补充公告', meta: {role: ['agency'], agency: ['execute']}},
      {path: 'publish_clarificatdoc', component: _import('project_manage/operate/publish_clarificatdoc'), name: '上传澄清答疑回复文件', meta: {role: ['agency'], agency: ['execute']}},
      {path: 'upload_bidopening', component: _import('project_manage/operate/upload_bidopening'), name: '上传开标记录', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'upload_reviewprocess', component: _import('project_manage/operate/upload_reviewprocess'), name: '上传评审过程文件', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'release_results', component: _import('project_manage/operate/release_results'), name: '发布采购结果公告', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'input_results', component: _import('project_manage/operate/input_results'), name: '录入采购结果', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'upload_resultsdoc', component: _import('project_manage/operate/upload_resultsdoc'), name: '上传采购结果通知书', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'upload_question', component: _import('project_manage/operate/upload_question'), name: '上传质疑处理', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'delay', component: _import('project_manage/operate/delay'), name: '延期', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'upload_reconnaissance', component: _import('project_manage/operate/upload_reconnaissance'), name: '代采购人转发文件', meta: {role: ['agency'], agency: ['expire']}},
      {path: 'add-mailassociation', component: _import('project_manage/operate/add-mailassociation'), name: '补充邮件关联', hidden:true, meta: {role: ['agency'], agency: ['expire']}},
      {path: 'supplier_msg', component: _import('project_manage/operate/supplier_msg'), name: '供应商通知', meta: {role: ['agency'], agency: ['execute', 'expire']}},
      {path: 'supplier_enter', component: _import('project_manage/operate/supplier_enter'), name: '供应商报名情况 ', meta: {role: ['agency'], agency: ['execute']}},
      {path: 'pack_manage', component: _import('project_manage/operate/pack_manage'), name: '包件管理', meta: {role: ['agency'], agency: ['execute', 'expire']}},
      {path: 'stop_project', component: _import('project_manage/operate/stop_project'), name: '中止项目', meta: {agency: ['prepare', 'execute', 'expire'], purchaser: ['prepare', 'execute', 'expire']}},
      {path: 'auth_manage', component: _import('project_manage/operate/auth_manage'), name: '授权管理', meta: {agency: ['prepare', 'execute', 'expire'], purchaser: ['prepare', 'execute', 'expire']}},
      {path: 'run_project', component: _import('project_manage/operate/run_project'), name: '办结项目', meta: {role: ['purchaser'], purchaser: ['expire']}},
    ]
  },
  {
    path: '/project_manage/operate',
    component: FixedLayout,
    redirect: '/project_manage/operate/entrust_info',
    name: '文件汇总',
    icon: 'component',
    children: [
      {path: 'abnormal_details', component: _import('project_manage/operate/abnormal_details'), name: '异常详情', meta: {agency: ['exception'], purchaser: ['exception']}},
      {path: 'procurement_notice', component: _import('project_manage/operate/procurement_notice'), name: '采购公告', meta: {agency: ['execute', 'expire', 'end', 'exception'], purchaser: ['execute', 'expire', 'end', 'exception']}},
      {path: 'procurement_files', component: _import('project_manage/operate/procurement_files'), name: '采购文件', meta: {agency: ['execute', 'expire', 'end', 'exception'], purchaser: ['execute', 'expire', 'end', 'exception']}},
      {path: 'correcti_notice', component: _import('project_manage/operate/correcti_notice'), name: '补充公告', meta: {agency: ['execute', 'expire', 'end', 'exception'], purchaser: ['execute', 'expire', 'end', 'exception']}},
      {path: 'clarification_doc', component: _import('project_manage/operate/clarification_doc'), name: '澄清答疑回复文件', meta: {agency: ['execute', 'expire', 'end', 'exception'], purchaser: ['execute', 'expire', 'end', 'exception']}},
      {path: 'entrust_info', component: _import('project_manage/operate/entrust_info'), name: '供应商报名情况', meta: {agency: ['execute', 'expire', 'end', 'exception'], purchaser: ['execute', 'expire', 'end', 'exception']}},
      {path: 'opening_record', component: _import('project_manage/operate/opening_record'), name: '开标记录', meta: {agency: ['end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'reviewprocess_doc', component: _import('project_manage/operate/reviewprocess_doc'), name: '评审过程文件', meta: {agency: ['end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'results_notice', component: _import('project_manage/operate/results_notice'), name: '采购结果公告', meta: {agency: ['expire', 'end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'results', component: _import('project_manage/operate/results'), name: '采购结果', meta: {agency: ['expire', 'end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'results_doc', component: _import('project_manage/operate/results_doc'), name: '采购结果通知书', meta: {agency: ['expire', 'end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'query_processing', component: _import('project_manage/operate/query_processing'), name: '质疑处理', meta: {agency: ['expire', 'end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'reconnaissance_clarify', component: _import('project_manage/operate/reconnaissance_clarify'), name: '踏勘澄清文件', meta: {agency: ['expire', 'end', 'exception'], purchaser: ['expire', 'end', 'exception']}},
      {path: 'entrustment_information', component: _import('project_manage/operate/entrustment_information'), name: '委托信息', meta: {agency: STATUS, purchaser: STATUS}},
      {path: 'mail_record', component: _import('project_manage/operate/mail_record'), name: '来往记录', meta: {agency: STATUS, purchaser: STATUS}},
      {path: 'handle_situation', component: _import('project_manage/operate/handle_situation'), name: '办结情况', meta: {agency: ['end', 'exception'], purchaser: ['end', 'exception']}},
    ]
  },
]

// export const FIXED_ROUTERS = purchaserRouterMap
//   {
//   purchaser: purchaserRouterMap,
//   agency: purchaserRouterMap,
//   // supplier: purchaserRouterMap
// }

//一级菜单权限路由控制
export const asyncRouterMap = [
  {
    path: '/project_manage',
    component: Layout,
    redirect: '/project_manage/execute_project',
    name: '项目管理',
    icon: 'component',
    children: [
      {path: 'new_project', component: _import('project_manage/new_project'), name: '采购立项 ', meta: {role: ['purchaser', 'purchaserAdmin']}},
      {path: 'accept_project', component: _import('project_manage/accept_project'), name: '待受理项目 ', meta: {role: ROLES.removeByValue('purchaser', 'purchaserAdmin', 'supplier', 'supplierAdmin')}},
      {path: 'prepare_project', component: _import('project_manage/prepare_project'), name: '前期准备项目', meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')}},
      {path: 'execute_project', component: _import('project_manage/execute_project'), name: '正在执行项目', meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')}},
      {path: 'expire_project', component: _import('project_manage/expire_project'), name: '已到期项目', meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')}},
      {path: 'end_project', component: _import('project_manage/end_project'), name: '已完结项目', meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')}},
      {path: 'exception_project', component: _import('project_manage/exception_project'), name: '异常项目', meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')}},
      {path: 'authorize_project', component: _import('project_manage/authorize_project'), name: '被授权项目', meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')}},
      {path: 'supplier_search_project', component: _import('project_manage/supplier_search_project'), name: '项目搜索', meta: {role: ['supplier', 'supplierAdmin']}},
      {path: 'supplier_enter_project', component: _import('project_manage/supplier_enter_project'), name: '已关注项目', meta: {role: ['supplier', 'supplierAdmin']}},
      {path: 'supplier_pay_project', component: _import('project_manage/supplier_pay_project'), name: '待付款项目', meta: {role: ['supplier', 'supplierAdmin']}},
      {path: 'supplier_execute_project', component: _import('project_manage/supplier_execute_project'), name: '正在执行项目', meta: {role: ['supplier', 'supplierAdmin']}},
      {path: 'supplier_download_doc', component: _import('project_manage/supplier_download_doc'), name: '后期相关文件下载', meta: {role: ['supplier', 'supplierAdmin']}}
    ]
  },
  {
    path: '/mail_manage',
    component: Layout,
    redirect: '/mail_manage/write',
    name: '邮件管理',
    icon: 'component',
    meta: {role: ['agency', 'agencyAdmin']},
    children: [
      {path: 'write', component: _import('mail_manage/write'), name: '写信 '},
      {path: 'inbox', component: _import('mail_manage/inbox'), name: '收件箱 '},
      {path: 'outbox', component: _import('mail_manage/outbox'), name: '发件箱'},
      {path: 'draft', component: _import('mail_manage/draft'), name: '草稿箱'},
      {path: 'setting', component: _import('mail_manage/setting'), name: '帐号绑定'}
    ]
  },
  {
    path: '/library_manage',
    component: Layout,
    redirect: '/library_manage/agency_lib',
    name: '库管理',
    icon: 'component',
    meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')},
    children: [
      {path: 'agency_lib', component: _import('library_manage/agency_lib'), name: '采购代理库', meta: {role: ROLES.removeByValue('agency', 'agencyAdmin')}},
      {path: 'supplier_lib', component: _import('library_manage/supplier_lib'), name: '供应商库'}
    ]
  },
  {
    path: '/application',
    component: Layout,
    redirect: '/application/schedule',
    name: '辅助功能',
    icon: 'component',
    meta: {role: ROLES.removeByValue('supplier', 'supplierAdmin')},
    children: [
      {path: 'schedule', component: _import('application/schedule'), name: '日程安排 '},
      {path: 'share_set', component: _import('application/share_set'), name: '共享设置 '},
      {path: 'template_set', component: _import('application/template_set'), name: '委托函模板', meta: {role: ROLES.removeByValue('purchaser', 'agency', 'agencyAdmin')}}
    ]
  },
  {
    path: '/sys_manage',
    component: Layout,
    redirect: '/sys_manage/company_staff',
    name: '系统管理',
    icon: 'component',
    children: [
      {path: 'company_staff', component: _import('sys_manage/company_staff'), name: '单位人员管理 ', meta: {role: ROLES.removeByValue('purchaser', 'agency', 'supplier')}},
      {path: 'company_info', component: _import('sys_manage/company_info'), name: '单位信息', meta: {role: ROLES.removeByValue('purchaser', 'agency', 'supplier')}},
      {path: 'personal_info', component: _import('sys_manage/personal_info'), name: '个人信息'}
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   name: '权限测试',
  //   icon: 'lock',
  //   meta: {role: ['admin']},
  //   noDropdown: true,
  //   children: [{path: 'index', component: _import('permission/index'), name: '权限测试页', meta: {role: ['admin']}}]
  // },
  // {
  //   path: '/demo',
  //   component: Layout,
  //   redirect: '/demo/caigou_gonggao',
  //   name: '小样',
  //   icon: 'lock',
  //   children: [
  //     {path: 'caigou_gonggao', component: _import('demo/caigou_gonggao'), name: '采购公告 ', meta: {role: ROLES.removeByValue('purchaser', 'agency', 'supplier')}},
  //     // {path: 'caigou_gonggao', component: _import('demo/caigou_gonggao'), name: '单位信息', meta: {role: ROLES.removeByValue('purchaser', 'agency', 'supplier')}},
  //     {path: 'caigou_gonggao', component: _import('demo/caigou_gonggao'), name: '个个人信息'}
  //   ]
  // },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   icon: 'icon',
  //   noDropdown: true,
  //   children: [{path: 'index', component: _import('svg-icons/index'), name: 'icons'}]
  // },
  // {
  //   path: '/components',
  //   component: Layout,
  //   redirect: '/components/index',
  //   name: '组件',
  //   icon: 'icon',
  //   children: [
  //     {path: 'index', component: _import('components/index'), name: '介绍 '},
  //     {path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器'},
  //     {path: 'markdown', component: _import('components/markdown'), name: 'Markdown'},
  //     {path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器'},
  //     {path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽'},
  //     {path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane'},
  //     {path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传'},
  //     {path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone'},
  //     {path: 'sticky', component: _import('components/sticky'), name: 'Sticky'},
  //     {path: 'countto', component: _import('components/countTo'), name: 'CountTo'},
  //     {path: 'mixin', component: _import('components/mixin'), name: '小组件'},
  //     {path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部'},
  //     {path: 'associated_file', component: _import('components/associated_file'), name: '关联邮件'}
  //     // {path: 'associatedMail', component: _import('components/associatedMail'), name: '关联邮件'}
  //   ]
  // },
  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: '/charts/index',
  //   name: '图表',
  //   icon: 'icon',
  //   children: [
  //     {path: 'index', component: _import('charts/index'), name: '介绍'},
  //     {path: 'keyboard', component: _import('charts/keyboard'), name: '键盘图表'},
  //     {path: 'keyboard2', component: _import('charts/keyboard2'), name: '键盘图表2'},
  //     {path: 'line', component: _import('charts/line'), name: '折线图'},
  //     {path: 'mixchart', component: _import('charts/mixChart'), name: '混合图表'}
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '综合实例',
  //   icon: 'example',
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('example/table/index'),
  //       redirect: '/example/table/table',
  //       name: 'Table',
  //       icon: 'table',
  //       children: [
  //         {path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '动态table'},
  //         {path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table'},
  //         {path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑'},
  //         {path: 'table', component: _import('example/table/table'), name: '综合table'}
  //       ]
  //     },
  //     {path: 'form/edit', icon: 'form', component: _import('example/form'), name: '编辑Form', meta: {isEdit: true}},
  //     {path: 'form/create', icon: 'form', component: _import('example/form'), name: '创建Form'},
  //     {path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab'}
  //   ]
  // },
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '错误页面',
  //   icon: '404',
  //   children: [
  //     {path: '401', component: _import('errorPage/401'), name: '401'},
  //     {path: '404', component: _import('errorPage/404'), name: '404'}
  //   ]
  // },
  // {
  //   path: '/errlog',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errlog',
  //   icon: 'bug',
  //   noDropdown: true,
  //   children: [{path: 'log', component: _import('errlog/index'), name: '错误日志'}]
  // },
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/download',
  //   name: 'excel',
  //   icon: 'excel',
  //   children: [
  //     {path: 'download', component: _import('excel/index'), name: 'export excel'},
  //     {path: 'download2', component: _import('excel/selectExcel'), name: 'export selected'},
  //     {path: 'upload', component: _import('excel/uploadExcel'), name: 'upload excel'}
  //   ]
  // },
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   name: 'zip',
  //   icon: 'zip',
  //   children: [
  //     {path: 'download', component: _import('zip/index'), name: 'export zip'}
  //   ]
  // },
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'theme',
  //   icon: 'theme',
  //   noDropdown: true,
  //   children: [{path: 'index', component: _import('theme/index'), name: '换肤'}]
  // },
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'clipboard',
  //   noDropdown: true,
  //   children: [{path: 'index', component: _import('clipboard/index'), name: 'clipboard'}]
  // },
  {path: '*', redirect: '/404', hidden: true}
]
