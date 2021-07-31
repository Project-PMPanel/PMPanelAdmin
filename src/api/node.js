import request from '@/utils/request'

const api = {
  node: '/admin/node'
}

/**
 * 获取ss节点列表
 * @returns {AxiosPromise}
 */
export function getSsNode (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/ss',
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
 * 添加ss
 * @returns {AxiosPromise}
 */
export function addSsNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/ss',
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
export function submitEditSsNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/ss',
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
 * 获取v2ray节点列表
 * @returns {AxiosPromise}
 */
export function getV2rayNode (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/v2ray',
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
export function getNodeInfoByTypeNodeId (parameter, nodeId) {
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/' + nodeId,
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
export function addV2rayNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/v2ray',
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
export function submitEditV2rayNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/v2ray',
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
 * 获取trojan节点列表
 * @returns {AxiosPromise}
 */
export function getTrojanNode (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/trojan',
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
 * 添加trojan
 * @returns {AxiosPromise}
 */
export function addTrojanNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/trojan',
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
 * 编辑trojan
 * @returns {AxiosPromise}
 */
export function submitEditTrojanNode (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/trojan',
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
export function deleteNodeByTypeAndId (type, id) {
  console.log(type, id)
  return new Promise((resolve, reject) => {
    request({
      url: api.node + '/' + type + '/' + id,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
