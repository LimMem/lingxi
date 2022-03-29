import React from 'react';
import aLinkConfig from './aLink';
import abc from './apbc';

export interface MyALinkEDProps {
  name?: string;
}

const requset = async () => {
  return new Promise(resolve => {
    resolve('sss');
  });
};

const prefixCls = 'aLinkED';

const ALinkED: React.FC<MyALinkEDProps> = props => {
  const { name, children, ...restProps } = props;
  const a = async params => {
    const b = await requset();
  };

  a({ a: '123' });

  return <a {...restProps}>{children}</a>;
};

window.wufengController.registerComponent(ALinkED, aLinkConfig, 'h5');

export default ALinkED;
