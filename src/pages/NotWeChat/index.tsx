import React, { FC } from 'react';
import './index.less';

const NotWeChat: FC = () => {
  return (
    <div className="page env-tips">
      <img src={require('./images/tips.png')} alt="提示"/>
      <div className="tips">请在微信客户端打开链接</div>
    </div>
  )
}

export default NotWeChat;
