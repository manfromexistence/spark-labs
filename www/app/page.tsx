/* eslint-disable @next/next/no-img-element */
"use client"

import IntroText from "@/components/landing/intro-text";
import Features from "@/components/landing/features";
import Blockquote from "@/components/landing/blockquote";
import Info from "@/components/landing/info";
import WebsiteTab from "@/components/tab";
import { useEffect, useRef, useState } from "react";
import date from 'date-and-time';
import { useEditableProps } from "@udecode/plate-common";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon, MonitorUp, Save, Send, Map, ChevronsRightLeft, CircleDashed, ArrowLeft, X, LayoutDashboard, UserRound, GraduationCap, BookOpenText, Rss, School, LockIcon, MapPinIcon, Instagram } from "lucide-react";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Button } from "@/components/ui/button";
type IconProps = React.HTMLAttributes<SVGElement>;
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { PropsWithChildren } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/registry/default/ui/label";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 70;
const DEFAULT_DISTANCE = 125;

const dockVariants = cva(
  "mx-auto w-[345px] min-w-max h-[58px] p-2 flex items-end gap-2 rounded-2xl border fixed bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 bg-background",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), className)}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  onClick?: any;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  onClick,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      onClick={onClick}
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";


function DockDemo() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Dock
      </span>
      {/* 
      <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <MonitorUp />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <Save />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <Send />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <Map />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <CircleDashed />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <ArrowLeft />
        </div>

        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <ChevronsRightLeft />
        </div> */}

      {/* <Dock>
        <DockIcon>
          <MonitorUp />
        </DockIcon>
        <DockIcon>
          <Save />
        </DockIcon>
        <DockIcon>
          <Save />
        </DockIcon>
        <DockIcon>
          <Map />
        </DockIcon>
        <DockIcon>
          <CircleDashed />
        </DockIcon>
        <DockIcon>
          <ArrowLeft />
        </DockIcon>
        <DockIcon>
          <ChevronsRightLeft />
        </DockIcon>
      </Dock> */}
    </div>
  );
}



