"use client"

import { Filter } from "lucide-react"
import Component from "@/components/specialty-page/component"
// import FrameComponent from "@/components/specialty-page/frame-component"

/* eslint-disable tailwindcss/no-contradicting-classname */

import type { NextPage } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"

import React, { ReactNode, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"

import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import { cva, type VariantProps } from "class-variance-authority"
import Autoplay from "embla-carousel-autoplay"
import { Tag, TagInput } from "emblor"
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
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronsUpDown,
  CloudUpload,
  File,
  GlobeIcon,
  Home,
  LineChart,
  ListFilter,
  Loader2,
  LocateIcon,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  Plus,
  PlusCircle,
  Projector,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  X,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button as AnimatedButton } from "@/components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import { toast, useToast } from "@/registry/default/ui/use-toast"

// Firebase Configurations
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



// const SpecialtyPage: NextPage = () => {

//   const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
//   const [resultsTag, setResultslTag] = React.useState<any[]>([])
//   const [answersTag, setAnswersTag] = React.useState<any[]>([])
//   const [docs, setDocs] = useState<any[]>([])
//   const [lastDoc, setLastDoc] = useState<any>(null)
//   const [loading, setLoading] = useState(false)
//   const plugin = React.useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: true })
//   )
//   const [api, setApi] = React.useState<CarouselApi>()
//   const [current, setCurrent] = React.useState(0)
//   const [count, setCount] = React.useState(0)
//   const buttonRef = useRef<HTMLButtonElement | null>(null)
//   const handleConfetti = async () => {
//     const { clientWidth, clientHeight } = document.documentElement
//     const boundingBox = buttonRef.current?.getBoundingClientRect?.()
//     const targetY = boundingBox?.y ?? 0
//     const targetX = boundingBox?.x ?? 0
//     const targetWidth = boundingBox?.width ?? 0
//     const targetCenterX = targetX + targetWidth / 2
//     const confetti = (await import("canvas-confetti")).default
//     confetti({
//       zIndex: 999,
//       particleCount: 10000,
//       spread: 70,
//       origin: {
//         y: targetY / clientHeight,
//         x: targetCenterX / clientWidth,
//       },
//     })
//   }
//   const [inputedValues, setInputedValues] = React.useState(false)
//   const [sheetToggle, setSheetToggle] = React.useState(false)
//   const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true)
//   const [isOpen, setIsOpen] = React.useState(false)
//   const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
//   const containerRef = useRef(null)
//   const initialValue = [
//     {
//       id: "1",
//       type: ELEMENT_PARAGRAPH,
//       children: [{ text: "Hello, World!" }],
//     },
//   ]
//   const [phone, setPhone] = React.useState("+1 (408) 996–1010")
//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPhone(e.target.value)
//   }
//   function showPhoneNumberDetails() {
//     setPhoneNumberDetails(!phoneNumberDetails)
//   }

//   const [inputedRuralQuota1, setInputedRuralQuota1] = React.useState("")
//   const [inputedRuralQuota2, setInputedRuralQuota2] = React.useState("")
//   const [inputedRuralQuota3, setInputedRuralQuota3] = React.useState("")
//   const [inputedLevel, setInputedLevel] = React.useState("")
//   const [inputedOrphanQuota2, setInputedOrphanQuota2] = React.useState("")
//   const [inputedDisabilitiesQuota2, setInputedDisabilitiesQuota2] =
//     React.useState("")
//   const [inputedOrphanQuota3, setInputedOrphanQuota3] = React.useState("")
//   const [inputedGeneralCompetition1, setInputedGeneralCompetition1] =
//     React.useState("")
//   const [inputedLargeFamiliesQuota2, setInputedLargeFamiliesQuota2] =
//     React.useState("")
//   const [inputedGeneralCompetition2, setInputedGeneralCompetition2] =
//     React.useState("")
//   const [inputedGeneralCompetition3, setInputedGeneralCompetition3] =
//     React.useState("")
//   const [inputedSpecialtyCode, setInputedSpecialtyCode] = React.useState("")
//   const [inputedDisabilitiesQuota1, setInputedDisabilitiesQuota1] =
//     React.useState("")
//   const [inputedAverageSalary, setInputedAverageSalary] = React.useState("")
//   const [inputedSubjects, setInputedSubjects] = React.useState("")
//   const [inputedLargeFamiliesQuota1, setInputedLargeFamiliesQuota1] =
//     React.useState("")
//   const [inputedThreshold, setInputedThreshold] = React.useState("")
//   const [inputedSpecialtyName, setInputedSpecialtyName] = React.useState("")
//   const [inputedDisabilitiesQuota3, setInputedDisabilitiesQuota3] =
//     React.useState("97")
//   const [inputedOrphanQuota1, setInputedOrphanQuota1] = React.useState("")
//   const [inputedUniversities, setInputedUniversities] = React.useState("")
//   const [inputedLargeFamiliesQuota3, setInputedLargeFamiliesQuota3] =
//     React.useState("")
//   const [inputedAvailableGrantCount, setInputedAvailableGrantCount] =
//     React.useState("")
//   const [inputedDemandForSpecialty, setInputedDemandForSpecialty] =
//     React.useState("")

//   const handleRuralQuota1Change = (event: any) => {
//     setInputedRuralQuota1(event.target.value)
//   }

//   const handleRuralQuota2Change = (event: any) => {
//     setInputedRuralQuota2(event.target.value)
//   }

//   const handleRuralQuota3Change = (event: any) => {
//     setInputedRuralQuota3(event.target.value)
//   }

//   const handleLevelChange = (event: any) => {
//     setInputedLevel(event.target.value)
//   }

//   const handleOrphanQuota2Change = (event: any) => {
//     setInputedOrphanQuota2(event.target.value)
//   }

//   const handleDisabilitiesQuota2Change = (event: any) => {
//     setInputedDisabilitiesQuota2(event.target.value)
//   }

//   const handleOrphanQuota3Change = (event: any) => {
//     setInputedOrphanQuota3(event.target.value)
//   }

//   const handleGeneralCompetition1Change = (event: any) => {
//     setInputedGeneralCompetition1(event.target.value)
//   }

//   const handleLargeFamiliesQuota2Change = (event: any) => {
//     setInputedLargeFamiliesQuota2(event.target.value)
//   }

//   const handleGeneralCompetition2Change = (event: any) => {
//     setInputedGeneralCompetition2(event.target.value)
//   }

//   const handleGeneralCompetition3Change = (event: any) => {
//     setInputedGeneralCompetition3(event.target.value)
//   }

//   const handleSpecialtyCodeChange = (event: any) => {
//     setInputedSpecialtyCode(event.target.value)
//   }

//   const handleDisabilitiesQuota1Change = (event: any) => {
//     setInputedDisabilitiesQuota1(event.target.value)
//   }

//   const handleAverageSalaryChange = (event: any) => {
//     setInputedAverageSalary(event.target.value)
//   }

//   const handleSubjectsChange = (event: any) => {
//     setInputedSubjects(event.target.value)
//   }

//   const handleLargeFamiliesQuota1Change = (event: any) => {
//     setInputedLargeFamiliesQuota1(event.target.value)
//   }

//   const handleThresholdChange = (event: any) => {
//     setInputedThreshold(event.target.value)
//   }

//   const handleSpecialtyNameChange = (event: any) => {
//     setInputedSpecialtyName(event.target.value)
//   }

//   const handleDisabilitiesQuota3Change = (event: any) => {
//     setInputedDisabilitiesQuota3(event.target.value)
//   }

//   const handleOrphanQuota1Change = (event: any) => {
//     setInputedOrphanQuota1(event.target.value)
//   }

//   const handleUniversitiesChange = (event: any) => {
//     setInputedUniversities(event.target.value)
//   }

//   const handleLargeFamiliesQuota3Change = (event: any) => {
//     setInputedLargeFamiliesQuota3(event.target.value)
//   }

//   const handleAvailableGrantCountChange = (event: any) => {
//     setInputedAvailableGrantCount(event.target.value)
//   }

//   const handleDemandForSpecialtyChange = (event: any) => {
//     setInputedDemandForSpecialty(event.target.value)
//   }

