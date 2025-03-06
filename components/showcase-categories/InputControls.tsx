import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sun } from "lucide-react";

export function InputControls() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 120px))",
          }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default</h3>
            <div className="flex flex-col gap-2">
              <Button>Default Button</Button>
              <Button className="bg-primary/90">Hovered</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Secondary</h3>
            <div className="flex flex-col gap-2">
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" className="bg-secondary/80">
                Hovered
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Destructive</h3>
            <div className="flex flex-col gap-2">
              <Button variant="destructive">Destructive</Button>
              <Button variant="destructive" className="bg-destructive/90">
                Hovered
              </Button>
              <Button variant="destructive" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Outline</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline">Outline</Button>
              <Button variant="outline" className="bg-accent text-accent-foreground">
                Hovered
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Sun className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="default-input">Default Input</Label>
              <Input id="default-input" placeholder="Default input" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="focused-input">Focused Input (Simulated)</Label>
              <Input
                id="focused-input"
                placeholder="Focused input"
                className="ring-2 ring-ring ring-offset-2 ring-offset-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input id="disabled-input" placeholder="Disabled input" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="with-value">Input with Value</Label>
              <Input id="with-value" value="This is a value" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Checkbox</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms-disabled" disabled />
                <label
                  htmlFor="terms-disabled"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disabled checkbox
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" disabled />
                  <Label htmlFor="option-three" className="opacity-70">
                    Disabled Option
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Switch</Label>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-switch" disabled />
                <Label htmlFor="disabled-switch" className="opacity-70">
                  Disabled Switch
                </Label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Select & Slider</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label>Select</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Slider</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
      </section>
    </>
  );
} 