import request from './request';

export function recommend<T>() {
  return request.get<T>('/goodstypes/list');
}
         

// GET 请求示例
export function reqGet<T>(params: {
  page: number,
  pageSize: number
}) {
  return request.get<T>('url', {
    params
  })
}

// POST请求示例
export function reqPost<T>(data: {
  page: number,
  pageSize: number
}) {
  return request.post<T>('url', {
    data
  })
}