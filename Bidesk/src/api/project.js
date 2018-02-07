import fetch from '@/utils/fetch'

//邮件关联
export function getAllMail() {
  return fetch({
    url: '/MailController/api/getAllMail.htm',
    method: 'post'
  })
}

export function prepareProject(form) {
  const data = {
    ...form
  }
  return fetch({
    url: '/ProjectController/api/prepareProject.htm',
    method: 'post',
    data
  })
}

//待受理项目
export function acceptProject(form) {
  const data = {
    ...form
  }
  return fetch({
    url: '/ProjectController/api/acceptProject.htm',
    method: 'post',
    data
  })
}

//代理人-正在执行列表数据
export function executeProject(form) {
  const data = {
    ...form
  }
  return fetch({
      url: '/ProjectController/api/executeProject.htm',
      method: 'post',
      data
    }
  )
}

//已到期项目
export function expireProject(form) {
  const data = {
    ...form
  }
  return fetch({
      url: '/ProjectController/api/expireProject.htm',
      method: 'post',
      data
    }
  )
}

//已完结项目
export function endProject() {
  return fetch({
      url: '/ProjectController/api/endProject.htm',
      method: 'post'
    }
  )
}

//代理人-正在执行-发布公告
export function executeProjectNotice(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/executeProjectNotice.htm',
    method: 'post',
    data
  })
}

//  代理人-正在执行-补充公告
export function executeProjectAddNotice(projectId) {
  const data = {
    projectId
  }
  return fetch({
      url: '/ProjectController/api/executeProjectAddNotice.htm',
      method: 'post',
      data
    }
  )
}

//  代理人-正在执行-补充公告-提交
export function executeProjectSaveAddNotice(notice, packIdList) {
  const data = {
    notice, packIdList
  }
  return fetch({
      url: '/ProjectController/api/executeProjectSaveAddNotice.htm',
      method: 'post',
      data
    }
  )
}

//  代理人-正在执行-包件管理
export function executeProjectPackList(projectId) {
  const data = {
    projectId
  }
  return fetch({
      url: '/ProjectController/api/executeProjectPackList.htm',
      method: 'post',
      data
    }
  )
}

//  代理人-正在执行-包件管理--提交包名
export function executeProjectSaveNewPack(form) {
  const data = {
    ...form
  }
  return fetch({
      url: '/ProjectController/api/executeProjectSaveNewPack.htm',
      method: 'post',
      data
    }
  )
}

//代理人-操作项目-发布公告-点击包件获取详情
export function getNotice(packId) {
  const data = {
    packId
  }
  return fetch({
      url: '/ProjectController/api/getNotice.htm',
      method: 'post',
      data
    }
  )
}

//代理人-操作项目-文件汇总-补充公告
export function executeProjectAddNoticeList(projectId) {
  const data = {
    projectId
  }
  return fetch({
      url: '/ProjectController/api/executeProjectAddNoticeList.htm',
      method: 'post',
      data
    }
  )
}

//代理人-前期准备-项目操作
export function prepareProjectOperate(projectId) {
  const data = {
    projectId
  }
  return fetch({
      url: '/ProjectController/api/prepareProjectOperate.htm',
      method: 'post',
      data
    }
  )
}

//项目操作提交数据
export function newProjectSave(projectId, projectName, projectNum) {
  const data = {
    projectId, projectName, projectNum
  }
  return fetch({
    url: '/ProjectController/api/prepareProjectSave.htm',
    method: 'post',
    data
  })
}

//项目操作修改数据
export function newProjectUpdate(projectId, projectName, projectNum) {
  const data = {
    projectId, projectName, projectNum
  }
  return fetch({
    url: '/ProjectController/api/prepareProjectUpdate.htm',
    method: 'post',
    data
  })
}

//项目操作删除数据
export function newProjectDelete(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/prepareProjectDel.htm',
    method: 'post',
    data
  })
}

//終止郵件
export function prepareProjectStop(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/prepareProjectStop.htm',
    method: 'post',
    data
  })
}

//終止郵件-提交
export function prepareProjectSaveStop(form) {
  const data = {...form}
  return fetch({
    url: '/ProjectController/api/prepareProjectSaveStop.htm',
    method: 'post',
    data
  })
}

