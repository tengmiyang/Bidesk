import fetch from '@/utils/fetch'

export function loginByUsername(userId, userPassword) {
  const data = {
    userId,
    userPassword
  }
  return fetch({
    url: 'UserController/api/login.htm',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: 'UserController/api/logout.htm',
    method: 'post'
  })
}

export function getUserInfo() {
  return fetch({
    url: 'UserController/api/getUserInfo.htm',
    method: 'post'
  })
}

