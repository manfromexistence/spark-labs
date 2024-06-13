"use client";

// import RainbowText from 'react-rainbow-text';
import RainbowText from "rainbow-text-react";
import Image from "next/image"
import Link from "next/link"
import {
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
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { NextPage } from "next"
import { Input as NextuiInput } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"
import { Button, buttonVariants } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Label } from "@/registry/default/ui/label"
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
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
import { initializeApp } from "firebase/app"
import { useToast } from "@/registry/default/ui/use-toast"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { set } from 'date-fns';
import { useRouter } from 'next/navigation'
const firebaseConfig = {
  apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
  authDomain: "ustudy-96678.firebaseapp.com",
  projectId: "ustudy-96678",
  storageBucket: "ustudy-96678.appspot.com",
  messagingSenderId: "581632635532",
  appId: "1:581632635532:web:51ccda7d7adce6689a81a9",
}

const app = initializeApp(firebaseConfig)
const db: any = getFirestore(app)
const auth = getAuth(app);

import { useOrganization, useSession, useUser } from "@clerk/nextjs";

function Row({
  desc,
  value,
  children,
}: {
  desc: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-[2.125rem] grid grid-cols-2 items-center relative">
      <span className="text-xs font-semibold block flex-shrink-0">{desc}</span>
      <span className="text-xs text-[#7D7D7E] font-mono block relative">
        <span className="block truncate w-full">{value}</span>
        {children}
      </span>
    </div>
  );
}

function PointerC({ label }: { label: string }) {
  return (
    <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-y-1/2 left-full">
      <div className="relative">
        <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
        <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white">
        {label}
      </div>
    </div>
  );
}

// function formatDate(date: Date) {
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function formatDateWithNumbers(date: Date): string {
//   return date.toLocaleString("en-US", {
//     month: "numeric",
//     day: "numeric",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   });
// }

export function UserDetails() {
  const { toast } = useToast()
  const router = useRouter()
  const [userDetailsDialog, setUserDetailsDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState<any>("");
  const [surname, setSurname] = useState("");
  const [untScore, setUntScore] = useState<any>(0);
  const [docs, setDocs] = useState<any>([]);
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
    };
    fetchDocs();
  }, []);


  return (

    <div>
      {docs && docs.map((user: any) => {
        if (user.accountType === "Client") {
          return auth && auth.currentUser && auth.currentUser.uid === user.userId && <div key={user.uid} className="rounded-lg relative w-[750px] flex items-center justify-start">
            <div className="p-8 rounded-xl bg-background shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5 max-w-[25rem]">
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="w-full relative flex justify-center">
                  <img src={user.imageUrl} className="size-20 rounded-full" />
                  <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                    <div className="relative">
                      <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
                      <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                    <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white">
                      user.imageUrl
                    </div>
                  </div>
                </div>
                {user.firstName && user.lastName ? (
                  <h1 className="text-[1.0625rem] font-semibold relative w-full text-center">
                    {user.firstName} {user.lastName}
                    <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                      <div className="relative">
                        <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
                        <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                      </div>
                      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white">
                        user.firstName
                      </div>
                      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white -translate-x-3">
                        user.lastName
                      </div>
                    </div>
                  </h1>
                ) : (
                  <div className="h-4" />
                )}
              </div>

              <div className="px-2.5 bg-[#171720] rounded-lg divide-y divide-border">
                <Row desc="Email" value={user.name}>
                  <PointerC label="user.name" />
                </Row>

                <Row desc="User ID" value={user.id}>
                  <PointerC label="user.user.id" />
                </Row>
              </div>
              <h2 className="mt-6 mb-4 text-[0.9375rem] font-semibold">
                Session details
              </h2>
              <div className="px-2.5 bg-[#171720] rounded-lg divide-y divide-border">
                <Row desc="Session ID" value={user.id}>
                  <PointerC label="session.id" />
                </Row>
                <Row desc="Status" value={user.status}>
                  <PointerC label="session.status" />
                </Row>
                {/* <Row
                  desc="Last active"
                  value={formatDateWithNumbers(user.lastActiveAt)}
                >
                  <PointerC label="session.lastActiveAt" />
                </Row>
                <Row
                  desc="Session expiration"
                  value={formatDateWithNumbers(user.expireAt)}
                >
                  <PointerC label="session.expireAt" />
                </Row> */}
              </div>
              {/* {organization ? (
                <>
                  <h2 className="mt-6 mb-4 text-[0.9375rem] font-semibold">
                    Organization detail
                  </h2>
                  <div className="px-2.5 bg-[#FAFAFB] rounded-lg divide-y divide-[#EEEEF0]">
                    <Row desc="Organization ID" value={organization.id}>
                      <PointerC label="organization.id" />
                    </Row>
                    <Row desc="Name" value={organization.name}>
                      <PointerC label="organization.name" />
                    </Row>
                    <Row desc="Members" value={String(organization.membersCount)}>
                      <PointerC label="organization.membersCount" />
                    </Row>
                    <Row
                      desc="Pending invitations"
                      value={String(organization.pendingInvitationsCount)}
                    >
                      <PointerC label="organization.pendingInvitationsCount" />
                    </Row>
                  </div>
                </>
              ) : null} */}
            </div>
          </div>
        }
        if (user.accountType === "Admin") {
          return auth && auth.currentUser && auth.currentUser.uid === user.userId && <div key={user.uid} className="rounded-lg relative w-[750px] flex items-center justify-center">
            {/* <div className="p-8 rounded-xl bg-background shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5">
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="w-full relative flex justify-center">
                  <div className="mesh-avater h-[150px] w-[150px] rounded-full border"></div>
                  <div className="absolute w-max flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                    <div className="relative">
                      <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
                      <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                    <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white w-max">
                      Your Avatar
                    </div>
                  </div>
                </div>
                {user.firstName && user.lastName ? (
                  <h1 className="text-[1.0625rem] font-semibold relative w-full text-center">
                    {user.firstName} {user.lastName}
                    <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                      <div className="relative">
                        <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
                        <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                      </div>
                      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white">
                        user.firstName
                      </div>
                      <div className="font-mono text-xs bg-primary-foreground px-1.5 py-1 rounded-md text-white -translate-x-3">
                        user.lastName
                      </div>
                    </div>
                  </h1>
                ) : (
                  <div className="h-4" />
                )}
              </div>

              <div className="px-2.5 bg-[#171720] rounded-lg divide-y divide-border">
                <Row desc="Email" value={user.name}>
                  <PointerC label="user.name" />
                </Row>

                <Row desc="User ID" value={user.id}>
                  <PointerC label="user.user.id" />
                </Row>
              </div>
              <h2 className="mt-6 mb-4 text-[0.9375rem] font-semibold">
                Session details
              </h2>
              <div className="px-2.5 bg-[#171720] rounded-lg divide-y divide-border">
                <Row desc="Session ID" value={user.id}>
                  <PointerC label="session.id" />
                </Row>
                <Row desc="Status" value={user.status}>
                  <PointerC label="session.status" />
                </Row>

              </div>
            </div> */}

            <div className="mesh-avater h-[150px] w-[150px] rounded-full border"></div>


          </div>
        }
      })}


      {auth.currentUser ? null : <div className="min-h-[500px] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
        <span className="rainbow-text font-bold text-center">Please Login to see your profile details!</span>
        <Link href="/login" className="">
          <Button>Login</Button>
        </Link>
      </div>}
    </div>


  );
}
