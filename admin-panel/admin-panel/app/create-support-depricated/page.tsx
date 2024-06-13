"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
    authDomain: "ustudy-96678.firebaseapp.com",
    projectId: "ustudy-96678",
    storageBucket: "ustudy-96678.appspot.com",
    messagingSenderId: "581632635532",
    appId: "1:581632635532:web:51ccda7d7adce6689a81a9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db: any = getFirestore(app);
import { ImageIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Button as AnimatedButton } from "@/components/button"
import { Input } from "@/components/ui/input"
import React, { useRef } from 'react';
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import CountryDropdown from "@/components/dropdown/countries";
import StateDropdown from "@/components/dropdown/states";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from "@/registry/default//ui/toast"
import { useToast } from "@/registry/default/ui/use-toast"
import { Tag, TagInput } from 'emblor';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ArrowRightIcon, ArrowLeftIcon, ChevronsUpDown, Plus, X, Projector, CloudUpload, Loader2 } from "lucide-react"
import { Code } from "@/components/code";
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { useDropdownStore } from "@/lib/store/dropdown";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UploadedFile } from "@/types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/empty-card"
import { useUniversityImages } from "@/lib/store/university-images"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}
interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}

export default function CreateSupport() {

    const [resultsTag, setResultslTag] = React.useState<Tag[]>([]);
    const [answersTag, setAnswersTag] = React.useState<Tag[]>([]);
    const { toast } = useToast();
    const router = useRouter()
    const { countryValue, stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } = useDropdownStore();
    const { images } = useUniversityImages();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

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
        const Create = await addDoc(collection(db, "questions"), {
            mainQuestion: inputedMainQuestion,
            answers: answersTag.map(obj => obj.text),
            results: resultsTag.map(obj => obj.text)
        });
        console.log("Document written with ID: ", Create.id);
        toast({
            title: 'University has been created',
            description: (
                <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                    <span>You Can now update,view and delete this question!</span>
                    <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                        <code className="text-muted-foreground bg-secondary">{JSON.stringify(Create.id, null, 2)}</code>
                    </pre>
                </div>

            ),
        });
        router.push('/questions')
    };
    const [inputedValues, setInputedValues] = React.useState(false);
    const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false)
    const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
    const containerRef = useRef(null);
    const initialValue = [
        {
            id: '1',
            type: ELEMENT_PARAGRAPH,
            children: [{ text: 'Hello, World!' }],
        },
    ];
    const [phone, setPhone] = React.useState("+1 (408) 996–1010");
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const phoneData = getPhoneData(phone);
    function showPhoneNumberDetails() {
        setPhoneNumberDetails(!phoneNumberDetails);
    }
    let address: string = 'Bangladesh, Jhenaidah';
    let educationCost: string = '1 335 000 ₸';
    let email: string = 'rektorat@amu.kz';
    let facebook: string = 'https://www.facebook.com/MeduniverAstana';
    let hostel: string = 'есть';
    let image: any = ['https://firebasestorage.googleapis.com/v0/b/ustudy-96678.appspot.com/o/IMG_20240410_001743.jpg?alt=media&token=ef6b3928-40bd-460b-bbb8-f0445ff37319', 'https://firebasestorage.googleapis.com/v0/b/ustudy-96678.appspot.com/o/IMG_20240410_001743.jpg?alt=media&token=ef6b3928-40bd-460b-bbb8-f0445ff37319'];
    let instagram: string = 'https://www.instagram.com/amu_mua_official';
    let military: string = 'есть';
    let phoneNumber: string = '(+77172539424)';
    let region: string = 'г. Астана';
    let status: string = 'акционированный';
    let universityCode: string = '1';
    let universityDescription: string = 'Медицинский университет Астана является одним из самых крупных и динамично развивающихся медицинских ВУЗов нашей страны, имеет высокую репутацию в сфере высшего медицинского образования, свои традиции, как в области предоставления образовательных услуг, так и в развитии медицинской науки и клинической деятельности.';
    let universityName: string = 'Медицинский университет Астана';
    let website: string = 'https://amu.edu.kz/';
    let logo: string = 'https://amu.edu.kz/';
    const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
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
    const [inputedAddress, setInputedAddress] = React.useState(stateValue)
    const [inputedRegion, setInputedRegion] = React.useState(countryValue)
    const [inputedDescription, setInputedDesciption] = React.useState("")
    const [inputedImages, setInputedImages] = React.useState([])

    const handleMainQuestion = (event: any) => {
        setInputedMainQuestion(event.target.value);
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

    const handleInstagramChange = (event: any) => {
        setInputedInstragam(event.target.value);
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
        setInputedDesciption(event.target.value);
    }

    const imagesChange = () => {
        setInputedDesciption(JSON.stringify(event));
    }
    const handleInputedValues = () => {
        setInputedValues(!inputedValues);
    }
    return (
        <>
            <div className="create-university min-h-[100vh] w-full lg:max-w-[1500px] lg:flex lg:flex-col space-y-3 mx-auto p-10 pt-3">
                <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                    <div className="w-full h-full flex items-start justify-start space-x-3">
                        <Link href="/questions" className="z-50">
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
                            onClick={handleConfetti}
                        >
                            Create
                        </Button>
                    </div>


                </div>
                {inputedValues && <div className="min-w-full w-max flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3">
                    <div className="flex gap-2 p-3">
                        <p>MainQestion: </p>
                        <span className="font-semibold">{inputedMainQuestion || "No MainQestion is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2 p-3">
                        <p>Answers: </p>
                        <span className="font-semibold">{JSON.stringify(answersTag,null,2) || "No Answers is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2 p-3">
                        <p>Results: </p>
                        <span className="font-semibold">{JSON.stringify(resultsTag,null,2) || "No Results is Provided."}</span>
                    </div>
                </div>}

                <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Answers</h1>
                    <TagInput
                        placeholder="Enter Your Results"
                        tags={answersTag}
                        className="sm:min-w-[450px]"
                        setTags={(newTags) => {
                            setAnswersTag(newTags);
                        }}
                    />
                </div>
                <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Results</h1>
                    <TagInput
                        placeholder="Enter Your Results"
                        tags={resultsTag}
                        className="sm:min-w-[450px]"
                        setTags={(newTags) => {
                            setResultslTag(newTags);
                        }}
                    />
                </div>
                <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">MainQuestion</h1>
                    <Input onChange={handleMainQuestion} type="text" placeholder="Enter MainQuestion" />
                </div>





                <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                    <Link href="/questions" className="z-50 w-full">
                        <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto">
                            Back
                        </AnimatedButton>
                    </Link>
                    <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                        {inputedValues ? "Hide" : "Show"} Inputed Values
                    </AnimatedButton>
                    <AnimatedButton
                        className="!py-0 w-full"
                        // disabled={createButtonDisabled}
                    onClick={handleConfetti}
                    >
                        Create
                    </AnimatedButton>
                </div>
            </div>
        </>
    )
}
