import type { NextPage } from "next"

const FrameComponent1: NextPage = () => {
  return (
    <div className="relative flex max-w-full shrink-0 flex-row items-start justify-start self-stretch">
      <img
        className="absolute bottom-[-783px] left-0 !m-0 h-[784px] w-[818px] object-cover"
        loading="lazy"
        alt=""
        src="/rectangle-12911.png"
      />
      <div className="z-[1] box-border flex max-w-full flex-1 flex-row items-start justify-start bg-gray-300 px-0 pb-px pt-0 [backdrop-filter:blur(28px)]">
        <header className="text-blueviolet box-border flex h-[88px] max-w-full flex-1 flex-col items-start justify-start gap-[20px] overflow-hidden px-0 py-5 text-left font-headings-desktop-poppins-16px-regular text-8xl">
          <div className="hidden h-12 w-[158px]" />
          <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch px-20 py-0 mq750:box-border mq750:px-10">
            <div className="flex max-w-full flex-1 flex-row items-start justify-start gap-[24px]">
              <div className="box-border flex w-[143px] flex-col items-start justify-start pb-0 pl-0 pr-4 pt-[14.5px]">
                <h2 className="font-inherit relative m-0 self-stretch whitespace-nowrap text-inherit font-bold leading-[19px]">
                  <span>u</span>
                  <span className="text-shade-white">STUDY</span>
                </h2>
              </div>
              <div className="flex flex-col items-start justify-start px-0 pb-0 pt-1">
                <div className="relative h-10 w-px bg-neutrals-3" />
              </div>
              <nav className="m-0 box-border flex max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-[13.5px] mq1225:hidden">
                <nav className="text-lightsteelblue font-headings-desktop-poppins-16px-bold m-0 flex w-[468.9px] max-w-full flex-row items-start justify-between gap-[20px] text-left text-base">
                  <div className="relative inline-block min-w-[46.9px]">
                    About
                  </div>
                  <div className="relative inline-block min-w-[76px]">
                    Calculator
                  </div>
                  <div className="relative inline-block min-w-[63px]">
                    Colleges
                  </div>
                  <div className="relative inline-block min-w-[124px] whitespace-nowrap">
                    Career guidance
                  </div>
                  <div className="relative inline-block min-w-[31px]">FAQ</div>
                </nav>
              </nav>
              <div className="font-headings-desktop-poppins-16px-bold flex flex-row items-center justify-start gap-[24px] text-base text-shade-white">
                <div className="flex flex-row items-start justify-start gap-[7px] rounded px-0 py-3">
                  <b className="relative inline-block min-w-[22px] leading-[16px]">
                    EN
                  </b>
                  <img
                    className="relative size-[15.2px] shrink-0 overflow-hidden"
                    alt=""
                    src="/srchevrondown.svg"
                  />
                </div>
                <div className="flex flex-row items-start justify-start text-center">
                  <div className="bg-blueviolet flex flex-row items-center justify-center whitespace-nowrap rounded px-[23px] py-4">
                    <b className="relative inline-block min-w-[112px] leading-[16px]">
                      Sign Up/Log In
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-px shrink-0 self-stretch overflow-hidden bg-neutrals-2" />
        </header>
      </div>
    </div>
  )
}
export default FrameComponent1
