"use client"

import type { NextPage } from "next"

const FrameComponent3: NextPage = () => {
  return (
    <section className="!mx-auto mt-24 box-border flex max-w-full flex-row items-start justify-end pb-[146px] pl-0 pr-[3px] pt-0 text-left font-headings-desktop-poppins-16px-regular text-45xl text-blueviolet-200 mq1225:box-border mq1225:pb-[95px] mq750:box-border mq750:pb-[62px]">
      <div className="flex w-[1437px] max-w-full flex-col items-end justify-start gap-[15px]">
        <div className="box-border flex max-w-full flex-row items-start justify-end self-stretch py-0 pl-[78px] pr-[79px] mq750:box-border mq750:px-[39px]">
          <div className="z-[1] flex max-w-full flex-1 flex-col items-start justify-start mq750:gap-[24px]">
            <div className="flex flex-col items-start justify-start gap-[48px] self-stretch mq750:gap-[24px]">
              <div className="flex flex-col items-start justify-start self-stretch">
                <h1 className="font-inherit relative m-0 self-stretch text-inherit font-bold leading-[56px] mq750:text-32xl mq750:leading-[45px] mq450:text-19xl mq450:leading-[34px]">
                  uSTUDY
                </h1>
              </div>
              <h3 className="relative m-0 self-stretch font-dm-sans-desktop-24px-medium text-5xl font-normal text-lightsteelblue-200 mq450:text-lgi">
                <p className="m-0">{`The first automated profile review. `}</p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">
                  The higher your score, the higher your likelihood of
                  admissions success. Get your score in under five minutes.
                </p>
              </h3>
            </div>
          </div>
        </div>
        <div className="relative flex h-[500px] w-full max-w-full flex-row items-start justify-start lg:h-[1061px]">
          <div className="relative z-[1] flex size-full flex-1 items-center justify-center lg:h-[1061px]">
            <img
              className="transform:scale(1.156) absolute left-1/2  top-1/2 z-[1] size-full flex-1  -translate-x-1/2 -translate-y-1/2 overflow-hidden object-contain lg:size-full"
              alt=""
              src="/group-985545.png"
            />
          </div>
          <img
            className="max:size-3/5 absolute bottom-[2px] left-1/2 top-1/2 z-[2] !m-0 size-[300px] -translate-x-1/2 -translate-y-1/2 object-cover lg:size-[900px]"
            loading="lazy"
            alt=""
            src="/123114.png"
          />
        </div>
      </div>
    </section>
  )
}

export default FrameComponent3