//采购立项提交数据
export function newSetProject(coreProject, coreProjectEntrust) {
  const data = {
    coreProject, coreProjectEntrust
  }
  return fetch({
    url: '/ProjectController/api/saveProject.htm',
    method: 'post',
    data
  })
}

//采购立项请求数据
export function newProject() {
  return fetch({
    url: '/ProjectController/api/newProject.htm',
    method: 'post',
  })
}

//待受理的接受的请求接口
export function acceptProjectYes(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/acceptProjectYes.htm',
    method: 'post',
    data
  })
}

//待受理的不接受的请求接口
export function acceptProjectNo(projectId, noAcceptReason) {
  const data = {
    projectId, noAcceptReason
  }
  return fetch({
    url: '/ProjectController/api/acceptProjectNo.htm',
    method: 'post',
    data
  })
}

//上传采购文件
export function executeProjectDoc(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/executeProjectDoc.htm',
    method: 'post',
    data
  })
}

//关联邮件
export function prepareProjectEmail(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/prepareProjectEmail.htm',
    method: 'post',
    data
  })
}

//关联邮件-初始化发布页面
export function prepareProjectInitPublish(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/prepareProjectInitPublish.htm',
    method: 'post',
    data
  })
}

//关联邮件-提交公告
export function prepareProjectSaveNotice(form) {
  const data = {...form}
  return fetch({
    url: '/ProjectController/api/prepareProjectSaveNotice.htm',
    method: 'post',
    data
  })
}

// 上传采购文件-提交
export function executeSaveAddNotice(packIdList, packPurchaseDoc) {
  const data = {packIdList, packPurchaseDoc}
  return fetch({
    url: '/ProjectController/api/executeProjectSaveDoc.htm',
    method: 'post',
    data
  })
}

// 供应商-项目搜索-一级菜单-提交搜索获取数据
export function supplierSearchProject(form) {
  const data = {...form}
  return fetch({
    url: '/ProjectController/api/supplierSearchProject.htm',
    method: 'post',
    data
  })
}

// 供应商-项目搜索-一级菜单-提交关注包件
export function supplierSearchProjectEnter(packIdList) {
  const data = {packIdList}
  return fetch({
    url: '/ProjectController/api/supplierSearchProjectEnter.htm',
    method: 'post',
    data
  })
}

// 供应商-已关注项目-一级菜单-初始化数据
export function supplierAlreadyEnter(form) {
  const data = {...form}
  return fetch({
    url: '/ProjectController/api/supplierAlreadyEnter.htm',
    method: 'post',
    data
  })
}

//  供应商-已关注项目-增加关注：
export function supplierAlreadyEnterAdd(packIdList) {
  const data = {packIdList}
  return fetch({
    url: '/ProjectController/api/supplierAlreadyEnterAdd.htm',
    method: 'post',
    data
  })
}

//  供应商-已关注项目-取消关注：
export function supplierAlreadyEnterCancel(packIdList) {
  const data = {packIdList}
  return fetch({
    url: '/ProjectController/api/supplierAlreadyEnterCancel.htm',
    method: 'post',
    data
  })
}

// 上传澄清答疑回复文件-初始化
export function executeProjectQa(projectId) {
  const data = {
    projectId
  }
  return fetch({
    url: '/ProjectController/api/executeProjectQa.htm',
    method: 'post',
    data
  })
}

// 上传澄清答疑回复文件-提交
export function executeProjectSaveQa(corePackQa, packIdList) {
  const data = {
    corePackQa, packIdList
  }
  return fetch({
    url: '/ProjectController/api/executeProjectSaveQa.htm',
    method: 'post',
    data
  })
}

// 上传开标记录初始化
export function expireProjectRecord(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireProjectRecordOpening.htm',
    method: 'post',
    data
  })
}

// 上传开标记录-保存附件信息
export function RecordOpeningSave(recordId, packIdList, fileToken) {
  const data = {
    recordId, packIdList, fileToken
  };
  return fetch({
    url: '/ProjectController/api/expireRecordOpeningSave.htm',
    method: 'post',
    data
  })
}

