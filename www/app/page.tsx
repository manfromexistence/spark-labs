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
import { CheckIcon, ChevronRightIcon, MonitorUp, Save, Send, Map, ChevronsRightLeft, CircleDashed, ArrowLeft, X } from "lucide-react";
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

interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 70;
const DEFAULT_DISTANCE = 125;

const dockVariants = cva(
  "mx-auto w-[345px] min-w-max h-[58px] p-2 flex items-end gap-2 rounded-2xl border fixed bottom-5 left-1/2 transform -translate-x-1/2 px-1.5 bg-background",
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
  const [submitBar, setSubmitBar] = useState(false);
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


      {submitBar && <div className="flex-center scale-in-ver-bottom min-h-[500px] w-[345px] rounded-md border fixed bottom-24 left-[calc(50%-172.5px)] transform">
        Submit Bar
      </div>}

      <Dock>
        {/* <Popover>
          <PopoverTrigger asChild>
            <DockIcon>
              <MonitorUp />
            </DockIcon>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            Hello World!
          </PopoverContent>
        </Popover> */}

        {/* <DockIcon>
          <div onClick={() => setSubmitBar(!submitBar)} className={cn("bg-red-500 w-full h-full", submitBar ? "jello-vertical" : "")}>
            {submitBar ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </div>
        </DockIcon> */}


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