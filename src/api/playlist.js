import request from '@/utils/request'
const baseURL = 'http://localhost:3200'

export function fetchList(params) {
    return request({
        params,
        url: `${baseURL}/playlist/list`,
        method: 'get'
    })
}