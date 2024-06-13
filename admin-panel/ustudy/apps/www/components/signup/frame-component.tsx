import { useCallback } from "react"
import type { NextPage } from "next"
import Link from "next/link"

const FrameComponent: NextPage = () => {
  const onInputFieldContainerClick = useCallback(() => {
    // Please sync "Sign up - Filled" to the project
  }, [])

  const onIconTitleClick = useCallback(() => {
    // Please sync "Sign up - Filled" to the project
  }, [])

  const onFrameContainer2Click = useCallback(() => {
    // Please sync "Sign up - Filled" to the project
  }, [])

  const onFrameContainer3Click = useCallback(() => {
    // Please sync "Sign up - Filled" to the project
  }, [])

  const onCheckboxContainerClick = useCallback(() => {
    // Please sync "Log In - Welcome" to the project
  }, [])

  return (
    <div className="text-blueviolet font-headings-desktop-poppins-16px-bold box-border flex w-[622px] min-w-[622px] max-w-full flex-col items-start justify-start gap-[16px] bg-black pb-[180px] pl-[104px] pr-[100px] pt-[129px] text-left text-sm mq1225:flex-1 mq1050:box-border mq1050:pb-[117px] mq1050:pt-[84px] mq750:box-border mq750:min-w-full mq750:pl-[52px] mq750:pr-[50px] mq450:box-border mq450:px-5 mq450:pb-[76px] mq450:pt-[55px]">
      <div className="relative hidden h-[781px] w-[622px] max-w-full bg-black" />
      <div className="flex flex-col items-start justify-start gap-[8px] px-0 pb-4 pt-0 font-headings-desktop-poppins-16px-regular text-13xl text-shade-white">
        <h1 className="font-inherit relative z-[1] m-0 inline-block min-w-[124px] whitespace-nowrap text-inherit font-bold leading-[100%] mq750:text-7xl mq750:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
          Sign Up
        </h1>
        <div className="font-headings-desktop-poppins-16px-bold text-lightsteelblue relative z-[1] whitespace-nowrap text-base">
          Please entire your details
        </div>
      </div>
      <div
        className="z-[1] flex cursor-pointer flex-col items-start justify-start gap-[4px] self-stretch py-0 pl-0 pr-[3px]"
        onClick={onInputFieldContainerClick}
      >
        <div className="relative inline-block min-w-[66px]">Username</div>
        <input
          className="font-headings-desktop-poppins-16px-bold relative inline-block h-[21px] w-[127px] bg-transparent p-0 text-left text-base text-gray-200 [border:none] [outline:none]"
          placeholder="e.g., username00"
          type="text"
        />
        <div className="relative h-px self-stretch bg-gray-300" />
      </div>
      <div className="flex flex-col items-start justify-start gap-[4px] self-stretch">
        <div className="relative z-[1] inline-block min-w-[43px]">E-mail</div>
        <input
          className="font-headings-desktop-poppins-16px-bold z-[1] flex h-[21px] w-full min-w-[250px] cursor-pointer flex-row items-start justify-start self-stretch bg-transparent text-base text-gray-200 [border:none] [outline:none]"
          placeholder="e.g., user1@2com"
          type="text"
          onClick={onIconTitleClick}
        />
        <div className="relative z-[1] h-px self-stretch bg-gray-300" />
      </div>
      <div
        className="z-[1] flex max-w-full cursor-pointer flex-col items-start justify-start gap-[4px] self-stretch"
        onClick={onFrameContainer2Click}
      >
        <div className="relative inline-block min-w-[62px]">Password</div>
        <div className="flex max-w-full flex-row items-start justify-start gap-[56px] self-stretch text-base text-black mq450:gap-[28px]">
          <div className="relative inline-block max-w-[calc(100%_-_76px)] flex-1">
            *************************
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
      <div
        className="z-[1] flex max-w-full cursor-pointer flex-col items-start justify-start gap-[4px] self-stretch"
        onClick={onFrameContainer3Click}
      >
        <div className="relative inline-block min-w-[118px]">
          Confirm Password
        </div>
        <div className="flex max-w-full flex-row items-start justify-start gap-[56px] self-stretch text-base text-black mq450:gap-[28px]">
          <div className="relative inline-block max-w-[calc(100%_-_76px)] flex-1">
            *************************
          </div>
          <img
            className="relative size-5 shrink-0 overflow-hidden"
            loading="lazy"
            alt=""
            src="/sreyclose-1.svg"
          />
        </div>
        <div className="relative h-px self-stretch bg-gray-300" />
      </div>
      <div className="text-lightsteelblue flex max-w-full flex-row items-start justify-start gap-[7px]">
        <input
          className="relative z-[1] m-0 size-6 min-h-[24px] shrink-0 overflow-hidden"
          type="checkbox"
        />
        <div className="box-border flex max-w-[calc(100%_-_31px)] flex-col items-start justify-start px-0 pb-0 pt-[3px]">
          <div className="relative z-[1]">
            I agree to the term of services and privacy statement
          </div>
        </div>
      </div>
      <button className="bg-blueviolet hover:bg-mediumslateblue z-[1] flex cursor-pointer flex-row items-start justify-center self-stretch whitespace-nowrap rounded px-5 py-[17.5px] [border:none]">
        <b className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[59px] text-center text-base leading-[16px] text-shade-white">
          Sign Up
        </b>
      </button>
      <div
        className="text-darkslategray z-[1] flex cursor-pointer flex-row items-start justify-center self-stretch text-base"
        onClick={onCheckboxContainerClick}
      >
        <div className="relative leading-[16px]">
          <span>
            <span>Already have an account?</span>
            <span className="text-shade-white">{` `}</span>
          </span>
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default FrameComponent
