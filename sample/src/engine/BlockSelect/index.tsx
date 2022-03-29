import React, { useCallback, useMemo, useImperativeHandle, useState } from 'react';
import CheckBox from './components/CheckBox';
import NoCheckBox from './components/NoCheckBox';
import './index.less';

export interface MyBlockSelectProps {
  blockData?: any[];
  valueKey?: string;
  defaultValue?: string[];
  selectStyle?: React.CSSProperties;
  normalStyle?: React.CSSProperties;
  isChecked?: boolean;
  isMultiple?: boolean;
  columnNum?: number;
  space?: number;
  style?: React.CSSProperties;
  selectImg?: string;
  normalImg?: string;
  onChange?: (e: any[]) => void;
}

const prefixCls = 'lcdp-blockselect';
const BlockSelect = React.forwardRef<any, MyBlockSelectProps>((props, ref) => {
  const {
    blockData = [],
    valueKey = 'value',
    defaultValue = [],
    selectStyle,
    normalStyle,
    isChecked,
    isMultiple = true,
    columnNum = 1,
    space = 16,
    style: uStyle,
    selectImg,
    normalImg,
    onChange: uOnChange = () => {},
  } = props;
  const col = columnNum || 1;
  const [values, setValues] = useState<any>(defaultValue);

  const wrapperStyle = useMemo(
    () => ({
      ...uStyle,
      display: 'flex',
      flexDirection: 'row',
      alignItem: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }),
    [uStyle],
  ) as React.CSSProperties;

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
    [col, space, selectStyle, normalStyle],
  );

  const onChange = ({ index, restItem }: { index: number; restItem: any }) => {
    const val = typeof restItem === 'object' ? restItem[valueKey || 'value'] : index;
    if (!isMultiple) {
      setValues([val]);
      uOnChange([val]);
      return;
    }
    // 多选
    let tempValues = [...values];
    if (!values.includes(val)) {
      tempValues = tempValues.concat(val);
    } else {
      tempValues = values.filter((v: any) => v !== val);
    }
    setValues([...tempValues]);
    uOnChange([...tempValues]);
  };

  const getValues = () =>
    blockData?.filter((d, i) =>
      typeof d === 'object' ? values?.includes(d[valueKey]) : values.includes(i),
    );

  useImperativeHandle(ref, () => ({
    getValues: () => [values, getValues()],
  }));

  const children = useMemo(() => {
    const allChild = (props.children as any) || [];
    if (allChild.length > 0) {
      const placeholders = col === 1 ? 0 : col - (allChild.length % col);
      return [...allChild, ...new Array(placeholders).fill(null)];
    }
    return [];
  }, [col, props.children]);

  const getChildProps = useCallback(
    (item) => {
      const { index, restItem } = item;
      const val = typeof restItem === 'object' ? restItem[valueKey || 'value'] : index;
      const checked = values.includes(val);
      const top = index < col ? 0 : space;
      return {
        restItem,
        index,
        checked,
        top,
        style: getItemStyle(checked, top),
        normalImg,
        selectImg,
      };
    },
    [valueKey, values, col, space, getItemStyle, normalImg, selectImg],
  );

  return (
    <div style={wrapperStyle} className={`${prefixCls}-blockSelectWrapper`}>
      {children.map((child, index) => {
        if (!child) {
          // 占位图
          const top = index < col ? 0 : space;
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{ ...getItemStyle(false, top), backgroundColor: 'transparent' }}
              className={`${prefixCls}-blockSelect`}
            />
          );
        }

        const checkBoxProps = getChildProps({
          index,
          ...child.props,
          restItem: blockData[index],
        });

        return isChecked ? (
          <CheckBox {...checkBoxProps} onChange={onChange}>
            {child}
          </CheckBox>
        ) : (
          <NoCheckBox {...checkBoxProps} onChange={onChange}>
            {child}
          </NoCheckBox>
        );
      })}
    </div>
  );
});

BlockSelect.displayName = 'BlockSelect';

export default BlockSelect;
