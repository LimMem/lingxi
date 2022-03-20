import React from 'react';
import './index.less';

export interface ButtonEditorProps {
  name?: string;
}

const prefixCls = 'btn-editor';
const Button: React.FC<ButtonEditorProps> = props => {
  return <div className={prefixCls}>灵犀配置态组件</div>;
};

export default Button;
