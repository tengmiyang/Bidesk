import {asyncRouterMap, constantRouterMap, FIXED_ROUTERS} from '@/router'

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
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
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

const permission = {
  state: {
    routers: constantRouterMap, //需要添加访问的所有路由，包括显示的隐藏的以及二级页面的
    top_routers: constantRouterMap, //一级页面路由，权限影响主要在这里
    fixed_routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.fixed_routers = routers.fixedRouters
      state.addRouters = [...routers.fixedRouters, ...routers.accessedRouters]
      state.top_routers = constantRouterMap.concat(routers.accessedRouters)
      state.routers = state.top_routers.concat(routers.fixedRouters)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles} = data
        let accessedRouters
        let fixedRouters = []
        // console.log(roles)
        switch (true) {
          case roles.indexOf('purchaser') >= 0:
            fixedRouters = filterAsyncRouter(FIXED_ROUTERS, ['purchaser'])
            break;
          case roles.indexOf('agency') >= 0:
            fixedRouters = filterAsyncRouter(FIXED_ROUTERS, ['agency'])
            break;
        }
        // console.log('rou', fixedRouters)
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', {fixedRouters, accessedRouters})
        resolve()
      })
    }
  }
}

export default permission
