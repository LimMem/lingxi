import React from 'react';
import './index.less';

export interface ButtonProps {
  name?: string;
}

const prefixCls = '{{{ appname }}}-button';
const Button: React.FC<ButtonProps> = props => {
  const { name, children, ...restProps } = props;
  return (
    <a className={prefixCls} {...restProps}>
      {children}
    </a>
  );
};

window.wufengController.registerComponent(Button, { type: 'Button' }, 'h5');

export default Button;
