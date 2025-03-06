"use client"

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data01 = [
  { x: 10, y: 30, z: 200 },
  { x: 40, y: 50, z: 400 },
  { x: 30, y: 70, z: 300 },
  { x: 50, y: 20, z: 240 },
  { x: 70, y: 80, z: 500 },
  { x: 80, y: 10, z: 150 },
  { x: 90, y: 50, z: 350 },
]

const data02 = [
  { x: 20, y: 80, z: 220 },
  { x: 50, y: 40, z: 320 },
  { x: 60, y: 30, z: 250 },
  { x: 70, y: 50, z: 400 },
  { x: 80, y: 40, z: 280 },
  { x: 90, y: 20, z: 180 },
  { x: 100, y: 60, z: 390 },
]

export function ScatterChartDemo() {
  return (
    <ChartContainer
      config={{
        group1: {
          label: "Group A",
          color: "hsl(var(--primary))",
        },
        group2: {
          label: "Group B",
          color: "hsl(var(--accent))",
        },
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="X-Axis" unit="units" />
          <YAxis type="number" dataKey="y" name="Y-Axis" unit="units" />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Size" unit="units" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
          <Legend />
          <Scatter
            name="Group A"
            data={data01}
            fill="var(--color-group1)"
            shape="circle"
          />
          <Scatter
            name="Group B"
            data={data02}
            fill="var(--color-group2)"
            shape="circle"
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
} 