/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
// "use client"
// import React, { useState } from 'react';

// type Student = {
//   id: number;
//   name: string;
// };

// const StudentList: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [name, setName] = useState<string>('');

//   const addStudent = () => {
//     const newStudent: Student = { id: Date.now(), name };
//     setStudents([...students, newStudent]);
//     setName('');
//   };

//   const deleteStudent = (id: number) => {
//     const updatedStudents = students.filter(student => student.id !== id);
//     setStudents(updatedStudents);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={name}
//         onChange={e => setName(e.target.value)}
//         placeholder="Enter student name"
//       />
//       <button onClick={addStudent}>Add Student</button>
//       <ul>
//         {students.map(student => (
//           <li key={student.id}>
//             {student.name}
//             <button onClick={() => deleteStudent(student.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentList;
"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
import { Chrome, CircleDollarSign, Code, Earth, Facebook, Flame, Hotel, Instagram, Mail, MapPinned, MessageCircleDashed, Phone, PocketKnife, University } from "lucide-react"
const firebaseConfig = {
    apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
    authDomain: "snap-workspace.firebaseapp.com",
    projectId: "snap-workspace",
    storageBucket: "snap-workspace.appspot.com",
    messagingSenderId: "1092527848130",
    appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
    measurementId: "G-JVEZGJHL8H"
};
// Iniialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db: any = getFirestore(app);
import Image from "next/image"
import Link from "next/link"
import {
    File,
    GlobeIcon,
    Home,
    LineChart,
    ListFilter,
    LocateIcon,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
import React, { ReactNode, useState } from "react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { wrap } from "@motionone/utils";
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import { Separator } from "@/components/ui/separator"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
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
import { ImageIcon } from "@radix-ui/react-icons"
import { Button as AnimatedButton } from "@/components/button"
import { Textarea } from "@/components/ui/textarea"

import CountryDropdown from "@/components/dropdown/countries";
import StateDropdown from "@/components/dropdown/states";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from "@/registry/default//ui/toast"
import { useToast } from "@/registry/default/ui/use-toast"
import { Tag, TagInput } from 'emblor';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ArrowRightIcon, ArrowLeftIcon, ChevronsUpDown, Plus, X, Projector, CloudUpload, Loader2 } from "lucide-react"
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { useDropdownStore } from "@/lib/store/dropdown";
import { useUploadFile as useUploadImages } from "@/hooks/use-upload-file"
import { useUploadFile as useUploadLogo } from "@/hooks/use-upload-logo"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/registry/default/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button as NextuiButton } from "@nextui-org/react";
import { cva, type VariantProps } from "class-variance-authority"
import { FileUploader } from "@/components/file-uploader"
import type { UploadedFile } from "@/types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/empty-card"
import { useUniversityImages } from "@/lib/store/university-images"
import { Label } from "@/components/ui/label"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const Dashboard = () => {

    const [docs, setDocs] = useState<any[]>([]);
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [addNewStudentBar, setAddNewStudentBar] = React.useState(false);
    const [addNewClassroomBar, setAddNewClassroomBar] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0);
    const [inputedValues, setInputedValues] = React.useState(false);
    const [sheetToggle, setSheetToggle] = React.useState(false);
    const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false)
    const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false);
    const { countryValue, stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } = useDropdownStore();
    const [phone, setPhone] = React.useState("+1 (408) 996–1010");
    const [inputedName, setInputedName] = React.useState("")
    const [inputedEmail, setInputedEmail] = React.useState("")
    const [inputedStatus, setInputedStatus] = React.useState("")
    const [inputedFacebook, setInputedFacebook] = React.useState("")
    const [inputedInstagam, setInputedInstagam] = React.useState("")
    const [inputedCost, setInputedCost] = React.useState("")
    const [inputedWebsite, setInputedWebsite] = React.useState("")
    const [inputedCode, setInputedCode] = React.useState("")
    const [inputedHostel, setInputedHostel] = React.useState("")
    const [inputedMilitary, setInputedMilitary] = React.useState("")
    const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
    const [inputedLogo, setInputedLogo] = React.useState("")
    const [inputedAddress, setInputedAddress] = React.useState(stateValue)
    const [inputedRegion, setInputedRegion] = React.useState(countryValue)
    const [inputedDescription, setInputedDescription] = React.useState("")
    const [inputedImages, setInputedImages] = React.useState([])
    const [inputedImage, setInputedImage] = React.useState("")
    const { uploadImages, imagesUploadingProgress, uploadedImages, isImagesUploading } = useUploadImages(
        "imageUploader",
        { defaultUploadedFiles: [] }
    )
    const { uploadLogo, logoUploadprogresses, isLogoUploading, uploadedLogo } = useUploadLogo(
        "imageUploader",
        { defaultUploadedFiles: [] }
    )
    const containerRef = useRef(null);
    const { images } = useUniversityImages();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const initialValue = [
        {
            id: '1',
            type: ELEMENT_PARAGRAPH,
            children: [{ text: 'Hello, World!' }],
        },
    ];
    const handleConfetti = async () => {
        const { clientWidth, clientHeight } = document.documentElement;
        const boundingBox = buttonRef.current?.getBoundingClientRect?.();
        const targetY = boundingBox?.y ?? 0;
        const targetX = boundingBox?.x ?? 0;
        const targetWidth = boundingBox?.width ?? 0;
        const targetCenterX = targetX + targetWidth / 2;
        const confetti = (await import("canvas-confetti")).default;
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 70,
            origin: {
                y: targetY / clientHeight,
                x: targetCenterX / clientWidth,
            },
        });
        setSheetToggle(!sheetToggle);
    };

    const handleOnChange = (e: any) => {
        setPhone(e.target.value);
    };
    const phoneData = getPhoneData(phone);
    function showPhoneNumberDetails() {
        setPhoneNumberDetails(!phoneNumberDetails);
    }
    const handleNameChange = (event: any) => {
        setInputedName(event.target.value);
    }
    const handleEmailChange = (event: any) => {
        setInputedEmail(event.target.value);
    }
    const handleStatusChange = (event: any) => {
        setInputedStatus(event);
    }
    const handleFacebookChange = (event: any) => {
        setInputedFacebook(event.target.value);
    }
    const handleImageChange = (event: any) => {
        setInputedImage(event.target.value);
    }
    const handleLogoChange = (event: any) => {
        setInputedLogo(event.target.value);
    }
    const handleInstagramChange = (event: any) => {
        setInputedInstagam(event.target.value);
    }
    const handleCostChange = (event: any) => {
        setInputedCost(event.target.value);
    }
    const handleWebsiteChange = (event: any) => {
        setInputedWebsite(event.target.value);
    }
    const handleCodeChange = (event: any) => {
        setInputedCode(event.target.value);
    }
    const handleHostelChange = (event: any) => {
        setInputedHostel(event);
    }
    const handleMilitaryChange = (event: any) => {
        setInputedMilitary(event);
    }
    const handleDescriptionChange = (event: any) => {
        setInputedDescription(event.target.value);
    }
    const syncImagesAndLogo = () => {
        const newArray2: any = uploadedImages.map((file) => file.url);
        setInputedImages(newArray2);
        uploadedLogo.map((file: any) => {
            setInputedLogo(file.url);
            return null;
        })
        setCreateButtonDisabled(!createButtonDisabled);
    }
    const handleInputedValues = () => {
        setInputedValues(!inputedValues);
    }

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    // UseEffect Hooks
    useEffect(() => {
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
            setLoading(true);
            const q = query(collection(db, "universities"), limit(8));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDocs(newDocs);
            // Configuring Data for Update:
            docs.map((item: any) => {
                setInputedAddress(item.address);
                setInputedCost(item.educationCost);
                setInputedEmail(item.email);
                setInputedFacebook(item.facebook);
                setInputedHostel(item.hostel);
                setInputedImages(item.images);
                setInputedImage(item.image);
                setInputedInstagam(item.instagram);
                setInputedMilitary(item.military);
                setInputedPhoneNumber(item.phoneNumber);
                setInputedRegion(item.region);
                setInputedStatus(item.status);
                setInputedCode(item.universityCode);
                setInputedDescription(item.universityDescription);
                setInputedName(item.universityName);
                setInputedWebsite(item.website);
                setInputedLogo(item.logo);
            })
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setLoading(false);
        };
        fetchDocs();
    }, []);

    const loadMore = async () => {
        setLoading(true);
        const q = query(
            collection(db, "universities"),
            startAfter(lastDoc),
            limit(8)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length === 0) {
            toast({
                title: 'There is no more data in the database.',
                description: (
                    <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                        <span>Please add more data to load more!</span>
                    </div>
                ),
            });
            setLoading(false);
            return;
        }
        const newDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setDocs([...docs, ...newDocs]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };

    if (loading) {
        return <main className="w-full py-5 px-[5%] h-auto">
            <div className="flex items-center justify-between mb-6">
                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Universities</span>
            </div>
            <div className="admin-panel-lists-loading place-content-center">
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>



            </div>
        </main>;
    }

    return (
        <main className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">

            {/* {addNewStudentBar && <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center">

            </div>} */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Workshop!</span>
                <div className="flex-1 flex items-end justify-end gap-3">

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Add New Student</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <Card className="w-full max-w-md border-0">
                                <CardHeader>
                                    <CardTitle>Create New Student</CardTitle>
                                    <CardDescription>Enter the student's username and password to add them to the system.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input onChange={(e: any) => setUsername(e.target.value)} id="username" placeholder="Enter username" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input onChange={(e: any) => setPassword(e.target.value)} id="password" type="password" placeholder="Enter password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={async () => {
                                        const Create = await addDoc(collection(db, "users"), {
                                            username: username,
                                            surname: "ManFromExistence",
                                            avatar: "https://avater.com",
                                            email: "ajju40959@gmail.com",
                                            region: "Bangladesh",
                                            accountType: "student",
                                            youtube: "https://youtube.com",
                                            twitter: "https://twitter.com",
                                            instagram: "https://instagram.com",
                                            facebook: "https://facebook.com",
                                            linkdin: "https://linkdin.com",
                                            password: password,
                                        })
                                        toast({
                                            title: "Student Created Successfully!",
                                            description: `All students are public.`,
                                        });
                                    }} className="w-full">Create Student</Button>
                                </CardFooter>
                            </Card>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Add New Classroom</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                <Card className="w-full max-w-md border-0">
                                    <CardHeader>
                                        <CardTitle>Create New Classroom</CardTitle>
                                        <CardDescription>Enter the classroom details to add them to the system.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input onChange={(e: any) => setUsername(e.target.value)} id="title" placeholder="Enter Title" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="thumbnail">Thumbnail</Label>
                                            <Input onChange={(e: any) => setUsername(e.target.value)} id="thumbnail" placeholder="Enter Thumbnail Link" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea onChange={(e: any) => setUsername(e.target.value)} id="description" placeholder="Enter Description" />
                                        </div>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Students" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>North America</SelectLabel>
                                                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                                    <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                                    <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Europe & Africa</SelectLabel>
                                                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                                    <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                                    <SelectItem value="west">
                                                        Western European Summer Time (WEST)
                                                    </SelectItem>
                                                    <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                                    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Asia</SelectLabel>
                                                    <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                                    <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                                    <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                                    <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                                    <SelectItem value="ist_indonesia">
                                                        Indonesia Central Standard Time (WITA)
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Australia & Pacific</SelectLabel>
                                                    <SelectItem value="awst">
                                                        Australian Western Standard Time (AWST)
                                                    </SelectItem>
                                                    <SelectItem value="acst">
                                                        Australian Central Standard Time (ACST)
                                                    </SelectItem>
                                                    <SelectItem value="aest">
                                                        Australian Eastern Standard Time (AEST)
                                                    </SelectItem>
                                                    <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                                    <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>South America</SelectLabel>
                                                    <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                                    <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                                    <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                                    <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <div className="w-full flex justify-between">
                                            <Button variant="outline">
                                                Remove All Students
                                            </Button>
                                            <Button variant="outline">
                                                Add All Students
                                            </Button>
                                        </div>
                                        <Table>
                                            <TableCaption>A list of your recent invoices.</TableCaption>
                                            <TableHeader>
                                                <TableRow>
                                                    {/* <TableHead className="w-[100px]">User Name</TableHead> */}
                                                    <TableHead>Username</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                    {/* <TableHead className="text-right">Amount</TableHead> */}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {invoices.map((invoice) => (
                                                    <TableRow key={invoice.invoice}>
                                                        {/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
                                                        <TableCell>{invoice.paymentStatus}</TableCell>
                                                        <TableCell>{invoice.paymentMethod}</TableCell>
                                                        {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={3}>Total</TableCell>
                                                    <TableCell className="text-right">$2,500.00</TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </CardContent>
                                    {/* <CardFooter>
                                    <Button onClick={async () => {
                                        const Create = await addDoc(collection(db, "users"), {
                                            username: username,
                                            surname: "ManFromExistence",
                                            avatar: "https://avater.com",
                                            email: "ajju40959@gmail.com",
                                            region: "Bangladesh",
                                            accountType: "student",
                                            youtube: "https://youtube.com",
                                            twitter: "https://twitter.com",
                                            instagram: "https://instagram.com",
                                            facebook: "https://facebook.com",
                                            linkdin: "https://linkdin.com",
                                            password: password,
                                        })
                                        toast({
                                            title: "Student Created Successfully!",
                                            description: `All students are public.`,
                                        });
                                    }} className="w-full">Create Student</Button>
                                </CardFooter> */}
                                </Card>
                            </ScrollArea>
                            <Button onClick={async () => {
                                const Create = await addDoc(collection(db, "users"), {
                                    username: username,
                                    surname: "ManFromExistence",
                                    avatar: "https://avater.com",
                                    email: "ajju40959@gmail.com",
                                    region: "Bangladesh",
                                    accountType: "student",
                                    youtube: "https://youtube.com",
                                    twitter: "https://twitter.com",
                                    instagram: "https://instagram.com",
                                    facebook: "https://facebook.com",
                                    linkdin: "https://linkdin.com",
                                    password: password,
                                })
                                toast({
                                    title: "Student Created Successfully!",
                                    description: `All students are public.`,
                                });
                            }} className="w-full">Create Classroom</Button>

                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="admin-panel-lists place-content-center">
                {docs.map((items: any) => (
                    <div key={items.id}>
                        <Card className="hover-glow-border w-full relative hover:bg-primary-foreground h-full flex flex-col">
                            <div className="w-full flex flex-col items-center justify-center relative min-h-auto">
                                <Carousel
                                    plugins={[plugin.current]}
                                    setApi={setApi}
                                    className="w-full !min-h-min"
                                    onMouseEnter={plugin.current.stop}
                                    onMouseLeave={plugin.current.reset}
                                >
                                    <CarouselContent>

                                        {items.images && items.images.length > 0 ? items.images.map((index: any) => (

                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                <div className="h-full">
                                                    <Card>
                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                <Image
                                                                    src={index || "/placeholder.svg"}
                                                                    alt="Images"
                                                                    fill
                                                                    sizes="(min-width: 250px) 300px, 100vw"
                                                                    loading="lazy"
                                                                    className="rounded-md object-cover"
                                                                />
                                                            </AspectRatio>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>



                                        )) : items.image ? Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                <div className="h-full">
                                                    <Card>
                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                <Image
                                                                    src={items.image || "/placeholder.svg"}
                                                                    alt="Image"
                                                                    fill
                                                                    sizes="(min-width: 250px) 300px, 100vw"
                                                                    loading="lazy"
                                                                    className="rounded-md object-cover"
                                                                />
                                                            </AspectRatio>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        )) : ""}
                                    </CarouselContent>
                                </Carousel>
                            </div>
                            {items.images && items.images.length > 0 ? "" : items.image ? "" : <div className="center rounded-md border h-[250px]">No image is provided.</div>}
                            {/* <div className="absolute bottom-4 left-4">
                <Avatar>
                  <AvatarImage src={items.logo} alt="@Ustudy" />
                  <AvatarFallback>UY</AvatarFallback>
                </Avatar>
              </div> */}
                            <CardContent className="px-6 space-y-4 h-[200px] py-5 overflow-x-hidden overflow-y-auto">
                                <div>
                                    <h2 className="text-2xl font-bold w-full truncate">{items.universityName || "No Name Provided for this university."}</h2>
                                    <div className="flex items-center space-x-2 text-sm text-primary mt-3">
                                        <LocateIcon className="h-4 w-4" />
                                        <span>{items.address || "Nothing."}</span>
                                        <Separator className="h-4" orientation="vertical" />
                                        <GlobeIcon className="h-4 w-4" />
                                        <span>{items.region || "Nothing."}</span>
                                    </div>
                                </div>
                                {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                                    <div key={item.id}>
                                        {item.children.map((child: any) => (
                                            <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                                        ))}
                                    </div>
                                )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.universityDescription || "No Description Provided for this university."}</p>}
                            </CardContent>
                            <CardFooter className="flex !w-full items-center justify-between">

                                <div className="">
                                    <Avatar>
                                        <AvatarImage src={items.logo} alt="@Ustudy" />
                                        <AvatarFallback>UY</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex justify-end gap-1.5">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">View</Button>
                                        </DialogTrigger>
                                        <DialogContent className="lg:min-w-[650px]">
                                            <ScrollArea className="w-full rounded-md border !max-h-[70vh] !p-0">
                                                <div className="flex w-full flex-col gap-2 rounded-lg p-3 text-sm">
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <University className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p className="flex flex-row text-center">University: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.universityName || "No Name is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Mail className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Email: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.email || "No Email is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Facebook className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Facebook: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.facebook || "No Facebook Link is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Instagram className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Instagram: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.instagram || "No Instagram Link is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <CircleDollarSign className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Education Cost: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.educationCost || "No Education Cost is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Chrome className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Website: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.website || "No Website Link is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Code className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>University Code: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.universityCode || "No University Code is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Code className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>University Image: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.image || "No University Code is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Code className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>University Logo: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.logo || "No University Code is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Phone className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Phone Number: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.phoneNumber || "No Phone Number is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Earth className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Address: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.address || "No Address is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <MapPinned className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Region: </p>
                                                        <span className="w-auto select-all text-start font-semibold">{items.region || "No Region is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2 py-3">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <MessageCircleDashed className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <span className="max-w-[90%] select-all text-start font-semibold">Description: {items.universityDescription || "No Description is Provided."}</span>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Hotel className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Hostel: </p>
                                                        <Badge
                                                            className={cn(
                                                                "w-fit text-center",
                                                                items.hostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                                            )}
                                                        >
                                                            {items.hostel || "No Hostel Information Provided."}
                                                        </Badge>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <PocketKnife className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Military: </p>
                                                        <Badge
                                                            className={cn(
                                                                "w-fit",
                                                                items.military ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                                            )}
                                                        >
                                                            {items.military || 'No Military Status Provided.'}
                                                        </Badge>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-start gap-2">
                                                        <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                                                            <Flame className="h-5 w-5 !p-0" />
                                                        </div>
                                                        <p>Status: </p>
                                                        <Badge
                                                            className={cn(
                                                                "w-fit",
                                                                items.status ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                                            )}
                                                        >
                                                            {items.status || "No Status Provided."}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </ ScrollArea>
                                        </DialogContent>
                                    </Dialog>

                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button onClick={handleConfetti} variant="default">Update</Button>
                                        </SheetTrigger>
                                        <SheetContent side={"bottom"} className="h-[90vh] !max-w-[1600px] mx-auto rounded-xl">
                                            <ScrollArea className="h-full w-full rounded-md border">
                                                <div className="create-university min-h-[100vh] lg:flex lg:flex-col space-y-3 p-10 pt-3 !min-w-full lg:!min-w-[1500px]">
                                                    <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                                                        <div className="w-full h-full flex items-start justify-start space-x-3">
                                                            <Link href="/universities" className="z-50">
                                                                <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                                                    Back
                                                                </AnimatedButton>
                                                            </Link>
                                                            <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                                                {inputedValues ? "Hide" : "Show"} Inputed Values
                                                            </AnimatedButton>
                                                        </div>

                                                        <div className="w-full h-full flex items-end justify-end space-x-3">
                                                            <Button
                                                                className="!py-0"
                                                                onClick={async () => {
                                                                    const { clientWidth, clientHeight } = document.documentElement;
                                                                    const boundingBox = buttonRef.current?.getBoundingClientRect?.();
                                                                    const targetY = boundingBox?.y ?? 0;
                                                                    const targetX = boundingBox?.x ?? 0;
                                                                    const targetWidth = boundingBox?.width ?? 0;
                                                                    const targetCenterX = targetX + targetWidth / 2;
                                                                    const confetti = (await import("canvas-confetti")).default;
                                                                    confetti({
                                                                        zIndex: 999,
                                                                        particleCount: 100,
                                                                        spread: 70,
                                                                        origin: {
                                                                            y: targetY / clientHeight,
                                                                            x: targetCenterX / clientWidth,
                                                                        },
                                                                    });


                                                                    const updateRef = doc(db, "universities", items.id);
                                                                    const Update = await updateDoc(updateRef, {
                                                                        address: stateValue || items.address,
                                                                        educationCost: inputedCost || items.educationCost,
                                                                        email: inputedEmail || items.email,
                                                                        facebook: inputedFacebook || items.facebook,
                                                                        hostel: inputedHostel || items.hostel,
                                                                        image: inputedImage || items.image,
                                                                        instagram: inputedInstagam || items.instagram,
                                                                        military: inputedMilitary || items.military,
                                                                        phoneNumber: phone || items.phoneNumber,
                                                                        region: countryValue || items.region,
                                                                        status: inputedStatus || items.status,
                                                                        universityCode: inputedCode || items.universityCode,
                                                                        universityDescription: inputedDescription || items.universityDescription,
                                                                        universityName: inputedName || items.universityName,
                                                                        website: inputedWebsite || items.website,
                                                                        logo: inputedLogo || items.logo
                                                                    });
                                                                    toast({
                                                                        title: 'University has been Updated Successfully.',
                                                                        description: (
                                                                            <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                                                                <span>You Can now view and delete this university!</span>
                                                                                <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                                                                </pre>
                                                                            </div>
                                                                        ),
                                                                    });

                                                                    location.reload();
                                                                }}
                                                            >
                                                                Update
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {inputedValues && <div className="w-full flex flex-col gap-2 rounded-lg p-3 text-sm overflow-hidden border">
                                                        <div className="flex gap-2">
                                                            <p>Name: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedName || "No Name is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Email: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedEmail || "No Email is Provided."}</span>
                                                        </div>

                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Facebook: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedFacebook || "No Facebook Link is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Instagram: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedInstagam || "No Instagram Link is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Education Cost: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedCost || "No Education Cost is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Website: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedWebsite || "No Website Link is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>University Code: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedCode || "No University Code is Provided."}</span>
                                                        </div>
                                                        <Separator />


                                                        <div className="flex gap-2">
                                                            <p>Phone Number: </p>
                                                            <span className="font-semibold w-auto text-start">{phone || "No Phone Number is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Logo: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedLogo || "No Logo is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Address: </p>
                                                            <span className="font-semibold w-auto text-start">{stateValue || "No Address is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Region: </p>
                                                            <span className="font-semibold w-auto text-start">{countryValue || "No Region is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Description: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedDescription || "No Description is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Image: </p>
                                                            <span className="font-semibold w-auto text-start">{inputedImage || "No Image is Provided."}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Hostel: </p>
                                                            {
                                                                <Badge
                                                                    className={cn(
                                                                        "w-fit text-center",
                                                                        inputedHostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                                                    )}
                                                                >
                                                                    {inputedHostel || "No Hostel Information Provided."}
                                                                </Badge>
                                                            }
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Military: </p>
                                                            {
                                                                <Badge
                                                                    className={cn(
                                                                        "w-fit",
                                                                        inputedMilitary ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                                                    )}
                                                                >
                                                                    {inputedMilitary || 'No Military Status Provided.'}
                                                                </Badge>
                                                            }
                                                        </div>

                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Status: </p>
                                                            {
                                                                <Badge
                                                                    className={cn(
                                                                        "w-fit",
                                                                        inputedStatus ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                                                    )}
                                                                >
                                                                    {inputedStatus || "No Status Provided."}
                                                                </Badge>
                                                            }
                                                        </div>
                                                    </div>}
                                                    <div className="name-logo-description-university w-full grid gap-3 ">
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Name</h1>
                                                            <Input onChange={handleNameChange} type="text" placeholder="Enter University Name" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Email</h1>
                                                            <Input onChange={handleEmailChange} type="email" placeholder="Enter University Email" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Status</h1>
                                                            <Select onValueChange={handleStatusChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>What is the operating method of this university?</SelectLabel>
                                                                        <Separator className="mb-1" />
                                                                        <SelectItem value="Non Profit">Non Profit</SelectItem>
                                                                        <SelectItem value="Public">Public</SelectItem>
                                                                        <SelectItem value="Liberal">Liberal</SelectItem>
                                                                        <SelectItem value="Community">Community</SelectItem>
                                                                        <SelectItem value="Corporatized">Corporatized</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="tag-location-university w-full grid gap-3 h-auto">

                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left mb-3">Phone Number</h1>
                                                            <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                                                            <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                                                        </div>
                                                        <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                                                            <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                                                                <CountryDropdown />
                                                                <StateDropdown />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                                                        <div className="flex gap-2">
                                                            <p>Phone number: </p>
                                                            <span className="font-semibold w-auto text-start">{phoneData.phoneNumber || "-"}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Country code: </p>
                                                            <span className="font-semibold w-auto text-start">{phoneData.countryCode || "-"}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>Country calling code: </p>
                                                            <span className="font-semibold w-auto text-start">
                                                                {phoneData.countryCallingCode || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>National number: </p>
                                                            <span className="font-semibold w-auto text-start">
                                                                {phoneData.nationalNumber || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>International number: </p>
                                                            <span className="font-semibold w-auto text-start">
                                                                {phoneData.internationalNumber || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p>URI: </p>
                                                            <span className="font-semibold w-auto text-start">{phoneData.uri || "-"}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex gap-2">
                                                            <p className="flex-shrink-0">Possible countries: </p>
                                                            <span className="font-semibold w-auto text-start">
                                                                {phoneData.possibleCountries || "-"}
                                                            </span>
                                                        </div>
                                                        <Separator />
                                                        <Badge
                                                            className={cn(
                                                                "w-fit",
                                                                phoneData.isValid
                                                                    ? "bg-green-500 text-green-50"
                                                                    : "bg-destructive text-destructive-foreground",
                                                            )}
                                                        >
                                                            VALID NUMBER
                                                        </Badge>
                                                        <Separator />
                                                        <Badge
                                                            className={cn(
                                                                "w-fit",
                                                                phoneData.isPossible
                                                                    ? "bg-green-500 text-green-50"
                                                                    : "bg-destructive text-destructive-foreground",
                                                            )}
                                                        >
                                                            POSSIBLE NUMBER
                                                        </Badge>
                                                    </div>}
                                                    <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                                                        <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                                                        <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." />
                                                    </div>
                                                    <div className="name-logo-description-university w-full grid gap-3 ">
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                                                            <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                                                            <Select onValueChange={handleHostelChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a Hostel Availability" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                                                        <Separator className="mb-1" />
                                                                        <SelectItem value="yes">Yes</SelectItem>
                                                                        <SelectItem value="no">No</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                                                            <Select onValueChange={handleMilitaryChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a Military Campain" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                                                        <Separator className="mb-1" />

                                                                        <SelectItem value="yes">Yes</SelectItem>
                                                                        <SelectItem value="no">No</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="name-logo-description-university w-full grid gap-3 ">
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                                                            <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                                                            <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                                                            <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                                                        </div>
                                                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                            <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                                                            <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                                                        </div>
                                                    </div>

                                                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                        <h1 className="text-4xl font-bold w-full text-left">Logo</h1>
                                                        <Input onChange={handleLogoChange} type="text" placeholder="Enter Logo Link" />
                                                    </div>
                                                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                                        <h1 className="text-4xl font-bold w-full text-left">Image</h1>
                                                        <Input onChange={handleImageChange} type="text" placeholder="Enter Image Link" />
                                                    </div>
                                                    <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                                                        <Link href="/universities" className="z-50 w-full">
                                                            <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto pr-3 text-start">
                                                                Back
                                                            </AnimatedButton>
                                                        </Link>
                                                        <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                                                            {inputedValues ? "Hide" : "Show"} Inputed Values
                                                        </AnimatedButton>
                                                        <AnimatedButton
                                                            className="!py-0 w-full"
                                                            onClick={async () => {
                                                                const { clientWidth, clientHeight } = document.documentElement;
                                                                const boundingBox = buttonRef.current?.getBoundingClientRect?.();
                                                                const targetY = boundingBox?.y ?? 0;
                                                                const targetX = boundingBox?.x ?? 0;
                                                                const targetWidth = boundingBox?.width ?? 0;
                                                                const targetCenterX = targetX + targetWidth / 2;
                                                                const confetti = (await import("canvas-confetti")).default;
                                                                confetti({
                                                                    zIndex: 999,
                                                                    particleCount: 100,
                                                                    spread: 70,
                                                                    origin: {
                                                                        y: targetY / clientHeight,
                                                                        x: targetCenterX / clientWidth,
                                                                    },
                                                                });


                                                                const updateRef = doc(db, "universities", items.id);
                                                                const Update = await updateDoc(updateRef, {
                                                                    address: stateValue || items.address,
                                                                    educationCost: inputedCost || items.educationCost,
                                                                    email: inputedEmail || items.email,
                                                                    facebook: inputedFacebook || items.facebook,
                                                                    hostel: inputedHostel || items.hostel,
                                                                    image: inputedImage || items.image,
                                                                    instagram: inputedInstagam || items.instagram,
                                                                    military: inputedMilitary || items.military,
                                                                    phoneNumber: phone || items.phoneNumber,
                                                                    region: countryValue || items.region,
                                                                    status: inputedStatus || items.status,
                                                                    universityCode: inputedCode || items.universityCode,
                                                                    universityDescription: inputedDescription || items.universityDescription,
                                                                    universityName: inputedName || items.universityName,
                                                                    website: inputedWebsite || items.website,
                                                                    logo: inputedLogo || items.logo
                                                                });
                                                                toast({
                                                                    title: 'University has been Updated Successfully.',
                                                                    description: (
                                                                        <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                                                            <span>You Can now view and delete this university!</span>
                                                                            <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                                                            </pre>
                                                                        </div>
                                                                    ),
                                                                });

                                                                location.reload();
                                                            }}
                                                        >
                                                            Update
                                                        </AnimatedButton>

                                                    </div>

                                                </div>
                                            </ScrollArea>
                                        </SheetContent>
                                    </Sheet>

                                    <Button onClick={async () => {
                                        await deleteDoc(doc(db, "universities", items.id));
                                        const newDocs = docs.filter((item) => item.id !== items.id);
                                        setDocs(newDocs);
                                    }} className="bg-red-500 text-white hover:bg-red-600" variant="destructive">
                                        Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
            <Button variant={'outline'} className="w-full mt-5" onClick={loadMore} disabled={loading}>
                Load More
            </Button>
        </main>
    );
};
export default Dashboard;