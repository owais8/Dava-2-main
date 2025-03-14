/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';

import { Stack, useMediaQuery } from '@mui/material';
import { isEmpty, isNull } from 'lodash';
import {
  Bar,
  BarChart as BarChartBase,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { EChartColor } from '@/types/enum';

interface BarChartSourceProps<T> {
  color?: EChartColor;
  currentSource?: string;
  data: T[];
}

export function BarChartSource<T extends { id: string }>({
  data,
  currentSource,
  color = EChartColor.DEFAULT,
}: BarChartSourceProps<T>) {
  const match = useMediaQuery('(min-width: 600px)');
  const [barGraphData, setBarGraphData] = useState<{ x: number; y: number } | null>(null);
  const currentIndex = data.findIndex((item) => item.id === currentSource);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || isEmpty(payload)) return null;

    return (
      <Stack className="bg-black px-4 py-3 rounded-lg text-white">
        <span className="text-sm mb-1">{label}</span>
        <span className="text-[18px]">{payload[0].value} Visits</span>
      </Stack>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartBase
        data={data}
        layout="vertical"
        width={600}
        height={400}
        margin={{
          top: 40,
          right: 20,
          left: 0,
          bottom: 20,
        }}
        barSize={8}
      >
        <CartesianGrid horizontal={false} stroke={EChartColor.DEFAULT} />
        <XAxis
          type="number"
          stroke={EChartColor.TEXT}
          fontSize={match ? 14 : 12}
          dy={5}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke={EChartColor.TEXT}
          fontSize={match ? 14 : 12}
          width={match ? 146 : 120}
          dx={match ? -16 : -2}
          tickLine={false}
          axisLine={{ stroke: EChartColor.DEFAULT }}
        />

        <Tooltip
          cursor={false}
          active={!!currentIndex}
          content={CustomTooltip}
          position={
            !isNull(barGraphData) ? { x: barGraphData?.x, y: barGraphData?.y - 80 } : undefined
          }
        />

        <Bar
          dataKey="value"
          fill={color}
          radius={[0, 8, 8, 0]}
          onMouseEnter={(data) => setBarGraphData({ x: data.width, y: data.y })}
          // onMouseLeave={() => {
          //   if (barGraphData) setBarGraphData({ ...barGraphData });
          // }}
        >
          {data.map((e) => (
            <Cell
              cursor="pointer"
              fill={
                e.id === currentSource || currentSource === 'all'
                  ? EChartColor.ACTIVE
                  : EChartColor.DEFAULT
              }
              key={`cell-${e.id}`}
            />
          ))}
        </Bar>
      </BarChartBase>
    </ResponsiveContainer>
  );
}
