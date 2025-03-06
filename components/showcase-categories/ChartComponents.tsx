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
import { AreaChartDemo } from "@/components/charts/area-chart";
import { RadarChartDemo } from "@/components/charts/radar-chart";
import { ScatterChartDemo } from "@/components/charts/scatter-chart";

export function ChartComponents() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

      <section>
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

      <section>
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

      <section>
        <h2 className="text-2xl font-semibold mb-4">Area Chart</h2>
        <Card>
          <CardHeader>
            <CardTitle>Product Metrics</CardTitle>
            <CardDescription>Downloads, installations, and activations</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartDemo />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Radar Chart</h2>
        <Card>
          <CardHeader>
            <CardTitle>Product Comparison</CardTitle>
            <CardDescription>Feature comparison across products</CardDescription>
          </CardHeader>
          <CardContent>
            <RadarChartDemo />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Scatter Chart</h2>
        <Card>
          <CardHeader>
            <CardTitle>Data Distribution</CardTitle>
            <CardDescription>Correlation between variables</CardDescription>
          </CardHeader>
          <CardContent>
            <ScatterChartDemo />
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 