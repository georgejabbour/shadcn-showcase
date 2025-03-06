import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DemoPagination } from "@/components/demo-pagination";
import { DemoNavbar } from "@/components/demo-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigationComponents() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Navbar</h2>
        <div className="border rounded-lg overflow-hidden">
          <DemoNavbar />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-lg mt-2">
            <h3 className="text-lg font-medium mb-2">Tab 1 Content</h3>
            <p>This is the content for Tab 1.</p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-lg mt-2">
            <h3 className="text-lg font-medium mb-2">Tab 2 Content</h3>
            <p>This is the content for Tab 2.</p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-lg mt-2">
            <h3 className="text-lg font-medium mb-2">Tab 3 Content</h3>
            <p>This is the content for Tab 3.</p>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Breadcrumb</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Navigation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Navigation Menu</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and
                          Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">
                          Introduction
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Re-usable components built using Radix UI and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {["Alert Dialog", "Hover Card", "Progress", "Tabs", "Tooltip"].map(
                    (component) => (
                      <li key={component}>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">
                              {component}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              A UI component example.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Pagination</h2>
        <Card>
          <CardHeader>
            <CardTitle>Pagination Examples</CardTitle>
            <CardDescription>
              Different pagination styles and states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemoPagination />
          </CardContent>
        </Card>
      </section>
    </>
  );
} 