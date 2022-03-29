import type { FC } from 'react';
import React from 'react';

interface PlaceholderProps extends React.HTMLProps<HTMLDivElement> {
  isWrapper?: boolean;
  text?: string;
}

const Placeholder: FC<PlaceholderProps> = (props) => {
  const {
    children,
    style = {},
    isWrapper = true,
    text = '拖拽组件或模板到这里',
    ...restProps
  } = props;

  const View = (
    <div {...restProps} className="ued-m-empty-box">
      {text}
    </div>
  );

  const PlaceholderView = isWrapper ? (
    <div style={{ minHeight: '84px', ...style, position: 'relative' }}>{View}</div>
  ) : (
    View
  );

  return children ? <>{children}</> : PlaceholderView;
};

export default Placeholder;
