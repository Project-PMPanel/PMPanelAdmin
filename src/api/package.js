import request from '@/utils/request'

const api = {
  order: '/admin/package'
}

/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function getPackage (parameter) {
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
