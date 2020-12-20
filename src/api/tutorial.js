import request from '@/utils/request'

const api = {
  tutorial: '/admin/tutorial'
}

/**
 * 获取所有tutorial
 * @returns {AxiosPromise}
 */
export function getTutorial (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.tutorial,
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
export function addTutorial (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.tutorial,
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
 * 修改
 * @param parameter
 */
export function updateTutorialById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.tutorial,
      method: 'put',
      data: parameter
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deleteTutorialById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.tutorial + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
