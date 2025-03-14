/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';

import { Stack, Typography, useMediaQuery } from '@mui/material';
import { isEmpty } from 'lodash';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { SOURCES } from '../data';
import { getSelectedDays, transformDataForLineChart } from '../helper';
import { NoteIcon } from '@/components';
import type { TAnnotation } from '@/modules/traffic-analytics/schemas';
import { EChartColor } from '@/types/enum';

interface ILineChartOverTimeProps<T> {
  data: T[];
  currentSource?: string;
  dateRange: string;
  annotationData: TAnnotation[];
}

export function LineChartOverTime<T extends { id: string; name: string }>({
  data,
  currentSource,
  dateRange,
  annotationData,
}: ILineChartOverTimeProps<T>) {
  const match = useMediaQuery('(min-width: 600px)');
  const selectedDays = getSelectedDays(dateRange);
  const lineData = useMemo(() => transformDataForLineChart(data, dateRange), [data, dateRange]);

  const dataFiltered = useMemo(
    () =>
      data.filter((entry) => {
        if (currentSource === 'all') return true;

        return entry.id === currentSource;
      }),
    [currentSource, data],
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || isEmpty(payload)) return null;

    return (
      <Stack className="bg-black px-4 py-3 rounded-lg text-white">
        <span className="text-xs mb-1 text-text-secondary">{label}</span>
        <span className="text-sm">{payload[0].name}</span>
        <span className="text-[18px]">{payload[0].value} Visits</span>
      </Stack>
    );
  };

  const CustomizedLabel = (props: any) => {
    const { x, y, fontSize, fill, payload } = props;

    const annotation = annotationData.find((e) => e.date.split(',')[0] === payload.value);

    if (!annotation && !selectedDays.includes(payload.value))
      return <g transform={`translate(${x},${y})`} />;

    return (
      <>
        {selectedDays.includes(payload.value) ? (
          <g transform={`translate(${x},${y})`} fontSize={fontSize} fill={fill}>
            <text x={0} y={0} dy={16} textAnchor="middle">
              {payload.value}
            </text>
          </g>
        ) : null}
        {annotation ? (
          <g transform={`translate(${x},${y - 34})`}>
            <NoteIcon fill={annotation.isActived ? '#000' : '#E5E5EF'} />
          </g>
        ) : null}
      </>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={lineData}
        width={600}
        height={400}
        margin={{
          top: match ? 60 : 40,
          right: match ? 50 : 20,
          left: 0,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} stroke={EChartColor.DEFAULT} />
        <XAxis
          type="category"
          dataKey="date"
          stroke={EChartColor.TEXT}
          fontSize={match ? 14 : 12}
          dy={5}
          tickLine={false}
          axisLine={{ stroke: EChartColor.DEFAULT }}
          interval={0}
          tick={<CustomizedLabel />}
        />
        <YAxis
          type="number"
          stroke={EChartColor.TEXT}
          fontSize={match ? 14 : 12}
          width={match ? 70 : 50}
          dx={-20}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: EChartColor.BORDER, strokeDasharray: '3 3' }}
          content={CustomTooltip}
        />

        <Legend
          iconType="circle"
          wrapperStyle={{
            paddingTop: 16,
            fontSize: 12,
          }}
          content={({ payload }) => (
            <Stack
              direction="row"
              flexWrap="wrap"
              columnGap={{ xs: 3, sm: 2, md: 3, lg: 4 }}
              rowGap={2}
              justifyContent="center"
            >
              {payload?.map((entry) => (
                <Stack key={entry.value} direction="row" spacing={1} alignItems="start">
                  <span
                    style={{
                      marginTop: 2,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: entry.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="caption" style={{ color: EChartColor.TEXT }}>
                    {entry.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        />

        {dataFiltered.map((entry) => {
          return (
            <Line
              key={entry.id}
              connectNulls
              dataKey={entry.id}
              name={entry.name}
              stroke={SOURCES[entry.id]?.color || EChartColor.DEFAULT}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 8,
                strokeWidth: 4,
                fill: EChartColor.ACTIVE,
                className: 'drop-shadow',
              }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
