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
    if (/timeout/.test(error.message)) {
      Toast.info('请求超时');
    } else {
      Toast.info('系统升级，请稍后再试');
    }
    return null;
  },
});

// 请求拦截
let  _taskQueue: IQueue[] = [];
service.interceptors.request.use((url: string, options: RequestOptionsInit) => {

  const controller = new AbortController();
  const signal = controller.signal;
  _taskQueue.push({ url, options, controller})
  
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
        Authorization: Cookie.get('token') || '',
      },
    },
  };
});

// 响应拦截
service.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  if (!/from/.test(location.href)) {
    const from = location.href.replace(location.origin, '');
    Utils.replace(`/auth/jump?from=${encodeURIComponent(from)}`);
  }
  switch (res.code) {
    case 0:
      return res;
    case -23:
      _taskQueue.forEach(({controller}) => {
        controller.abort();
      });
      _taskQueue = [];
      if (!/from/.test(location.href)) {
        const from = location.href.replace(location.origin, '');
        Utils.replace(`/auth/jump?from=${encodeURIComponent(from)}`);
      }
      // 刷新token
      // 触发请求
      // 清除
      break;
    default:
      Toast.info(res.msg);
      return res;
  }
});
export default service;