//   const [loadingMore, setLoadingMore] = React.useState(false)
//   const [inputedName, setInputedName] = React.useState("")
//   const [inputedEmail, setInputedEmail] = React.useState("")
//   const [inputedStatus, setInputedStatus] = React.useState("")
//   const [inputedFacebook, setInputedFacebook] = React.useState("")
//   const [inputedInstragam, setInputedInstragam] = React.useState("")
//   const [inputedCost, setInputedCost] = React.useState("")
//   const [inputedWebsite, setInputedWebsite] = React.useState("")
//   const [inputedCode, setInputedCode] = React.useState("")
//   const [inputedHostel, setInputedHostel] = React.useState("")
//   const [inputedMilitary, setInputedMilitary] = React.useState("")
//   const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
//   const [inputedLogo, setInputedLogo] = React.useState("")
//   const [inputedDescription, setInputedDescription] = React.useState("")
//   const [inputedImages, setInputedImages] = React.useState([])
//   const handleNameChange = (event: any) => {
//     setInputedName(event.target.value)
//   }
//   const handleEmailChange = (event: any) => {
//     setInputedEmail(event.target.value)
//   }
//   const handleStatusChange = (event: any) => {
//     setInputedStatus(event)
//   }
//   const handleFacebookChange = (event: any) => {
//     setInputedFacebook(event.target.value)
//   }
//   const handleInstagramChange = (event: any) => {
//     setInputedInstragam(event.target.value)
//   }
//   const handleCostChange = (event: any) => {
//     setInputedCost(event.target.value)
//   }
//   const handleWebsiteChange = (event: any) => {
//     setInputedWebsite(event.target.value)
//   }
//   const handleCodeChange = (event: any) => {
//     setInputedCode(event.target.value)
//   }
//   const handleHostelChange = (event: any) => {
//     setInputedHostel(event)
//   }
//   const handleMilitaryChange = (event: any) => {
//     setInputedMilitary(event)
//   }
//   const handleDescriptionChange = (event: any) => {
//     setInputedDescription(JSON.stringify(event))
//   }
//   const handleInputedValues = () => {
//     setInputedValues(!inputedValues)
//   }
//   const handleMainQuestion = (event: any) => {
//     setInputedMainQuestion(event.target.value)
//   }

//   // This page
//   React.useEffect(() => {
//     if (!api) {
//       return
//     }
//     setCount(api.scrollSnapList().length)
//     setCurrent(api.selectedScrollSnap() + 1)

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1)
//     })
//   }, [api])
//   useEffect(() => {
//     const fetchDocs = async () => {
//       setLoading(true)
//       const q = query(collection(db, "questions"), limit(8))
//       const querySnapshot = await getDocs(q)
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       setDocs(newDocs)
//       // Configuring Data for Update:
//       docs.map((item: any) => {
//         setInputedMainQuestion(item.mainQuestion)
//         setAnswersTag(item.answers)
//         setResultslTag(item.results)
//       })
//       setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
//       setLoading(false)
//     }
//     fetchDocs()
//   }, [])

//   const loadMore = async () => {
//     setLoading(true)

//     const q = query(collection(db, "questions"), startAfter(lastDoc), limit(8))
//     const querySnapshot = await getDocs(q)
//     if (querySnapshot.docs.length === 0) {
//       toast({
//         title: "There is no more data in the database.",
//         description: (
//           <div className="bg-primary-foreground mt-2 w-[340px] rounded-md p-4">
//             <span>Please add more data to load more!</span>
//           </div>
//         ),
//       })
//       setLoading(false)
//       return
//     }
//     const newDocs = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }))
//     setDocs([...docs, ...newDocs])
//     setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
//     setLoading(false)
//   }

//   if (loading) {
//     return (
//       <main className="h-auto w-full px-[5%] py-5">
//         <div className="mb-6 flex items-center justify-between">
//           <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
//             Questions
//           </span>
//         </div>
//         <div className="admin-panel-lists-loading place-content-center">
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//           <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
//             <Skeleton className="h-[225px] w-full rounded-xl" />
//             <div className="space-y-2">
//               <Skeleton className="h-7 w-full" />
//               <Skeleton className="h-7 w-full" />
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <div>
//       <main className="h-auto min-h-[90vh] w-full px-[5%] py-5 pb-7">
//         <div className="mb-6 flex items-center justify-between">
//           <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
//             Questions
//           </span>
//           <Link href="/create-question">
//             <Button size="sm">Add New Question</Button>
//           </Link>
//         </div>
//         <div className="admin-panel-lists place-content-center">
//           {docs.map((items) => (
//             <div key={items.id}>
//               <Card className="hover-glow-border bg-primary-foreground relative w-full">
//                 <CardHeader>
//                   <CardTitle>{items.mainQuestion}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid gap-4">
//                     {items.answers.length > 0 ? (
//                       <div className="space-y-3">
//                         {items.answers.map((index: any) => {
//                           return (
//                             <div
//                               key={index}
//                               className="flex items-center justify-between rounded-lg border p-3"
//                             >
//                               <div>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                                   {index}
//                                 </p>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Button size="icon" variant="ghost">
//                                   {/* <CheckIcon className="size-5" /> */}
//                                 </Button>
//                               </div>
//                             </div>
//                           )
//                         })}
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between rounded-lg border p-3">
//                         <div>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             No Answers are provided.
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Button size="icon" variant="ghost">
//                             {/* <CheckIcon className="size-5" /> */}
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex flex-col items-start justify-start gap-2">
//                   {items.results.length > 0 ? (
//                     <div className="flex w-full items-center gap-2">
//                       {items.results.map((index: any) => {
//                         return (
//                           <Badge
//                             key={index}
//                             variant="outline"
//                             className="text-center text-xs"
//                           >
//                             {index}
//                           </Badge>
//                         )
//                       })}
//                     </div>
//                   ) : (
//                     <div className="flex w-full items-center gap-2">
//                       <Badge variant="outline">Nothing</Badge>
//                     </div>
//                   )}
//                   <div className="mt-3 flex w-full justify-between gap-2">
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button variant="outline">View</Button>
//                       </DialogTrigger>
//                       <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
//                         <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg border p-3 text-sm">
//                           <div className="flex gap-2 p-3">
//                             <p>MainQuestion: </p>
//                             <span className="font-semibold">
//                               {items.mainQuestion ||
//                                 "No Main Questing is Provided."}
//                             </span>
//                           </div>
//                           <Separator />
//                           <div className="flex gap-2 p-3">
//                             <p>Answers: </p>
//                             <span className="font-semibold">
//                               {JSON.stringify(items.answers, null, 2) ||
//                                 "No Main Questing is Provided."}
//                             </span>
//                           </div>
//                           <Separator />
//                           <div className="flex gap-2 p-3">
//                             <p>Results: </p>
//                             <span className="font-semibold">
//                               {JSON.stringify(items.results, null, 2) ||
//                                 "No Main Questing is Provided."}
//                             </span>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>

//                     <div className="flex gap-2">
//                       <Sheet>
//                         <SheetTrigger asChild>
//                           <Button onClick={handleConfetti} variant="default">
//                             Update
//                           </Button>
//                         </SheetTrigger>
//                         <SheetContent
//                           side={"bottom"}
//                           className="mx-auto h-[90vh] !max-w-[1600px] rounded-xl"
//                         >
//                           <ScrollArea className="size-full rounded-md border">
//                             <div className="create-university min-h-screen !min-w-full space-y-3 p-10 pt-3 lg:flex lg:!min-w-[1500px] lg:flex-col">
//                               <div className="action my-3 hidden w-full items-center justify-between lg:flex ">
//                                 <div className="flex size-full items-start justify-start space-x-3">
//                                   <Link href="/questions" className="z-50">
//                                     <AnimatedButton
//                                       variant="expandIcon"
//                                       Icon={ArrowLeftIcon}
//                                       iconPlacement="left"
//                                       className="border-input bg-background hover:bg-accent text-accent-foreground border"
//                                     >
//                                       Back
//                                     </AnimatedButton>
//                                   </Link>
//                                   <AnimatedButton
//                                     onClick={handleInputedValues}
//                                     variant="expandIcon"
//                                     Icon={Projector}
//                                     iconPlacement="left"
//                                     className="border-input bg-background hover:bg-accent text-accent-foreground border"
//                                   >
//                                     {inputedValues ? "Hide" : "Show"} Inputed
//                                     Values
//                                   </AnimatedButton>
//                                 </div>

//                                 <div className="flex size-full items-end justify-end space-x-3">
//                                   {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
//                                                                 Sync Uploaded Files
//                                                             </AnimatedButton> */}
//                                   <Button
//                                     className="!py-0"
//                                     // disabled={createButtonDisabled}
//                                     onClick={async () => {
//                                       const { clientWidth, clientHeight } =
//                                         document.documentElement
//                                       const boundingBox =
//                                         buttonRef.current?.getBoundingClientRect?.()
//                                       const targetY = boundingBox?.y ?? 0
//                                       const targetX = boundingBox?.x ?? 0
//                                       const targetWidth =
//                                         boundingBox?.width ?? 0
//                                       const targetCenterX =
//                                         targetX + targetWidth / 2
//                                       const confetti = (
//                                         await import("canvas-confetti")
//                                       ).default
//                                       confetti({
//                                         zIndex: 999,
//                                         particleCount: 100,
//                                         spread: 70,
//                                         origin: {
//                                           y: targetY / clientHeight,
//                                           x: targetCenterX / clientWidth,
//                                         },
//                                       })

//                                       const updateRef = doc(
//                                         db,
//                                         "questions",
//                                         items.id
//                                       )
//                                       const Update: any = await updateDoc(
//                                         updateRef,
//                                         {
//                                           mainQuestion: inputedMainQuestion,
//                                           answers: answersTag.map(
//                                             (obj) => obj.text
//                                           ),
//                                           results: resultsTag.map(
//                                             (obj) => obj.text
//                                           ),
//                                         }
//                                       )

