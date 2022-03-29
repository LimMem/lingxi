import type { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { IconProps } from '../Icon';
import Icon from '../Icon';
import '../../index.less';

const prefixCls = 'lcdp-blockselect';
interface CheckBoxProps extends IconProps {
  index?: number;
  restItem?: any;
  col?: number;
  space?: number;
  style?: React.CSSProperties;
  valueKey?: string;
}

const CheckBox: FC<CheckBoxProps> = (props) => {
  const { col, space, style, children, ...iconProps } = props;
  return (
    <div style={style} className={classNames(`${prefixCls}-blockSelect`, `${prefixCls}-showIcon`)}>
      <Icon {...iconProps} />
      <div className={`${prefixCls}-content`}>{children}</div>
    </div>
  );
};

export default CheckBox;
