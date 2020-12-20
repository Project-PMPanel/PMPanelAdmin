import request from '@/utils/request'

const api = {
  user: '/admin/user'
}

/**
 * 获取user
 * @returns {AxiosPromise}
 */
export function getUser (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.user,
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
 * 获取 该用户所有信息
 * @param parameter
 * @returns {*}
 */
export function getUserDetail (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.user + '/' + parameter,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 修改user
 * @param parameter
 */
export function updateUserById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.user,
      method: 'put',
      data: parameter
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deleteUserById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.user + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
