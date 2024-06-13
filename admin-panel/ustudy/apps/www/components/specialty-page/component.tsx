import { useMemo, type CSSProperties } from "react"
import type { NextPage } from "next"
import Link from "next/link"

export type ComponentType = {
  rectangle14230?: string
  rectangle14231?: string
  srHearth?: string

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"]
}

const Component: NextPage<ComponentType> = ({
  rectangle14230,
  rectangle14231,
  srHearth,
  propMinWidth,
}) => {
  const component14Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    }
  }, [propMinWidth])

  return (
    <>
      <Link href="/colleges-products" className="rounded-md border">
        <div
          className="text-11xl relative box-border flex max-w-full flex-1 flex-col items-start justify-start gap-[24.6px] pb-[24.4px] pl-0 pr-px pt-0 text-left font-headings-desktop-poppins-16px-regular text-shade-white"
          style={component14Style}
        >
          <div className="absolute inset-x-0 bottom-0 !m-0 h-[364.7px] w-full rounded [background:linear-gradient(#000,_#000),_#d9d9d9]" />
          <div className="relative flex max-w-full flex-row items-start justify-start self-stretch">
            <img
              className="rounded-t-8xs relative z-[1] h-[263.5px] max-w-full flex-1 overflow-hidden rounded-b-none object-cover"
              alt=""
              src="/rectangle14230.png"
            />
            <img
              className="rounded-8xs absolute bottom-[-9.2px] left-[29px] z-[2] !m-0 h-[104.2px] w-[126.9px] object-cover"
              loading="lazy"
              alt=""
              src="/rectangle14231.png"
            />
          </div>
          <div className="box-border flex w-[461.6px] max-w-full flex-row items-start justify-start px-[29px] py-0">
            <div className="flex max-w-full flex-1 flex-row items-end justify-between gap-[20px] mq450:flex-wrap">
              <div className="flex w-[235.4px] flex-col items-start justify-start gap-[19.5px]">
                <h2 className="font-inherit relative z-[1] m-0 self-stretch text-inherit font-bold leading-[31px] mq750:text-5xl mq750:leading-[24px] mq450:text-lg mq450:leading-[18px]">
                  Astana IT
                </h2>
                <div className="font-nunito-sans box-border flex w-[108.6px] flex-row items-start justify-start py-0 pl-[4.6px] pr-[5px] text-xs">
                  <div className="relative z-[1] flex-1 shrink-0">503</div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-end px-0 pb-[12.3px] pt-0">
                <img
                  className="relative z-[1] h-[36.8px] w-[38.2px] shrink-0 overflow-hidden"
                  loading="lazy"
                  alt=""
                  src="/srheart.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Component
