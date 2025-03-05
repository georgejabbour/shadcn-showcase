// Define the structure of a color configuration
export interface ColorConfig {
  label: string
  colorKey: string
  lightValue: string
  darkValue: string
}

// List of all theme colors with their default values
export const themeColors: ColorConfig[] = [
  {
    label: "Background",
    colorKey: "--background",
    lightValue: "0 0% 100%",
    darkValue: "222.2 84% 4.9%",
  },
  {
    label: "Foreground",
    colorKey: "--foreground",
    lightValue: "222.2 84% 4.9%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Card",
    colorKey: "--card",
    lightValue: "0 0% 100%",
    darkValue: "222.2 84% 4.9%",
  },
  {
    label: "Card Foreground",
    colorKey: "--card-foreground",
    lightValue: "222.2 84% 4.9%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Popover",
    colorKey: "--popover",
    lightValue: "0 0% 100%",
    darkValue: "222.2 84% 4.9%",
  },
  {
    label: "Popover Foreground",
    colorKey: "--popover-foreground",
    lightValue: "222.2 84% 4.9%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Primary",
    colorKey: "--primary",
    lightValue: "222.2 47.4% 11.2%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Primary Foreground",
    colorKey: "--primary-foreground",
    lightValue: "210 40% 98%",
    darkValue: "222.2 47.4% 11.2%",
  },
  {
    label: "Secondary",
    colorKey: "--secondary",
    lightValue: "210 40% 96.1%",
    darkValue: "217.2 32.6% 17.5%",
  },
  {
    label: "Secondary Foreground",
    colorKey: "--secondary-foreground",
    lightValue: "222.2 47.4% 11.2%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Muted",
    colorKey: "--muted",
    lightValue: "210 40% 96.1%",
    darkValue: "217.2 32.6% 17.5%",
  },
  {
    label: "Muted Foreground",
    colorKey: "--muted-foreground",
    lightValue: "215.4 16.3% 46.9%",
    darkValue: "215 20.2% 65.1%",
  },
  {
    label: "Accent",
    colorKey: "--accent",
    lightValue: "210 40% 96.1%",
    darkValue: "217.2 32.6% 17.5%",
  },
  {
    label: "Accent Foreground",
    colorKey: "--accent-foreground",
    lightValue: "222.2 47.4% 11.2%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Destructive",
    colorKey: "--destructive",
    lightValue: "0 84.2% 60.2%",
    darkValue: "0 62.8% 30.6%",
  },
  {
    label: "Destructive Foreground",
    colorKey: "--destructive-foreground",
    lightValue: "210 40% 98%",
    darkValue: "210 40% 98%",
  },
  {
    label: "Border",
    colorKey: "--border",
    lightValue: "214.3 31.8% 91.4%",
    darkValue: "217.2 32.6% 17.5%",
  },
  {
    label: "Input",
    colorKey: "--input",
    lightValue: "214.3 31.8% 91.4%",
    darkValue: "217.2 32.6% 17.5%",
  },
  {
    label: "Ring",
    colorKey: "--ring",
    lightValue: "222.2 84% 4.9%",
    darkValue: "212.7 26.8% 83.9%",
  },
  {
    label: "Gradient One",
    colorKey: "--gradient-one",
    lightValue: "299 100% 60%",
    darkValue: "299 100% 60%",
  },
  {
    label: "Gradient Two",
    colorKey: "--gradient-two",
    lightValue: "181 80% 60%",
    darkValue: "181 80% 60%",
  },
]

// Helper function to convert the color list to a record object
export function getDefaultColors(mode: "light" | "dark"): Record<string, string> {
  return themeColors.reduce(
    (acc, color) => {
      acc[color.colorKey] = mode === "light" ? color.lightValue : color.darkValue
      return acc
    },
    {} as Record<string, string>,
  )
}

