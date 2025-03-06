"use client";

import {
  BarChart3,
  ChevronDown,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Settings,
  Users,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function DemoSidebar() {
  return (
    <Sidebar className="h-screen sticky top-0">
      <SidebarHeader className="flex h-14 items-center border-b px-4 bg-background">
        {/* Remove the Shadcn branding from here since it's in the navbar */}
        <span className="text-2xl text-muted-foreground group-data-[collapsible=icon]:hidden">
          Shadcn UI Styler
        </span>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Home className="size-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Home
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboard className="size-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Dashboard
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Analytics Collapsible */}
            <Collapsible defaultOpen className="w-full">
              <SidebarMenuItem className="flex flex-col items-start">
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-start group-data-[collapsible=icon]:hidden">
                    Analytics
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full pl-4 group-data-[collapsible=icon]:hidden">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Reports</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Metrics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Users Collapsible */}
            <Collapsible defaultOpen className="w-full">
              <SidebarMenuItem className="flex flex-col items-start">
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Users className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-start group-data-[collapsible=icon]:hidden">
                    Users
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full pl-4 group-data-[collapsible=icon]:hidden">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>All Users</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Teams</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Permissions</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Package className="size-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Products
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            {/* Settings Collapsible */}
            <Collapsible defaultOpen className="w-full">
              <SidebarMenuItem className="flex flex-col items-start">
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Settings className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-start group-data-[collapsible=icon]:hidden">
                    Settings
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full pl-4 group-data-[collapsible=icon]:hidden">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>General</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Security</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <span>Notifications</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LifeBuoy className="size-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Help & Support
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 bg-background">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">
              john@example.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
