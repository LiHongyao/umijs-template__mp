
import Utils from '@/utils/utils';
import React, { FC } from 'react';

const IndexPage: FC = () => {
  return (
    <div className="page">
      <button onClick={() => { Utils.push('/test')}}>进入test</button>
    </div>
  );
};

export default IndexPage;
