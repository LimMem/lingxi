import React from 'react';
import './index.less';

export interface AProps {}

const A: React.FC<AProps> = () => {
  console.log('Test');
  return <div>Test</div>;
};

export default A;
