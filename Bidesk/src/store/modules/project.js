import Cookies from 'js-cookie'
//加入cookies的都是为了保证刷新后正常读取
const ProjectKey = 'Project-Id'
const SubProjectKey = 'SubProject-Id'
const PublishProjectKey = 'PublishProject-Id'
const ProStatusKey = 'ProStatus-Id'

export function getProStatus() {
  return Cookies.get(ProStatusKey)
}

export function setProStatus(status) {
  return Cookies.set(ProStatusKey, status)
}

export function getPublishProjectID() {
  return Cookies.get(PublishProjectKey)
}

export function setPublishProjectID(id) {
  return Cookies.set(PublishProjectKey, id)
}

export function getProID() {
  return Cookies.get(ProjectKey)
}

export function setProID(id) {
  return Cookies.set(ProjectKey, id)
}

export function getSubProID() {
  return Cookies.get(SubProjectKey)
}

export function setSubProID(id) {
  return Cookies.set(SubProjectKey, id)
}

const project = {
  state: {
    projectId: getProID(),
    subProjectId: getSubProID(),
    publishProjectId: getPublishProjectID(),
    projectStatus: getProStatus(),
    statusChange: false,
  },
  mutations: {
    SET_ProID: (state, id) => {
      state.projectId = id
    },
    SET_Sub_ProID: (state, id) => {
      state.subProjectId = id
    },
    SET_Pub_ProID: (state, id) => {
      state.publishProjectId = id
    },
    SET_PROJECT_STATUS: (state, project_status) => {
      state.projectStatus = project_status
    },
    SET_STATUS_CHANGE: (state, val) => {
      state.statusChange = val
    }
  },
  actions: {
    // 设置项目ID
    SetProID({commit, state}, id) {
      return new Promise(resolve => {
        commit('SET_ProID', id)
        setProID(id)
        resolve()
      })
    },
    SetSubProID({commit, state}, id) {
      return new Promise(resolve => {
        commit('SET_Sub_ProID', id)
        setSubProID(id)
        resolve()
      })
    },
    SetPubProID({commit, state}, id) {
      return new Promise(resolve => {
        commit('SET_Pub_ProID', id)
        setPublishProjectID(id)
        resolve()
      })
    },
    SetProStatus({commit, state}, status) {
      return new Promise(resolve => {
        commit('SET_PROJECT_STATUS', status)
        setProStatus(status)
        resolve()
      })
    }
  }
}

export default project
