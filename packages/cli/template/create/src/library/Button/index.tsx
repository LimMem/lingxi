import React from 'react';
import './index.less';

export interface ButtonProps {
  name?: string;
}

const prefixCls = 'btn';
const Button: React.FC<ButtonProps> = props => {
  return <div className={prefixCls}>灵犀运行态组件</div>;
};

export default Button;
