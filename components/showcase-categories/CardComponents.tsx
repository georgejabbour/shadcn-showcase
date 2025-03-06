import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CardComponents() {
  const [placeholderDialogOpen, setPlaceholderDialogOpen] = useState(false);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>
                This is a default card component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Card content goes here. This shows the default
                styling of the card component.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary">
            <CardHeader className="bg-primary/5">
              <CardTitle>Primary Accent</CardTitle>
              <CardDescription>
                Card with primary color accent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This card has a primary color border and
                header background.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive">
            <CardHeader className="bg-destructive/5">
              <CardTitle>Destructive Accent</CardTitle>
              <CardDescription>
                Card with destructive color accent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This card has a destructive color border and
                header background.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Card with Placeholder Data
        </h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Project Statistics</CardTitle>
            <CardDescription>
              Overview of your project metrics for the last 30
              days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Total Views
                </span>
                <span className="font-bold">12,543</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Conversion Rate
                </span>
                <span className="font-bold">3.2%</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "32%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Active Users
                </span>
                <span className="font-bold">1,832</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "48%" }}
                ></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Data</Button>
            <Button
              onClick={() => setPlaceholderDialogOpen(true)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Dialog for placeholder data */}
      <Dialog
        open={placeholderDialogOpen}
        onOpenChange={setPlaceholderDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
            <DialogDescription>
              Detailed statistics and information about your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Total Views:</span>
              <span className="col-span-3">12,543 (↑ 12% from last month)</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Conversion Rate:</span>
              <span className="col-span-3">3.2% (↑ 0.5% from last month)</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Active Users:</span>
              <span className="col-span-3">1,832 (↑ 8% from last month)</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Avg. Session:</span>
              <span className="col-span-3">4m 12s (↑ 15s from last month)</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlaceholderDialogOpen(false)}>
              Close
            </Button>
            <Button>Export as PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 