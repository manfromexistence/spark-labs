"use client"

import { useCallback } from "react"
import type { NextPage } from "next"

const FrameComponent4: NextPage = () => {
  const onContentClick = useCallback(() => {
    // Please sync "Sign up - Start" to the project
  }, [])

  return (
    <section className="box-border flex h-auto max-w-full flex-row items-start justify-start self-stretch text-center font-headings-desktop-poppins-16px-regular text-29xl text-shade-white mq750:box-border mq750:pb-[31px] ">
      <div className="items-strt relative box-border flex min-h-[650px] max-w-full flex-1 flex-col items-start justify-start space-y-10 overflow-hidden overflow-x-auto px-[10%] pt-10 lg:flex-row lg:px-0">
        <div className="relative z-[1] hidden h-[617px] w-[1440px] shrink-0 bg-black" />
        <div className="absolute left-[505px] top-[849px] z-[1] !m-0 hidden h-[849px] w-[3px] shrink-0 bg-gray-200 opacity-50 [transform-origin:0_0] [transform:_rotate(180deg)] mq1225:inline-block" />
        <div className="absolute left-[83px] top-[849px] z-[1] !m-0 hidden h-[849px] w-[3px] shrink-0 bg-gray-200 opacity-50 [transform-origin:0_0] [transform:_rotate(180deg)] mq1225:inline-block" />
        <div className="absolute right-[510px] top-[849px] z-[1] !m-0 hidden h-[849px] w-[3px] shrink-0 bg-gray-200 opacity-50 [transform-origin:0_0] [transform:_rotate(180deg)] mq1225:inline-block" />
        <div className="absolute right-[88px] top-[849px] z-[1] !m-0 hidden h-[849px] w-[3px] shrink-0 bg-gray-200 opacity-50 [transform-origin:0_0] [transform:_rotate(180deg)] mq1225:inline-block" />

        <div className="flex flex-col items-start justify-start space-y-3 text-37xl lg:mx-auto lg:mt-24 lg:items-center lg:justify-center">
          <div className="z-[3] flex flex-col items-start justify-start gap-[32px] lg:items-center lg:justify-center">
            <h1 className="font-inherit relative m-0 flex flex-col items-start justify-start text-inherit font-bold leading-[100%] mq750:text-26xl mq750:leading-[45px] lg:items-center lg:justify-center  mq450:text-15xl mq450:leading-[34px]">
              <p className="!m-0">{`Your Admissions `}</p>
              <p className="!m-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                ‘Credit Score’
              </p>
            </h1>
            <button
              className="flex cursor-pointer flex-col items-start justify-start bg-transparent p-0 [border:none] lg:items-center lg:justify-center"
              onClick={onContentClick}
            >
              <div className="flex flex-row items-center justify-center whitespace-nowrap rounded-lg bg-blueviolet-200 px-[71px] py-4">
                <b className="relative inline-block min-w-[59px] text-center font-dm-sans text-base leading-[16px] text-shade-white">
                  Sign Up
                </b>
              </div>
            </button>
          </div>
        </div>

        <div className=" z-[3] flex flex-col items-start justify-between gap-[20px] !px-0 !text-left mq1225:flex-col lg:absolute lg:bottom-16 lg:!ml-[20%] lg:w-3/5 lg:flex-row lg:items-center lg:justify-between">
          <div className="hidden max-w-full flex-col items-center justify-start">
            <b className="relative inline-block h-12 max-w-full leading-[100%] mq750:text-19xl mq750:leading-[38px] mq450:text-10xl mq450:leading-[29px]">
              2 000 000 000
            </b>
            <div className="relative inline-block h-[22px] font-dm-sans text-base leading-[135%] text-lightsteelblue-100">
              Overall uSTAKING Token Emission
            </div>
          </div>
          <div className="flex w-[165px] flex-col items-start justify-start">
            <b className="relative self-stretch text-left leading-[100%] mq750:text-19xl mq750:leading-[38px] mq450:text-10xl mq450:leading-[29px]">
              24000
            </b>
            {/* <span className="text-muted text-[5px]">Users</span> */}
            <div className="flex flex-row items-start justify-start font-dm-sans text-base text-lightsteelblue-100">
              <div className="relative inline-block min-w-[42px] leading-[22px]">
                Users
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <b className="relative leading-[100%] mq750:text-19xl mq750:leading-[38px] mq450:text-10xl mq450:leading-[29px]">
              2000+
            </b>
            <div className="flex flex-row items-start justify-start font-dm-sans text-base text-lightsteelblue-100">
              <div className="relative inline-block">College profiles</div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <b className="relative leading-[100%] mq750:text-19xl mq750:leading-[38px] mq450:text-10xl mq450:leading-[29px]">
              44000
            </b>
            <div className="flex flex-row items-start justify-start font-dm-sans text-base text-lightsteelblue-100">
              <div className="relative leading-[135%]">
                In scholarship value
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left">
            <b className="relative leading-[100%] mq750:text-19xl mq750:leading-[38px] mq450:text-10xl mq450:leading-[29px]">
              24 hour
            </b>
            <div className="flex flex-row items-start justify-start text-center font-dm-sans text-base text-lightsteelblue-100">
              <div className="relative inline-block">of time savings</div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[28px] !m-0 h-[533px] w-full">
          <img
            className="absolute bottom-0 z-[2] mx-auto h-full max-h-full w-[1573px] overflow-hidden"
            alt=""
            src="/export-it.png"
          />
          <img
            className="absolute right-[3.5%] top-[42px] z-[3] h-[172px] w-44 object-cover lg:left-[3.5%] lg:top-0"
            loading="lazy"
            alt=""
            src="/coin.png"
          />
          <img
            className="absolute bottom-[5%] right-[4%] z-[4] h-[212.6px] w-[198.5px] object-contain lg:bottom-32"
            loading="lazy"
            alt=""
            src="/coin-right.png"
          />
        </div>
      </div>
    </section>
  )
}
export default FrameComponent4
