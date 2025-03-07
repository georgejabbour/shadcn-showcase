import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { SavePaletteDialog } from "@/components/save-palette-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
export const metadata: Metadata = {
  title: "Shadcn UI Showcase",
  description:
    "A theme generator and showcase of components built with Shadcn UI and Tailwind CSS",
  keywords: ["shadcn", "ui", "components", "tailwind", "react", "next.js"],
  authors: [
    {
      name: "George Jabbour",
      url: "https://shadcn-showcase.vercel.app/",
    },
  ],
  creator: "George Jabbour",
  publisher: "George Jabbour",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadcn-showcase.vercel.app/",
    title: "Shadcn UI Showcase",
    description:
      "A theme generator and showcase of components built with Shadcn UI and Tailwind CSS",
    siteName: "Shadcn UI Showcase",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn UI Showcase",
    description:
      "A theme generator and showcase of components built with Shadcn UI and Tailwind CSS",
    creator: "@georgejabbour",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            {children}
            <Toaster />
            <ConfirmDialog />
            <SavePaletteDialog />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
