import Utils from '@/utils/utils';
import { extend, RequestOptionsInit } from 'umi-request';
import Tools from 'lg-tools';
import Cookie from 'lg-cookie';
import Toast from '@/components/@lgs/Toast';

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
service.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // GET请求添加时间戳
  if (options.method && /get/i.test(options.method)) {
    options.params = {
      ...options.params,
      timeState: Tools.randomCharacters(1, 'uppercase') + Date.now(),
    };
  }
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookie.get('XXX_CLIENT_TOKEN') || '',
      },
    },
  };
});

// 响应拦截
service.interceptors.response.use(async response => {
  const res = await response.clone().json();
  switch (res.code) {
    case 0:
      return res;
    case -10:
      // 授权
      if (!/from/.test(location.href)) {
        const from = location.href.replace(
          location.origin + process.env.BASE,
          '',
        );
        Utils.replace(`/auth/jump?from=${encodeURIComponent(from)}`);
      }
      return res;
    default:
      Toast.info(res.msg);
      return res;
  }
});
export default service;
