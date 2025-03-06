"use client"

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    subject: "Performance",
    product1: 80,
    product2: 90,
    product3: 70,
  },
  {
    subject: "Reliability",
    product1: 85,
    product2: 75,
    product3: 95,
  },
  {
    subject: "Usability",
    product1: 65,
    product2: 85,
    product3: 80,
  },
  {
    subject: "Features",
    product1: 90,
    product2: 70,
    product3: 75,
  },
  {
    subject: "Support",
    product1: 75,
    product2: 80,
    product3: 85,
  },
  {
    subject: "Price",
    product1: 70,
    product2: 90,
    product3: 60,
  },
]

export function RadarChartDemo() {
  return (
    <ChartContainer
      config={{
        product1: {
          label: "Product A",
          color: "hsl(var(--primary))",
        },
        product2: {
          label: "Product B",
          color: "hsl(var(--accent))",
        },
        product3: {
          label: "Product C",
          color: "hsl(var(--destructive))",
        },
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Radar
            name="Product A"
            dataKey="product1"
            stroke="var(--color-product1)"
            fill="var(--color-product1)"
            fillOpacity={0.6}
          />
          <Radar
            name="Product B"
            dataKey="product2"
            stroke="var(--color-product2)"
            fill="var(--color-product2)"
            fillOpacity={0.6}
          />
          <Radar
            name="Product C"
            dataKey="product3"
            stroke="var(--color-product3)"
            fill="var(--color-product3)"
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
} 