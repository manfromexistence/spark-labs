// Index.tsx
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Announcement } from "@/components/announcement"
import Calculator from "@/components/calculator"
import { ExamplesNav } from "@/components/examples-nav"
import FrameComponent1 from "@/components/frame-component1"
import FrameComponent2 from "@/components/frame-component2"
import FrameComponent3 from "@/components/frame-component3"
import FrameComponent4 from "@/components/frame-component4"
import Header from "@/components/header"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/registry/new-york/ui/button"
import MailPage from "@/app/(app)/examples/mail/page"

const LandingNewDesign: NextPage = () => {
  return (
    <>
      <div className="relative flex w-full flex-col items-end justify-start overflow-hidden bg-black text-left font-dm-sans-desktop-24px-medium text-xl leading-[normal] tracking-[normal] text-shade-white">
        <div className="relative hidden h-[3912px] self-stretch bg-black" />
        <FrameComponent4 />
        <div className="box-border hidden min-h-[162px] w-[633px] max-w-full flex-row items-start justify-start rounded bg-blueviolet-200 p-4">
          <b className="relative inline-block h-[100px] max-w-full flex-1 leading-[100%] mq450:text-base mq450:leading-[16px]">
            The investor`s stake guarantees the Validator’s goodwill and
            personal intent to build the new ecosystem to enforce the ecosystem
            development. The Ustaking smart contract algorithm of the consensus
            mechanism then selects block validators from all those who have
            staked tokens as collateral.
          </b>
        </div>
        <FrameComponent3 />
        <div className="relative hidden h-[496.2px] w-[995.9px] max-w-full font-dm-sans">
          <div className="absolute left-0 top-[0.2px] size-full rounded [background:linear-gradient(-72.34deg,_)]" />
          <img
            className="absolute left-[0.9px] top-0 size-full"
            alt=""
            src="/mask-group.svg"
          />
          <div className="absolute left-[296.9px] top-[32px] h-[434.2px] w-[451px] max-w-full">
            <div className="absolute left-0 top-[64.3px] flex w-full max-w-full flex-col items-start justify-start gap-[24px]">
              <div className="flex w-[607px] max-w-[135%] shrink-0 flex-col items-start justify-start gap-[12px]">
                <div className="relative inline-block h-[26px] self-stretch font-medium leading-[130%] mq450:text-base mq450:leading-[21px]">
                  Enter amount of token you want stake
                </div>
                <div className="relative box-border flex w-[302px] flex-row items-center justify-center gap-[12px] border-DEFAULT border-solid border-shade-white bg-shade-white px-[15px] py-3.5 text-base text-black shadow-[2px_2px_2px_rgba(0,_0,_0,_0.25)_inset]">
                  <b className="relative z-0 inline-block h-4 flex-1 leading-[16px]">
                    1000
                  </b>
                  <img
                    className="absolute left-[267px] top-[12px] z-[1] !m-0 size-6"
                    alt=""
                    src="/coin-1.svg"
                  />
                </div>
              </div>
              <div className="flex max-w-full shrink-0 flex-col items-start justify-start gap-[12px] self-stretch">
                <div className="relative inline-block h-[26px] self-stretch font-medium leading-[130%] mq450:text-base mq450:leading-[21px]">
                  Choose the Tarif plan that seems to you enough
                </div>
                <div className="relative h-[90px] w-[417px] max-w-full text-center text-base">
                  <div className="absolute left-0 top-0 flex flex-row items-start justify-start gap-[12px]">
                    <div className="box-border flex w-[137px] flex-row items-center justify-center whitespace-nowrap rounded border-DEFAULT border-solid border-shade-white bg-gray-500 px-[30px] py-3.5 text-lg">
                      <b className="relative inline-block h-4 leading-[16px]">
                        6 month
                      </b>
                    </div>
                    <div className="box-border flex w-[118px] flex-row items-center justify-center whitespace-nowrap rounded border-DEFAULT border-solid border-shade-white px-[31px] py-3.5">
                      <b className="relative inline-block h-4 leading-[16px]">
                        1 year
                      </b>
                    </div>
                    <div className="box-border flex w-[118px] flex-row items-center justify-center whitespace-nowrap rounded border-DEFAULT border-solid border-shade-white px-[29px] py-3.5">
                      <b className="relative inline-block h-4 leading-[16px]">
                        3 years
                      </b>
                    </div>
                  </div>
                  <div className="absolute left-0 top-[64px] text-left text-xl font-medium leading-[130%] mq450:text-base mq450:leading-[21px]">
                    5% per year
                  </div>
                </div>
              </div>
              <div className="relative box-border h-px self-stretch border-t-DEFAULT border-solid border-silver" />
              <div className="box-border flex w-[202px] shrink-0 flex-col items-start justify-start gap-[4px] py-0 pl-0 pr-5">
                <div className="flex flex-row items-center justify-start gap-[12px] self-stretch">
                  <b className="relative inline-block h-[26px] flex-1 leading-[130%] mq450:text-base mq450:leading-[21px]">
                    Reward:
                  </b>
                  <div className="box-border flex h-10 flex-row items-center justify-start gap-[8px] px-2 py-0 text-center font-headings-desktop-poppins-16px-regular">
                    <div className="flex flex-row items-center justify-start self-stretch rounded px-0 py-3">
                      <div className="relative self-stretch font-medium leading-[16px] mq450:text-base mq450:leading-[13px]">
                        50
                      </div>
                    </div>
                    <img className="relative size-6" alt="" src="/coin-2.svg" />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-[10px] self-stretch">
                  <b className="relative inline-block h-[26px] flex-1 leading-[130%] mq450:text-base mq450:leading-[21px]">
                    Cashback:
                  </b>
                  <div className="box-border flex h-10 flex-row items-center justify-start gap-[8px] px-2 py-0 text-center font-headings-desktop-poppins-16px-regular">
                    <div className="flex flex-row items-center justify-start self-stretch rounded px-0 py-3">
                      <div className="relative self-stretch font-medium leading-[16px] mq450:text-base mq450:leading-[13px]">
                        15
                      </div>
                    </div>
                    <img className="relative size-6" alt="" src="/coin-3.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[0.1px] top-0 !bg-clip-text font-headings-desktop-poppins-16px-regular text-21xl font-semibold leading-[100%] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#fff,_#fff),_#fff] mq750:text-13xl mq750:leading-[32px] mq450:text-5xl mq450:leading-[24px]">
              Calculator
            </div>
          </div>
        </div>
        <FrameComponent2 />
        <section className="flex w-full flex-row items-start justify-center px-[10%] pb-32 lg:px-0">
          <div className="flex w-full flex-col items-center justify-center space-y-5">
            <h1 className="text-bold title !m-0 flex w-full items-center justify-center text-center !text-37xl">
              A new way to apply
            </h1>
            <FrameComponent1 />
            <Calculator />
          </div>
        </section>
      </div>
    </>
  )
}
export default LandingNewDesign

// import Header from "../components/header";

// export default function IndexPage() {
//   return (
//     // <div className="container relative">
//     //   <PageHeader>
//     //     <Announcement />
//     //     <PageHeaderHeading>Build your component library</PageHeaderHeading>
//     //     <PageHeaderDescription>
//     //       Beautifully designed components that you can copy and paste into your
//     //       apps. Accessible. Customizable. Open Source.
//     //     </PageHeaderDescription>
//     //     <PageActions>
//     //       <Link href="/docs" className={cn(buttonVariants())}>
//     //         Get Started
//     //       </Link>
//     //       <Link
//     //         target="_blank"
//     //         rel="noreferrer"
//     //         href={siteConfig.links.github}
//     //         className={cn(buttonVariants({ variant: "outline" }))}
//     //       >
//     //         <Icons.gitHub className="mr-2 h-4 w-4" />
//     //         GitHub
//     //       </Link>
//     //     </PageActions>
//     //   </PageHeader>
//     //   <ExamplesNav className="[&>a:first-child]:text-primary" />
//     //   <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
//     //     <Image
//     //       src="/examples/mail-dark.png"
//     //       width={1280}
//     //       height={727}
//     //       alt="Mail"
//     //       className="hidden dark:block"
//     //     />
//     //     <Image
//     //       src="/examples/mail-light.png"
//     //       width={1280}
//     //       height={727}
//     //       alt="Mail"
//     //       className="block dark:hidden"
//     //     />
//     //   </section>
//     //   <section className="hidden md:block">
//     //     <div className="overflow-hidden rounded-lg border bg-background shadow">
//     //       <MailPage />
//     //     </div>
//     //   </section>
//     // </div>
//     <div>Hello World!</div>
//   )
// }
