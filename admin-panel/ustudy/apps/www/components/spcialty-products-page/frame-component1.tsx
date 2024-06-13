/* eslint-disable tailwindcss/no-contradicting-classname */
import type { NextPage } from "next"

const FrameComponent1: NextPage = () => {
  return (
    <section className="box-border flex h-[623px] max-w-full shrink-0 flex-row items-start justify-between gap-[20px] self-stretch overflow-hidden bg-[url('/frame-985604@3x.png')] bg-cover bg-top bg-no-repeat px-0 pb-[252px] pt-[19px] mq750:box-border mq750:pb-[164px] mq750:pt-5">
      <div className="relative hidden h-[248px] w-[1440px] max-w-full [background:linear-gradient(180deg,_)]" />
      <div className="box-border flex h-52 flex-col items-start justify-start px-0 pb-0 pt-[3.6px]">
        <div className="flex flex-1 flex-col items-end justify-start gap-[31px]">
          <img
            className="relative z-[1] h-[23.4px] w-[14.8px]"
            loading="lazy"
            alt=""
            src="/circle.png"
          />
          <div className="bg-mediumslateblue relative w-[150px] flex-1 rounded-[50%] [filter:blur(200px)]" />
        </div>
      </div>
      <div className="box-border flex h-[200px] w-[211px] flex-col items-start justify-start py-0 pl-0 pr-[11px]">
        <div className="relative flex-1 self-stretch rounded-[50%] bg-blueviolet-200 [filter:blur(300px)]" />
      </div>
      <img
        className="relative hidden h-[285.4px] w-[186.8px] object-contain"
        alt=""
        src="/circle.png"
      />
      <div className="mt-[-47px] box-border flex h-[399px] w-[132px] flex-col items-start justify-start gap-[99px] p-0">
        <div className="flex flex-1 flex-row items-start justify-start self-stretch py-0 pl-2.5 pr-0">
          <div className="bg-mediumslateblue relative w-[150px] shrink-0 self-stretch rounded-[50%] [filter:blur(150px)]" />
        </div>
        <div className="relative w-[150px] flex-1 rounded-[50%] bg-gray-300 [filter:blur(200px)]" />
      </div>
    </section>
  )
}

export default FrameComponent1
