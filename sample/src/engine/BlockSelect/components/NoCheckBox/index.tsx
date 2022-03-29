import type { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { IconProps } from '../Icon';
import '../../index.less';

const prefixCls = 'lcdp-blockselect';
interface NoCheckBoxProps extends IconProps {
  index?: number;
  restItem?: any;
  col?: number;
  space?: number;
  style?: React.CSSProperties;
  valueKey?: string;
}

const NoCheckBox: FC<NoCheckBoxProps> = (props) => {
  const { checked, style, children, onChange } = props;
  return (
    <div
      style={style}
      className={classNames(`${prefixCls}-blockSelect`, `${prefixCls}-showIcon`, {
        [`${prefixCls}-select`]: checked,
      })}
      onClick={() => {
        if (onChange) {
          onChange({
            restItem: props.restItem,
            index: props.index,
          });
        }
      }}
    >
      <div className={`${prefixCls}-content`}>{children}</div>
    </div>
  );
};

export default NoCheckBox;
