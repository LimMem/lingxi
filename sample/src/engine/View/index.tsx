import React from 'react';
import { log } from '../../utils';
import './index.less';

export interface AProps {}

const A: React.FC<AProps> = () => {
  log('Test3');
  return <div></div>;
};

export default A;

