import request from './request';

/**
 * 微信登录
 * @param data 
 */
export function login<T>(data: { code: string; shareCode: string }) {
  return request.post<T>('/point/wechat/mp/login', {
    data,
  });
}
export function test<T>() {
  return request.post<T>('/point/wechat/mp/test');
}