//                                       toast({
//                                         title:
//                                           "University has been Updated Successfully.",
//                                         description: (
//                                           <div className="bg-primary-foreground mt-2 w-[340px] rounded-md p-4">
//                                             <span>
//                                               You Can now view and delete this
//                                               university!
//                                             </span>
//                                             <pre className="bg-background max-h-[500px] overflow-auto">
//                                               {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
//                                             </pre>
//                                           </div>
//                                         ),
//                                       })

//                                       // setSheetToggle(!sheetToggle)
//                                       // router.push('/specialities')
//                                       // setSheetToggle(true)

//                                       // console.log("Document written with ID: ", Update.id);
//                                       // const newDocs = docs.filter((item) => item.id !== items.id);
//                                       // setDocs(newDocs);
//                                       // fetchDocs()
//                                     }}
//                                   >
//                                     {/* {
//                                                                     createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                                                 } */}
//                                     Update
//                                   </Button>
//                                 </div>
//                               </div>

//                               {inputedValues && (
//                                 <div className="!mb-3 flex w-max min-w-full flex-col gap-2 rounded-lg border p-3 text-sm">
//                                   <div className="flex gap-2 p-3">
//                                     <p>MainQestion: </p>
//                                     <span className="font-semibold">
//                                       {inputedMainQuestion ||
//                                         "No MainQestion is Provided."}
//                                     </span>
//                                   </div>
//                                   <Separator />
//                                   <div className="flex gap-2 p-3">
//                                     <p>Answers: </p>
//                                     <span className="font-semibold">
//                                       {JSON.stringify(answersTag, null, 2) ||
//                                         "No Answers is Provided."}
//                                     </span>
//                                   </div>
//                                   <Separator />
//                                   <div className="flex gap-2 p-3">
//                                     <p>Results: </p>
//                                     <span className="font-semibold">
//                                       {JSON.stringify(resultsTag, null, 2) ||
//                                         "No Results is Provided."}
//                                     </span>
//                                   </div>
//                                 </div>
//                               )}

//                               <div className="hover-glow-border flex h-auto w-full flex-col items-center justify-center space-y-3 rounded-md border p-10">
//                                 <h1 className="w-full text-left text-4xl font-bold">
//                                   Answers
//                                 </h1>
//                                 <TagInput
//                                   placeholder="Enter Your Results"
//                                   tags={answersTag}
//                                   className="sm:min-w-[450px]"
//                                   setTags={(newTags) => {
//                                     setAnswersTag(newTags)
//                                   }}
//                                 />
//                               </div>
//                               <div className="hover-glow-border flex h-auto w-full flex-col items-center justify-center space-y-3 rounded-md border p-10">
//                                 <h1 className="w-full text-left text-4xl font-bold">
//                                   Results
//                                 </h1>
//                                 <TagInput
//                                   placeholder="Enter Your Results"
//                                   tags={resultsTag}
//                                   className="sm:min-w-[450px]"
//                                   setTags={(newTags) => {
//                                     setResultslTag(newTags)
//                                   }}
//                                 />
//                               </div>
//                               <div className="hover-glow-border flex h-auto w-full flex-col items-center justify-center space-y-3 rounded-md border p-10">
//                                 <h1 className="w-full text-left text-4xl font-bold">
//                                   MainQuestion
//                                 </h1>
//                                 <Input
//                                   onChange={handleMainQuestion}
//                                   type="text"
//                                   placeholder="Enter MainQuestion"
//                                 />
//                               </div>

//                               <div className="action my-3 flex w-full flex-col items-start justify-start space-y-3 lg:hidden lg:space-y-0">
//                                 <Link href="/questions" className="z-50 w-full">
//                                   <AnimatedButton
//                                     variant="expandIcon"
//                                     Icon={ArrowLeftIcon}
//                                     iconPlacement="left"
//                                     className="border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full border lg:w-auto"
//                                   >
//                                     Back
//                                   </AnimatedButton>
//                                 </Link>
//                                 <AnimatedButton
//                                   onClick={handleInputedValues}
//                                   variant="expandIcon"
//                                   Icon={Projector}
//                                   iconPlacement="left"
//                                   className="border-input bg-background hover:bg-accent text-accent-foreground w-full border"
//                                 >
//                                   {inputedValues ? "Hide" : "Show"} Inputed
//                                   Values
//                                 </AnimatedButton>
//                                 {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
//                                                             Sync Uploaded Files
//                                                         </AnimatedButton> */}
//                                 <AnimatedButton
//                                   className="w-full !py-0"
//                                   // disabled={createButtonDisabled}
//                                   onClick={async () => {
//                                     const { clientWidth, clientHeight } =
//                                       document.documentElement
//                                     const boundingBox =
//                                       buttonRef.current?.getBoundingClientRect?.()
//                                     const targetY = boundingBox?.y ?? 0
//                                     const targetX = boundingBox?.x ?? 0
//                                     const targetWidth = boundingBox?.width ?? 0
//                                     const targetCenterX =
//                                       targetX + targetWidth / 2
//                                     const confetti = (
//                                       await import("canvas-confetti")
//                                     ).default
//                                     confetti({
//                                       zIndex: 999,
//                                       particleCount: 100,
//                                       spread: 70,
//                                       origin: {
//                                         y: targetY / clientHeight,
//                                         x: targetCenterX / clientWidth,
//                                       },
//                                     })
//                                     const updateRef = doc(
//                                       db,
//                                       "questions",
//                                       items.id
//                                     )
//                                     const Update: any = await updateDoc(
//                                       updateRef,
//                                       {
//                                         mainQuestion: inputedMainQuestion,
//                                         answers: answersTag.map(
//                                           (obj) => obj.text
//                                         ),
//                                         results: resultsTag.map(
//                                           (obj) => obj.text
//                                         ),
//                                       }
//                                     )

//                                     toast({
//                                       title:
//                                         "University has been Updated Successfully.",
//                                       description: (
//                                         <div className="bg-primary-foreground mt-2 w-[340px] rounded-md p-4">
//                                           <span>
//                                             You Can now view and delete this
//                                             question!
//                                           </span>
//                                           <pre className="bg-background max-h-[500px] overflow-auto">
//                                             {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
//                                           </pre>
//                                         </div>
//                                       ),
//                                     })

//                                     // router.push('/specialities')
//                                     // setSheetToggle(true)

//                                     // setSheetToggle(!sheetToggle)
//                                     // router.push('/university')
//                                     // fetchDocs()
//                                   }}
//                                 >
//                                   {/* {
//                                                                 createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                                             } */}
//                                   Update
//                                 </AnimatedButton>
//                               </div>
//                             </div>
//                           </ScrollArea>
//                         </SheetContent>
//                       </Sheet>
//                       <Button
//                         onClick={async () => {
//                           await deleteDoc(doc(db, "questions", items.id))
//                           const newDocs = docs.filter(
//                             (item) => item.id !== items.id
//                           )
//                           setDocs(newDocs)
//                         }}
//                         className="bg-red-500 text-white hover:bg-red-600"
//                         size="sm"
//                         variant="destructive"
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </CardFooter>
//               </Card>
//               {/* {Object.keys(items).map((key) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {items[key]}
//               </li>
//             ))} */}
//             </div>
//           ))}
//         </div>

//         <Button
//           variant={"outline"}
//           className="mt-7 w-full"
//           onClick={loadMore}
//           disabled={loading}
//         >
//           {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
//           Load More
//         </Button>
//       </main>
//     </div>
//   )
// }





