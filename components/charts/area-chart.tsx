"use client"

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    downloads: 4000,
    installations: 2400,
    activations: 1200,
  },
  {
    name: "Feb",
    downloads: 4500,
    installations: 2800,
    activations: 1600,
  },
  {
    name: "Mar",
    downloads: 5000,
    installations: 3200,
    activations: 2000,
  },
  {
    name: "Apr",
    downloads: 4800,
    installations: 3000,
    activations: 1800,
  },
  {
    name: "May",
    downloads: 6000,
    installations: 3800,
    activations: 2400,
  },
  {
    name: "Jun",
    downloads: 7000,
    installations: 4500,
    activations: 3000,
  },
]

export function AreaChartDemo() {
  return (
    <ChartContainer
      config={{
        downloads: {
          label: "Downloads",
          color: "hsl(var(--primary))",
        },
        installations: {
          label: "Installations",
          color: "hsl(var(--accent))",
        },
        activations: {
          label: "Activations",
          color: "hsl(var(--destructive))",
        },
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="downloads"
            stackId="1"
            stroke="var(--color-downloads)"
            fill="var(--color-downloads)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="installations"
            stackId="1"
            stroke="var(--color-installations)"
            fill="var(--color-installations)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="activations"
            stackId="1"
            stroke="var(--color-activations)"
            fill="var(--color-activations)"
            fillOpacity={0.6}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
} 