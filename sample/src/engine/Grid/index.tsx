import React, { useMemo } from 'react';
import { Grid } from 'antd-mobile';

export interface MyGridProps {
  maxRow?: number | string;
  aliasIcon: string;
  aliasText: string;
  moreIcon?: string;
}

const MyGrid:React.FC<MyGridProps> = (props) => {
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
    if (!maxRow || maxRow === '0' || carouselData.length <= +maxRow * columnNum) {
      return carouselData;
    }
    return carouselData
      .filter((_, i) => i < +maxRow * columnNum - 1)
      .concat({
        text: '更多',
        icon: moreIcon,
      });
  }, [maxRow, carouselData, columnNum]);

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

export default MyGrid;
