import React from 'react';

export interface MyALinkEDProps {
  name?: React;
}

const prefixCls = 'aLinkED';

const ALinkED: React.FC<MyALinkEDProps> = props => {
  const { name, children, ...restProps } = props;

  return <a {...restProps}>{children}</a>;
};
