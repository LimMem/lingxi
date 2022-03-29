import type { FC } from 'react';
import React from 'react';
import unCheckIcon from '../../assets/normal-check.svg';
import checkIcon from '../../assets/check.svg';
import '../../index.less';

const prefixCls = 'lcdp-blockselect';

export interface IconProps {
  selectImg?: string;
  normalImg?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
  index?: number;
  restItem?: any;
}

const Icon: FC<IconProps> = (props) => {
  const { selectImg, normalImg, onChange, checked = false, index, restItem } = props;
  const checkedSrc = selectImg || checkIcon;
  const unCheckedSrc = normalImg || unCheckIcon;
  return (
    <img
      onClick={() => {
        if (onChange) {
          onChange({
            restItem,
            index,
          });
        }
      }}
      src={checked ? checkedSrc : unCheckedSrc}
      alt=""
      className={`${prefixCls}-icon`}
    />
  );
};

export default Icon;
