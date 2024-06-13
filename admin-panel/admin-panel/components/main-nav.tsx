"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/registry/new-york/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {/* <Link
          href="/home"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/home" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
          
        </Link> */}
        {/* <Link
          href="/home"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/home" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link> */}
        <Link
          href="/universities"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/universities" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Universities
        </Link>
        <Link
          href="/specialties"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/specialties" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Specialties
        </Link>
        <Link
          href="/questions"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/questions" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Questions
        </Link>
        <Link
          href="/supports"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/supports" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Supports
        </Link>
        {/* <Link
          href="/profile"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/profile" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Profile
        </Link> */}
        {/* <Link
          href="/profile"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/profile" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Profile
        </Link> */}
        {/* <Link
          href="/settings"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/settings" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Settings
        </Link> */}
        {/* <Link
          href="/whiteboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/whiteboard" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Whiteboard
        </Link>
        <Link
          href="/planner"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/planner" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Planner
        </Link> */}
        {/* <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link> */}
      </nav>
    </div>
  )
}
