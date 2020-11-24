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

/**
 * 获取JsApi-ticket
 * @param url 
 */
export function getJsApiTicket<T>(url: string) {
  return request.post<T>('/point/wechat/mp/jsapi/getJsApiTicket', {
    data: { url }
  })
}
