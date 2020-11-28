import { Toast } from 'antd-mobile';
import 'default-passive-events';
import Cookie from 'lg-cookie';
import vconsole from 'vconsole';


// 1. 全局配置Toast
Toast.config({
  duration: 1.5,
  mask: true,
});

// 2. vconsole
if(process.env.NAME !== 'production') {
  new vconsole();
}


// 3. 刷新token
if(Cookie.get('XXX_CLIENT_TOKEN')) {

}






