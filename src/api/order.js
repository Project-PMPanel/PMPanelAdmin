import request from '@/utils/request'

const api = {
  order: '/admin/order'
}

/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function getOrder (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.order,
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
 * 获取 该plan所有信息
 * @param parameter
 * @returns {*}
 */
export function getOrderByOrderId (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.order + '/' + parameter,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deleteOrderById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.order + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function confirmOrder (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.order + '/' + parameter,
      method: 'put'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
