import { useCallback } from "react"
import type { NextPage } from "next"

const FrameComponent: NextPage = () => {
  const onButtonClick = useCallback(() => {
    // Please sync "Forgot Password - Check Inbox" to the project
  }, [])

  return (
    <div className="font-headings-desktop-poppins-16px-bold box-border flex w-[622px] min-w-[622px] max-w-full flex-col items-start justify-start gap-[8px] bg-black pb-[274px] pl-[74px] pr-5 pt-[269px] text-left text-13xl text-shade-white mq1225:flex-1 mq1050:box-border mq1050:pb-[178px] mq1050:pt-[175px] mq750:box-border mq750:min-w-full mq750:pl-[37px] mq450:box-border mq450:pb-[116px] mq450:pt-[114px]">
      <div className="relative hidden h-[781px] w-[622px] max-w-full bg-black" />
      <h1 className="relative z-[1] m-0 inline-block w-[474px] max-w-full font-headings-desktop-poppins-16px-regular text-inherit font-bold leading-[100%] mq750:text-7xl mq750:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
        <p className="m-0">Forgot your password?</p>
        <p className="m-0">No problem.</p>
      </h1>
      <div className="text-lightsteelblue flex flex-row items-start justify-start px-0 pb-6 pt-0 text-base">
        <div className="relative z-[1]">Please entire your details</div>
      </div>
      <div className="text-blueviolet flex w-[417px] max-w-full flex-col items-start justify-start gap-[16px] text-xs">
        <div className="flex flex-col items-start justify-start gap-[4px] self-stretch">
          <div className="relative z-[1] inline-block min-w-[37px]">E-mail</div>
          <a
            className="relative z-[1] whitespace-nowrap text-base text-shade-white [text-decoration:none]"
            href="mailto:kozhamniyazov01@gmail.com"
            target="_blank"
          >
            kozhamniyazov01@gmail.com
          </a>
          <div className="relative z-[1] h-px self-stretch bg-gray-200" />
        </div>
        <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-px pr-0">
          <button
            className="bg-blueviolet hover:bg-mediumslateblue z-[1] box-border flex max-w-full flex-1 cursor-pointer flex-row items-start justify-center rounded px-5 py-[17.5px] [border:none]"
            onClick={onButtonClick}
          >
            <b className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[63px] text-center text-base leading-[16px] text-shade-white">
              Confirm
            </b>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FrameComponent
