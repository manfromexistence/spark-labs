"use client"

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-contradicting-classname */
import React from "react"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { Input as NextuiInput } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import FrameComponent from "@/components/signup/frame-component"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"
import { Button, buttonVariants } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"

import { UserAuthForm } from "../examples/authentication/components/user-auth-form"

const ForgotPasswordStepTwo: NextPage = () => {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(true)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    React.useState(true)
  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleConfirmPasswordVisibility = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword)

  return (
    <div className="flex h-auto w-full flex-col-reverse items-start justify-start space-y-10 lg:mb-0 lg:h-[69vh] lg:flex-row lg:items-start lg:items-center lg:justify-start lg:justify-center">
      <div className="relative mt-10 flex size-full h-auto items-center justify-center lg:m-0 lg:w-3/5 lg:rounded-sm">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/rectangle-12911.png"
            alt="Image"
            fill={true}
            className="object-cover"
          />
        </AspectRatio>
        <div className="absolute bottom-0 left-0 flex h-[30%] max-h-[150px] w-full items-center justify-center bg-purple-800 bg-opacity-0 bg-clip-padding text-3xl font-bold backdrop-blur-3xl">
          Ustudy For All
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-center lg:m-0 lg:h-full lg:flex-1">
        <div className="mx-auto grid w-4/5 min-w-[300px] max-w-[550px] gap-5">
          <div className="grid min-w-full gap-2 text-left">
            <h1 className="text-37xl font-bold">Recover password</h1>
            <p className="text-balance text-muted-foreground">
              Please enter your details
            </p>
          </div>
          <div className="grid gap-4">
            {/* <div className="grid w-full gap-2">
              <Label className="text-[#804DFE]" htmlFor="email">Username</Label>
              <NextuiInput
                type="text"
                variant="bordered"
                defaultValue="manfromexitence"
                errorMessage="Please enter a valid name"
                className="text-muted-foreground w-full rounded-md !border"
              />
            </div> */}
            {/* <div className="grid w-full gap-2">
              <Label className="text-[#804DFE]" htmlFor="email">Email or Username</Label>
              <NextuiInput
                type="email"
                variant="bordered"
                defaultValue="ajju40959@gmail.com"
                isInvalid={true}
                errorMessage="Please enter a valid email"
                className="text-muted-foreground w-full rounded-md !border"
              />
            </div> */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-[#804DFE]" htmlFor="password">
                  Password
                </Label>
              </div>
              <NextuiInput
                variant="bordered"
                placeholder="Enter your password"
                defaultValue="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {isVisiblePassword ? (
                      <Eye className="text-default-400 text-2xl pointer-events-none" />
                    ) : (
                      <EyeOff className="text-default-400 text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisiblePassword ? "text" : "password"}
                className="w-full rounded-md !border text-muted-foreground"
              />
            </div>
            {/* <Link
                  href="/forgot-password"
                  className="flex w-full items-end justify-end text-sm underline"
                >
                  Forgot your password?
                </Link> */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-[#804DFE]" htmlFor="password">
                  Confirm Password
                </Label>
              </div>
              <NextuiInput
                defaultValue="Enter your confirm password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {isVisibleConfirmPassword ? (
                      <Eye className="text-default-400 text-2xl pointer-events-none" />
                    ) : (
                      <EyeOff className="text-default-400 text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisibleConfirmPassword ? "text" : "password"}
                className="w-full rounded-md !border text-muted-foreground"
              />
            </div>
            {/* <div className="flex w-full items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the term of services and privacy statement
              </label>
            </div> */}
            <Link href="/forgot-password-step-three">
              <Button
                type="submit"
                className="w-full bg-[#804DFE] !py-6 text-white hover:bg-secondary"
              >
                Done
              </Button>
            </Link>
          </div>
          {/* <div className="mt-4 min-w-full space-x-1 text-center text-sm">
            <span>
              Don't have an account?
            </span>
            <Link href="login" className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent">
              Signup
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordStepTwo
