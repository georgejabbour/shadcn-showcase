"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type ChartContext = {
  color: Record<string, string>
  config: Record<string, { label: string; color: string }>
}

const ChartContext = React.createContext<ChartContext | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a ChartProvider")
  }

  return context
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, { label: string; color: string }>
}

function ChartContainer({ children, config, className, ...props }: ChartProps) {
  // Create a mapping of dataKey to color
  const color = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [key, value]) => {
        acc[key] = value.color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  // Create a context value with the config and color mapping
  const value = React.useMemo(
    () => ({
      config,
      color,
    }),
    [config, color],
  )

  // Add CSS variables for each color
  const style = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [key, value]) => {
        acc[`--color-${key}`] = value.color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  return (
    <ChartContext.Provider value={value}>
      <div className={cn("recharts-wrapper", className)} style={style} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

function ChartTooltip({ className, ...props }: ChartTooltipProps) {
  return <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props} />
}

interface ChartTooltipContentProps {
  payload?: Array<{
    value: number
    name: string
    dataKey: string
    payload: Record<string, any>
  }>
  label?: string
  active?: boolean
  labelClassName?: string
  valueClassName?: string
  itemClassName?: string
}

function ChartTooltipContent({
  payload,
  label,
  active,
  labelClassName,
  valueClassName,
  itemClassName,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <ChartTooltip>
      {label && <div className={cn("mb-2 text-sm font-medium text-foreground", labelClassName)}>{label}</div>}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => {
          const dataKey = item.dataKey
          const configItem = config[dataKey]

          if (!configItem) {
            return null
          }

          return (
            <div key={`item-${index}`} className={cn("flex items-center gap-1 text-xs", itemClassName)}>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: configItem.color }} />
              <span className="text-muted-foreground">{configItem.label}:</span>
              <span className={cn("font-medium", valueClassName)}>{item.value}</span>
            </div>
          )
        })}
      </div>
    </ChartTooltip>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart }

