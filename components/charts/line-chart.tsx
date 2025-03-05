"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    visitors: 1000,
    pageviews: 2400,
    signups: 400,
  },
  {
    name: "Feb",
    visitors: 1200,
    pageviews: 2800,
    signups: 500,
  },
  {
    name: "Mar",
    visitors: 1500,
    pageviews: 3500,
    signups: 700,
  },
  {
    name: "Apr",
    visitors: 1300,
    pageviews: 3000,
    signups: 550,
  },
  {
    name: "May",
    visitors: 1800,
    pageviews: 4000,
    signups: 800,
  },
  {
    name: "Jun",
    visitors: 2000,
    pageviews: 4500,
    signups: 1000,
  },
]

export function LineChartDemo() {
  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Visitors",
          color: "hsl(var(--primary))",
        },
        pageviews: {
          label: "Pageviews",
          color: "hsl(var(--accent))",
        },
        signups: {
          label: "Signups",
          color: "hsl(var(--destructive))",
        },
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="var(--color-visitors)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="pageviews" stroke="var(--color-pageviews)" strokeWidth={2} />
          <Line type="monotone" dataKey="signups" stroke="var(--color-signups)" strokeWidth={2} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

