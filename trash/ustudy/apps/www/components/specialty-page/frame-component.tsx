/* eslint-disable tailwindcss/no-contradicting-classname */
import type { NextPage } from "next"

const FrameComponent: NextPage = () => {
  return (
    <section className="box-border flex max-w-full flex-row items-start justify-start self-stretch px-0 pb-[35px] pt-0 text-left font-headings-desktop-poppins-16px-regular text-21xl ">
      <div className="relative !m-0 box-border flex h-[244px] !w-full max-w-full flex-1 flex-row items-center justify-center gap-[20px] overflow-hidden bg-gray-200 !p-0 pb-[85px] pl-[470px] pr-0 pt-[50px] mq750:box-border mq750:pb-[55px] mq750:pl-[235px] mq750:pt-8 mq450:box-border mq450:pl-5">
        <div className="relative z-0 hidden h-[248px] w-[1440px] max-w-full [background:linear-gradient(180deg,_)]" />
        <div className="flex w-[500px] max-w-[calc(100%_-_152px)] flex-col items-start justify-start gap-[9px] mq750:max-w-full">
          <div className="flex flex-row items-start justify-center self-stretch px-5 py-0">
            <h1 className="title !m-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              College Search
            </h1>
          </div>
          {/* <div className="border-dimgray rounded-21xl z-[2] box-border flex max-w-full flex-row items-start justify-start gap-[13px] self-stretch rounded-[5px] border-DEFAULT border-solid bg-black px-[13px] pb-1.5 pt-[5px]">
            <div className="border-dimgray rounded-21xl relative box-border hidden h-10 w-[500px] max-w-full border-DEFAULT border-solid bg-black" />
            <img
              className="relative z-[3] size-[25px] shrink-0 overflow-hidden"
              alt=""
              src="/search.png"
            />
            <input
              className="font-headings-desktop-poppins-16px-bold text-dimgray box-border flex h-[21px] w-[49px] flex-col items-start justify-start rounded-[5px] bg-transparent px-0 pb-0 pt-[5px] text-xs font-medium [border:none] [outline:none]"
              placeholder="Search"
              type="text"
            />
          </div> */}
          <span className="w-full text-center text-sm text-primary">
            Explore all collages we provide!
          </span>
        </div>
        <img
          className="absolute left-0 top-0 z-[1] lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/left-shadow.png"
        />
        <img
          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/center-shadow.png"
        />
        <img
          className="absolute right-0 top-0 z-[1] lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/right-shadow.png"
        />
        <img
          className="absolute left-1/3 top-0 z-[1] mx-auto size-[90%] -translate-x-1/2 object-contain lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/looper-bg.png"
        />
        {/* <div className="absolute bottom-[-383.6px] left-0 !m-0 h-[800.6px] w-[1197.1px]">
          <div className="bg-blueviolet-300 absolute left-[620px] top-[108px] size-[200px] rounded-[50%] [filter:blur(300px)]" />
          <div className="bg-mediumslateblue absolute left-[-7px] top-[166px] size-[150px] rounded-[50%] [filter:blur(200px)]" />
          <img
            className="absolute left-10 top-[-504px] z-[1] h-[1400px] w-[1425px] object-contain"
            alt=""
            src="/looper-bg.png"
          />
        </div> */}
        {/* <div className="mq750:hidden mt-[-78px] box-border flex h-[399px] w-[132px] flex-col items-start justify-start gap-[99px] p-0">
          <div className="flex flex-1 flex-row items-start justify-start self-stretch py-0 pl-2.5 pr-0">
            <div className="bg-mediumslateblue relative w-[150px] shrink-0 self-stretch rounded-[50%] [filter:blur(150px)]" />
          </div>
          <div className="relative w-[150px] flex-1 rounded-[50%] bg-gray-400 [filter:blur(200px)]" />
        </div> */}
      </div>
    </section>
  )
}

export default FrameComponent
