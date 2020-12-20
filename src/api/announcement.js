import request from '@/utils/request'

const api = {
  announcement: '/admin/announcement'
}

/**
 * 获取最新的announcement
 * @returns {AxiosPromise}
 */
export function getAnnouncement () {
  return new Promise((resolve, reject) => {
    request({
      url: api.announcement,
      method: 'get'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 添加或保存announcement
 * @returns {AxiosPromise}
 */
export function saveOrUpdateAnnouncement (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.announcement,
      method: 'post',
      data: parameter
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deleteAnnouncementById (parameter) {
  return new Promise((resolve, reject) => {
    request({
      url: api.announcement + '/' + parameter,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
