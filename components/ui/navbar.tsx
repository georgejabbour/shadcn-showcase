import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(({ className, children, ...props }, ref) => {
  return (
    <nav ref={ref} className={cn("flex h-14 items-center border-b bg-background px-4 md:px-6", className)} {...props}>
      {children}
    </nav>
  )
})
Navbar.displayName = "Navbar"

const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex items-center gap-2 md:gap-3", className)} {...props} />
  },
)
NavbarBrand.displayName = "NavbarBrand"

const NavbarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex items-center gap-4 md:gap-6", className)} {...props} />
  },
)
NavbarContent.displayName = "NavbarContent"

const NavbarItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return <li ref={ref} className={cn("", className)} {...props} />
  },
)
NavbarItem.displayName = "NavbarItem"

const NavbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & {
    active?: boolean
  }
>(({ className, active, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        active ? "text-foreground" : "text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
})
NavbarLink.displayName = "NavbarLink"

const NavbarNav = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => {
    return <ul ref={ref} className={cn("flex items-center gap-4 md:gap-6", className)} {...props} />
  },
)
NavbarNav.displayName = "NavbarNav"

export { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarLink, NavbarNav }

