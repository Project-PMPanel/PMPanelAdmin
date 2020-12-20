import request from '@/utils/request'

const api = {
  withdraw: '/admin/withdraw'
}

/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function getWithdraw (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.withdraw,
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
 * 修改
 * @param id
 */
export function ackWithdrawById (id) {
  return new Promise((resolve, reject) => {
    request({
      url: api.withdraw + '/' + id,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
