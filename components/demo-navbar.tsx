"use client"

import type React from "react"

import { Search, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarLink, NavbarNav } from "@/components/ui/navbar"

export function DemoNavbar({ children }: { children?: React.ReactNode }) {
  return (
    <Navbar>
      {children}
      <NavbarBrand className="mr-4">
        <Link href="#" className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">S</span>
          </div>
          <span className="font-bold">Shadcn</span>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex">
        <NavbarNav>
          <NavbarItem>
            <NavbarLink href="#" active>
              Dashboard
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="#">Projects</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="#">Team</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="#">Settings</NavbarLink>
          </NavbarItem>
        </NavbarNav>
      </NavbarContent>
      <NavbarContent className="ml-auto">
        <Button variant="ghost" size="icon" className="mr-2">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavbarContent>
    </Navbar>
  )
}

