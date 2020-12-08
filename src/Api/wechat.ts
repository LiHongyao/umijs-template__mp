import request from './request';

/**
 * 微信登录
 * @param data
 */
export function login<T>(data: { code: string; shareCode: string }) {
  return request.post<T>('登录aPI地址', {
    data,
  });
}

/**
 * 获取JsApi-ticket
 * @param url
 */
export function getJsApiTicket<T>(url: string) {
  return request.post<T>('获取sApi-ticket接口地址', {
    data: { url },
  });
}
