import request from '@/utils/request'

const authApi = {
  Login: '/auth/login',
  // get my info
  UserInfo: '/user/info',
  getSiteConfig: '/auth/getSiteConfig'
}

/**
 * 登陆
 * @param parameter
 * @returns {AxiosPromise}
 */
export function auth (parameter) {
  return request({
    url: authApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: authApi.UserInfo,
    method: 'get'
  })
}

/**
 * 获取站点配置
 * @returns {AxiosPromise}
 */
export function getSiteConfig () {
  return request({
    url: authApi.getSiteConfig,
    method: 'get'
  })
}
