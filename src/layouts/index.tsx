import React, { FC, useEffect } from 'react';
import { Redirect } from 'umi';
import { usePrevious } from '@umijs/hooks';
import Cookie from 'lg-cookie';
import Validator from 'lg-validator';

const Layouts: FC = props => {
  // 1. 记录上一次路由
  const previousURL = usePrevious(window.location.href);
  useEffect(() => {
    Cookie.set(
      'PREVIOUS_URL',
      previousURL ? previousURL : window.location.href,
    );
  }, [window.location.href]);

  // 2. 处理非微信环境
  let element = null;
  if (!Validator.weixin()) {
    element = <Redirect to="/not-wechat" />;
  } else if (
    !Cookie.get<string>('XXX_CLIENT_TOKEN') &&
    !/from/.test(location.href)
  ) {
    const from = location.href.replace(location.origin, '');
    element = <Redirect to={`/auth/jump?from=${encodeURIComponent(from)}`} />;
  } else {
    element = <>{props.children}</>;
  }
  return element;
};

export default Layouts;
