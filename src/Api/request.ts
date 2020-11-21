import Cookie from '@/utils/cookie';
import Utils from '@/utils/utils';
import { extend, RequestOptionsInit } from 'umi-request';
import { Toast } from 'antd-mobile';

interface IQueue {
  url: string;
  options: RequestOptionsInit;
  controller: AbortController;
}

const service = extend({
  prefix: process.env.HOST,
  timeout: 10000,
  errorHandler: error => {
    console.log(error, '__________')
    if (/timeout/.test(error.message)) {
      Toast.info('请求超时');
    } else {
      Toast.info('系统升级，请稍后再试');
    }
    return null;
  },
});

// 请求拦截
let _taskQueue: IQueue[] = [];
service.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // 防止Token过期处理
  const controller = new AbortController();
  const signal = controller.signal;
  _taskQueue.push({ url, options, controller });

  // GET请求添加时间戳
  if (options.method && /get/i.test(options.method)) {
    options.params = {
      ...options.params,
      signal,
      timeState: Utils.randomCharacters(1, 'uppercase') + Date.now(),
    };
  }
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookie.get('DP_CLIENT_TOKEN') || '',
      },
    },
  };
});

// 响应拦截
service.interceptors.response.use(async response => {
  const res = await response.clone().json();
  switch (res.code) {
    case 0:
      _taskQueue = [];
      return res;
    case -23 /**token过期 */:
      // 取消所有正在进行的请求，避免返回数据干扰现有操作
      _taskQueue.forEach(({ controller }) => {
        controller.abort();
      });
      // 清空队列
      _taskQueue = [];
      // 授权
      if (!/from/.test(location.href)) {
        const from = location.href.replace(location.origin, '');
        Utils.replace(`/auth/jump?from=${encodeURIComponent(from)}`);
      }
      /** 接口刷新token需求 */
      // 1. 遍历终止正在进行的请求
      // 2. 调用刷新token接口
      // 3. 在刷新token接口回调中再遍历发起之前的请求
      // 4. 清空队列
      return res;
    default:
      _taskQueue = [];
      Toast.info(res.msg);
      return res;
  }
});
export default service;
