import request from '@/utils/request'

const api = {
  node: '/admin/node'
}

/**
 * 获取节点列表
 * @returns {AxiosPromise}
 */
export function getNode (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.node,
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
 * 获取该node详情
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getNodeInfoByNodeId (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/' + parameter,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 添加
 * @returns {AxiosPromise}
 */
export function addNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node,
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
 * 编辑
 * @returns {AxiosPromise}
 */
export function submitEditNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node,
      method: 'put',
      data: parameter
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 通过id删除node
 * @returns {AxiosPromise}
 */
export function deleteNodeById (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
