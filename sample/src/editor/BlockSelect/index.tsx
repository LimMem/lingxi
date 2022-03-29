import React, { useCallback, useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import PlaceHolder from '../../utils/PlaceHolder';
import styles from './index.module.less';
import IconCheck from './assets/check.svg';
import IconNormalCheck from './assets/normal-check.svg';
import IconError from './error.png';

interface ContainerDropBoxProps extends React.HTMLProps<HTMLDivElement> {
  _component: any;
}

export interface MyBlockSelectEDProps {
  ContainerDropBox: React.FC<ContainerDropBoxProps>;
  _component: any;
  style: React.CSSProperties;
  valueKey: string;
  defaultValue: string[];
  selectStyle: React.CSSProperties;
  normalStyle: React.CSSProperties;
  selectImg: string;
  normalImg: string;
  isChecked: boolean;
  isMultiple: boolean;
  columnNum: number;
  space: number;
  blockData: any[];
}

// const prefixCls = 'blockSelectED';
const MyBlockSelectED: React.FC<MyBlockSelectEDProps> = props => {
  const {
    ContainerDropBox,
    _component,
    style: uStyle,
    valueKey = 'value',
    children,
    defaultValue,
    selectStyle,
    normalStyle,
    selectImg,
    normalImg,
    isChecked,
    isMultiple,
    columnNum = 1,
    space = 16,
    blockData = [],
    ...restProps
  } = props;

  const col = columnNum || 1;
  const [values, setValues] = useState<string[]>([]);

  useEffect(
    () => {
      if (!defaultValue) {
        return;
      }
      if (Array.isArray(defaultValue)) {
        setValues(defaultValue);
      } else {
        setValues([defaultValue]);
      }
    },
    [defaultValue]
  );

  const wrapperStyle: React.CSSProperties = useMemo(
    () => ({
      ...uStyle,
      display: 'flex',
      flexDirection: 'row',
      alignItem: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }),
    [uStyle, col, blockData]
  );

  const data = useMemo(
    () => {
      if (Array.isArray(blockData) && blockData.length > 0) {
        const placeholders = col - (blockData.length % col);
        return [...blockData, ...new Array(placeholders).fill(null)];
      }
      // 不是数组就填充一个内容，用来显示编排
      return [{ label: 'test', value: '001' }];
    },
    [blockData, col, blockData]
  );

  const getItemStyle = useCallback(
    (checked, top) => {
      const flexBasis = `calc(${100 / col}% - ${col > 1 ? space / col : 0}px)`;
      const style = { flexBasis, backgroundColor: '#fff', marginTop: top };
      if (checked) {
        Object.assign(style, selectStyle);
      } else {
        Object.assign(style, normalStyle);
      }
      return style;
    },
    [columnNum, blockData]
  );

  const onChange = (item: Record<string, any>, index?: number) => {
    const value = item[valueKey];
    if (!isMultiple) {
      setValues([value]);
      return;
    }
    // 多选
    let tempValues = [...values];
    if (!values.includes(value)) {
      tempValues = tempValues.concat(value);
    } else {
      tempValues = values.filter(v => v !== value);
    }
    setValues([...tempValues]);
  };

  const renderIcon = (checked: boolean) => {
    if (checked) {
      return <img src={selectImg || IconCheck} className={styles.icon} />;
    }
    return <img src={normalImg || IconNormalCheck} className={styles.icon} />;
  };

  const CheckBox = (item: any) => {
    const checked = values.includes(item[valueKey || 'value']);
    const { index } = item;
    const top = index < col ? 0 : space;
    return (
      <div
        style={getItemStyle(checked, top)}
        className={classNames(styles.blockSelect, styles.showIcon)}
      >
        <div onClick={() => onChange(item, index)}>{renderIcon(checked)}</div>
        <div className={classNames(styles.content)}>
          <PlaceHolder>{children}</PlaceHolder>
        </div>
      </div>
    );
  };

  const NoCheckBox = (item: Record<string, any>) => {
    const { index } = item;
    const checked = values.includes(item[valueKey || 'value']);
    const top = index < col ? 0 : space;
    return (
      <div
        style={getItemStyle(checked, top)}
        className={classNames(styles.blockSelect, styles.nobox, {
          [styles.select]: checked,
        })}
        onClick={() => onChange(item)}
      >
        <div className={classNames(styles.content)}>
          <PlaceHolder>{children}</PlaceHolder>
        </div>
      </div>
    );
  };

  return (
    <ContainerDropBox _component={_component}>
      <div style={wrapperStyle}>
        {data.map((item, index) => {
          if (!item) {
            return <div className={classNames(styles.blockSelect)} />;
          }
          return isChecked ? (
            <CheckBox index={index} key={item[valueKey]} {...item} />
          ) : (
            <NoCheckBox index={index} key={item[valueKey]} {...item} />
          );
        })}
      </div>
    </ContainerDropBox>
  );
};

export default MyBlockSelectED;
