import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartDemo } from "@/components/charts/bar-chart";
import { LineChartDemo } from "@/components/charts/line-chart";
import { PieChartDemo } from "@/components/charts/pie-chart";

export function ChartComponents() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue breakdown by month</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartDemo />
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
        <Card>
          <CardHeader>
            <CardTitle>Website Analytics</CardTitle>
            <CardDescription>Traffic and conversion metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChartDemo />
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Pie Chart</h2>
        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>User device breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChartDemo />
          </CardContent>
        </Card>
      </section>
    </>
  );
} 