// 上传开标记录-删除附件信息
export function RecordOpeningDel(recordId, packIdList) {
  const data = {
    recordId, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireRecordOpeningDel.htm',
    method: 'post',
    data
  })
}

// 上传开标记录-新增目錄
export function RecordOpeningNewRecord(recordName, packIdList) {
  const data = {
    recordName, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireRecordOpeningNewRecord.htm',
    method: 'post',
    data
  })
}

// 上传开标记录-刪除目錄
export function RecordOpeningDelRecord(recordId, packIdList) {
  const data = {
    recordId, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireRecordOpeningDelRecord.htm',
    method: 'post',
    data
  })
}

// 上传评审记录
export function ProjectRecordProcess(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireProjectRecordProcess.htm',
    method: 'post',
    data
  })
}

// 上传评审记录-保存附件信息
export function RecordProcessSave(recordId, packIdList, fileToken) {
  const data = {
    recordId, packIdList, fileToken
  };
  return fetch({
    url: '/ProjectController/api/expireRecordProcessSave.htm',
    method: 'post',
    data
  })
}

// 上传评审记录-删除附件信息
export function RecordProcessDel(recordId, packIdList) {
  const data = {
    recordId, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireRecordProcessDel.htm',
    method: 'post',
    data
  })
}

// 上传评审记录-新增目錄
export function RecordProcessNewRecord(recordName, packIdList) {
  const data = {
    recordName, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireRecordProcessNewRecord.htm',
    method: 'post',
    data
  })
}

// 上传评审记录-刪除目錄
export function RecordProcessDelRecord(recordId, packIdList) {
  const data = {
    recordId, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireRecordProcessDelRecord.htm',
    method: 'post',
    data
  })
}

// 供应商报名情况-初始化
export function executeProjectEnter(projectId, currentProState) {
  const data = {
    projectId, currentProState
  };
  return fetch({
    url: '/ProjectController/api/executeProjectEnter.htm',
    method: 'post',
    data
  })
}

// 供应商报名情况-初始化-文件汇总
export function expireProjectEnter(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireProjectEnter.htm',
    method: 'post',
    data
  })
}

// 供应商报名情况-同意
export function executeProjectEnterPass(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/executeProjectEnterPass.htm',
    method: 'post',
    data
  })
}

// 供应商报名情况-返回
export function executeProjectEnterBack(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/executeProjectEnterBack.htm',
    method: 'post',
    data
  })
}

// 供应商报名情况-恢复
export function executeProjectEnterWait(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/executeProjectEnterWait.htm',
    method: 'post',
    data
  })
}

// 供应商-一级菜单页面----正在执行
export function supplierPassProject() {
  return fetch({
    url: '/ProjectController/api/supplierPassProject.htm',
    method: 'post',
  })
}

// 供应商-正在执行项目-下载页面
export function supplierPassProjectDownloadPage(packIdList) {
  const data = {
    packIdList
  };
  return fetch({
    url: '/ProjectController/api/supplierPassProjectDownloadPage.htm',
    method: 'post',
    data
  })
}

// 供应商-正在执行项目-下载页面-下载采购公告
export function supplierDownloadPurchaseNotice(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/supplierDownloadPurchaseNotice.htm',
    method: 'post',
    data
  })
}

// 供应商-正在执行项目-下载页面-下载采购文件
export function supplierDownloadPurchaseDoc(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/supplierDownloadPurchaseDoc.htm',
    method: 'post',
    data
  })
}

// 供应商-正在执行项目-下载页面-下载补充公告
export function supplierDownloadAddNotice(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/supplierDownloadAddNotice.htm',
    method: 'post',
    data
  })
}

// 供应商-正在执行项目-下载页面-下载澄清答疑
export function supplierDownloadQa(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/supplierDownloadQa.htm',
    method: 'post',
    data
  })
}

// 供应商通知-初始化
export function executeSupplierMsgInit(projectId, currentProState) {
  const data = {
    projectId, currentProState
  };
  return fetch({
    url: '/ProjectController/api/executeSupplierMsgInit.htm',
    method: 'post',
    data
  })
}

// 发布采购结果公告-初始化
export function expireResultNoticeInit(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireResultNoticeInit.htm',
    method: 'post',
    data
  })
}

// 发布采购结果公告-提交
export function expireResultNoticeSave(notice, packIdList) {
  const data = {
    notice, packIdList
  };
  return fetch({
    url: '/ProjectController/api/expireResultNoticeSave.htm',
    method: 'post',
    data
  })
}

//已到期项目-录入采购结果-初始化
export function expirePurchaseResultInit(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expirePurchaseResultInit.htm',
    method: 'post',
    data
  })
}

//已到期项目-录入采购结果-提交
export function expirePurchaseResultSave(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/expirePurchaseResultSave.htm',
    method: 'post',
    data
  })
}

//已到期项目-上传质疑处理初始化
export function expireProjectQuestionInit(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireProjectQuestionInit.htm',
    method: 'post',
    data
  })
}

//已到期项目-上传质疑处理提交
export function expireProjectQuestionSave(packIdList, recordList) {
  const data = {
    packIdList, recordList
  };
  return fetch({
    url: '/ProjectController/api/expireProjectQuestionSave.htm',
    method: 'post',
    data
  })
}

//已到期项目-办结初始化
export function expireEndInit(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireEndInit.htm',
    method: 'post',
    data
  })
}

//已到期项目-办结提交
export function expireEndSave(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireEndSave.htm',
    method: 'post',
    data
  })
}

//上传踏勘澄清文件-初始化
export function expireProjectSurveyInit(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireProjectSurveyInit.htm',
    method: 'post',
    data
  })
}

//上传踏勘澄清文件-初始化
export function expireProjectSurveySave(packIdList, fileToken) {
  const data = {
    packIdList, fileToken
  };
  return fetch({
    url: '/ProjectController/api/expireProjectSurveySave.htm',
    method: 'post',
    data
  })
}

//上传采购结果通知书-初始化
export function expireResultAdviceNoteInit(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireResultAdviceNoteInit.htm',
    method: 'post',
    data
  })
}

//上传采购结果通知书-提交
export function expireResultAdviceNoteSave(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/expireResultAdviceNoteSave.htm',
    method: 'post',
    data
  })
}

//上传采购结果通知书-提交
export function executeSupplierMsgSend(form) {
  const data = {
    ...form
  };
  return fetch({
    url: '/ProjectController/api/executeSupplierMsgSend.htm',
    method: 'post',
    data
  })
}

//文件汇总-采购结果
export function expirePurchaseResultList(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expirePurchaseResultList.htm',
    method: 'post',
    data
  })
}

//文件汇总-质疑处理
export function expireQuestionList(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireQuestionList.htm',
    method: 'post',
    data
  })
}

//文件汇总-采购结果通知书
export function expireResultAdviceNoteList(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireResultAdviceNoteList.htm',
    method: 'post',
    data
  })
}

//文件汇总-踏勘澄清文件
export function expireProjectSurveyList(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireProjectSurveyList.htm',
    method: 'post',
    data
  })
}

//文件汇总-采购结果公告
export function expireResultNoticeList(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireResultNoticeList.htm',
    method: 'post',
    data
  })
}

//下载附件
export function downloadFile(annexId) {
  const data = {
    annexId
  };
  return fetch({
    url: '/AnnexController/api/downloadFile.htm',
    method: 'post',
    data
  })
}

//文件汇总-委托信息
export function getProjectEntrustInfo(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/getProjectEntrustInfo.htm',
    method: 'post',
    data
  })
}

//文件汇总-澄清答疑
export function executeQaList(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/executeQaList.htm',
    method: 'post',
    data
  })
}

//延期
export function expireAddNotice(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/expireAddNotice.htm',
    method: 'post',
    data
  })
}

//延期
export function numOfMenu(projectId) {
  const data = {
    projectId
  };
  return fetch({
    url: '/ProjectController/api/numOfMenu.htm',
    method: 'post',
    data
  })
}

//一级菜单-已完结项目
export function endProjectEnter() {
  return fetch({
    url: '/ProjectController/api/endProjectEnter.htm',
    method: 'post',
  })
}
