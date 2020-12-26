import request from '@/utils/request'

const api = {
  ticket: '/admin/ticket'
}

/**
 * 获取工单详细列表
 * @param parameter
 * @returns {Promise<unknown>}
 */
export function getTicket (params) {
  return new Promise((resolve, reject) => {
    request({
      url: api.ticket,
      method: 'get',
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export function saveTicket (params, type) {
  return new Promise((resolve, reject) => {
    request({
      url: api.ticket + '/' + type,
      method: 'post',
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function closeTicket (id) {
  return new Promise((resolve, reject) => {
    request({
      url: api.ticket + '/' + id,
      method: 'put'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deleteTicketById (id) {
  return new Promise((resolve, reject) => {
    request({
      url: api.ticket + '/' + id,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getTicketById (id) {
  return new Promise((resolve, reject) => {
    request({
      url: api.ticket + '/' + id,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
