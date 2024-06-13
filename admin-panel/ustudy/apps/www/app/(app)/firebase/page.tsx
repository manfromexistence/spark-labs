"use client";

import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { set } from 'date-fns';
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

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "blur fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// export {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogClose,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// }

const MyAuthComponent = () => {
  const { toast } = useToast()
  const [userDetailsDialog, setUserDetailsDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserid] = useState<any>("");
  const [surname, setSurname] = useState("");
  const [untScore, setUntScore] = useState<any>(0);
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");

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
  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        setUserid(user)
        console.log("Signup");
        setUserDetailsDialog(true)
        if (auth.currentUser) {
          // auth.currentUser.sendEmailVerification()
          //   .then(() => {
          //     // Email sent successfully
          //     console.log('Email verification sent!');
          //   })
          //   .catch((error:any) => {
          //     // Error sending email
          //     console.error('Error sending email:', error);
          //   });
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              // ...
              console.log('Email verification link sent!');
            });
        } else {
          // No user is signed in
          console.error('No user is signed in.');
        }

      })
      .catch((error) => {
        setUserDetailsDialog(false)

        setUserid("Error");
        console.log("Error");


        toast({
          title: "Uh oh! Something went wrong with your SignUp.",
          description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
            <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
            <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
          </div>),
        })

      })
  };
  const userDetails = async () => {
    const Create = await addDoc(collection(db, "users"), {
      accountType: "Client",
      email: email,
      name: name,
      region: region,
      surname: surname,
      untScore: untScore,
      userId: userId.uid
    });

    console.log("Document written with ID: ", Create.id);

    toast({
      title: "User signed up successfully!",
      description: `Continue Using Ustudy ${userId.uid}`,
    })
    setUserDetailsDialog(false);
  };



  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast({
          title: "User signed in successfully!",
          description: `Continue Using Ustudy ${user.uid}`,
        })
      })
      .catch((error) => {
        toast({
          title: "Uh oh! Something went wrong with your SignIn.",
          description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
            <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
            <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
          </div>),
        })
      });

  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input className='bg-primary-foreground' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='bg-primary-foreground' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* <button onClick={handleSignUp}>Sign Up</button> */}
      <Dialog open={userDetailsDialog}>
        <DialogTrigger>
          <Button onClick={handleSignUp} variant="outline">Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">User Information</h1>
              <p className="text-gray-500 dark:text-gray-400">Please fill out the form below.</p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John" required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" placeholder="Doe" required onChange={(e) => setSurname(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input id="region" placeholder="New York" required onChange={(e) => setRegion(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unt-score">UntScore</Label>
                <Input id="unt-score" placeholder="85" required type="number" onChange={(e) => setUntScore(e.target.value)} />
              </div>
              <Button onClick={userDetails} className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <h1>Sign In</h1>
      <input className='bg-primary-foreground' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='bg-primary-foreground' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default MyAuthComponent;















// const SuggestSolutions = (input: any): string | null => {
//   switch (input) {
//     case "auth/email-already-in-use":
//       return "This email address is already in use. Please try logging in or using a different email address.";
//     case "auth/invalid-email":
//       return "The email address you entered is invalid. Please check the format and try again.";
//     case "auth/operation-not-allowed":
//       return "This operation is not allowed. Please contact support for assistance.";
//     case "auth/weak-password":
//       return "The password you entered is too weak. Please choose a stronger password with at least 8 characters, including a mix of uppercase and lowercase letters, numbers, and symbols.";
//     case "auth/user-disabled":
//       return "This user account has been disabled. Please contact support for assistance.";
//     case "auth/user-not-found":
//       return "There is no user record corresponding to this email address. Please check the email address and try again, or create a new account.";
//     case "auth/wrong-password":
//       return "The password you entered is incorrect. Please try again.";
//     case "auth/too-many-requests":
//       return "Too many requests have been made to the server. Please wait a few minutes and try again.";
//     case "auth/network-request-failed":
//       return "A network error occurred. Please check your internet connection and try again.";
//     default:
//       return "There was an error signing up. Please try again later. You can always use our support for help.";
//   }
// };
// const EnhancedErrors = (input: any): string | null => {
//   switch (input) {
//     case "auth/email-already-in-use":
//       return "There is already a user using this email address.";
//     case "auth/invalid-email":
//       return "The email address is invalid.";
//     case "auth/operation-not-allowed":
//       return "This operation is not allowed. You might have disabled email/password login in your Firebase project.";
//     case "auth/weak-password":
//       return "The password is too weak. Please choose a stronger password.";
//     case "auth/user-disabled":
//       return "This user account has been disabled. Please contact support for assistance.";
//     case "auth/user-not-found":
//       return "There is no user record corresponding to this email address. The user may need to register first.";
//     case "auth/wrong-password":
//       return "The password is incorrect. Please try again.";
//     case "auth/too-many-requests":
//       return "Too many requests have been made to the server. Please try again later.";
//     case "auth/network-request-failed":
//       return "A network error occurred. Please check your internet connection and try again.";
//     default:
//       return "There was an error signing up. Please try again later.";
//   }
// };