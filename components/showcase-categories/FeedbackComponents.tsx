import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function FeedbackComponents() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert component.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              This is a destructive alert component.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
        <div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog component. It appears in a modal overlay.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>
                  Dialog content goes here. This shows how the colors work in a dialog context.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Toast</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => {
              toast({
                title: "Default Toast",
                description: "This is a default toast notification.",
              });
            }}
          >
            Show Default Toast
          </Button>
          
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Error Toast",
                description: "Something went wrong.",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
            }}
          >
            Show Error Toast
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Toast with Action",
                description: "This toast has an action button.",
                action: (
                  <ToastAction altText="Undo">Undo</ToastAction>
                ),
              });
            }}
          >
            Toast with Action
          </Button>
        </div>
      </section>
    </>
  );
} 