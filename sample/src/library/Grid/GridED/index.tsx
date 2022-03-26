import React, { useMemo } from 'react';
import { Grid } from 'antd-mobile';
// import type { GridProps } from 'antd-mobile/lib/grid';
// import 'antd-mobile/lib/grid/style/index';

export interface MyGridEDProps {
  maxRow: number;
  aliasIcon: string;
  aliasText: string;
  moreIcon: string;
}

const GridED: React.FC<MyGridEDProps> = (props) => {
  const {
    isCarousel = false,
    carouselMaxRow,
    maxRow = 0,
    aliasIcon,
    aliasText,
    data = [],
    columnNum = 4,
    moreIcon,
    ...restProps
  } = props;
  const carouselData = useMemo(
    () => data.map((item: any) => ({ icon: item[aliasIcon], text: item[aliasText], ...item })),
    [data, aliasIcon, aliasText],
  );

  const gridData = useMemo(() => {
    // eslint-disable-next-line eqeqeq
    if (!maxRow || maxRow == 0 || carouselData.length <= maxRow * columnNum) {
      return carouselData;
    }
    return carouselData
      .filter((_, i) => i < maxRow * columnNum - 1)
      .concat({
        text: '更多',
        icon: moreIcon,
      });
  }, [maxRow, carouselData, columnNum, moreIcon]);

  if (isCarousel) {
    return (
      <Grid
        isCarousel={isCarousel}
        data={carouselData}
        columnNum={columnNum}
        carouselMaxRow={carouselMaxRow}
        {...restProps}
      />
    );
  }

  return (
    <Grid
      isCarousel={isCarousel}
      columnNum={columnNum}
      data={gridData}
      carouselMaxRow={carouselMaxRow}
      {...restProps}
    />
  );
};

export default GridED;
