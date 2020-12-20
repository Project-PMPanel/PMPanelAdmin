import request from '@/utils/request'

const api = {
  plan: '/admin/plan'
}

/**
 * 获取所有plan
 * @returns {AxiosPromise}
 */
export function getPlan (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.plan,
      method: 'get',
      params: parameter
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 添加
 * @returns {AxiosPromise}
 */
export function addPlan (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.plan,
      method: 'post',
      data: parameter
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取 该plan所有信息
 * @param parameter
 * @returns {*}
 */
export function getPlanById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.plan + '/' + parameter,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 修改plan
 * @param parameter
 */
export function updatePlanById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.plan,
      method: 'put',
      data: parameter
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deletePlanById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.plan + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
