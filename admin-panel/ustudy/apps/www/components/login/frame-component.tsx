import { useCallback } from "react"
import type { NextPage } from "next"
import Link from "next/link"

const FrameComponent: NextPage = () => {
  const onIconTitleClick = useCallback(() => {
    // Please sync "Log In - Input Fields Filled" to the project
  }, [])

  const onInputFieldContainerClick = useCallback(() => {
    // Please sync "Log In - Input Fields Filled" to the project
  }, [])

  const onLabelText4Click = useCallback(() => {
    // Please sync "Forgot Password - Start" to the project
  }, [])

  const onLabelText5Click = useCallback(() => {
    // Please sync "Sign up - Start" to the project
  }, [])

  return (
    <div className="text-blueviolet font-headings-desktop-poppins-16px-bold box-border flex w-[622px] min-w-[622px] max-w-full flex-col items-start justify-start gap-[8px] bg-black px-[102px] pb-56 pt-[230px] text-left text-sm mq1225:flex-1 mq1050:box-border mq1050:pb-[146px] mq1050:pt-[149px] mq750:box-border mq750:min-w-full mq750:px-[51px] mq450:box-border mq450:px-5 mq450:pb-[95px] mq450:pt-[97px]">
      <div className="relative hidden h-[781px] w-[622px] max-w-full bg-black" />
      <div className="flex flex-col items-start justify-start gap-[8px] px-0 pb-6 pt-0 font-headings-desktop-poppins-16px-regular text-13xl text-shade-white">
        <h1 className="font-inherit relative z-[1] m-0 text-inherit font-bold leading-[100%] mq750:text-7xl mq750:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
          Welcome back
        </h1>
        <div className="font-dm-sans-desktop-14px-regular text-lightsteelblue relative z-[1] text-base">
          Please entire your details
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[4px] self-stretch px-0 pb-2 pt-0">
        <div className="relative z-[1] inline-block min-w-[128px]">
          E-mail or username
        </div>
        <div
          className="z-[1] flex cursor-pointer flex-row items-start justify-start self-stretch text-base text-gray-200"
          onClick={onIconTitleClick}
        >
          <div className="relative inline-block min-w-[127px]">
            e.g., username00
          </div>
        </div>
        <div className="relative z-[1] h-px self-stretch bg-gray-300" />
      </div>
      <div className="font-dm-sans-desktop-14px-regular box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-[1.5px] pr-px">
        <div
          className="z-[1] flex max-w-full flex-1 cursor-pointer flex-col items-start justify-start gap-[4px]"
          onClick={onInputFieldContainerClick}
        >
          <div className="relative inline-block min-w-[62px]">Password</div>
          <div className="font-headings-desktop-poppins-16px-bold flex max-w-full flex-row items-start justify-start gap-[56px] self-stretch text-base text-gray-200 mq450:gap-[28px]">
            <div className="relative inline-block max-w-[calc(100%_-_76px)] flex-1">
              Your password
            </div>
            <img
              className="relative size-5 shrink-0 overflow-hidden"
              loading="lazy"
              alt=""
              src="/sreyclose.svg"
            />
          </div>
          <div className="relative h-px self-stretch bg-gray-300" />
        </div>
      </div>
      <div className="text-dimgray flex flex-row items-start justify-end self-stretch px-px pb-2 pt-0">
        <Link href="/forgot-password">Forgot Password</Link>
      </div>
      <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch px-px pb-2 pt-0">
        <button className="bg-blueviolet hover:bg-mediumslateblue z-[1] box-border flex max-w-full flex-1 cursor-pointer flex-row items-start justify-center whitespace-nowrap rounded px-5 py-4 [border:none]">
          <b className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[46px] text-center text-base leading-[16px] text-shade-white">
            Log In
          </b>
        </button>
      </div>
      <div className="text-darkslategray flex flex-row items-start justify-center self-stretch py-0 pl-0 pr-0.5 text-base">
        <div
          className="relative z-[1] cursor-pointer leading-[16px]"
          onClick={onLabelText5Click}
        >
          <span>
            <span>Don’t have an account?</span>
            <span className="text-shade-white">{` `}</span>
          </span>
          <b className="!bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(90.55deg,_)]">
            Sign up
          </b>
        </div>
      </div>
    </div>
  )
}

export default FrameComponent
