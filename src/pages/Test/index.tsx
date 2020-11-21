import React, { FC, useEffect, useState } from 'react';
import Api from '@/Api';

const Test = () => {
  useEffect(() => {
    Api.wechat.test<XXX.BaseResponse<any>>().then(res => {
      console.log(res);
    })
  }, []);
  return (
    <div>
      测试页面
    </div>
  );
};

export default Test;
