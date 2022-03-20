import React, { useState } from 'react';
import './index.less';

export interface ButtonEditorProps {
  name?: string;
}

const prefixCls = 'btn-editor';
const Button: React.FC<ButtonEditorProps> = props => {
  const [state, setState] = useState(0);
  console.log(window);
  return (
    <div
      className={prefixCls}
      onClick={() => {
        setState(state + 1);
      }}
    >
      灵犀配置态组件{state}
    </div>
  );
};

export default Button;