export default function Home() {

  const [now, setNow] = useState(new Date());
  // Snap Editor
  const [submitBar, setSubmitBar] = useState(true);
  const [navigationsBar, setNavigationsBar] = useState(false);
  const [detailsBar, setDetailsBar] = useState(false);
  const [moreBar, setMoreBar] = useState(false);
  const [actionsBar, setActionsBar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  function humanReadableTimeDifference(date1: string | number | Date, date2: string | number | Date) {
    // Parse the dates
    let d1: any = new Date(date1);
    let d2: any = new Date(date2);

    // Calculate the difference in milliseconds
    let diff = Math.abs(d2 - d1);

    // Calculate time difference in various units
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let years = Math.floor(days / 365);

    // Construct the human-readable time difference string
    let result = "";
    if (years > 0) result += years + " year(s) ";
    days %= 365;
    if (days > 0) result += days + " day(s) ";
    hours %= 24;
    if (hours > 0) result += hours + " hour(s) ";
    minutes %= 60;
    if (minutes > 0) result += minutes + " minute(s) ";
    seconds %= 60;
    if (seconds > 0) result += seconds + " second(s)";

    return result;
  }


  let date1 = "2024/05/31 11:54:25";
  let date2 = "2024/06/01 12:00:00";


  return (
    <>
      {/* <div className="bg-background">
        <main className="isolate min-h-full w-full">



          <div className="relative pt-14 pb-32">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="py-12 sm:py-0">
              <IntroText />
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <Info />

          <Features />

          <div className="mx-auto my-32 max-w-7xl sm:mt-16 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden  px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
              <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
              <div
                className="absolute -left-80 -top-56 transform-gpu blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>
              <div
                className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>

              <Blockquote />
            </div>
          </div>

        </main>
      </div> */}

      {/* <div className="flex flex-row items-center justify-center space-x-3 h-16 w-fit rounded-md border fixed bottom-5 left-1/2 transform -translate-x-1/2 px-1.5">
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <MonitorUp />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <Save />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <Send />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <Map />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <CircleDashed />
        </div>
        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <ArrowLeft />
        </div>

        <div className="flex-center border rounded-md h-[50px] w-[50px] hover:bg-primary hover:text-primary-foreground">
          <ChevronsRightLeft />
        </div>

      </div> */}


      {submitBar && <div className="scale-in-ver-bottom min-h-[500px] w-[345px] rounded-md fixed bottom-12 left-[calc(50%-172.5px)] transform flex items-end ">
        {/* <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Submit Project</CardTitle>
            <CardDescription>Enter your project details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter project description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full hover:bg-primary-foreground hover:text-primary">
              <Send className="h-4 w-4 mr-2" />
              Submit Project
            </Button>
          </CardContent>
        </Card> */}
        {/* <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
          <Link href='/dashboard' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Dashboard</span>
            <LayoutDashboard className="h-4 w-4" />
          </Link>
          <Link href='/classrooms' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Classrooms</span>
            <School className="h-4 w-4" />
          </Link>
          <Link href='/submissions' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Submissions</span>
            <Rss className="h-4 w-4" />
          </Link>
          <Link href='/teachers' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Teachers</span>
            <GraduationCap className="h-4 w-4" />
          </Link>
          <Link href='/students' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Students</span>
            <BookOpenText className="h-4 w-4" />
          </Link>
          <Link href='/profile' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Profile</span>
            <UserRound className="h-4 w-4" />
          </Link>
        </div> */}

        {/* <div className="h-full w-full p-3 border rounded-md flex flex-col space-y-3 pb-12 !font-mono !tracking-tighter">
          <Link href='/dashboard' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Submit Project</span>
            <Send className="h-4 w-4" />
          </Link>
          <Link href='/classrooms' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Load Old Project</span>
            <MonitorUp className="h-4 w-4" />
          </Link>
          <Link href='/submissions' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Save Project</span>
            <Save className="h-4 w-4" />
          </Link>
          <Link href='/teachers' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Navigate Or Explore</span>
            <Map className="h-4 w-4" />
          </Link>
          <Link href='/students' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>User Details</span>
            <CircleDashed className="h-4 w-4" />
          </Link>
          <Link href='/profile' className="flex items-center w-full justify-between p-3 border rounded-md hover:bg-primary hover:text-primary-foreground">
            <span>Perfome Actions</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div> */}
        {/* <Card className="mx-auto w-full bg-background rounded-xl overflow-hidden shadow-lg pb-5 font-mono tracking-tighter">
          <CardHeader className="bg-primary-foreground text-primary px-6 py-4 flex items-center">
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>HF</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-lg font-semibold">Hareem Fatima</div>
              <div className="text-foreground text-xs text-center w-full">@hareemfatima</div>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-5 grid gap-4 ">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <LockIcon className="w-5 h-5 text-foreground" />
                <span className="text-foreground">Password</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">********</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-foreground" />
                <span className="text-foreground">Region</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">New York, USA</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5" />
                <span className="text-foreground">Instagram</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">@johndoe</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <YouTube className="w-5 h-5" />
                <span className="text-foreground">YouTube</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">John Doe</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5" />
                <span className="text-foreground">Facebook</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">John Doe</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5" />
                <span className="text-foreground">Twitter</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">@johndoe</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Messenger className="w-5 h-5" />
                <span className="text-foreground">Messenger</span>
              </div>
              <div className="text-right text-muted-foreground text-sm italic font-sans">@johndoe</div>
            </div>
          </CardContent>
        </Card> */}


      </div>}

      <Dock>
        <DockIcon onClick={() => setSubmitBar(!submitBar)} className={cn("bg-red-500", submitBar ? "jello-vertical" : "")}>
          {submitBar ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </DockIcon>
        <DockIcon>
          <MonitorUp className="h-4 w-4" />
        </DockIcon>
        <DockIcon>
          <Save className="h-4 w-4" />
        </DockIcon>
        <DockIcon>
          <Map className="h-4 w-4" />
        </DockIcon>
        <DockIcon>
          <CircleDashed className="h-4 w-4" />
        </DockIcon>
        <DockIcon>
          <ArrowLeft className="h-4 w-4" />
        </DockIcon>
        <DockIcon>
          <ChevronsRightLeft className="h-4 w-4" />
        </DockIcon>
      </Dock>
    </>
  );
}


import type { SVGProps } from "react";
// const Instagram = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}><path fill="#0A0A08" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z" /></svg>;
const Facebook = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="url(#a)" height="1em" width="1em" {...props}><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a"><stop offset="0%" stopColor="#0062E0" /><stop offset="100%" stopColor="#19AFFF" /></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" /><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" /></svg>;
const YouTube = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 180" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" fill="red" /><path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" /></svg>;
const Twitter = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 209" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee" /></svg>;
const Messenger = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" {...props}><defs><radialGradient id="a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%"><stop offset="0%" stopColor="#09F" /><stop offset="60.975%" stopColor="#A033FF" /><stop offset="93.482%" stopColor="#FF5280" /><stop offset="100%" stopColor="#FF7061" /></radialGradient></defs><path fill="url(#a)" d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835 2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92 72.106 0 128-52.818 128-124.16S200.106 0 128 0Z" /><path fill="#FFF" d="m51.137 160.47 37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z" /></svg>;
