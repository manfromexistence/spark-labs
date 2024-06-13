"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs"
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users2,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { CardsReportIssue } from "@/registry/default/example/cards/report-issue"
import { buttonVariants } from "@/registry/new-york/ui/button"










// import type { SVGProps } from "react";
// const Twitter = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 209" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee" /></svg>;
// export default Twitter;

export function SiteHeader() {
  const { sessionId } = useAuth();
  return (
    <header className="navbar h-[4.5rem] flex items-center justify-center z-10 sticky top-0 w-full bg-background/80 backdrop-blur-2xl border-b">
      <div className="w-full flex h-14 items-center justify-center lg:px-[3%] px-10">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {!sessionId && (
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
          )}

          <nav className="flex items-center">
            {!sessionId ? (
              <>
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "w-9 px-0"
                    )}
                  >
                    <Icons.twitter className="h-3 w-3 fill-current" />
                    <span className="sr-only">Twitter</span>
                  </div>
                </Link>

                <ModeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-9 px-0">
                      {/* <Image
                      alt="User"
                      className="aspect-square rounded-full object-cover"
                      height="23"
                      src="/Ustudy.jpg"
                      width="23"
                    /> */}
                      <User className="h-5 w-5" />
                    </Button>
                    
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="!z-[10000000000000000000000000000000000000000000000000000000000000000000] w-[250px]"
                  >
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-in">
                        SignIn
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-up">
                        SignUp
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-up">
                        Freelancer
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-up">
                        Upwork
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-up">
                        Fiverr
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-up">
                        Youtube
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/sign-up">
                        Discord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/whiteboard">
                        Whiteboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full text-left" href="/planner">
                        Planner
                      </Link>
                    </DropdownMenuItem>

                    {/*
                  ring-offset-background ring-2 ring-ring ring-offset-2
                  <DropdownMenuItem>View Database</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem> */}
                    {/* <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem> */}
                  </DropdownMenuContent>

                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Feedback</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[425px] border-none !p-0">
                    <CardsReportIssue />
                  </PopoverContent>
                </Popover>

                <Button variant="outline">
                  <OrganizationSwitcher
                    appearance={{
                      elements: {
                        organizationPreviewAvatarBox: "size-8",
                      },
                    }}
                  />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    {/* <Button variant="outline">Open popover</Button> */}
                    <div className="rounded-full border p-2">
                      <Bell className="w-4 h-4" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[425px] p-3">
                    {/* <CardsReportIssue />
                    <CardsCookieSettings /> */}
                    {/* <Notifications /> */}
                    <Tabs defaultValue="week">
                      <div className="flex items-center">
                        <TabsList>
                          <TabsTrigger value="week">All</TabsTrigger>
                          <TabsTrigger value="month">Archive</TabsTrigger>
                          <TabsTrigger value="year">Comments</TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1 text-sm"
                              >
                                <Settings className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only">
                                  Settings
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuCheckboxItem checked>
                                Fulfilled
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem>
                                Declined
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem>
                                Refunded
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {/* <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                          >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Export</span>
                          </Button> */}
                        </div>
                      </div>
                      <TabsContent value="week">
                        <Card x-chunk="dashboard-05-chunk-3">
                          <CardHeader className="px-7">
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                              Recent orders from your store.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Customer</TableHead>
                                  <TableHead className="hidden sm:table-cell">
                                    Type
                                  </TableHead>
                                  <TableHead className="hidden sm:table-cell">
                                    Status
                                  </TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Date
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Amount
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="bg-accent">
                                  <TableCell>
                                    <div className="font-medium">
                                      Liam Johnson
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      liam@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Sale
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Fulfilled
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-23
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $250.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Olivia Smith
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      olivia@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Refund
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="outline"
                                    >
                                      Declined
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-24
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $150.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Noah Williams
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      noah@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Subscription
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Fulfilled
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-25
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $350.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Emma Brown
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      emma@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Sale
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Fulfilled
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-26
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $450.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Liam Johnson
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      liam@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Sale
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Fulfilled
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-23
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $250.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Liam Johnson
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      liam@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Sale
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Fulfilled
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-23
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $250.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Olivia Smith
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      olivia@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Refund
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="outline"
                                    >
                                      Declined
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-24
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $150.00
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <div className="font-medium">
                                      Emma Brown
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      emma@example.com
                                    </div>
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    Sale
                                  </TableCell>
                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Fulfilled
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    2023-06-26
                                  </TableCell>
                                  <TableCell className="text-right">
                                    $450.00
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </PopoverContent>
                </Popover>

                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-8",
                    },
                  }}
                />
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
