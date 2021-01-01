import request from '@/utils/request'

const api = {
  dashboard: '/admin/dashboard',
  cache: '/admin/cache',
  notifyRenew: '/admin/notifyRenew'
}

/**
 * 获取dashboard信息
 * @returns {AxiosPromise}
 */
export function getDashboardInfo () {
  return new Promise((resolve, reject) => {
    request({
      url: api.dashboard,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 清理redis
 * @returns {AxiosPromise}
 */
export function cleanCache () {
  return new Promise((resolve, reject) => {
    request({
      url: api.cache,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 通知续费
 * @returns {AxiosPromise}
 */
export function notifyRenew () {
  return new Promise((resolve, reject) => {
    request({
      url: api.notifyRenew,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
