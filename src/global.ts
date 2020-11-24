import { Toast } from 'antd-mobile';
import 'default-passive-events';
import vconsole from 'vconsole';
import Cookie from './utils/cookie';


// 1. 全局配置Toast
Toast.config({
  duration: 1.5,
  mask: true,
});

// 2. vconsole
new vconsole();

// 3. 刷新token
if(Cookie.get('XXX_CLIENT_TOKEN')) {

}






