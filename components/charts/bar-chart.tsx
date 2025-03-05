"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
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
    total: 1200,
    sales: 900,
    returns: 300,
  },
  {
    name: "Feb",
    total: 1900,
    sales: 1600,
    returns: 300,
  },
  {
    name: "Mar",
    total: 1500,
    sales: 1200,
    returns: 300,
  },
  {
    name: "Apr",
    total: 2200,
    sales: 1800,
    returns: 400,
  },
  {
    name: "May",
    total: 2800,
    sales: 2300,
    returns: 500,
  },
  {
    name: "Jun",
    total: 3200,
    sales: 2900,
    returns: 300,
  },
]

export function BarChartDemo() {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Total Revenue",
          color: "hsl(var(--primary))",
        },
        sales: {
          label: "Sales",
          color: "hsl(var(--accent))",
        },
        returns: {
          label: "Returns",
          color: "hsl(var(--destructive))",
        },
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="returns" fill="var(--color-returns)" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

