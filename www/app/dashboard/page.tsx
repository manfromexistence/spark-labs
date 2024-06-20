/* eslint-disable react/no-unescaped-entities */
"use client"

import {
    ArrowUpCircle,
    Check,
    CheckCircle2,
    Circle,
    CircleArrowOutUpRight,
    CircleOff,
    Eye,
    EyeOff,
    HelpCircle,
    LucideIcon,
    XCircle,
} from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Minus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

type Status = {
    value: string
    label: string
    icon: LucideIcon
}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const statuses: Status[] = [
    {
        value: "backlog",
        label: "Backlog",
        icon: HelpCircle,
    },
    {
        value: "todo",
        label: "Todo",
        icon: Circle,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: ArrowUpCircle,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircle2,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: XCircle,
    },
]

import date from 'date-and-time';
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter, writeBatch } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
import { Chrome, CircleDollarSign, Code, Earth, Facebook, Flame, Hotel, Instagram, Mail, MapPinned, MessageCircleDashed, Phone, PocketKnife, Trash2, University } from "lucide-react"
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
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
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
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
    const [csvData, setCsvData] = useState<any>("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const togglePasswordVisibility = () => setIsVisiblePassword(!isVisiblePassword);
    const [addStudentsMenu, setAddStudentsMenu] = useState(false);
    const [addClassroomMenu, setAddClassroomMenu] = useState(false);
    const [updateStudentMenu, setUpdateStudentMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [updateStudentMenuOpen, setUpdateStudentMenuOpen] = useState(true);
    const [selectedStatus, setSelectedStatus] = React.useState<any | null>(
        null
    )
    const [value, setValue] = React.useState("")
    const [updateValue, setUpdateValue] = React.useState("")
    const [position, setPosition] = React.useState("bottom")
    const [docs, setDocs] = useState<any[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [users, setUsers] = useState<any>([]);
    const [classrooms, setClassrooms] = useState<any>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [addOneStudent, setAddOneStudent] = useState<any[]>([]);

    const [updatedStudents, setUpdatedStudents] = useState<any[]>([]);
    const [addOneUpdatedStudent, setAddOneUpdatedStudent] = useState<any[]>([]);

    const studentUsers = users.filter((user: any) => user.role === "student");

    const addAllStudents = () => {
        setStudents(studentUsers);
        setAddOneStudent([]);
    };

    const removeAllStudents = () => {
        setStudents([]);
        setAddOneStudent(studentUsers);
    };








    const addAllUpdatedStudents = () => {
        setUpdatedStudents(studentUsers);
        setAddOneUpdatedStudent([]);
    };

    const removeAllUpdatedStudents = () => {
        setUpdatedStudents([]);
        setAddOneUpdatedStudent(studentUsers);
    };

    // const setupForUpdatedStudents = (id: string) => {
    //     docs.map((item: any) => {
    //         if (item.id === id) {
    //             setUpdatedStudents(users.filter((user: any) => item.student.map((student: any) => student === user.id)));
    //         }
    //     })
    // }
    const setupForUpdatedStudents = (id: string) => {
        const updatedStudents1 = users.filter((user: any) => {
            const matchingItem = docs.find((item: any) => item.id === id);
            if (matchingItem) {
                return matchingItem.students.some((student: any) => student === user.id);
            }
            return false;
        });
        // const updatedStudents2 = users.map((user: any) => {
        //     updatedStudents.map((student) => student.id === user.id && student)
        // });
        // const updatedStudents2 = users.map((user: any) => {
        //     const updatedStudent = updatedStudents.find((student) => student.id === user.id);
        //     return student.id !== user.id ? updatedStudent : [];
        // });
        // const updatedStudents2 = users.map((user: any) => {
        //     return updatedStudents.map((student: any) => student.id !== user.id ? student : [])
        // });
        const updatedStudents2 = updatedStudents.map((student: any) => {
            const matchingUser = users.map((user: any) => user.id !== student.id);
            return matchingUser || [];
        });


        setUpdatedStudents(updatedStudents1);
        setAddOneUpdatedStudent(updatedStudents2);
    };


    const deleteUser = (id: number) => {
        const updatedStudents = users.filter((user: any) => user.id !== id);
        setUsers(updatedStudents);
    };

    const [dummyFunctionallty, setDummyFunctionality] = useState<any>(false);

    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [addNewStudentBar, setAddNewStudentBar] = React.useState(false);
    const [addNewClassroomBar, setAddNewClassroomBar] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [thumbnail, setThumbnail] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userId, setUserId] = React.useState("");

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
            const q = query(collection(db, "classrooms"), limit(8));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDocs(newDocs);
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setLoading(false);
        };
        const fetchSubmissions = async () => {
            setLoading(true);
            const q = query(collection(db, "submissions"), limit(8));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSubmissions(newDocs);
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setLoading(false);
        };
        fetchSubmissions();
        fetchDocs();
    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(newDocs);
            setAddOneStudent(newDocs.filter((user: any) => user.role === "student"));
        };
        const fetchClassroom = async () => {
            const q = query(collection(db, "classrooms"));
            const querySnapshot = await getDocs(q);
            const newDocs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClassrooms(newDocs);
        };
        fetchClassroom();
        fetchUsers();
    }, []);

    const loadMoreClassrooms = async () => {
        setLoading(true);
        const q = query(
            collection(db, "classrooms"),
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
    const loadMoreSubmissions = async () => {
        setLoading(true);
        const q = query(
            collection(db, "submissions"),
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
                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Workshop</span>
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

    function generateRandomEmail(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        const tlds = ['com', 'net', 'org', 'edu', 'gov'];

        const randomString = (length: number): string => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        const localPart = randomString(24);
        return `${localPart}@gmail.com`;
    }

    const handleSignUp = async () => {
        const Create = await addDoc(collection(db, "users"), {
            username: username,
            password: password,
            email: generateRandomEmail(),
            role: "student",
            userId: "",
            // region: "Bangladesh",
            // accountType: "student",
            // youtube: "https://youtube.com",
            // twitter: "https://twitter.com",
            // instagram: "https://instagram.com",
            // facebook: "https://facebook.com",
            // linkdin: "https://linkdin.com",
            // surname: "ManFromExistence",
            // avatar: "https://avater.com",
        });
        toast({
            title: "Success!",
            description: `Student created from username and password.`,
        });
    };

    const EnhancedErrors = (input: any): string | null => {
        switch (input) {
            case "auth/email-already-in-use": return "Email in use.";
            case "auth/invalid-email": return "Invalid email.";
            case "auth/operation-not-allowed": return "Operation not allowed.";
            case "auth/weak-password": return "Weak password.";
            case "auth/user-disabled": return "User disabled.";
            case "auth/user-not-found": return "User not found.";
            case "auth/wrong-password": return "Wrong password.";
            case "auth/too-many-requests": return "Too many requests.";
            case "auth/network-request-failed": return "Network error.";
            default: return "Signup error.";
        }
    };

    const SuggestSolutions = (input: any): string | null => {
        switch (input) {
            case "auth/email-already-in-use": return "Try logging in or use a different email.";
            case "auth/invalid-email": return "Check format.";
            case "auth/operation-not-allowed": return "Contact support.";
            case "auth/weak-password": return "Choose a stronger one.";
            case "auth/user-disabled": return "Contact support.";
            case "auth/user-not-found": return "Check email or create new account.";
            case "auth/wrong-password": return "Try again.";
            case "auth/too-many-requests": return "Wait and try again.";
            case "auth/network-request-failed": return "Check internet connection.";
            default: return "Try again later or contact support.";
        }
    };

    return (
        <>
            {
                users && users.map((user: any) => {
                    if (user.role === "student") {
                        return auth && auth.currentUser && auth.currentUser.uid === user.userId ? (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">{user.username.toUpperCase()}'s Workshop!</span>
                                <div className="flex-1 flex items-end justify-end gap-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Submit A Project</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Available Classrooms</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {docs.map((classroom: any) => classroom.students.some((student: any) => student === user.id) && <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}><DropdownMenuItem>{classroom.title}</DropdownMenuItem></Link>)}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="admin-panel-lists">
                                {submissions.map((items: any) => (
                                    <div key={items.id} className="max-w-[450px]">
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
                                                        )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                                <div className="h-full">
                                                                    <Card>
                                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                <Image
                                                                                    src={items.thumbnail}
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
                                                {items.thumbnail === "" && <div className="flex-center h-[250px] w-full border rounded-md">No Thumbnail found.</div>}

                                            </div>
                                            <CardContent className="px-6 space-y-4 min-h-[200px] py-5 overflow-x-hidden overflow-y-auto">
                                                <div>
                                                    <h2 className="text-2xl font-bold w-full truncate">{items.title || "No Name Provided for this university."}</h2>
                                                </div>
                                                {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                                                    <div key={item.id}>
                                                        {item.children.map((child: any) => (
                                                            <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                                                        ))}
                                                    </div>
                                                )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.description || "No Description Provided for this university."}</p>}
                                                <div className="flex flex-col flex-1 h-auto gap-3">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button className="w-full" variant="outline">View Details</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="lg:min-w-[650px]">
                                                            <ScrollArea className="w-full rounded-md border !max-h-[70vh] !p-0">
                                                                <div className="flex w-full flex-col gap-2 rounded-lg p-3 text-sm font-mono h-auto min-h-max">
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Title: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.title || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Description: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.description || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Thumbnail: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.thumbnail || "No Title is Provided."}</span>
                                                                    </div>
                                                                    <Separator />
                                                                    <div className="flex items-center justify-start gap-2">
                                                                        <p className="flex flex-row text-center">Time: </p>
                                                                        <span className="w-auto select-all text-start font-semibold">{items.time || "No Title is Provided."}</span>
                                                                    </div>
                                                                    {/* <Separator />
                                                                    <div className="w-full h-auto rounded-md border p-3">
                                                                        <div className="w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono p-3 border-b mb-3">
                                                                            <span>Xml</span>
                                                                        </div>
                                                                        <span className="w-auto select-all text-start font-semibold outline rounded-md">{items.xml || "No Title is Provided."}</span>
                                                                    </div> */}
                                                                </div>
                                                            </ ScrollArea>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Link href={`submissions/presentation/${items.id}`}>
                                                        <Button className="w-full bg-red-500 text-foreground hover:bg-red-600" variant="destructive">
                                                            Run This Project
                                                        </Button>
                                                    </Link>

                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}

                            </div>
                            {submissions.length === 0 && <div className="flex-center w-full min-h-[70vh]">
                                <CircleOff className="h-4 w-4 mr-2" />No Submissions Found!
                            </div>}

                            {docs.length >= 8 && <Button variant={'outline'} className="w-full mt-5" onClick={loadMoreSubmissions} disabled={loading}>
                                Load More Submissions
                            </Button>}
                        </main>) : null;
                    }
                    if (user.role === "teacher") {
                        return auth && auth.currentUser && auth.currentUser.uid === user.userId ? (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">{user.username.toUpperCase()}'s Workshop!</span>
                                <div className="flex-1 flex items-end justify-end gap-3">
                                    <Dialog open={addStudentsMenu} onOpenChange={setAddStudentsMenu}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Add New Student</Button>
                                        </DialogTrigger>
                                        <DialogContent className="flex-center sm:max-w-[450px]">
                                            <Tabs defaultValue="automatically" className="w-[400px]">
                                                <TabsList className="grid w-full grid-cols-2">
                                                    <TabsTrigger value="manually">Manually</TabsTrigger>
                                                    <TabsTrigger value="automatically">Automatically</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="manually">
                                                    <Card>
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
                                                                <div className="w-full relative">
                                                                    <Input
                                                                        required
                                                                        type={isVisiblePassword ? "text" : "password"}
                                                                        id="password"
                                                                        placeholder="Enter password"
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        className="w-full rounded-md border text-muted-foreground"
                                                                    />
                                                                    <div
                                                                        onClick={togglePasswordVisibility}
                                                                        className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                                                                    >
                                                                        {isVisiblePassword ? (
                                                                            <Eye className="text-muted-foreground hover:text-primary" />
                                                                        ) : (
                                                                            <EyeOff className="text-muted-foreground hover:text-primary" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* <Input onChange={(e: any) => setPassword(e.target.value)} id="password" type="password" placeholder="Enter password" /> */}
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button onClick={() => {
                                                                const userExists = users.some((user: any) => user.username === username);
                                                                if (userExists) {
                                                                    toast({
                                                                        title: "Please Choose a different Username",
                                                                        description: `There is already a student with this username`,
                                                                    });
                                                                } else {
                                                                    handleSignUp();
                                                                }
                                                                setAddStudentsMenu(!addStudentsMenu);

                                                            }} className="w-full">Create Student</Button>
                                                        </CardFooter>
                                                    </Card>
                                                </TabsContent>
                                                <TabsContent value="automatically">
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Create Students From CSV File</CardTitle>
                                                            <CardDescription>
                                                                Automatically create many students from a csv file(username and password).
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-2">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="load">Choose Your File</Label>
                                                                <Input accept=".csv" type="file" onChange={(event: any) => {
                                                                    const file = event.target.files?.[0];
                                                                    if (!file) return;

                                                                    const reader = new FileReader();

                                                                    reader.onloadend = (e) => {
                                                                        const result: any = e.target?.result;
                                                                        if (!result) return;

                                                                        setCsvData(result);

                                                                        // const lines = result.split('\n');
                                                                        // lines.shift(); // Remove the header line

                                                                        // let processedCount = 0;
                                                                        // const totalLines = lines.length;

                                                                        // const usersCollection = collection(db, 'dummy'); // Reference to the 'users' collection

                                                                        // lines.forEach(async (line: { split: (arg0: string) => [any, any] }, index: any) => {
                                                                        //     const [username, password] = line.split(',');

                                                                        //     // Create a new batch for each iteration
                                                                        //     const batch = writeBatch(db);

                                                                        //     // Use await to get the DocumentReference
                                                                        //     const docRef = await addDoc(usersCollection, {
                                                                        //         username: username,
                                                                        //         password: password,
                                                                        //         role: "student",
                                                                        //         userId: "",
                                                                        //         email: generateRandomEmail()
                                                                        //     });

                                                                        //     // Now you have the DocumentReference
                                                                        //     batch.set(docRef, {
                                                                        //         username: username,
                                                                        //         password: password,
                                                                        //         role: "student",
                                                                        //         userId: "",
                                                                        //         email: generateRandomEmail()
                                                                        //     });

                                                                        //     // Commit the batch immediately
                                                                        //     await batch.commit();

                                                                        //     // Update progress indicator
                                                                        //     processedCount++;
                                                                        //     console.log(`Processed ${processedCount} out of ${totalLines} documents`);
                                                                        // });
                                                                    };
                                                                    reader.readAsText(file);

                                                                    // setAddStudentsMenu(!addStudentsMenu);
                                                                    // toast({
                                                                    //     title: "Success!",
                                                                    //     description: `Students created from csv file.`,
                                                                    // });

                                                                }} id="load" placeholder="Choose A File" />
                                                            </div>

                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button className='w-full' onClick={() => {
                                                                const lines = csvData.split('\n');
                                                                lines.shift(); // Remove the header line

                                                                let processedCount = 0;
                                                                const totalLines = lines.length;

                                                                const usersCollection = collection(db, 'dumbmer'); // Reference to the 'users' collection

                                                                lines.forEach(async (line: { split: (arg0: string) => [any, any] }, index: any) => {
                                                                    const [username, password] = line.split(',');

                                                                    // Create a new batch for each iteration
                                                                    const batch = writeBatch(db);

                                                                    // Use await to get the DocumentReference
                                                                    const docRef = await addDoc(usersCollection, {
                                                                        username: username,
                                                                        password: password,
                                                                        role: "student",
                                                                        userId: "",
                                                                        email: generateRandomEmail()
                                                                    });

                                                                    // Now you have the DocumentReference
                                                                    batch.set(docRef, {
                                                                        username: username,
                                                                        password: password,
                                                                        role: "student",
                                                                        userId: "",
                                                                        email: generateRandomEmail()
                                                                    });

                                                                    // Commit the batch immediately
                                                                    await batch.commit();

                                                                    // Update progress indicator
                                                                    processedCount++;
                                                                    console.log(`Processed ${processedCount} out of ${totalLines} documents`);
                                                                });
                                                                setAddStudentsMenu(!addStudentsMenu);
                                                                toast({
                                                                    title: "Success!",
                                                                    description: `Students created from csv file.`,
                                                                });
                                                            }}>Create Students</Button>
                                                        </CardFooter>
                                                    </Card>
                                                </TabsContent>
                                            </Tabs>

                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={addClassroomMenu} onOpenChange={setAddClassroomMenu}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Add New Classroom</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[450px]">
                                            <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                                <Card className="w-full max-w-md border-0">
                                                    <CardHeader>
                                                        <CardTitle>Create New Classroom</CardTitle>
                                                        <CardDescription>Enter the classroom details to add them to the system.</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="title">Title</Label>
                                                            <Input onChange={(e: any) => setTitle(e.target.value)} id="title" placeholder="Enter Title" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="thumbnail">Thumbnail</Label>
                                                            <Input onChange={(e: any) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter Thumbnail Link" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="description">Description</Label>
                                                            <Textarea onChange={(e: any) => setDescription(e.target.value)} id="description" placeholder="Enter Description" />
                                                        </div>
                                                        <div className="w-full space-y-2">
                                                            <Label htmlFor="students">Students</Label>
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-full justify-between"
                                                                    >
                                                                        {value
                                                                            ? `Added (${value.toUpperCase()})`
                                                                            : "Add student..."}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[342px] p-0">
                                                                    <Command>
                                                                        <CommandInput placeholder="Search students..." />
                                                                        <CommandList>
                                                                            <CommandGroup>
                                                                                {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                    <CommandItem
                                                                                        key={user.id}
                                                                                        value={user.username}
                                                                                        onSelect={(currentValue) => {
                                                                                            setValue(currentValue);
                                                                                            const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                            setAddOneStudent(updatedStudentsPP);
                                                                                            setStudents(prevDocs => [...prevDocs, {
                                                                                                id: user.id,
                                                                                                username: user.username,
                                                                                            }]);
                                                                                            setOpen(false);
                                                                                        }}
                                                                                    >
                                                                                        <Check
                                                                                            className={cn(
                                                                                                "mr-2 h-4 w-4",
                                                                                                value === user.username ? "opacity-100" : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {user.username}
                                                                                    </CommandItem>
                                                                                )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                    No Students.
                                                                                </div>)}
                                                                            </CommandGroup>
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <div className="w-full flex gap-1.5">
                                                                <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                    Remove All Students
                                                                </Button>
                                                                <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                    Add All Students
                                                                </Button>
                                                            </div>

                                                            <div className="w-full h-auto rounded-md border p-3">
                                                                <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                    <span>Username</span>
                                                                    <span>Actions</span>
                                                                </div>
                                                                {
                                                                    students.length > 0 ? students.map((student: any) => (
                                                                        <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                            <span>{student.username}</span>
                                                                            <Trash2 onClick={() => {
                                                                                const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                setStudents(updatedStudentsTT);
                                                                                setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                    id: student.id,
                                                                                    username: student.username,
                                                                                }]);
                                                                            }} className="h-4 w-4" />
                                                                        </div>
                                                                    )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                        No Students.
                                                                    </div>)
                                                                }
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </ScrollArea>
                                            <Button onClick={async () => {
                                                await addDoc(collection(db, "classrooms"), {
                                                    userId: auth.currentUser && auth.currentUser.uid,
                                                    title: title,
                                                    thumbnail: thumbnail,
                                                    description: description,
                                                    students: students.map((student) => student.id),
                                                    time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                })
                                                toast({
                                                    title: "Classroom Created Successfully!",
                                                    description: `Students can now submit project in this classroom.`,
                                                });
                                                setAddClassroomMenu(!addClassroomMenu);
                                                // setDocs(prevDocs => [...prevDocs, {
                                                //     userId: auth.currentUser && auth.currentUser.uid,
                                                //     title: title,
                                                //     thumbnail: thumbnail,
                                                //     description: description,
                                                //     students: students.map((student) => student.id),
                                                //     time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                // }]);
                                                window.location.reload();
                                            }} className="w-full">Create Classroom</Button>

                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="admin-panel-lists">
                                {docs.map((items: any) => (
                                    <div key={items.id} className="max-w-[450px]">
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
                                                        )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                                <div className="h-full">
                                                                    <Card>
                                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                <Image
                                                                                    src={items.thumbnail}
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
                                                {items.thumbnail === "" && <div className="flex-center h-[250px] w-full border rounded-md">No Thumbnail found.</div>}
                                            </div>
                                            <CardContent className="px-6 space-y-4 min-h-[200px] py-5 overflow-x-hidden overflow-y-auto">
                                                <div>
                                                    <h2 className="text-2xl font-bold w-full truncate">{items.title || "No Name Provided for this university."}</h2>
                                                </div>
                                                {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                                                    <div key={item.id}>
                                                        {item.children.map((child: any) => (
                                                            <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                                                        ))}
                                                    </div>
                                                )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.description || "No Description Provided for this university."}</p>}
                                                <div className="flex flex-col flex-1 h-auto gap-3">


                                                    <div className="w-full flex flex-row gap-3">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className="w-full" variant="outline">View</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="lg:min-w-[650px]">
                                                                <ScrollArea className="w-full rounded-md border !max-h-[70vh] !p-0">
                                                                    <div className="flex w-full flex-col gap-2 rounded-lg p-3 text-sm font-mono h-auto min-h-max">
                                                                        <div className="flex items-center justify-start gap-2">
                                                                            <p className="flex flex-row text-center">Title: </p>
                                                                            <span className="w-auto select-all text-start font-semibold">{items.title || "No Title is Provided."}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="flex items-center justify-start gap-2">
                                                                            <p className="flex flex-row text-center">Description: </p>
                                                                            <span className="w-auto select-all text-start font-semibold">{items.description || "No Title is Provided."}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="flex items-center justify-start gap-2">
                                                                            <p className="flex flex-row text-center">Thumbnail: </p>
                                                                            <span className="w-auto select-all text-start font-semibold">{items.thumbnail || "No Title is Provided."}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="flex items-center justify-start gap-2">
                                                                            <p className="flex flex-row text-center">Time: </p>
                                                                            <span className="w-auto select-all text-start font-semibold">{items.time || "No Title is Provided."}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="w-full h-auto rounded-md border p-3">
                                                                            <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                <span>Username</span>
                                                                                <span>Actions</span>
                                                                            </div>
                                                                            {
                                                                                items.students.map((student: any) => {
                                                                                    return users.map((user: any) => {
                                                                                        if (user.id === student) {
                                                                                            return (
                                                                                                <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                    <span>{user.username}</span>
                                                                                                    <Link href={`submissions/${user.userId}`}>
                                                                                                        <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                    </Link>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    });
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </ ScrollArea>
                                                            </DialogContent>
                                                        </Dialog>
                                                        {/* <Dialog open={updateStudentMenu} onOpenChange={setUpdateStudentMenu}>
                                                            <DialogTrigger>
                                                                <Button
                                                                    // onClick={() => {
                                                                    // const updatedStudents1 = users.filter((user: any) => {
                                                                    //     items.students.map((student: any) => student === user.id && user)
                                                                    // });


                                                                    // setUpdatedStudents(updatedStudents1);

                                                                    // const matchingItem = docs.find((item: any) => item.id === items.id);
                                                                    // if (matchingItem) {
                                                                    //     return matchingItem.students.some((student: any) => student === user.id);
                                                                    // }
                                                                    // return false;

                                                                    // const updatedStudents2 = updatedStudents.map((student: any) => {
                                                                    //     const matchingUser = users.map((user: any) => user.id !== student.id && user);
                                                                    //     return matchingUser || [];
                                                                    // });
                                                                    // setAddOneUpdatedStudent(updatedStudents2);


                                                                    // setupForUpdatedStudents(items.id);
                                                                    // }}
                                                                    className="w-full" variant="outline">Manage Students</Button>
                                                            </DialogTrigger>
                                                            <DialogContent
                                                                // onClick={() => {
                                                                //     setDummyFunctionality(true);
                                                                // }} 
                                                                className="sm:max-w-[450px]">
                                                                <ScrollArea className="h-auto w-full rounded-md border p-1">
                                                                    <Card className="w-full max-w-md border-0">
                                                                        <CardHeader>
                                                                            <CardTitle>Update Students In ({items.title.toUpperCase()})</CardTitle>
                                                                            <CardDescription>Need to add or remove students.No worry.Just add or remove them here!</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">


                                                                            <div className="w-full space-y-2">
                                                                                <Label htmlFor="students">Students</Label>
                                                                                <Popover open={open} onOpenChange={setOpen}>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            role="combobox"
                                                                                            aria-expanded={open}
                                                                                            className="w-full justify-between"
                                                                                        >
                                                                                            {value
                                                                                                ? `Added (${value.toUpperCase()})`
                                                                                                : "Add student..."}
                                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                        </Button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent className="w-[342px] p-0">
                                                                                        <Command>
                                                                                            <CommandInput placeholder="Search students..." />
                                                                                            <CommandList>
                                                                                                <CommandGroup>
                                                                                                    {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                                        <CommandItem
                                                                                                            key={user.id}
                                                                                                            value={user.username}
                                                                                                            onSelect={(currentValue) => {
                                                                                                                setValue(currentValue);
                                                                                                                const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                                setAddOneStudent(updatedStudentsPP);
                                                                                                                setStudents(prevDocs => [...prevDocs, {
                                                                                                                    id: user.id,
                                                                                                                    username: user.username,
                                                                                                                }]);
                                                                                                                setOpen(false);
                                                                                                            }}
                                                                                                        >
                                                                                                            <Check
                                                                                                                className={cn(
                                                                                                                    "mr-2 h-4 w-4",
                                                                                                                    value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                )}
                                                                                                            />
                                                                                                            {user.username}
                                                                                                        </CommandItem>
                                                                                                    )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                        No Students.
                                                                                                    </div>)}
                                                                                                </CommandGroup>
                                                                                            </CommandList>
                                                                                        </Command>
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                                <div className="w-full flex gap-1.5">
                                                                                    <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                                        Remove All Students
                                                                                    </Button>
                                                                                    <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                                        Add All Students
                                                                                    </Button>
                                                                                </div>

                                                                                <div className="w-full h-auto rounded-md border p-3">
                                                                                    <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                        <span>Username</span>
                                                                                        <span>Actions</span>
                                                                                    </div>
                                                                                    {
                                                                                        dummyFunctionallty ? students.length > 0 ? students.map((student: any) => (
                                                                                            <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                <span>{student.username}</span>
                                                                                                <Trash2 onClick={() => {
                                                                                                    const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                                    setStudents(updatedStudentsTT);
                                                                                                    setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                                        id: student.id,
                                                                                                        username: student.username,
                                                                                                    }]);
                                                                                                }} className="h-4 w-4" />
                                                                                            </div>
                                                                                        )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                            No Students.
                                                                                        </div>) : items.students.map((student: any) => {
                                                                                            return users.map((user: any) => {
                                                                                                if (user.id === student) {
                                                                                                    return (
                                                                                                        <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                            <span>{user.username}</span>
                                                                                                            <Link href={`submissions/${student}`}>
                                                                                                                <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            });
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </CardContent>
                                                                    </Card>
                                                                </ScrollArea>
                                                                <Button onClick={async () => {
                                                                    const updateRef = doc(db, "classrooms", items.id);
                                                                    const UPDATE = await updateDoc(updateRef, {
                                                                        // userId: items.userId,
                                                                        // title: items.title,
                                                                        // thumbnail: items.thumbnail,
                                                                        // description: items.description,
                                                                        students: students.map((student) => student.id),
                                                                        // time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                                    })

                                                                    // setDocs((prevDocs) => {
                                                                    //     const index = prevDocs.findIndex((doc) => doc.id === items.id);

                                                                    //     if (index !== -1) {
                                                                    //         const updatedDocs = [...prevDocs];
                                                                    //         updatedDocs[index] = {
                                                                    //             ...updatedDocs[index],
                                                                    //             students: updatedStudents.map((student) => student.id),
                                                                    //             time: date.format(new Date(), "YYYY/MM/DD HH:mm:ss [GMT]Z", true),
                                                                    //         };
                                                                    //         return updatedDocs;
                                                                    //     }

                                                                    //     // If no matching document found, return the original state
                                                                    //     return prevDocs;
                                                                    // });


                                                                    toast({
                                                                        title: "Classroom Updated Successfully!",
                                                                        description: `Students are updated in this class.`,
                                                                    });
                                                                    setUpdateStudentMenu(false);
                                                                    window.location.reload();

                                                                }} className="w-full">Update Students In This Classroom</Button>

                                                            </DialogContent>
                                                        </Dialog> */}

                                                        <Drawer>
                                                            <DrawerTrigger asChild>
                                                                <Button
                                                                    // onClick={() => {
                                                                    //     setDummyFunctionality(true)
                                                                    // }} 
                                                                    variant="outline">Manage Students</Button>
                                                            </DrawerTrigger>
                                                            <DrawerContent onClick={() => {
                                                                setDummyFunctionality(true);
                                                            }} className="!max-w-[450px] !p-5 !mx-auto">
                                                                {/* <div className="w-full space-y-2">
                                                                    <Label htmlFor="students">Students</Label>
                                                                    <Popover open={updateStudentMenuOpen} onOpenChange={setUpdateStudentMenuOpen}>
                                                                        <PopoverTrigger asChild>
                                                                            <Button
                                                                                variant="outline"
                                                                                role="combobox"
                                                                                aria-expanded={updateStudentMenuOpen}
                                                                                className="w-full justify-between"
                                                                            >
                                                                                {value
                                                                                    ? `Added (${value.toUpperCase()})`
                                                                                    : "Add student..."}
                                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-[342px] p-0">
                                                                            <Command>
                                                                                <CommandInput placeholder="Search students..." />
                                                                                <CommandList>
                                                                                    <CommandGroup>
                                                                                        {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                            <CommandItem
                                                                                                key={user.id}
                                                                                                value={user.username}
                                                                                                onSelect={(currentValue) => {
                                                                                                    setValue(currentValue);
                                                                                                    const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                    setAddOneStudent(updatedStudentsPP);
                                                                                                    setStudents(prevDocs => [...prevDocs, {
                                                                                                        id: user.id,
                                                                                                        username: user.username,
                                                                                                    }]);
                                                                                                    // setUpdateStudentMenuOpen(false);
                                                                                                }}
                                                                                            >
                                                                                                <Check
                                                                                                    className={cn(
                                                                                                        "mr-2 h-4 w-4",
                                                                                                        value === user.username ? "opacity-100" : "opacity-0"
                                                                                                    )}
                                                                                                />
                                                                                                {user.username}
                                                                                            </CommandItem>
                                                                                        )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                            No Students.
                                                                                        </div>)}
                                                                                    </CommandGroup>
                                                                                </CommandList>
                                                                            </Command>
                                                                        </PopoverContent>
                                                                    </Popover>

                                                                    <div className="w-full flex gap-1.5">
                                                                        <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                            Remove All Students
                                                                        </Button>
                                                                        <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                            Add All Students
                                                                        </Button>
                                                                    </div>

                                                                    <div className="w-full h-auto rounded-md border p-3">
                                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                            <span>Username</span>
                                                                            <span>Actions</span>
                                                                        </div>
                                                                        {
                                                                            dummyFunctionallty ? students.length > 0 ? students.map((student: any) => (
                                                                                <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                    <span>{student.username}</span>
                                                                                    <Trash2 onClick={() => {
                                                                                        const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                        setStudents(updatedStudentsTT);
                                                                                        setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                            id: student.id,
                                                                                            username: student.username,
                                                                                        }]);
                                                                                    }} className="h-4 w-4" />
                                                                                </div>
                                                                            )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                No Students.
                                                                            </div>) : items.students.map((student: any) => {
                                                                                return users.map((user: any) => {
                                                                                    if (user.id === student) {
                                                                                        return (
                                                                                            <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                <span>{user.username}</span>
                                                                                                <Link href={`submissions/${student}`}>
                                                                                                    <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                </Link>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                });
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div> */}
                                                                <ScrollArea className="h-auto w-full rounded-md">
                                                                    <Card className="w-full max-w-md border-0">
                                                                        <CardHeader>
                                                                            <CardTitle>Update Students In ({items.title.toUpperCase()})</CardTitle>
                                                                            <CardDescription>Need to add or remove students.No worry.Just add or remove them here!</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">


                                                                            <div className="w-full space-y-2">
                                                                                <Label htmlFor="students">Students</Label>
                                                                                {/* <Popover open={updateStudentMenuOpen} onOpenChange={setUpdateStudentMenuOpen}>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            role="combobox"
                                                                                            aria-expanded={updateStudentMenuOpen}
                                                                                            className="w-full justify-between"
                                                                                        >
                                                                                            {value
                                                                                                ? `Added (${value.toUpperCase()})`
                                                                                                : "Add student..."}
                                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                        </Button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent className="w-[342px] p-0">
                                                                                        <Command>
                                                                                            <CommandInput placeholder="Search students..." />
                                                                                            <CommandList>
                                                                                                <CommandGroup>
                                                                                                    {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                                        <CommandItem
                                                                                                            key={user.id}
                                                                                                            value={user.username}
                                                                                                            onSelect={(currentValue) => {
                                                                                                                setValue(currentValue);
                                                                                                                const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                                setAddOneStudent(updatedStudentsPP);
                                                                                                                setStudents(prevDocs => [...prevDocs, {
                                                                                                                    id: user.id,
                                                                                                                    username: user.username,
                                                                                                                }]);
                                                                                                                // setUpdateStudentMenuOpen(false);
                                                                                                            }}
                                                                                                        >
                                                                                                            <Check
                                                                                                                className={cn(
                                                                                                                    "mr-2 h-4 w-4",
                                                                                                                    value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                )}
                                                                                                            />
                                                                                                            {user.username}
                                                                                                        </CommandItem>
                                                                                                    )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                        No Students.
                                                                                                    </div>)}
                                                                                                </CommandGroup>
                                                                                            </CommandList>
                                                                                        </Command>
                                                                                    </PopoverContent>
                                                                                </Popover> */}
                                                                                <Popover open={open} onOpenChange={setOpen}>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            role="combobox"
                                                                                            aria-expanded={open}
                                                                                            className="w-full justify-between"
                                                                                        >
                                                                                            {value
                                                                                                ? `Added (${value.toUpperCase()})`
                                                                                                : "Add student..."}
                                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                        </Button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent className="w-[342px] p-0">
                                                                                        <Command>
                                                                                            <CommandInput placeholder="Search students..." />
                                                                                            <CommandList>
                                                                                                <CommandGroup>
                                                                                                    {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                                        <CommandItem
                                                                                                            key={user.id}
                                                                                                            value={user.username}
                                                                                                            onSelect={(currentValue) => {
                                                                                                                setValue(currentValue);
                                                                                                                const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                                setAddOneStudent(updatedStudentsPP);
                                                                                                                setStudents(prevDocs => [...prevDocs, {
                                                                                                                    id: user.id,
                                                                                                                    username: user.username,
                                                                                                                }]);
                                                                                                                setOpen(false);
                                                                                                            }}
                                                                                                        >
                                                                                                            <Check
                                                                                                                className={cn(
                                                                                                                    "mr-2 h-4 w-4",
                                                                                                                    value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                )}
                                                                                                            />
                                                                                                            {user.username}
                                                                                                        </CommandItem>
                                                                                                    )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                        No Students.
                                                                                                    </div>)}
                                                                                                </CommandGroup>
                                                                                            </CommandList>
                                                                                        </Command>
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                                <div className="w-full flex gap-1.5">
                                                                                    <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                                        Remove All Students
                                                                                    </Button>
                                                                                    <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                                        Add All Students
                                                                                    </Button>
                                                                                </div>

                                                                                <div className="w-full h-auto rounded-md border p-3">
                                                                                    <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                        <span>Username</span>
                                                                                        <span>Actions</span>
                                                                                    </div>
                                                                                    {
                                                                                        dummyFunctionallty ? students.length > 0 ? students.map((student: any) => (
                                                                                            <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                <span>{student.username}</span>
                                                                                                <Trash2 onClick={() => {
                                                                                                    const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                                    setStudents(updatedStudentsTT);
                                                                                                    setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                                        id: student.id,
                                                                                                        username: student.username,
                                                                                                    }]);
                                                                                                }} className="h-4 w-4" />
                                                                                            </div>
                                                                                        )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                            No Students.
                                                                                        </div>) : items.students.map((student: any) => {
                                                                                            return users.map((user: any) => {
                                                                                                if (user.id === student) {
                                                                                                    return (
                                                                                                        <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                            <span>{user.username}</span>
                                                                                                            <Link href={`submissions/${student}`}>
                                                                                                                <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            });
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </CardContent>
                                                                    </Card>
                                                                </ScrollArea>
                                                                <Button onClick={async () => {
                                                                    const updateRef = doc(db, "classrooms", items.id);
                                                                    const UPDATE = await updateDoc(updateRef, {
                                                                        // userId: items.userId,
                                                                        // title: items.title,
                                                                        // thumbnail: items.thumbnail,
                                                                        // description: items.description,
                                                                        students: students.map((student) => student.id),
                                                                        // time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                                    })

                                                                    // setDocs((prevDocs) => {
                                                                    //     const index = prevDocs.findIndex((doc) => doc.id === items.id);

                                                                    //     if (index !== -1) {
                                                                    //         const updatedDocs = [...prevDocs];
                                                                    //         updatedDocs[index] = {
                                                                    //             ...updatedDocs[index],
                                                                    //             students: updatedStudents.map((student) => student.id),
                                                                    //             time: date.format(new Date(), "YYYY/MM/DD HH:mm:ss [GMT]Z", true),
                                                                    //         };
                                                                    //         return updatedDocs;
                                                                    //     }

                                                                    //     // If no matching document found, return the original state
                                                                    //     return prevDocs;
                                                                    // });


                                                                    toast({
                                                                        title: "Classroom Updated Successfully!",
                                                                        description: `Students are updated in this class.`,
                                                                    });
                                                                    setUpdateStudentMenu(false);
                                                                    window.location.reload();

                                                                }} className="w-full">Update Students In This Classroom</Button>
                                                            </DrawerContent>
                                                        </Drawer>


                                                    </div>



                                                    <Button onClick={async () => {
                                                        await deleteDoc(doc(db, "classrooms", items.id));
                                                        const newDocs = docs.filter((item) => item.id !== items.id);
                                                        setDocs(newDocs);
                                                    }} className="w-full bg-red-500 text-white hover:bg-red-600" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}

                            </div>
                            {docs.length === 0 && <div className="flex-center w-full min-h-[70vh]">
                                <CircleOff className="h-4 w-4 mr-2" />No Classrooms Found!
                            </div>}
                            {docs.length >= 8 && <Button variant={'outline'} className="w-full mt-5" onClick={loadMoreClassrooms} disabled={loading}>
                                Load More Classrooms
                            </Button>}


                        </main>) : null;
                    }
                })
            }
            {auth.currentUser ? null : <div className="min-h-[100vh] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
                <span className="rainbow-text font-bold text-center">Please Login to see your dashboard details!</span>
                <Link href="/login" className="">
                    <Button>Login</Button>
                </Link>
            </div>}


        </>
    );
};
export default Dashboard;