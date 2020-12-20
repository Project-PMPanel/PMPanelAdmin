import request from '@/utils/request'

const api = {
  allNodes: '/admin/nodes',
  allDetects: '/admin/detects',
  detect: '/admin/detect',
  nodeWithDetect: '/admin/nodeWithDetect'
}

/**
 * 获取所有节点
 * @returns {AxiosPromise}
 */
export function getAllNodes () {
  return new Promise((resolve, reject) => {
    request({
      url: api.allNodes,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取所有审计
 * @returns {AxiosPromise}
 */
export function getAllDetects () {
  return new Promise((resolve, reject) => {
    request({
      url: api.allDetects,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取审计列表
 * @returns {AxiosPromise}
 */
export function getDetect (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.detect,
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
export function addDetect (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.detect,
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
export function submitEditDetect (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.detect,
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
 * 通过id删除detect
 * @returns {AxiosPromise}
 */
export function deleteDetectById (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.detect + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取节点指定审计列表
 * @returns {AxiosPromise}
 */
export function getNodeWithDetect (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.nodeWithDetect,
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
 * 添加节点指定审计列表
 * @returns {AxiosPromise}
 */
export function addNodeWithDetect (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.nodeWithDetect,
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
export function submitEditNodeWithDetect (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.nodeWithDetect,
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
 * 通过id删除nodeWithDetect
 * @returns {AxiosPromise}
 */
export function deleteNodeWithDetectById (parameter) {
  console.log(parameter)
  return new Promise((resolve, reject) => {
    request({
      url: api.nodeWithDetect + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
