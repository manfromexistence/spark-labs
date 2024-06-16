"use client"

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "./style.css";
import Script from 'next/script';
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
import { CheckIcon, ChevronRightIcon, MonitorUp, Save, Send, Map, ChevronsRightLeft, CircleDashed, ArrowLeft, X, LayoutDashboard, UserRound, GraduationCap, BookOpenText, Rss, School, LockIcon, MapPinIcon, Instagram, ArrowUpFromDot, Key, Mail } from "lucide-react";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/registry/default/ui/use-toast"
import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore"
import type { SVGProps } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
  authDomain: "snap-workspace.firebaseapp.com",
  projectId: "snap-workspace",
  storageBucket: "snap-workspace.appspot.com",
  messagingSenderId: "1092527848130",
  appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
  measurementId: "G-JVEZGJHL8H"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Database
const db: any = getFirestore(app)
const auth = getAuth(app);
type IconProps = React.HTMLAttributes<SVGElement>;






interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 70;
const DEFAULT_DISTANCE = 125;

const dockVariants = cva(
  " mx-auto w-[345px] min-w-max h-[58px] p-2 flex items-end gap-2 rounded-2xl border fixed bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 bg-background",
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

const scripts = [
    "/snap/morphic.js",
    "/snap/symbols.js",
    "/snap/widgets.js",
    "/snap/blocks.js",
    "/snap/threads.js",
    "/snap/objects.js",
    "/snap/scenes.js",
    "/snap/gui.js",
    "/snap/paint.js",
    "/snap/lists.js",
    "/snap/byob.js",
    "/snap/tables.js",
    "/snap/sketch.js",
    "/snap/video.js",
    "/snap/maps.js",
    "/snap/extensions.js",
    "/snap/xml.js",
    "/snap/store.js",
    "/snap/locale.js",
    "/snap/cloud.js",
    "/snap/api.js",
    "/snap/sha512.js",
    "/snap/FileSaver.min.js"
];
declare var WorldMorph: any;
declare var IDE_Morph: any;

export default function Page({ params }: { params: { slug: string } }) {
    const worldRef = useRef<HTMLCanvasElement | null>(null);
    let lastTime = 0;
    // let WorldMorph:any= window.WorldMorph;
    // let IDE_Morph:any= window.IDE_Morph;

    useEffect(() => {
        if (worldRef.current) {
            const world = new WorldMorph(worldRef.current);
            new IDE_Morph().openIn(world);

            const loop = (timestamp: number) => {
                requestAnimationFrame(loop);
                if (timestamp - lastTime < 1000 / 67) {
                    return;
                }
                world.doOneCycle();
                lastTime = Math.max(
                    lastTime + 1000 / 67,
                    timestamp - 1000 / 67
                );
            };

            requestAnimationFrame(loop);
        }
    }, []);

    return (
        <>
            {scripts.map((src, index) => (
                <Script key={index} strategy="beforeInteractive" src={src} />
            ))}
            {/* <div>My Post: {params.slug}</div> */}
            <canvas id="world" tabIndex={1} style={{ position: 'absolute' }} ref={worldRef}></canvas>
        </>
    )
}