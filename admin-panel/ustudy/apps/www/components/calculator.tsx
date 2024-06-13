"use client"

import { useCallback } from "react"
import type { NextPage } from "next"

const Calculator: NextPage = () => {
  const onParallelProcessorClick = useCallback(() => {
    // Please sync "Landing new design" to the project
  }, [])

  return (
    <div className="relative z-[1] mx-auto mb-64 box-border flex w-[1200px] max-w-[90%] flex-col items-start justify-start gap-[48px] rounded-sm bg-[#804DFE] px-12 pb-[35px] pt-8 text-left font-headings-desktop-poppins-16px-regular text-21xl text-shade-white mq1050:box-border mq1050:px-6 mq750:gap-[24px] mq450:box-border mq450:pb-[23px] mq450:pt-[21px]">
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
      <h1 className="font-inherit relative z-[3] m-0 inline-block w-[577px] max-w-full text-inherit font-bold leading-[32px] mq750:text-13xl mq750:leading-[26px] mq450:text-5xl mq450:leading-[19px]">
        uSTUDY Calculator
      </h1>
      <div className="z-[2] hidden h-12 w-8 rounded" />
      <div className="z-[3] hidden h-12 w-[82px] rounded" />
      <div className="flex w-[870px] max-w-full flex-row items-start justify-start gap-[69px] font-dm-sans text-base mq1050:flex-wrap mq1050:gap-[34px] mq450:gap-[17px]">
        <div className="box-border flex min-w-[239px] max-w-full flex-[0.7745] flex-col items-start justify-start gap-[18.7px] py-0 pl-0 pr-[83px] mq1050:flex-1 mq450:box-border mq450:pr-5">
          <div className="flex flex-col items-start justify-start gap-[8px] self-stretch px-0 pb-[5.3px] pt-0">
            <div className="relative z-[3] inline-block w-[246.5px] leading-[21px]">
              Enter amount of score
            </div>
            <div className="z-[3] flex flex-row items-start justify-start self-stretch border-DEFAULT border-solid border-shade-white bg-shade-white px-[13px] pb-2 pt-3 shadow-[2px_2px_2px_rgba(0,_0,_0,_0.25)_inset]">
              <div className="flex flex-1 flex-row items-start justify-between gap-[20px]">
                <input
                  className="box-border flex h-5 w-[29px] flex-col items-start justify-start bg-transparent px-0 pb-0 pt-1 font-dm-sans text-base font-bold text-black [border:none] [outline:none]"
                  placeholder="100"
                  type="text"
                />
                <img
                  className="relative size-6"
                  alt=""
                  src="/coin-colorfull.png"
                />
              </div>
            </div>
          </div>
          <div className="box-border flex w-[236px] flex-row items-start justify-start px-0 pb-[5.6px] pt-0 text-xs">
            <div className="rounded-21xl z-[3] flex flex-1 flex-row items-start justify-start gap-[13px] border-DEFAULT border-solid border-shade-white bg-gray-400 px-[15px] pb-1 pt-[3px]">
              <div className="rounded-21xl relative box-border hidden h-[26px] w-[236px] border-DEFAULT border-solid border-shade-white bg-gray-400" />
              <div className="flex flex-col items-start justify-start px-0 pb-0 pt-[3px]">
                <img
                  className="relative z-[4] size-2.5 shrink-0 overflow-hidden"
                  alt=""
                  src="/search.png"
                />
              </div>
              <div className="relative z-[4] inline-block w-[158px] shrink-0 font-medium">
                Choose the University
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start px-px py-0 text-center">
            <div className="z-[3] flex flex-col items-start justify-start">
              <div className="flex flex-row items-start justify-start gap-[12px]">
                <button className="flex cursor-pointer flex-row items-center justify-center rounded border-DEFAULT border-solid border-shade-white bg-gray-500 p-3.5">
                  <div className="flex flex-col items-center justify-center">
                    <b className="relative inline-block min-w-[73px] text-center font-dm-sans text-base leading-[16px] text-shade-white">
                      Astana IT
                    </b>
                  </div>
                </button>
                <div className="box-border flex w-[46px] flex-row items-center justify-center rounded border-DEFAULT border-solid border-shade-white p-3.5">
                  <b className="relative inline-block min-w-[15px] leading-[16px]">
                    IS
                  </b>
                </div>
              </div>
            </div>
          </div>
          <button
            className="z-[3] flex cursor-pointer flex-row items-start justify-start bg-transparent p-0 [border:none]"
            onClick={onParallelProcessorClick}
          >
            <div className="flex flex-row items-start justify-start whitespace-nowrap rounded bg-shade-white px-[31px] py-4">
              <b className="relative inline-block min-w-[122px] text-center font-dm-sans text-base leading-[16px] text-blueviolet-100">
                Calculate again
              </b>
            </div>
          </button>
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
            </div>
            <div className="z-[3] flex flex-row items-center justify-between gap-[20px] self-stretch text-3xl mq450:flex-wrap">
              <h3 className="font-inherit relative m-0 inline-block w-[19px] whitespace-pre-wrap text-inherit font-medium leading-[29px] mq450:text-lg mq450:leading-[23px]">{`IS  `}</h3>
              <div className="h-4 w-[39px]" />
              <div className="flex flex-row items-center justify-start gap-[8px] text-center">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative inline-block min-w-[43px] font-medium leading-[16px] mq450:text-lg mq450:leading-[13px]">
                    75%
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
      <div className="absolute bottom-[-158.8px] right-[-285px] z-[5] !m-0 size-[300px] rounded-[50%] bg-blueviolet-200 [filter:blur(400px)]" />
    </div>
  )
}

export default Calculator
