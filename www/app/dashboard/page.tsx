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

import date from 'date-and-time';
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
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
    const [position, setPosition] = React.useState("bottom")
    const [docs, setDocs] = useState<any[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [users, setUsers] = useState<any>([]);
    const [classrooms, setClassrooms] = useState<any>([]);
    const [students, setStudents] = useState<any[]>([]);
    const studentUsers = users.filter((user: any) => user.accountType === "student");

    const addAllStudents = () => {
        setStudents(studentUsers);
    };

    const removeAllStudents = () => {
        setStudents([]);
    };

    const deleteUser = (id: number) => {
        const updatedStudents = users.filter((user: any) => user.id !== id);
        setUsers(updatedStudents);
    };

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
            username: username, // Replace with your username input
            surname: "ManFromExistence",
            avatar: "https://avater.com",
            email: generateRandomEmail(),
            region: "Bangladesh",
            accountType: "student",
            youtube: "https://youtube.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            facebook: "https://facebook.com",
            linkdin: "https://linkdin.com",
            password: password, // Store the password securely (see note below)
            userId: userId,
        });

        // 4. Show success toast
        toast({
            title: "Student Created Successfully!",
            description: `All students are public.`,
        });

        // try {
        //     // 1. Attempt to create the user with Firebase Authentication
        //     // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        //     // return signOut(auth);

        //     // // 2. If successful, get the user's UID
        //     // const user = userCredential.user;
        //     // const userId = user.uid;

        //     // 3. Create the user document in Firestore
        //     const Create = await addDoc(collection(db, "users"), {
        //         username: username, // Replace with your username input
        //         surname: "ManFromExistence",
        //         avatar: "https://avater.com",
        //         email: generateRandomEmail(),
        //         region: "Bangladesh",
        //         accountType: "student",
        //         youtube: "https://youtube.com",
        //         twitter: "https://twitter.com",
        //         instagram: "https://instagram.com",
        //         facebook: "https://facebook.com",
        //         linkdin: "https://linkdin.com",
        //         password: password, // Store the password securely (see note below)
        //         userId: userId,
        //     });

        //     // 4. Show success toast
        //     toast({
        //         title: "Student Created Successfully!",
        //         description: `All students are public.`,
        //     });
        // } catch (error: any) {
        //     // 5. Handle errors from Firebase Authentication
        //     console.error("Error creating user:", error);
        //     toast({
        //         title: "Uh oh! Something went wrong with your SignUp.",
        //         description: (
        //             <div className="flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1">
        //                 <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
        //                 <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
        //             </div>
        //         ),
        //     });
        // }
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
                                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Student Workshop!</span>
                                <div className="flex-1 flex items-end justify-end gap-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Submit A Project</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Available Classrooms</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {docs.map((classroom: any) => classroom.students.some((student: any) => student === user.userId) && <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}><DropdownMenuItem>{classroom.title}</DropdownMenuItem></Link>)}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="admin-panel-lists">
                                {submissions.map((items: any) => (
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
                                                        )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                                <div className="h-full">
                                                                    <Card>
                                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                <Image
                                                                                    src={items.thumbnail || "/placeholder.svg"}
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
                            <Button variant={'outline'} className="w-full mt-5" onClick={loadMore} disabled={loading}>
                                Load More
                            </Button>
                        </main>) : null;
                    }
                    if (user.role === "teacher") {
                        return auth && auth.currentUser && auth.currentUser.uid === user.userId ? (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Teacher Workshop!</span>
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
                                                    {/* <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input onChange={(e: any) => setEmail(e.target.value)} id="email" placeholder="Enter email" />
                                                    </div> */}
                                                    <div className="space-y-2">
                                                        <Label htmlFor="password">Password</Label>
                                                        <Input onChange={(e: any) => setPassword(e.target.value)} id="password" type="password" placeholder="Enter password" />
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    {/* <Button onClick={() => {
                                                        users.map((user:any) => user.username === username ? toast({
                                                            title: "Please Choose A Different Username",
                                                            description: `There is already a student with this username`,
                                                        }) : handleSignUp)
                                                    }} className="w-full">Create Student</Button> */}
                                                    <Button onClick={() => {
                                                        const userExists = users.some((user: any) => user.username === username);

                                                        if (userExists) {
                                                            toast({
                                                                title: "Please Choose A Different Username",
                                                                description: `There is already a student with this username`,
                                                            });
                                                        } else {
                                                            handleSignUp();
                                                        }
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
                                                        <div className="w-full flex justify-between">
                                                            <Button onClick={removeAllStudents} variant="outline">
                                                                Remove All Students
                                                            </Button>
                                                            <Button onClick={addAllStudents} variant="outline">
                                                                Add All Students
                                                            </Button>
                                                        </div>
                                                        <div className="w-full h-auto rounded-md border p-3">
                                                            <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                <span>Username</span>
                                                                <span>Actions</span>
                                                            </div>
                                                            {
                                                                students.map((student: any) => (
                                                                    <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                        <span>{student.username}</span>
                                                                        <Trash2 onClick={() => {
                                                                            const updatedStudents = students.filter((user: any) => user.id !== student.id);
                                                                            setStudents(updatedStudents);
                                                                        }} className="h-4 w-4" />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </ScrollArea>
                                            <Button onClick={async () => {
                                                const Create = await addDoc(collection(db, "classrooms"), {
                                                    title: title,
                                                    thumbnail: thumbnail,
                                                    description: description,
                                                    students: students.map((student) => student.id),
                                                    time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                })
                                                toast({
                                                    title: "Classroom Created Successfully!",
                                                    description: `All classrooms are public.`,
                                                });
                                            }} className="w-full">Create Classroom</Button>

                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="admin-panel-lists">
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
                                                        )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                            <CarouselItem key={index} className="h-[250px] border-b">
                                                                <div className="h-full">
                                                                    <Card>
                                                                        <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                            <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                                <Image
                                                                                    src={items.thumbnail || "/placeholder.svg"}
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
                                                                        <div className="w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                            <span>Students</span>
                                                                        </div>
                                                                        {
                                                                            items.students.map((student: any) => {
                                                                                return users.map((user: any) => {
                                                                                    if (user.id === student) {
                                                                                        return (
                                                                                            <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono p-3">
                                                                                                <span>{user.username}</span>
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
                            <Button variant={'outline'} className="w-full mt-5" onClick={loadMore} disabled={loading}>
                                Load More
                            </Button>
                        </main>) : null;
                    }
                })
            }

            {/* {users && users.map((user: any) => {
                auth && auth.currentUser && auth.currentUser.uid === user.userId ? (<div>Yes</div>) : (<div>No</div>);

                if (user.accountType === "student") {
                    return (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Student Workshop!</span>
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
                                                    <div className="w-full flex justify-between">
                                                        <Button onClick={removeAllStudents} variant="outline">
                                                            Remove All Students
                                                        </Button>
                                                        <Button onClick={addAllStudents} variant="outline">
                                                            Add All Students
                                                        </Button>
                                                    </div>
                                                    <div className="w-full h-auto rounded-md border p-3">
                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                            <span>Username</span>
                                                            <span>Actions</span>
                                                        </div>
                                                        {
                                                            students.map((student: any) => (
                                                                <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    <span>{student.username}</span>
                                                                    <Trash2 onClick={() => {
                                                                        const updatedStudents = students.filter((user: any) => user.id !== student.id);
                                                                        setStudents(updatedStudents);
                                                                    }} className="h-4 w-4" />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </ScrollArea>
                                        <Button onClick={async () => {
                                            const Create = await addDoc(collection(db, "classrooms"), {
                                                title: title,
                                                thumbnail: thumbnail,
                                                description: description,
                                                students: students.map((student) => student.id),
                                                time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                            })
                                            toast({
                                                title: "Classroom Created Successfully!",
                                                description: `All classrooms are public.`,
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
                                                    )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                        <CarouselItem key={index} className="h-[250px] border-b">
                                                            <div className="h-full">
                                                                <Card>
                                                                    <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                        <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                            <Image
                                                                                src={items.thumbnail || "/placeholder.svg"}
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
                                                                    <div className="w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                        <span>Students</span>
                                                                    </div>
                                                                    {
                                                                        items.students.map((student: any) => {
                                                                            return users.map((user: any) => {
                                                                                if (user.id === student) {
                                                                                    return (
                                                                                        <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono p-3">
                                                                                            <span>{user.username}</span>
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
                        <Button variant={'outline'} className="w-full mt-5" onClick={loadMore} disabled={loading}>
                            Load More
                        </Button>
                    </main>)
                }
                if (user.accountType === "teacher") {
                    return (<main key={user.id} className="w-full py-5 px-[5%] h-auto mb-10 min-h-[90vh]">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Teacher Workshop!</span>
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
                                                    <div className="w-full flex justify-between">
                                                        <Button onClick={removeAllStudents} variant="outline">
                                                            Remove All Students
                                                        </Button>
                                                        <Button onClick={addAllStudents} variant="outline">
                                                            Add All Students
                                                        </Button>
                                                    </div>
                                                    <div className="w-full h-auto rounded-md border p-3">
                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                            <span>Username</span>
                                                            <span>Actions</span>
                                                        </div>
                                                        {
                                                            students.map((student: any) => (
                                                                <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    <span>{student.username}</span>
                                                                    <Trash2 onClick={() => {
                                                                        const updatedStudents = students.filter((user: any) => user.id !== student.id);
                                                                        setStudents(updatedStudents);
                                                                    }} className="h-4 w-4" />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </ScrollArea>
                                        <Button onClick={async () => {
                                            const Create = await addDoc(collection(db, "classrooms"), {
                                                title: title,
                                                thumbnail: thumbnail,
                                                description: description,
                                                students: students.map((student) => student.id),
                                                time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                            })
                                            toast({
                                                title: "Classroom Created Successfully!",
                                                description: `All classrooms are public.`,
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
                                                    )) : items.thumbnail ? Array.from({ length: 5 }).map((_, index) => (
                                                        <CarouselItem key={index} className="h-[250px] border-b">
                                                            <div className="h-full">
                                                                <Card>
                                                                    <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                                                                        <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                                                            <Image
                                                                                src={items.thumbnail || "/placeholder.svg"}
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
                                                                    <div className="w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                        <span>Students</span>
                                                                    </div>
                                                                    {
                                                                        items.students.map((student: any) => {
                                                                            return users.map((user: any) => {
                                                                                if (user.id === student) {
                                                                                    return (
                                                                                        <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-center items-center text-sm font-mono p-3">
                                                                                            <span>{user.username}</span>
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
                        <Button variant={'outline'} className="w-full mt-5" onClick={loadMore} disabled={loading}>
                            Load More
                        </Button>
                    </main>)
                }
            })} */}


            {auth.currentUser ? null : <div className="min-h-[500px] w-full flex items-center justify-center flex-col gap-5 dark:bg-yellow-500 rounded-md">
                <span className="rainbow-text font-bold text-center">Please Login to see your dashboard details!</span>
                <Link href="/login" className="">
                    <Button>Login</Button>
                </Link>
            </div>}


        </>
    );
};
export default Dashboard;