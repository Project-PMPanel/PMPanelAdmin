import request from '@/utils/request'

const api = {
  getSiteConfig: '/admin/getSiteConfig',
  getRegisterConfig: '/admin/getRegisterConfig',
  getPaymentConfig: '/admin/getPaymentConfig',
  getOtherConfig: '/admin/getOtherConfig',
  getClientConfig: '/admin/getClientConfig',
  updateConfigByName: '/admin/updateConfig'
}

/**
 * 获取站点配置
 * @returns {AxiosPromise}
 */
export function getSiteConfig () {
  return new Promise((resolve, reject) => {
    request({
      url: api.getSiteConfig,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取注册配置
 * @returns {AxiosPromise}
 */
export function getRegisterConfig () {
  return new Promise((resolve, reject) => {
    request({
      url: api.getRegisterConfig,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取支付配置
 * @returns {AxiosPromise}
 */
export function getPaymentConfig () {
  return new Promise((resolve, reject) => {
    request({
      url: api.getPaymentConfig,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取其他配置
 * @returns {AxiosPromise}
 */
export function getOtherConfig () {
  return new Promise((resolve, reject) => {
    request({
      url: api.getOtherConfig,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取其他配置
 * @returns {AxiosPromise}
 */
export function getClientConfig () {
  return new Promise((resolve, reject) => {
    request({
      url: api.getClientConfig,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 更新配置
 * @param params
 * @returns {*}
 */
export function updateConfigByName (params) {
  return new Promise((resolve, reject) => {
    request({
      url: api.updateConfigByName,
      method: 'put',
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
