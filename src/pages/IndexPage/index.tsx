import Api from '@/Api';
import AppHeader from '@/components/@lgs/AppHeader';
import Utils from '@/utils/utils';
import React, { FC, useEffect, useState } from 'react';

const IndexPage: FC = () => {

  return (
    <div className="page">
      <AppHeader title="标题栏" />
      <button onClick={() => { Utils.push('/test')}}>进入test</button>
    </div>
  );
};

export default IndexPage;
