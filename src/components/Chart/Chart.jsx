import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  selectChosenDate,
  selectMonthly,
  selectTodayWaterAmount,
} from '../../redux/water/selectors';
import { useEffect } from 'react';
import { getMonthly } from '../../redux/water/operations';
import { getUserInfo } from '../../redux/user/operations';
import { selectWaterDailyNorma } from '../../redux/user/selectors';
import css from './Chart.module.css';

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {
    const { x, y } = coordinate;

    return (
      // <div className={css.customTooltip}>
      //   <p className={css.label}>{`${payload[0].value}`}</p>
      // </div>
      <div
        className={css.customTooltip}
        style={{
          left: x,
          top: y - 40, // Піднімаємо підказку вище точки
        }}
      >
        <div className={css.arrow}></div>
        <div className={css.content}>
          <p className={css.label}>{`${payload[0].value}`}</p>
        </div>
      </div>
    );
  }

  return null;
};

export const Chart = () => {
  const dispatch = useDispatch();
  const waterMonth = useSelector(selectMonthly);
  const chosenDate = useSelector(selectChosenDate);
  const dailyAmount = useSelector(selectTodayWaterAmount);
  const dailyNorma = useSelector(selectWaterDailyNorma);

  useEffect(() => {
    const year = new Date(chosenDate).getFullYear();
    let month = new Date(chosenDate).getMonth() + 1;

    //приводи місяць до формату "06" замість "6 "
    month = month < 10 ? `0${month}` : month;

    dispatch(getMonthly(`${year}-${month}`));
    dispatch(getUserInfo());
  }, [dispatch, chosenDate]);

  const data = waterMonth
    ? waterMonth.map(elem => {
        const [date] = elem.time.split('T');
        const [, , day] = date.split('-');
        return {
          date: day,
          amount: parseInt(elem.amount),
        };
      })
    : [];

  const isEmpty = Array.isArray(data) && data.length === 0;

  const isSmallMobile = useMediaQuery({
    query: ' (max-width: 374px)',
  });
  const isMobile = useMediaQuery({
    query: '(min-width: 375px) and (max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1439px)',
  });

  const heightValue = isMobile ? 310 : isTablet ? 303 : 300;
  const widthValue = isSmallMobile
    ? 250
    : isMobile
    ? 303
    : isTablet
    ? 640
    : 608;
  const fontSizeValue = isSmallMobile ? 10 : isMobile ? 14 : isTablet ? 15 : 15;
  const intervalValue = isSmallMobile || isMobile ? 4 : isTablet ? 2 : 2;
  const dotRadiusValue = isSmallMobile || isMobile ? 2 : isTablet ? 4 : 4;

  const tickFormatter = value => {
    return (value / 1000).toFixed(2);
  };

  return isEmpty ? (
    <p className={css.noData}>No data for this month.</p>
  ) : (
    <AreaChart
      width={widthValue}
      height={heightValue}
      data={data}
      margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
    >
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis
        dataKey="date"
        label={{ value: 'Day', position: 'insideBottomRight', offset: -5 }}
        tick={{ textAnchor: 'end', fontSize: fontSizeValue }}
        interval={intervalValue}
      />
      <YAxis
        domain={[0, dailyNorma * 1000]}
        label={{ value: 'L', position: 'insideLeft', offset: 0 }}
        tick={{ textAnchor: 'end', fontSize: fontSizeValue }}
        tickFormatter={tickFormatter}
      />
      <Tooltip content={<CustomTooltip />} cursor={false} />
      <Area
        type="monotone"
        dataKey="amount"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
        dot={{ r: dotRadiusValue, stroke: '#82ca9d', fill: '#fff' }}
      />
    </AreaChart>
  );
};
