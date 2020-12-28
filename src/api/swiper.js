import request from '@/utils/request'
const baseURL = 'http://localhost:3200'

export function fetchList() {
    return request({
        url: `${baseURL}/swiper/list`,
        method: 'get'
    })
}