const FrameComponent: NextPage = () => {
  const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
  const [resultsTag, setResultslTag] = React.useState<any[]>([])
  const [answersTag, setAnswersTag] = React.useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement
    const boundingBox = buttonRef.current?.getBoundingClientRect?.()
    const targetY = boundingBox?.y ?? 0
    const targetX = boundingBox?.x ?? 0
    const targetWidth = boundingBox?.width ?? 0
    const targetCenterX = targetX + targetWidth / 2
    const confetti = (await import("canvas-confetti")).default
    confetti({
      zIndex: 999,
      particleCount: 10000,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    })
  }
  const [inputedValues, setInputedValues] = React.useState(false)
  const [sheetToggle, setSheetToggle] = React.useState(false)
  const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(false)
  const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
  const containerRef = useRef(null)
  const initialValue = [
    {
      id: "1",
      type: ELEMENT_PARAGRAPH,
      children: [{ text: "Hello, World!" }],
    },
  ]
  const [phone, setPhone] = React.useState("+1 (408) 996–1010")
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  function showPhoneNumberDetails() {
    setPhoneNumberDetails(!phoneNumberDetails)
  }

  const [inputedRuralQuota1, setInputedRuralQuota1] = React.useState("")
  const [inputedRuralQuota2, setInputedRuralQuota2] = React.useState("")
  const [inputedRuralQuota3, setInputedRuralQuota3] = React.useState("")
  const [inputedLevel, setInputedLevel] = React.useState("")
  const [inputedOrphanQuota2, setInputedOrphanQuota2] = React.useState("")
  const [inputedDisabilitiesQuota2, setInputedDisabilitiesQuota2] =
    React.useState("")
  const [inputedOrphanQuota3, setInputedOrphanQuota3] = React.useState("")
  const [inputedGeneralCompetition1, setInputedGeneralCompetition1] =
    React.useState("")
  const [inputedLargeFamiliesQuota2, setInputedLargeFamiliesQuota2] =
    React.useState("")
  const [inputedGeneralCompetition2, setInputedGeneralCompetition2] =
    React.useState("")
  const [inputedGeneralCompetition3, setInputedGeneralCompetition3] =
    React.useState("")
  const [inputedSpecialtyCode, setInputedSpecialtyCode] = React.useState("")
  const [inputedDisabilitiesQuota1, setInputedDisabilitiesQuota1] =
    React.useState("")
  const [inputedAverageSalary, setInputedAverageSalary] = React.useState("")
  const [inputedSubjects, setInputedSubjects] = React.useState("")
  const [inputedLargeFamiliesQuota1, setInputedLargeFamiliesQuota1] =
    React.useState("")
  const [inputedThreshold, setInputedThreshold] = React.useState("")
  const [inputedSpecialtyName, setInputedSpecialtyName] = React.useState("")
  const [inputedDisabilitiesQuota3, setInputedDisabilitiesQuota3] =
    React.useState("97")
  const [inputedOrphanQuota1, setInputedOrphanQuota1] = React.useState("")
  const [inputedUniversities, setInputedUniversities] = React.useState("")
  const [inputedLargeFamiliesQuota3, setInputedLargeFamiliesQuota3] =
    React.useState("")
  const [inputedAvailableGrantCount, setInputedAvailableGrantCount] =
    React.useState("")
  const [inputedDemandForSpecialty, setInputedDemandForSpecialty] =
    React.useState("")

  const handleRuralQuota1Change = (event: any) => {
    setInputedRuralQuota1(event.target.value)
  }

  const handleRuralQuota2Change = (event: any) => {
    setInputedRuralQuota2(event.target.value)
  }

  const handleRuralQuota3Change = (event: any) => {
    setInputedRuralQuota3(event.target.value)
  }

  const handleLevelChange = (event: any) => {
    setInputedLevel(event.target.value)
  }

  const handleOrphanQuota2Change = (event: any) => {
    setInputedOrphanQuota2(event.target.value)
  }

  const handleDisabilitiesQuota2Change = (event: any) => {
    setInputedDisabilitiesQuota2(event.target.value)
  }

  const handleOrphanQuota3Change = (event: any) => {
    setInputedOrphanQuota3(event.target.value)
  }

  const handleGeneralCompetition1Change = (event: any) => {
    setInputedGeneralCompetition1(event.target.value)
  }

  const handleLargeFamiliesQuota2Change = (event: any) => {
    setInputedLargeFamiliesQuota2(event.target.value)
  }

  const handleGeneralCompetition2Change = (event: any) => {
    setInputedGeneralCompetition2(event.target.value)
  }

  const handleGeneralCompetition3Change = (event: any) => {
    setInputedGeneralCompetition3(event.target.value)
  }

  const handleSpecialtyCodeChange = (event: any) => {
    setInputedSpecialtyCode(event.target.value)
  }

  const handleDisabilitiesQuota1Change = (event: any) => {
    setInputedDisabilitiesQuota1(event.target.value)
  }

  const handleAverageSalaryChange = (event: any) => {
    setInputedAverageSalary(event.target.value)
  }

  const handleSubjectsChange = (event: any) => {
    setInputedSubjects(event.target.value)
  }

  const handleLargeFamiliesQuota1Change = (event: any) => {
    setInputedLargeFamiliesQuota1(event.target.value)
  }

  const handleThresholdChange = (event: any) => {
    setInputedThreshold(event.target.value)
  }

  const handleSpecialtyNameChange = (event: any) => {
    setInputedSpecialtyName(event.target.value)
  }

  const handleDisabilitiesQuota3Change = (event: any) => {
    setInputedDisabilitiesQuota3(event.target.value)
  }

  const handleOrphanQuota1Change = (event: any) => {
    setInputedOrphanQuota1(event.target.value)
  }

  const handleUniversitiesChange = (event: any) => {
    setInputedUniversities(event.target.value)
  }

  const handleLargeFamiliesQuota3Change = (event: any) => {
    setInputedLargeFamiliesQuota3(event.target.value)
  }

  const handleAvailableGrantCountChange = (event: any) => {
    setInputedAvailableGrantCount(event.target.value)
  }

  const handleDemandForSpecialtyChange = (event: any) => {
    setInputedDemandForSpecialty(event.target.value)
  }

  const [loadingMore, setLoadingMore] = React.useState(false)
  const [inputedName, setInputedName] = React.useState("")
  const [inputedEmail, setInputedEmail] = React.useState("")
  const [inputedStatus, setInputedStatus] = React.useState("")
  const [inputedFacebook, setInputedFacebook] = React.useState("")
  const [inputedInstragam, setInputedInstragam] = React.useState("")
  const [inputedCost, setInputedCost] = React.useState("")
  const [inputedWebsite, setInputedWebsite] = React.useState("")
  const [inputedCode, setInputedCode] = React.useState("")
  const [inputedHostel, setInputedHostel] = React.useState("")
  const [inputedMilitary, setInputedMilitary] = React.useState("")
  const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
  const [inputedLogo, setInputedLogo] = React.useState("")
  const [inputedDescription, setInputedDescription] = React.useState("")
  const [inputedImages, setInputedImages] = React.useState([])
  const handleNameChange = (event: any) => {
    setInputedName(event.target.value)
  }
  const handleEmailChange = (event: any) => {
    setInputedEmail(event.target.value)
  }
  const handleStatusChange = (event: any) => {
    setInputedStatus(event)
  }
  const handleFacebookChange = (event: any) => {
    setInputedFacebook(event.target.value)
  }
  const handleInstagramChange = (event: any) => {
    setInputedInstragam(event.target.value)
  }
  const handleCostChange = (event: any) => {
    setInputedCost(event.target.value)
  }
  const handleWebsiteChange = (event: any) => {
    setInputedWebsite(event.target.value)
  }
  const handleCodeChange = (event: any) => {
    setInputedCode(event.target.value)
  }
  const handleHostelChange = (event: any) => {
    setInputedHostel(event)
  }
  const handleMilitaryChange = (event: any) => {
    setInputedMilitary(event)
  }
  const handleDescriptionChange = (event: any) => {
    setInputedDescription(JSON.stringify(event))
  }
  const handleInputedValues = () => {
    setInputedValues(!inputedValues)
  }
  const handleMainQuestion = (event: any) => {
    setInputedMainQuestion(event.target.value)
  }

  // This page
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true)
      const q = query(collection(db, "questions"), limit(8))
      const querySnapshot = await getDocs(q)
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDocs(newDocs)
      // Configuring Data for Update:
      docs.map((item: any) => {
        setInputedMainQuestion(item.mainQuestion)
        setAnswersTag(item.answers)
        setResultslTag(item.results)
      })
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
      setLoading(false)
    }
    fetchDocs()
  }, [])

  const loadMore = async () => {
    setLoading(true)

    const q = query(collection(db, "questions"), startAfter(lastDoc), limit(8))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length === 0) {
      toast({
        title: "There is no more data in the database.",
        description: (
          <div className="bg-primary-foreground mt-2 w-[340px] rounded-md p-4">
            <span>Please add more data to load more!</span>
          </div>
        ),
      })
      setLoading(false)
      return
    }
    const newDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDocs([...docs, ...newDocs])
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setLoading(false)
  }

  if (loading) {
    return (
      <main className="h-auto w-full px-[5%] py-5">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
            Questions
          </span>
        </div>
        <div className="admin-panel-lists-loading place-content-center">
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="relative box-border flex w-full flex-col items-start justify-start overflow-hidden bg-black px-0 pb-3.5 pt-0 leading-[normal] tracking-[normal]">
      <FrameComponent />
      <section className="font-headings-desktop-poppins-16px-bold !mx-auto box-border flex w-[1398px] max-w-full flex-row items-start justify-center px-5 pb-[62px] pt-0 text-center text-xl text-blueviolet-200 mq1050:box-border mq1050:pb-10 mq750:box-border mq750:pb-[26px]">
        <div className="flex w-[1042px] max-w-full flex-col items-end justify-start gap-[81px] mq1050:gap-[40px] mq750:gap-[20px]">
          <div className="box-border flex max-w-full flex-row items-start justify-end self-stretch py-0 pl-0 pr-0.5">
            <div className="flex max-w-full flex-1 flex-row flex-wrap items-end justify-start gap-[77px] mq1050:gap-[38px] mq750:gap-[19px]">
              <div className="flex min-w-[314px] max-w-full flex-1 flex-col items-start justify-start gap-[41px] mq750:gap-[20px]">
                <button className="border-dimgray rounded-21xl box-border flex w-[122px] cursor-pointer flex-row items-start justify-start gap-[9px] rounded-[5px] border border-DEFAULT border-solid bg-black px-[18px] py-1.5">
                  <div className="border-dimgray rounded-21xl relative box-border hidden h-[35px] w-[122px] border-DEFAULT border-solid bg-black" />
                  <Filter className="size-3 text-primary" />
                  <div className="flex flex-col items-start justify-start px-0 pb-0 pt-px">
                    <div className="font-headings-desktop-poppins-16px-bold text-dimgray relative z-[1] inline-block min-w-[39px] text-left text-xs font-medium">
                      Filters
                    </div>
                  </div>
                </button>
                <div className="admin-panel-lists w-full">
                  <Component
                    rectangle14230="/rectangle-14230@2x.png"
                    rectangle14231="/rectangle-14231@2x.png"
                    srHearth="/srhearth.svg"
                  />
                  <Component
                    rectangle14230="/rectangle-14230@2x.png"
                    rectangle14231="/rectangle-14231@2x.png"
                    srHearth="/srhearth.svg"
                  />
                  <Component
                    rectangle14230="/rectangle-14230@2x.png"
                    rectangle14231="/rectangle-14231@2x.png"
                    srHearth="/srhearth.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex max-w-full flex-col items-end justify-start gap-[53px] self-stretch mq750:gap-[26px]">
            <div className="flex max-w-full flex-row flex-wrap items-start justify-start gap-[77px] self-stretch mq1050:gap-[38px] mq750:gap-[19px]">
              <Component
                rectangle14230="/rectangle-14230-2@2x.png"
                rectangle14231="/rectangle-14231-2@2x.png"
                srHearth="/srhearth-2.svg"
                propMinWidth="312px"
              />
              <Component
                rectangle14230="/rectangle-14230-3@2x.png"
                rectangle14231="/rectangle-14231-3@2x.png"
                srHearth="/srhearth-3.svg"
                propMinWidth="312px"
              />
            </div>
            <div className="flex flex-row items-start justify-center self-stretch py-0 pl-[29px] pr-5">
              <div className="flex w-[210px] flex-row items-start justify-start gap-[15px]">
                <div className="relative flex-1 font-medium leading-[16px] mq450:text-base mq450:leading-[13px]">
                  See all universities
                </div>
                <img
                  className="relative size-5 shrink-0 overflow-hidden"
                  alt=""
                  src="/sr-chevron-down.png"
                />
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}

export default FrameComponent;





















```

const Calculator: NextPage = () => {
  const [ENTPOINT, setENTPOINT] = React.useState(100)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [specialtyCount, setSpecialtyCount] = useState(0)
  const [universityCount, setUniversityCount] = useState(0)
  const [specialtyTheshold, setSpecialtyTheshold] = useState("")
  const [universityTheshold, setUniversityTheshold] = useState("")
  const [specialtiesUnderThreshold, setSpecialtiesUnderThreshold] = useState<
    string[]
  >([])
  const [universitiesUnderThreshold, setUniversitiesUnderThreshold] = useState<
    string[]
  >([])
  const [quota, setQuota] = React.useState("...")
  const [selectedSpecialty, setSelectedSpecialty] = React.useState("")
  const [selectedSpecialtyQuota, setSelectedSpecialtyQuota] = React.useState("")
  const [selectedSubject, setSelectedSubject] = React.useState("")
  const [specialties, setSpecialties] = useState<any[]>([])
  const [universities, setUniversities] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [subjectsTag, setSubjectsTag] = React.useState<any[]>([])
  const [universitiesTag, setUniversitiesTag] = React.useState<any[]>([])
  const [minScroresTag, setMinScroresTag] = React.useState<any[]>([])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("2G4ao9MQlkfRGhytZUzP")
  const [lastUniversityCode, setLastUniversityCode] = React.useState("")
  const [calculation, setCalculation] = React.useState("")
  const [specialtyDoc, setSpecialtyDoc] = useState<any>([])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  function calculateAdmissionChance(
    startScore: number,
    e1: number,
    e2: number,
    e3: number,
    userScore: number
  ): number {
    if (startScore >= userScore) {
      return 0
    } else {
      let possibleScore = calculatePossibleScore(e1, e2, e3)
      let admissionChance = calculateChance(userScore, possibleScore)
      return Math.min(Math.floor(admissionChance), 100)
    }
  }
  function calculatePossibleScore(e1: number, e2: number, e3: number): number {
    let possibleScore = e1 + e2 - e1 + e3 - e2 * 2 * 3
    return possibleScore <= 140 ? possibleScore : 140
  }
  function calculateChance(userScore: number, possibleScore: number): number {
    let chance =
      50 + ((userScore - possibleScore) / ((140 - possibleScore) * 3)) * 100
    return chance
  }
  // let startScore = 100; // University Theshold
  // let e1 = 95;          // 2021
  // let e2 = 93;          // 2022
  // let e3 = 97;          // 2023
  // let userScore = 394;  // Ent Scrore
  // let admissionChance = calculateAdmissionChance(startScore, e1, e2, e3, userScore);
  // console.log(`The chance of admission is ${admissionChance}%`);

  function handleENTChange(e: { target: { value: any } }) {
    setENTPOINT(e.target.value)
  }
  function handleQuotaChange(e: any) {
    setQuota(e)
  }

  // async function calculate() {
  //   const specialtyData: any = await fetchDocument(value);
  //   let startScore:any = universityTheshold || specialtyTheshold || 100;          // University Theshold
  //   let e1 = specialtyData.minScore.map((item: any[]) => item[0]) || 95;          // 2021
  //   let e2 = specialtyData.minScore.map((item: any[]) => item[1]) || 93;          // 2022
  //   let e3 = specialtyData.minScore.map((item: any[]) => item[2]) || 97;          // 2023
  //   let userScore = ENTPOINT || 394;

  //   return calculateAdmissionChance(startScore, e1, e2, e3, userScore);
  // }

  useEffect(() => {
    const fetchSpecilaties = async () => {
      const querySnapshot = await getDocs(collection(db, "specialties"))
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSpecialties(newDocs)
    }
    const fetchUniversities = async () => {
      const querySnapshot = await getDocs(collection(db, "universities"))
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUniversities(newDocs)
    }
    const fetchSubjects = async () => {
      const querySnapshot = await getDocs(collection(db, "subjects"))
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSubjects(newDocs)
    }
    const fetchDocs = async () => {
      const data: any = await fetchDocument("TILYUxDgqHFNWRreJoNn")
      setSpecialtyDoc(data)
    }
    fetchDocs()
    fetchSpecilaties()
    fetchUniversities()
    fetchSubjects()
  }, [])

  useEffect(() => {
    // document.title = `Count: ${value}`;

    // const fetchSpecialty = async () => {
    //   const specialtyData: any = await fetchDocument(value);
    //   setSpecialtyDoc(specialtyData)
    // }
    // fetchSpecialty();
    let tempSpecialtyCount = 0
    let tempUniversityCount = 0
    let tempSpecialtyTheshold = ""
    let tempUniversityTheshold = ""
    let tempLastUniversityCode = ""
    let tempCalculation: any = ""

    const tempSpecialtiesUnderThreshold = specialties
      .filter((specialty) => specialty.threshold < ENTPOINT)
      .map((specialty) => specialty.name || specialty.specailtyName)
    const tempUniversitiesUnderThreshold = universities
      .filter(
        (university) => university.threshold && university.threshold < ENTPOINT
      )
      .map((university) => university.universityName)

    setSpecialtiesUnderThreshold(tempSpecialtiesUnderThreshold)
    setUniversitiesUnderThreshold(tempUniversitiesUnderThreshold)

    universities.forEach((university) => {
      if (university.threshold && university.threshold < ENTPOINT) {
        tempUniversityCount++
      } else {
      }
      tempUniversityTheshold = university.threshold || ""
      tempLastUniversityCode = university.universityCode
    })

    specialties.forEach((university) => {
      if (university.threshold && university.threshold < ENTPOINT) {
        tempSpecialtyCount++
      } else {
      }
      tempSpecialtyTheshold = university.threshold || ""
    })

    // Calculation
    // async function calculate() {
    //   // specialties ? specialties.find((specialty) => specialty.neme || specialty.specialtyName === value)?.id :
    //   const specialtyData:any = await fetchDocument("phKkzVcxJBJNnpXYdTIV");
    //   let startScore:any = universityTheshold || specialtyTheshold || 100;          // University Theshold
    //   let e1 = specialtyData ? specialtyData.minScore.map((item: any[]) => item[0]) : 95;          // 2021
    //   let e2 = specialtyData ? specialtyData.minScore.map((item: any[]) => item[1]) : 95;          // 2022
    //   let e3 = specialtyData ? specialtyData.minScore.map((item: any[]) => item[2]) : 95;          // 2023
    //   let userScore = ENTPOINT || 394;

    //   tempCalculation = calculateAdmissionChance(startScore, e1, e2, e3, userScore);
    // }
    // calculate();
    let startScore: any = 100 // University Theshold
    let e1 = specialtyDoc
      ? specialtyDoc.minscrore &&
      specialtyDoc.minscrore.map((item: any) => item[0])
      : 95 // 2021
    let e2 = specialtyDoc
      ? specialtyDoc.minscrore &&
      specialtyDoc.minscrore.map((item: any) => item[1])
      : 93 // 2022
    let e3 = specialtyDoc
      ? specialtyDoc.minscrore &&
      specialtyDoc.minscrore.map((item: any) => item[2])
      : 97 // 2023
    let userScore = ENTPOINT // Ent Scrore

    let admissionChance: any = calculateAdmissionChance(
      startScore,
      e1,
      e2,
      e3,
      userScore
    )
    console.log(`The chance of admission is ${admissionChance}%`)
    setCalculation(admissionChance)
    setSpecialtyCount(tempSpecialtyCount)
    setUniversityCount(tempUniversityCount)
    setUniversityTheshold(tempUniversityTheshold)
    setSpecialtyTheshold(tempSpecialtyTheshold)
    setLastUniversityCode(tempLastUniversityCode)
  }, [value])

  return (
    <div className="relative z-[1] mx-auto box-border flex w-[1200px] max-w-[90%] flex-col items-start justify-start gap-[48px] rounded-md bg-[#804DFE] px-12 pt-8 text-left font-headings-desktop-poppins-16px-regular text-21xl text-shade-white mq1050:box-border mq1050:px-6 mq750:gap-[24px] mq450:box-border mq450:pb-[23px] mq450:pt-[21px]">
      <div className="absolute inset-0 !m-0 size-full">
        <div className="absolute inset-0 size-full rounded [background:linear-gradient(-84.28deg,_)]" />
        <img
          className="absolute inset-0 z-[1] size-full max-h-full max-w-full overflow-hidden"
          alt=""
          src="/mask-group-2.png"
        />
        <img
          className="absolute inset-0 z-[2] size-full max-h-full max-w-full overflow-hidden"
          alt=""
          src="/mask-group-3.png"
        />
      </div>

      <h1 className="font-inherit z-[ 3] relative m-0 inline-block w-[577px] max-w-full text-inherit font-bold leading-[32px] mq750:text-13xl mq750:leading-[26px] mq450:text-5xl mq450:leading-[19px]">
      {specialtyDoc ? <p>{specialtyDoc.id}</p> : <p>No SpcialtyDoc Found</p>}
        {/* uSTUDY Calculator  */}
      </h1>

      {/* <p>{`Names of specialties with threshold less than ${ENTPOINT}: ${specialtiesUnderThreshold.join(', ')}`}</p>
      <p>{`Names of universities with threshold less than ${ENTPOINT}: ${universitiesUnderThreshold.join(', ')}`}</p> */}
      {/* <p>{`Number of specialties with threshold less than ${ENTPOINT}: ${specialtyCount}`}</p> */}
      {/* <p>{`Number of universities with threshold less than ${ENTPOINT}: ${universityCount || specialtyCount
        }`}</p>
      <p>{`Theherhold ${ENTPOINT}: ${universityTheshold || specialtyTheshold
        }`}</p>
      <p>{`Last university code: ${lastUniversityCode}`}</p>
      <p>{`Calculation: ${calculation}%`}</p>

      {specialtyDoc ? <p>{specialtyDoc.id}</p> : <p>No SpcialtyDoc Found</p>} */}

      <div className="z-[2] hidden h-12 w-8 rounded" />
      <div className="z-[3] hidden h-12 w-[82px] rounded" />
      <Carousel className="z-50 w-full" setApi={setApi}>
        <CarouselContent>
          {/* ENT */}
          <CarouselItem>
            <div className="flex w-[870px] max-w-full flex-row items-start justify-start gap-[69px] font-dm-sans text-base mq1050:flex-wrap mq1050:gap-[34px] mq450:gap-[17px]">
              <div className="box-border flex min-w-[239px] max-w-full flex-[0.7745] flex-col items-start justify-start gap-[18.7px] py-0 pl-0 pr-[83px] mq1050:flex-1 mq450:box-border mq450:pr-5">
                <div className="flex flex-col items-start justify-start gap-[8px] self-stretch px-0 pb-[5.3px] pt-0">
                  <div className="relative z-[3] inline-block w-[246.5px] leading-[21px] ">
                    Enter amount of score
                  </div>
                  <div className="z-[3] flex flex-row items-start justify-start self-stretch rounded-md border-DEFAULT border-solid border-shade-white bg-shade-white px-[13px] pb-2 pt-3 shadow-[2px_2px_2px_rgba(0,_0,_0,_0.25)_inset]">
                    <div className="flex flex-1 flex-row items-start justify-between gap-[20px]">
                      <input
                        className="box-border flex h-5 w-full flex-col items-start justify-start bg-transparent px-0 pb-0 pt-1 font-dm-sans text-base font-bold text-black [border:none] [outline:none] placeholder:text-muted"
                        placeholder="100"
                        type="number"
                        onChange={handleENTChange}
                      />
                      <img
                        className="relative size-6"
                        alt=""
                        src="/coin-colorfull.png"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-muted-foreground">
                  Please Provide Your ENT POINT
                </span>
              </div>
              <div className="box-border flex h-[196px] flex-col items-start justify-start px-0 pb-0 pt-3">
                <div className="relative z-[3] w-0.5 flex-1 bg-plum" />
              </div>
              <div className="box-border flex min-w-[235px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-1 text-lg mq1050:flex-1">
                <div className="flex flex-col items-start justify-start gap-[68px] self-stretch mq450:gap-[34px]">
                  <div className="flex w-[158px] flex-col items-start justify-start gap-[12px]">
                    <div className="z-[4] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[48px] leading-[130%]">
                        B057:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            70%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B058:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[7px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[37px] leading-[16px]">
                            65%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B059:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            62%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>

                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B017:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            73%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Button
                variant="outline"
                className={cn(
                  "relative",
                  "left-1 bottom-0 -translate-y-1/2"
                )}
                disabled={!canScrollPrev}
                onClick={scrollPrev}
              >
                Back
              </Button>

              <Button
                className={cn(
                  "relative",
                  "left-5 bottom-0 -translate-y-1/2"
                )}
                disabled={!canScrollNext}
                onClick={scrollNext}
              >
                Next
              </Button> */}
            </div>
          </CarouselItem>
          {/* Subject Combination */}
          <CarouselItem>
            <div className="mb-10 mt-3 flex w-full max-w-[800px] flex-row items-start justify-start gap-10">
              <div className="flex h-[196px] w-full flex-col items-start justify-start space-y-3 overflow-y-auto overflow-x-hidden rounded-md !bg-transparent">
                <h1 className="w-full text-left text-xl font-bold">
                  Subjects Combination(Max:2)
                </h1>
                <TagInput
                  placeholder="Enter Your Subjects"
                  tags={subjectsTag}
                  restrictTagsToAutocompleteOptions
                  enableAutocomplete
                  maxTags={2}
                  autocompleteOptions={subjects.map((items) => ({
                    id: items.id,
                    text:
                      items.subjects.map(
                        (item: any) =>
                          item || ""
                      ) || "",
                  }))}
                  draggable
                  className="!max-h-10 !bg-transparent sm:min-w-[450px]"
                  setTags={(newTags) => {
                    setSubjectsTag(newTags)
                  }}
                />
              </div>

              <div className="box-border flex h-[196px] flex-col items-start justify-start px-0 pb-0 pt-3">
                <div className="relative z-[3] w-0.5 flex-1 bg-plum" />
              </div>
              <div className="box-border flex min-w-[235px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-1 text-lg mq1050:flex-1">
                <div className="flex flex-col items-start justify-start gap-[68px] self-stretch mq450:gap-[34px]">
                  <div className="flex w-[158px] flex-col items-start justify-start gap-[12px]">
                    <div className="z-[4] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[48px] leading-[130%]">
                        B057:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            70%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B058:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[7px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[37px] leading-[16px]">
                            65%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B059:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            62%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>

                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B017:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            73%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          {/* Specialtiy */}
          <CarouselItem>
            <div className="mb-10 mt-3 flex w-full max-w-[800px] flex-row items-start justify-start gap-10">
              <div className="flex h-[196px] w-full flex-col items-start justify-start space-y-3 overflow-y-auto overflow-x-hidden rounded-md !bg-transparent">
                <h1 className="w-full text-left text-xl font-bold">
                  Specialtiy
                </h1>
                {/* <TagInput
                  placeholder="Enter Your Subjects"
                  tags={subjectsTag}
                  enableAutocomplete
                  maxTags={2}
                  autocompleteOptions={specialties.map((items) => ({
                    id: items.id,
                    text: items.specialtyName || items.name || `No Subject Provided at id:${items.id}`,
                  }))}
                  draggable
                  className="sm:min-w-[450px] !bg-transparent !max-h-10"
                  setTags={(newTags) => {
                    setSubjectsTag(newTags)
                  }}
                /> */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[350px]  justify-between"
                    >
                      {/* {value
                        ? specialties.find((framework) => framework.specialtyName || framework.name === value)?.specialtyName
                        : "Select Specialty..."} */}
                      {value
                        ? value
                        : "Select specialty..."}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-h-[300px] w-[350px] overflow-y-auto overflow-x-hidden p-0">
                    <Command>
                      <CommandInput placeholder="Search Specialties..." />
                      <CommandEmpty>No Specialty found.</CommandEmpty>
                      <CommandGroup>
                        {specialties.map((framework) => (
                          <CommandItem
                            key={framework.id}
                            value={framework.name || framework.id}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              )
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                value === framework.name
                                  ? "opacity-100"
                                  : value === framework.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {framework.name ||
                              framework.id}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="box-border flex h-[196px] flex-col items-start justify-start px-0 pb-0 pt-3">
                <div className="relative z-[3] w-0.5 flex-1 bg-plum" />
              </div>
              <div className="box-border flex min-w-[235px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-1 text-lg mq1050:flex-1">
                <div className="flex flex-col items-start justify-start gap-[68px] self-stretch mq450:gap-[34px]">
                  <div className="flex w-[158px] flex-col items-start justify-start gap-[12px]">
                    <div className="z-[4] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[48px] leading-[130%]">
                        B057:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            70%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B058:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[7px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[37px] leading-[16px]">
                            65%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B059:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            62%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>

                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B017:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            73%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          {/* Quota */}
          <CarouselItem>
            <div className="mb-10 mt-3 flex w-full max-w-[800px] flex-row items-start justify-start gap-10">
              <div className="flex h-[196px] w-full flex-col items-start justify-start space-y-3 overflow-y-auto overflow-x-hidden rounded-md !bg-transparent">
                <h1 className="w-full text-left text-xl font-bold">Quota</h1>
                {/* <TagInput
                  placeholder="Enter Your Subjects"
                  tags={subjectsTag}
                  enableAutocomplete
                  maxTags={2}
                  autocompleteOptions={specialties.map((items) => ({
                    id: items.id,
                    text: items.specialtyName || items.name || `No Subject Provided at id:${items.id}`,
                  }))}
                  draggable
                  className="sm:min-w-[450px] !bg-transparent !max-h-10"
                  setTags={(newTags) => {
                    setSubjectsTag(newTags)
                  }}
                /> */}
                <Select onValueChange={handleQuotaChange}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select a Quota" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="border-b">Quota's</SelectLabel>
                      <SelectItem value="RuralQuota">Rural</SelectItem>
                      <SelectItem value="OrphanQuota">Orphan</SelectItem>
                      <SelectItem value="DisabilityQuota">
                        Disability
                      </SelectItem>
                      <SelectItem value="LargeFamilyQuota">
                        LargeFamily
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="box-border flex h-[196px] flex-col items-start justify-start px-0 pb-0 pt-3">
                <div className="relative z-[3] w-0.5 flex-1 bg-plum" />
              </div>
              <div className="box-border flex min-w-[235px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-1 text-lg mq1050:flex-1">
                <div className="flex flex-col items-start justify-start gap-[68px] self-stretch mq450:gap-[34px]">
                  <div className="flex w-[158px] flex-col items-start justify-start gap-[12px]">
                    <div className="z-[4] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[48px] leading-[130%]">
                        B057:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            70%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B058:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[7px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[37px] leading-[16px]">
                            65%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B059:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            62%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>

                    <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch">
                      <div className="relative inline-block min-w-[49px] leading-[130%]">
                        B017:
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                        <div className="flex flex-row items-center justify-start">
                          <div className="relative inline-block min-w-[36px] leading-[16px]">
                            73%
                          </div>
                        </div>
                        <img
                          className="relative size-5"
                          alt=""
                          src="/coin-transparent.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="mt-12 flex !min-w-full items-start justify-evenly space-x-10 p-1 !text-sm !text-white lg:flex-row">
              <div className="">
                <span className="text-sm">ENT Scrore</span>
                <div className="rounded-md border border-white p-3 text-center">
                  {ENTPOINT || "135"}
                </div>
              </div>
              <div className="">
                <span className="text-sm">Specialty</span>
                <div className="rounded-md border border-white p-3 text-center">
                  {value || "Design"}
                </div>
              </div>
              <div className="">
                <span className="text-sm">Subject Combination</span>
                <div className="rounded-md border border-white p-3 text-center">
                  {subjectsTag.map((obj) => `${obj.text} `) || "Creative Exam"}
                </div>
              </div>
              <div className="">
                <span className="text-sm">Quota</span>
                <div className="rounded-md border border-white p-3 text-center">
                  {quota || "..."}
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* specialtyDoc ? specialtyDoc.name || specialtyDoc.specialtyName */}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="absolute bottom-[-158.8px] right-[-285px] z-[5] !m-0 size-[300px] rounded-[50%] bg-blueviolet-200 [filter:blur(400px)]" />
    </div>
  )
}

const FrameComponent: NextPage = () => {
  return (
    <section className="min-h-min">
      <div className="relative !m-0 box-border flex h-[244px] !w-full max-w-full flex-1 flex-row items-center justify-center gap-[20px] overflow-hidden bg-gray-200 !p-0 pb-[85px] pl-[470px] pr-0 pt-[50px] mq750:box-border mq750:pb-[55px] mq750:pl-[235px] mq750:pt-8 mq450:box-border mq450:pl-5">
        <div className="relative z-0 hidden h-[248px] w-[1440px] max-w-full [background:linear-gradient(180deg,_)]" />
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="title !m-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Calculate Your Future
          </h1>
          <span className="text-sm text-primary">
            Make your dream come by calcuting your victory.
          </span>
        </div>
        <img
          className="absolute left-0 top-0 z-[1] lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/left-shadow.png"
        />
        <img
          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/center-shadow.png"
        />
        <img
          className="absolute right-0 top-0 z-[1] lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/right-shadow.png"
        />
        <img
          className="absolute left-1/3 top-0 z-[1] mx-auto size-[90%] -translate-x-1/2 object-contain lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/looper-bg.png"
        />
      </div>
      <div className="faq-content mt-10 flex flex-col space-y-5">
        <Calculator />
        {/* <div className="mx-auto !mb-32 rounded-md border p-5 lg:w-[1200px]">
          <TableDemo />
        </div> */}
      </div>
    </section>
  )
}
// export default FrameComponent

// Simulate a database read for tasks.
async function getTasks() {
  const data: any = []
  // const tasks = JSON.parse(data.toString())
  return z.array(taskSchema).parse(data)
}

async function TaskPage() {
  const tasks = await getTasks()

  return (
    <div>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Chances!</h2>
            <p className="text-muted-foreground">
              Here is your calculations history!
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  )
}
```




```
    // let tempSpecialtyCount = 0
    // let tempUniversityCount = 0
    // let tempSpecialtyTheshold = ""
    // let tempUniversityTheshold = ""
    // let tempLastUniversityCode = ""
    // let tempCalculation: any = ""

    // const tempSpecialtiesUnderThreshold = specialties
    //   .filter((specialty) => specialty.threshold < ENTPOINT)
    //   .map((specialty) => specialty.name || specialty.specailtyName)
    // const tempUniversitiesUnderThreshold = universities
    //   .filter(
    //     (university) => university.threshold && university.threshold < ENTPOINT
    //   )
    //   .map((university) => university.universityName)

    // setSpecialtiesUnderThreshold(tempSpecialtiesUnderThreshold)
    // setUniversitiesUnderThreshold(tempUniversitiesUnderThreshold)

    // universities.forEach((university) => {
    //   if (university.threshold && university.threshold < ENTPOINT) {
    //     tempUniversityCount++
    //   } else {
    //   }
    //   tempUniversityTheshold = university.threshold || ""
    //   tempLastUniversityCode = university.universityCode
    // })

    // specialties.forEach((university) => {
    //   if (university.threshold && university.threshold < ENTPOINT) {
    //     tempSpecialtyCount++
    //   } else {
    //   }
    //   tempSpecialtyTheshold = university.threshold || ""
    // })

    // Calculation
    // async function calculate() {
    //   // specialties ? specialties.find((specialty) => specialty.neme || specialty.specialtyName === value)?.id :
    //   const specialtyData:any = await fetchDocument("phKkzVcxJBJNnpXYdTIV");
    //   let startScore:any = universityTheshold || specialtyTheshold || 0;          // University Theshold
    //   let e1 = specialtyData ? specialtyData.minScore.map((item: any[]) => item[0]) : 95;          // 2021
    //   let e2 = specialtyData ? specialtyData.minScore.map((item: any[]) => item[1]) : 95;          // 2022
    //   let e3 = specialtyData ? specialtyData.minScore.map((item: any[]) => item[2]) : 95;          // 2023
    //   let userScore = ENTPOINT || 394;

    //   tempCalculation = calculateAdmissionChance(startScore, e1, e2, e3, userScore);
    // }
    // calculate();

    // console.log(`The chance of admission is ${admissionChance}%`)
    // setCalculation(admissionChance)
    // setSpecialtyCount(tempSpecialtyCount)
    // setUniversityCount(tempUniversityCount)
    // setUniversityTheshold(tempUniversityTheshold)
    // setSpecialtyTheshold(tempSpecialtyTheshold)
    // setLastUniversityCode(tempLastUniversityCode)
    // setResultSubjects(subjectsTag.map(
    //   (obj) => obj.text
    // )))
    // <p>{`Number of universities with threshold less than ${ENTPOINT}: ${universityCount || specialtyCount}`}</p>
    // <p>{`Theherhold ${ENTPOINT}: ${universityTheshold || specialtyTheshold}`}</p>
    // <p>{`Last university code: ${lastUniversityCode}`}</p>
    // <p>{`Calculation: ${calculation}%`}</p>
    // {specialtyDoc ? <p>{specialtyDoc.id}</p> : <p>No SpcialtyDoc Found</p>}
    // setTasks([
    //   {
    //     id: lastUniversityCode,
    //     title: "universities are hoping to see you there!",
    //     status: "Information & Communication Technology",
    //     label: universityCount || specialtyCount,
    //     priority: `${admissionChance}%`
    //   }
    // ])
    // setTasks([
    //   {
    //     id: `${lastUniversityCode || "BD75"}`,
    //     title: "universities are hoping to see you there!",
    //     status: `${"Information & Communication Technology"}`,
    //     label: `${universityCount || specialtyCount}`,
    //     priority: `${admissionChance}%`
    //   }
    // ])
    // const calculateAdmissionChance = (startScore: number, e1: number, e2: number, e3: number, userScore: number): number => {
    //   // if (startScore >= userScore) {
    //   //   return 0;
    //   // } else {
    //   //   let possibleScore = calculatePossibleScore(e1, e2, e3);
    //   //   let admissionChance = calculateChance(userScore, possibleScore);
    //   //   return Math.min(Math.floor(admissionChance), 100);
    //   // }
    //   let possibleScore = calculatePossibleScore(e1, e2, e3);
    //   let admissionChance = calculateChance(userScore, possibleScore);
    //   return Math.min(Math.floor(admissionChance), 100);
    //   setENTSCRORE(possibleScore);
    // }

    // const calculatePossibleScore = (e1: number, e2: number, e3: number): number => {
    //   let possibleScore = e1 + e2 - e1 + e3 - e2 * 2 * 3;
    //   return possibleScore <= 140 ? possibleScore : 140;
    // }

    // const calculateChance = (userScore: number, possibleScore: number): number => {
    //   let chance;
    //   if (userScore < 50) {
    //     chance = 50 + ((userScore - 50) + (140 - 50)) / 3;
    //   } else {

    //     chance = 50 + ((userScore - possibleScore) + (140 - possibleScore)) / 3;
    //     // chance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
    //   }
    //   // chance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
    //   return chance;
    // }

    // let possibleScore = calculatePossibleScore(e1, e2, e3);
    // let admissionChance = calculateChance(userScore, possibleScore);
    // return Math.min(Math.floor(admissionChance), 100);
    // setENTSCRORE(possibleScore);

    // calculateAdmissionChance();
    // console.log(subjectsTag); 
```


































```
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zn70RklOFdD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="#">
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Projects
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Deployments
          </Link>
          <Link className="font-bold" href="#">
            Analytics
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Logs
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button className="rounded-full ml-auto" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full border"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Dashboard</h1>
          <div className="flex items-center text-sm gap-2">
            <a className="font-medium" href="#" target="_blank">
              example.com
            </a>
            <Separator className="h-5" orientation="vertical" />
            <div className="text-gray-500 flex items-center gap-2 dark:text-gray-400">
              <span className="inline-block w-2 h-2 bg-[#09CE6B] rounded-full animate-ping duration-[5000]" />
              32 users online
            </div>
          </div>
        </div>
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-0 overflow-hidden">
              <CardHeader>
                <CardDescription className="text-sm font-medium">Total Visits</CardDescription>
                <CardTitle className="text-2xl">2,389,098</CardTitle>
              </CardHeader>
              <CardContent>
                <FilledtimeseriesChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card className="p-0 overflow-hidden">
              <CardHeader>
                <CardDescription className="text-sm font-medium">Total Downloads</CardDescription>
                <CardTitle className="text-2xl">1,234,567</CardTitle>
              </CardHeader>
              <CardContent>
                <FilledtimeseriesChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card className="p-0 overflow-hidden">
              <CardHeader>
                <CardDescription className="text-sm font-medium">Posts</CardDescription>
                <CardTitle className="text-2xl">45,678</CardTitle>
              </CardHeader>
              <CardContent>
                <FilledtimeseriesChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card className="p-0 overflow-hidden">
              <CardHeader>
                <CardDescription className="text-sm font-medium">Shares</CardDescription>
                <CardTitle className="text-2xl">12,345</CardTitle>
              </CardHeader>
              <CardContent>
                <FilledtimeseriesChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center border-b">
                <CardTitle>Visits Trend</CardTitle>
                <CardDescription className="ml-auto">Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <FilledtimeseriesChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center border-b">
                <CardTitle>Downloads Trend</CardTitle>
                <CardDescription className="ml-auto">Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <FilledtimeseriesChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center border-b">
                  <CardTitle>Top Posts</CardTitle>
                  <CardDescription className="ml-auto">Last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm p-6">
                  <div className="flex items-center">
                    <div>How to build a React app</div>
                    <div className="font-semibold ml-auto">5.4K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Mastering CSS Grid</div>
                    <div className="font-semibold ml-auto">2.2K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Deploying to Vercel</div>
                    <div className="font-semibold ml-auto">2K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Optimizing Next.js apps</div>
                    <div className="font-semibold ml-auto">1.1K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Intro to TypeScript</div>
                    <div className="font-semibold ml-auto">1K</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center border-b">
                  <CardTitle>Top Shares</CardTitle>
                  <CardDescription className="ml-auto">Last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm p-6">
                  <div className="flex items-center">
                    <div>How to build a React app</div>
                    <div className="font-semibold ml-auto">3K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Mastering CSS Grid</div>
                    <div className="font-semibold ml-auto">1.2K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Deploying to Vercel</div>
                    <div className="font-semibold ml-auto">1.1K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Optimizing Next.js apps</div>
                    <div className="font-semibold ml-auto">1K</div>
                  </div>
                  <div className="flex items-center">
                    <div>Intro to TypeScript</div>
                    <div className="font-semibold ml-auto">1K</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function FilledtimeseriesChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        curve="monotoneX"
        enableArea={true}
        gridYValues={6}
        defs={[
          {
            id: "line-chart-gradient",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "inherit" },
              { offset: 200, color: "inherit", opacity: 0 },
            ],
          },
        ]}
        fill={[{ match: "*", id: "line-chart-gradient" }]}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}

```



```
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/84Jkat9lPpw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

export default function Component() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden w-64 shrink-0 border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950 lg:block">
        <div className="flex h-16 items-center justify-between px-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <MountainIcon className="h-6 w-6" />
            <span>Acme Inc</span>
          </Link>
          <Button size="icon" variant="ghost">
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
        <Collapsible className="space-y-2 px-4 py-6">
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <div className="flex items-center gap-2">
                <FolderIcon className="h-4 w-4" />
                <span>Products</span>
              </div>
              <ChevronDownIcon className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Shoes</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Shirts</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Pants</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <div className="flex items-center gap-2">
                <FolderIcon className="h-4 w-4" />
                <span>Accessories</span>
              </div>
              <ChevronDownIcon className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Bags</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Hats</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Sunglasses</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <div className="flex items-center gap-2">
                <FolderIcon className="h-4 w-4" />
                <span>Sale</span>
              </div>
              <ChevronDownIcon className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Clearance</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Outlet</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileIcon className="h-4 w-4" />
                <span>Deals</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </Collapsible>
      </div>
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <Button className="lg:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4">
            <Input className="max-w-xs" placeholder="Search products..." type="search" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <UserIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 1"
                className="object-cover w-full h-64"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Classic Leather Shoes</h3>
                <p className="text-sm text-gray-500">Elegant and comfortable</p>
                <h4 className="font-semibold text-lg md:text-xl">$59.99</h4>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 2"
                className="object-cover w-full h-64"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Designer Handbag</h3>
                <p className="text-sm text-gray-500">Fashion statement</p>
                <h4 className="font-semibold text-lg md:text-xl">$89.99</h4>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 3"
                className="object-cover w-full h-64"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Wireless Earbuds</h3>
                <p className="text-sm text-gray-500">Crystal clear audio</p>
                <h4 className="font-semibold text-lg md:text-xl">$69.99</h4>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 4"
                className="object-cover w-full h-64"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Vintage Pocket Watch</h3>
                <p className="text-sm text-gray-500">Antique charm</p>
                <h4 className="font-semibold text-lg md:text-xl">$79.99</h4>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 5"
                className="object-cover w-full h-64"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Leather Backpack</h3>
                <p className="text-sm text-gray-500">Durable and stylish</p>
                <h4 className="font-semibold text-lg md:text-xl">$99.99</h4>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 6"
                className="object-cover w-full h-64"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
              <div className="bg-white p-4 dark:bg-gray-950">
                <h3 className="font-bold text-xl">Smartwatch</h3>
                <p className="text-sm text-gray-500">Fitness tracking</p>
                <h4 className="font-semibold text-lg md:text-xl">$149.99</h4>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
```




```
Result: Close types: intellectual and office.
The opposite type is social.


Proclivities:emitted by a smart contract. Maximum emission: 2 billion U

1.25% (25 m) of the token emission will be allocated to create liquidity on the exchange

The initial price after the token listing on
      the exchange 0.10 USD

According to the schedule, in the first few years the token will reach x100; x500 or more
```