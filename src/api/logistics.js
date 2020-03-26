import request from '@/utils/request'

export function getLogisticsByExpressNo(expressNo) {
  return request({
    url: '/logistics/' + expressNo,
    method: 'get'
  })
}
export function addLogistics(data) {
  return request({
    url: '/logistics',
    method: 'post',
    data
  })
}
export function modifyLogistics(data) {
  return request({
    url: '/logistics/' + data.id,
    method: 'patch',
    data
  })
}
export function deleteLogistics(id) {
  return request({
    url: '/logistics/' + id,
    method: 'delete'
  })
}
