/**
 * 接入jsSDK步骤
 *
 * 第1步：绑定域名
 *
 * 第2步：获取access_token：
 * 34_Iv6Da4QM7b8QFNJSjPvyf3UME1ULEGMziLcR8-QmNfJhaP2z0dI5UZH9yhHoRcQ4PLwiS0bUpAPO2KJn5dsar74kOsoOEySJLomsBxkVtbWeQFkSiEnQ54lwzcequ3h8WFuC1U0n59loaNgpSGHgADABPQ
 * GET => https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx169565989539bf7d&secret=5732e4c98058b1edb4b6ab1adb7ff9f7
 *
 * 第3步：获取jsapi_ticket
 * kgt8ON7yVITDhtdwci0qeYykO5G-PDFUEbewcOIJ2jTd07fcF86647jPuisphrUDGPywBxzZmIBoLzrKLZBySg
 * GET => https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=?&type=jsapi
 *
 * 第4步：签名算法
 * jsapi_ticket：
 * nonceStr：'Wm3WZYTPz0wzccnW'
 * timestamp：
 * url：
 * jsapi_ticket=kgt8ON7yVITDhtdwci0qeYykO5G-PDFUEbewcOIJ2jTd07fcF86647jPuisphrUDGPywBxzZmIBoLzrKLZBySg&nonceStr=Wm3WZYTPz0wzccnW&timestamp=1591503158298&url=http://192.168.101.11:8080/index
 */

import Api from '@/Api';
import Cookie from '@/utils/cookie';
import Validator from '@/utils/validator';

interface IResponse {
  appId: string;
  nonceStr: string;
  signature: string;
  timestamp: number;
}
/**
 * 初始化JSSDK
 * @param jsApiList
 */
export function initJSSDk(jsApiList: string[]) {
  let url = '';
  // iOS取上一次路由
  if (Validator.ios()) {
    url = Cookie.get('PREVIOUS_URL');
  } else {
    url = window.location.href;
  }
  return new Promise((resolve, reject) => {
    Api.wechat.getJsApiTicket<XXX.BaseResponse<IResponse>>(url).then(res => {
      if (res && res.code === 0 && res.data) {
        const { appId, timestamp, nonceStr, signature } = res.data;
        window.wx.config({
          debug: process.env.NAME === 'development',
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList,
        });
        window.wx.ready(() => {
          resolve();
        });
        window.wx.error((err: any) => {
          reject(err);
        });
      }
    });
  });
}
